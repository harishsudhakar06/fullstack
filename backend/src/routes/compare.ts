import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// GET /api/compare?ids=1,2,3
router.get("/", async (req: Request, res: Response) => {
  try {
    const { ids } = req.query as { ids: string };
    if (!ids) return res.status(400).json({ error: "ids required" });

    const idArray = ids
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((n) => !isNaN(n))
      .slice(0, 3);

    const result = await pool.query(
      "SELECT * FROM colleges WHERE id = ANY($1::int[])",
      [idArray]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;