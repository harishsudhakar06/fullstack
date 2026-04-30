import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import collegesRouter from "./routes/colleges";
import compareRouter from "./routes/compare";
import predictRouter from "./routes/predict";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "College Discovery API running ✅" });
});

app.use("/api/colleges", collegesRouter);
app.use("/api/compare", compareRouter);
app.use("/api/predict", predictRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});