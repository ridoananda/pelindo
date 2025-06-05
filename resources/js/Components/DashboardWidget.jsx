import theme from "@/theme";

export default function DashboardWidget({ title, value, icon, trend = null, percentage = null, color = "blue" }) {
  // Color mapping
  const colors = {
    blue: {
      bgLight: "bg-blue-50",
      bgIcon: "bg-gradient-to-br from-blue-600 to-blue-700",
      text: "text-blue-700",
      border: "border-blue-100",
      trend: {
        up: "text-emerald-500",
        down: "text-red-500"
      }
    },
    teal: {
      bgLight: "bg-teal-50",
      bgIcon: "bg-gradient-to-br from-teal-600 to-teal-700",
      text: "text-teal-700",
      border: "border-teal-100",
      trend: {
        up: "text-emerald-500",
        down: "text-red-500"
      }
    },
    indigo: {
      bgLight: "bg-indigo-50",
      bgIcon: "bg-gradient-to-br from-indigo-600 to-indigo-700",
      text: "text-indigo-700",
      border: "border-indigo-100",
      trend: {
        up: "text-emerald-500",
        down: "text-red-500"
      }
    },
    amber: {
      bgLight: "bg-amber-50",
      bgIcon: "bg-gradient-to-br from-amber-500 to-amber-600",
      text: "text-amber-700",
      border: "border-amber-100",
      trend: {
        up: "text-emerald-500",
        down: "text-red-500"
      }
    },
  };

  const selectedColor = colors[color] || colors.blue;

  return (
    <div className={`bg-white rounded-xl shadow-md border ${selectedColor.border} overflow-hidden transition-all hover:shadow-lg`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${selectedColor.bgIcon} text-white shadow-md`}>
            {icon}
          </div>
          {trend && percentage && (
            <div className={`flex items-center ${trend === "up" ? selectedColor.trend.up : selectedColor.trend.down}`}>
              <span className="text-sm font-medium">
                {trend === "up" ? "+" : "-"}{percentage}%
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${trend === "up" ? "" : "transform rotate-180"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${selectedColor.text}`}>{value}</p>
        </div>
      </div>
      <div className={`h-1 w-full ${selectedColor.bgIcon}`}></div>
    </div>
  );
}
