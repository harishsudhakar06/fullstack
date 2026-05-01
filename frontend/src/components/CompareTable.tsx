import { College, formatFees, formatPackage } from "@/lib/api";
import StarRating from "./StarRating";
import { MapPin, Trophy, TrendingUp, IndianRupee } from "lucide-react";

export default function CompareTable({ colleges }: { colleges: College[] }) {
  const best = (key: keyof College, higher = true) => {
    const values = colleges.map((c) => c[key] as number);
    const target = higher ? Math.max(...values) : Math.min(...values);
    return target;
  };

  const rows = [
    {
      label: "Location",
      icon: <MapPin size={15} />,
      render: (c: College) => c.location,
      highlight: false,
    },
    {
      label: "Type",
      icon: null,
      render: (c: College) => (
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            c.type === "Government"
              ? "bg-green-100 text-green-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {c.type}
        </span>
      ),
      highlight: false,
    },
    {
      label: "Rating",
      icon: null,
      render: (c: College) => <StarRating rating={c.rating} />,
      key: "rating" as keyof College,
      higher: true,
    },
    {
      label: "Annual Fees",
      icon: <IndianRupee size={15} />,
      render: (c: College) => formatFees(c.fees_min, c.fees_max),
      key: "fees_min" as keyof College,
      higher: false,
    },
    {
      label: "Placement %",
      icon: <Trophy size={15} />,
      render: (c: College) => `${c.placement_pct}%`,
      key: "placement_pct" as keyof College,
      higher: true,
    },
    {
      label: "Avg Package",
      icon: <TrendingUp size={15} />,
      render: (c: College) => formatPackage(c.placement_avg),
      key: "placement_avg" as keyof College,
      higher: true,
    },
    {
      label: "Top Package",
      icon: null,
      render: (c: College) => formatPackage(c.placement_top),
      key: "placement_top" as keyof College,
      higher: true,
    },
    {
      label: "Students",
      icon: null,
      render: (c: College) => `${(c.students / 1000).toFixed(0)}K`,
      highlight: false,
    },
    {
      label: "Established",
      icon: null,
      render: (c: College) => c.established,
      highlight: false,
    },
    {
      label: "Entrance Exam",
      icon: null,
      render: (c: College) => c.exam,
      highlight: false,
    },
    {
      label: "Top Courses",
      icon: null,
      render: (c: College) => (
        <div className="flex flex-wrap gap-1">
          {c.courses.slice(0, 2).map((course) => (
            <span
              key={course}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {course}
            </span>
          ))}
        </div>
      ),
      highlight: false,
    },
    {
      label: "Top Recruiters",
      icon: null,
      render: (c: College) => (
        <div className="flex flex-wrap gap-1">
          {c.top_recruiters.slice(0, 2).map((r) => (
            <span
              key={r}
              className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
            >
              {r}
            </span>
          ))}
        </div>
      ),
      highlight: false,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 w-36">
              Feature
            </th>
            {colleges.map((c) => (
              <th
                key={c.id}
                className="text-left px-6 py-4 text-sm font-bold text-gray-900"
              >
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const bestVal = row.key
              ? best(row.key, row.higher !== false)
              : null;
            return (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
              >
                <td className="px-6 py-3.5 text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-1.5">
                    {row.icon}
                    {row.label}
                  </div>
                </td>
                {colleges.map((c) => {
                  const isHighlight =
                    row.key &&
                    bestVal !== null &&
                    (c[row.key] as number) === bestVal;
                  return (
                    <td
                      key={c.id}
                      className={`px-6 py-3.5 text-sm text-gray-800 ${
                        isHighlight ? "bg-green-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {row.render(c)}
                        {isHighlight && (
                          <span className="text-xs text-green-600 font-semibold ml-1">
                            ✓ Best
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}