import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// GET /api/colleges?search=&state=&fees_max=&course=&page=&limit=
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      search = "",
      state = "",
      fees_max = "",
      course = "",
      page = "1",
      limit = "9",
    } = req.query as Record<string, string>;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const conditions: string[] = [];
    const values: (string | number)[] = [];
    let idx = 1;

    if (search) {
      conditions.push(`name ILIKE $${idx++}`);
      values.push(`%${search}%`);
    }
    if (state) {
      conditions.push(`state ILIKE $${idx++}`);
      values.push(`%${state}%`);
    }
    if (fees_max) {
      conditions.push(`fees_min <= $${idx++}`);
      values.push(parseInt(fees_max));
    }
    if (course) {
      conditions.push(`$${idx++} ILIKE ANY(courses)`);
      values.push(`%${course}%`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const countQuery = `SELECT COUNT(*) FROM colleges ${where}`;
    const dataQuery = `
      SELECT * FROM colleges ${where}
      ORDER BY rating DESC
      LIMIT $${idx++} OFFSET $${idx++}
    `;

    const [countResult, dataResult] = await Promise.all([
      pool.query(countQuery, values),
      pool.query(dataQuery, [...values, parseInt(limit), offset]),
    ]);

    res.json({
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      limit: parseInt(limit),
      colleges: dataResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/colleges/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM colleges WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "College not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;