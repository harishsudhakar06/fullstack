"use client";
import Link from "next/link";
import { MapPin, IndianRupee, Users, Plus, Check } from "lucide-react";
import StarRating from "./StarRating";
import { useCompare } from "@/context/CompareContext";
import { College, formatFees } from "@/lib/api";

export default function CollegeCard({ college }: { college: College }) {
  const { toggle, isSelected, selectedIds } = useCompare();
  const selected = isSelected(college.id);
  const maxed = selectedIds.length >= 3 && !selected;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        selected ? "border-blue-500" : "border-gray-100"
      }`}
    >
      {/* Color bar */}
      <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-blue-500 to-teal-400" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <Link
              href={`/colleges/${college.id}`}
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight"
            >
              {college.name}
            </Link>
            <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
              <MapPin size={13} />
              <span>{college.location}</span>
            </div>
          </div>
          <span
            className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
              college.type === "Government"
                ? "bg-green-50 text-green-700"
                : "bg-purple-50 text-purple-700"
            }`}
          >
            {college.type}
          </span>
        </div>

        {/* Rating */}
        <StarRating rating={college.rating} />

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <IndianRupee size={13} className="text-blue-500" />
            <span>{formatFees(college.fees_min, college.fees_max)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={13} className="text-teal-500" />
            <span>{(college.students / 1000).toFixed(0)}K students</span>
          </div>
        </div>

        {/* Course pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {college.courses.slice(0, 3).map((c) => (
            <span
              key={c}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {c}
            </span>
          ))}
          {college.courses.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              +{college.courses.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/colleges/${college.id}`}
            className="flex-1 text-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => toggle(college.id)}
            disabled={maxed}
            className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-xl border transition-colors ${
              selected
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : maxed
                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
            }`}
          >
            {selected ? <Check size={14} /> : <Plus size={14} />}
            {selected ? "Added" : "Compare"}
          </button>
        </div>
      </div>
    </div>
  );
}