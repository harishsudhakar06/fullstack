"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, BarChart2, Brain, BookOpen } from "lucide-react";

export default function Navbar() {
  const path = usePathname();

  const links = [
    { href: "/colleges", label: "Colleges", icon: BookOpen },
    { href: "/compare", label: "Compare", icon: BarChart2 },
    { href: "/predictor", label: "Predictor", icon: Brain },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <GraduationCap size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900">
            College<span className="text-blue-600">IQ</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                path.startsWith(href)
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}