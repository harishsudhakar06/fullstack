"use client";
import { useState } from "react";
import { Brain, Loader2 } from "lucide-react";
import { predictColleges, College } from "@/lib/api";
import CollegeCard from "./CollegeCard";
import CompareBar from "./CompareBar";

const EXAMS = ["JEE", "NEET", "BITSAT", "VITEEE", "KCET", "TNEA", "MET", "SRMJEEE"];

export default function PredictorForm() {
  const [exam, setExam] = useState("");
  const [rank, setRank] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    colleges: College[];
  } | null>(null);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!exam || !rank) {
      setError("Please select an exam and enter your rank.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await predictColleges(exam, parseInt(rank));
      setResult(res.data);
    } catch {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-lg mx-auto mb-8">
        <div className="flex items-center gap-2 mb-5">
          <div className="bg-purple-100 p-2 rounded-xl">
            <Brain size={20} className="text-purple-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">College Predictor</h2>
            <p className="text-sm text-gray-500">
              Enter your exam and rank to find matching colleges
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entrance Exam
            </label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Exam</option>
              {EXAMS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Rank
            </label>
            <input
              type="number"
              placeholder="e.g. 1500"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Brain size={18} />
            )}
            {loading ? "Predicting..." : "Get Recommendations"}
          </button>
        </div>
      </div>

      {result && (
        <div>
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl inline-block">
              {result.message}
            </p>
          </div>
          {result.colleges.length === 0 ? (
            <p className="text-center text-gray-500">
              No colleges found for this rank. Try a different exam or rank.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-24">
              {result.colleges.map((c) => (
                <CollegeCard key={c.id} college={c} />
              ))}
            </div>
          )}
        </div>
      )}
      <CompareBar />
    </div>
  );
}