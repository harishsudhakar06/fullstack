"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCollege, College, formatFees, formatPackage } from "@/lib/api";
import StarRating from "@/components/StarRating";
import { MapPin, Users, Calendar, IndianRupee, Trophy, TrendingUp, BookOpen, Loader2 } from "lucide-react";

const MOCK_REVIEWS = [
  { name: "Ravi Kumar", year: 2023, course: "B.Tech CSE", rating: 5, text: "Excellent faculty and amazing placement support. One of the best decisions of my life." },
  { name: "Priya Singh", year: 2022, course: "B.Tech ECE", rating: 4, text: "Great campus life and labs. Placements could be a bit more diverse but overall very satisfied." },
  { name: "Arun Patel", year: 2023, course: "MBA", rating: 4, text: "Good networking opportunities and industry connections. Highly recommend for management students." },
];

export default function CollegeDetailPage() {
  const { id } = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!id) return;
    getCollege(id as string)
      .then((res) => setCollege(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );

  if (!college)
    return <div className="text-center py-16 text-gray-500">College not found.</div>;

  const tabs = ["overview", "courses", "placements", "reviews"];

  return (
    <div className="pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full mb-3 inline-block ${
              college.type === "Government" ? "bg-green-400/20 text-green-200" : "bg-purple-400/20 text-purple-200"
            }`}>
              {college.type} Institution
            </span>
            <h1 className="text-3xl font-extrabold mb-2">{college.name}</h1>
            <div className="flex items-center gap-2 text-blue-200">
              <MapPin size={16} />
              <span>{college.location}</span>
            </div>
          </div>
          <StarRating rating={college.rating} />
        </div>

        {/* Stat bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: <IndianRupee size={16} />, label: "Annual Fees", value: formatFees(college.fees_min, college.fees_max) },
            { icon: <BookOpen size={16} />, label: "Courses", value: `${college.courses.length} Programs` },
            { icon: <Users size={16} />, label: "Students", value: `${(college.students / 1000).toFixed(0)}K+` },
            { icon: <Calendar size={16} />, label: "Established", value: college.established },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-white/10 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
                {icon} {label}
              </div>
              <div className="font-bold text-lg">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{college.description}</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700">
              Entrance Exam:{" "}
              <span className="text-blue-600 font-bold">{college.exam}</span>
            </p>
          </div>
        </div>
      )}

      {activeTab === "courses" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Course</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Duration</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Annual Fees</th>
              </tr>
            </thead>
            <tbody>
              {college.courses.map((course, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-3.5 font-medium text-gray-900">{course}</td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {course.startsWith("B.") ? "4 Years" : course.startsWith("M.") ? "2 Years" : "2 Years"}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {formatFees(college.fees_min, college.fees_max)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "placements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-amber-500" /> Placement Stats
            </h3>
            <div className="space-y-3">
              {[
                { label: "Placement Rate", value: `${college.placement_pct}%`, bar: college.placement_pct },
                { label: "Avg Package", value: formatPackage(college.placement_avg) },
                { label: "Top Package", value: formatPackage(college.placement_top) },
              ].map(({ label, value, bar }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-bold text-gray-900">{value}</span>
                  </div>
                  {bar !== undefined && (
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${bar}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-500" /> Top Recruiters
            </h3>
            <div className="flex flex-wrap gap-2">
              {college.top_recruiters.map((r) => (
                <span key={r} className="bg-blue-50 text-blue-700 font-semibold text-sm px-3 py-1.5 rounded-xl">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          {MOCK_REVIEWS.map((rev, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-gray-900">{rev.name}</p>
                  <p className="text-sm text-gray-500">
                    {rev.course} · Batch {rev.year}
                  </p>
                </div>
                <StarRating rating={rev.rating} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{rev.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}