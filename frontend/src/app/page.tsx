import Link from "next/link";
import {
  Search,
  BarChart2,
  Brain,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Hero */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <GraduationCap size={16} />
          India's Smartest College Discovery Platform
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Find Your Perfect
          <br />
          <span className="text-blue-600">College in Minutes</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Search, compare and predict colleges based on your exam rank.
          Make smarter decisions with real data.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-4 justify-center mb-16">
        <Link
          href="/colleges"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Search size={18} />
          Browse Colleges
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/predictor"
          className="flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-400 text-gray-700 hover:text-blue-600 font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Brain size={18} />
          Predict My College
        </Link>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {[
          {
            icon: <Search size={24} className="text-blue-500" />,
            title: "Search & Filter",
            desc: "Browse 10,000+ colleges by location, fees, courses and more",
            href: "/colleges",
            color: "bg-blue-50",
          },
          {
            icon: <BarChart2 size={24} className="text-teal-500" />,
            title: "Compare Colleges",
            desc: "Side-by-side comparison of fees, placements and ratings",
            href: "/compare",
            color: "bg-teal-50",
          },
          {
            icon: <Brain size={24} className="text-purple-500" />,
            title: "Rank Predictor",
            desc: "Enter your JEE/NEET rank and get matching college list",
            href: "/predictor",
            color: "bg-purple-50",
          },
        ].map(({ icon, title, desc, href, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
          >
            <div
              className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
            >
              {icon}
            </div>

            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>

            <p className="text-sm text-gray-500">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}