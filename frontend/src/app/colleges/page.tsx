"use client";
import { useState, useEffect, useCallback } from "react";
import { getColleges, College } from "@/lib/api";
import CollegeCard from "@/components/CollegeCard";
import FilterBar from "@/components/FilterBar";
import CompareBar from "@/components/CompareBar";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const LIMIT = 9;

interface Filters {
  search: string;
  state: string;
  fees_max: string;
  course: string;
}

export default function CollegesPage() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    state: "",
    fees_max: "",
    course: "",
  });
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        page,
        limit: LIMIT,
      };
      if (filters.search) params.search = filters.search;
      if (filters.state) params.state = filters.state;
      if (filters.fees_max) params.fees_max = filters.fees_max;
      if (filters.course) params.course = filters.course;

      const res = await getColleges(params);
      setColleges(res.data.colleges);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(fetchColleges, 300);
    return () => clearTimeout(t);
  }, [fetchColleges]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Explore Colleges
        </h1>
        <p className="text-gray-500 mt-1">
          {total} colleges found — filter by location, fees, or course
        </p>
      </div>

      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        onClear={() => {
          setFilters({ search: "", state: "", fees_max: "", course: "" });
          setPage(1);
        }}
      />

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 size={32} className="animate-spin text-blue-500" />
        </div>
      ) : colleges.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No colleges found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-gray-600">
                Page <strong>{page}</strong> of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      <CompareBar />
    </div>
  );
}