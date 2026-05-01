"use client";
import { Search, X } from "lucide-react";

interface Filters {
  search: string;
  state: string;
  fees_max: string;
  course: string;
}

interface Props {
  filters: Filters;
  onChange: (key: keyof Filters, value: string) => void;
  onClear: () => void;
}

const STATES = [
  "Tamil Nadu",
  "Maharashtra",
  "Karnataka",
  "Delhi",
  "Rajasthan",
];
const COURSES = ["CSE", "ECE", "Mechanical", "Civil", "MBA", "MCA"];
const FEE_OPTIONS = [
  { label: "Any", value: "" },
  { label: "Up to ₹1L", value: "100000" },
  { label: "Up to ₹2L", value: "200000" },
  { label: "Up to ₹3L", value: "300000" },
  { label: "Up to ₹5L", value: "500000" },
];

export default function FilterBar({ filters, onChange, onClear }: Props) {
  const hasFilters =
    filters.search || filters.state || filters.fees_max || filters.course;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
      {/* Search */}
      <div className="relative mb-3">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search colleges (IIT Madras, Anna Univ, ...)"
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={filters.state}
          onChange={(e) => onChange("state", e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option value="">All States</option>
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filters.fees_max}
          onChange={(e) => onChange("fees_max", e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          {FEE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={filters.course}
          onChange={(e) => onChange("course", e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option value="">All Courses</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}