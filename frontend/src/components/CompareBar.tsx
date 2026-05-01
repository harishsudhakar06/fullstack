"use client";
import { useCompare } from "@/context/CompareContext";
import { useRouter } from "next/navigation";
import { X, BarChart2 } from "lucide-react";

export default function CompareBar() {
  const { selectedIds, toggle, clear } = useCompare();
  const router = useRouter();

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-2xl px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BarChart2 size={20} />
          <span className="font-semibold">
            {selectedIds.length} college{selectedIds.length > 1 ? "s" : ""}{" "}
            selected
          </span>
          {selectedIds.length < 2 && (
            <span className="text-blue-200 text-sm">
              (Select at least 2 to compare)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clear}
            className="flex items-center gap-1 text-sm text-blue-200 hover:text-white"
          >
            <X size={16} /> Clear
          </button>
          <button
            disabled={selectedIds.length < 2}
            onClick={() =>
              router.push(`/compare?ids=${selectedIds.join(",")}`)
            }
            className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Compare Now →
          </button>
        </div>
      </div>
    </div>
  );
}