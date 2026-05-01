"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { compareColleges, College } from "@/lib/api";
import CompareTable from "@/components/CompareTable";
import { BarChart2, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids");
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ids) return;
    const idArray = ids.split(",").map(Number).filter(Boolean);
    if (idArray.length < 2) {
      setError("Please select at least 2 colleges to compare.");
      return;
    }
    setLoading(true);
    compareColleges(idArray)
      .then((res) => setColleges(res.data))
      .catch(() => setError("Failed to load comparison data."))
      .finally(() => setLoading(false));
  }, [ids]);

  return (
    <div className="pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/colleges"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 bg-white border border-gray-200 px-3 py-2 rounded-xl"
        >
          <ArrowLeft size={16} /> Back
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <BarChart2 className="text-blue-600" size={28} />
            Compare Colleges
          </h1>
          <p className="text-gray-500 mt-0.5">
            Side-by-side comparison to help you decide
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-48">
          <Loader2 size={32} className="animate-spin text-blue-500" />
        </div>
      )}

      {error && (
        <div className="text-center py-16">
          <p className="text-gray-500">{error}</p>
          <Link href="/colleges" className="text-blue-600 hover:underline mt-2 block">
            Go back to colleges →
          </Link>
        </div>
      )}

      {!loading && !error && colleges.length === 0 && !ids && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <BarChart2 size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">No colleges selected</p>
          <p className="text-gray-400 text-sm mt-1 mb-4">
            Go to the colleges page and click "+ Compare" on 2–3 colleges
          </p>
          <Link
            href="/colleges"
            className="inline-block bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Browse Colleges
          </Link>
        </div>
      )}

      {colleges.length >= 2 && (
        <>
          {/* College name header */}
          <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${colleges.length}, 1fr)` }}>
            {colleges.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
                <h3 className="font-bold text-gray-900">{c.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{c.location}</p>
              </div>
            ))}
          </div>
          <CompareTable colleges={colleges} />
        </>
      )}
    </div>
  );
}