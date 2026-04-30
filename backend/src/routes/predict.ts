import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// POST /api/predict  { exam, rank }
router.post("/", async (req: Request, res: Response) => {
  try {
    const { exam, rank } = req.body as { exam: string; rank: number };

    if (!exam || !rank) {
      return res.status(400).json({ error: "exam and rank required" });
    }

    const rankNum = parseInt(String(rank));

    // Rule-based: filter colleges by exam + cutoff_rank >= submitted rank
    // with a buffer of 20% above the rank
    const buffer = Math.floor(rankNum * 1.2);

    const result = await pool.query(
      `SELECT * FROM colleges 
       WHERE exam ILIKE $1 AND cutoff_rank >= $2
       ORDER BY cutoff_rank ASC
       LIMIT 8`,
      [`%${exam}%`, rankNum]
    );

    if (result.rows.length === 0) {
      // Fallback: show colleges with cutoff within buffer
      const fallback = await pool.query(
        `SELECT * FROM colleges 
         WHERE cutoff_rank <= $1
         ORDER BY cutoff_rank DESC
         LIMIT 6`,
        [buffer]
      );
      return res.json({
        message: `Showing best-fit colleges for rank ${rankNum}`,
        colleges: fallback.rows,
      });
    }

    res.json({
      message: `Colleges you can get with rank ${rankNum} in ${exam}`,
      colleges: result.rows,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;