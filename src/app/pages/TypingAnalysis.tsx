import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { id: "left-pinky", name: "Left Pinky", value: 35, color: "#14b8a6" },
  { id: "other", name: "Other", value: 65, color: "#0d9488" },
];

const areaData = [
  { id: "day-1", date: "2026-03-08", sessions: 6 },
  { id: "day-2", date: "2026-03-10", sessions: 8 },
  { id: "day-3", date: "2026-03-15", sessions: 12 },
  { id: "day-4", date: "2026-03-22", sessions: 15 },
];

export function TypingAnalysis() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">Recommendation Analytics</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">User Id</label>
              <input
                type="text"
                placeholder="dd/mm/yyyy, --:--"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">User Id</label>
              <input
                type="text"
                placeholder="dd/mm/yyyy, --:--"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Profile Updated From (UTC)</label>
              <input
                type="text"
                placeholder="dd/mm/yyyy, --:--"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Profile Updated To (UTC)</label>
              <input
                type="text"
                placeholder="dd/mm/yyyy, --:--"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Apply
            </button>
            <button className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              Clear
            </button>
            <button className="px-6 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              Export Sessions CSV
            </button>
            <button className="px-6 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              Export Trends CSV
            </button>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <p className="text-sm text-slate-600 mb-6">
        No filters applied. Showing all persisted recommendation analytics.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Top Predicted Finger</h3>
          <p className="text-slate-600 text-sm mb-1">left_pinky (12)</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Top Recommended Drill</h3>
          <p className="text-slate-600 text-sm mb-1">GEN12467 (3)</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Model Versions In Use</h3>
          <p className="text-slate-600 text-sm">
            2025-03-CERT7-31:41.17663H:00:00 (12), fallback-heuristic (3)
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Total Sessions</h3>
          <p className="text-3xl font-bold text-slate-800">30</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-slate-800">1</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Avg WPM</h3>
          <p className="text-3xl font-bold text-slate-800">61.03</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Avg Accuracy</h3>
          <p className="text-3xl font-bold text-slate-800">74.63</p>
        </div>
      </div>

      {/* Session Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
        <p className="text-sm text-slate-600 mb-2">
          <span className="font-semibold">Latest Session:</span> Mar 22, 2026, 3:41:13 AM
        </p>
        <p className="text-sm text-slate-600">left_pinky: 1</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Weakest-Finger Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                key="finger-distribution-pie"
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={0}
                dataKey="value"
              >
                {pieData.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Daily Session Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis key="xaxis" dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis key="yaxis" stroke="#64748b" fontSize={12} />
              <Tooltip key="tooltip" />
              <Area
                key="sessions-area"
                type="monotone"
                dataKey="sessions"
                stroke="#3b82f6"
                fill="#93c5fd"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-slate-600">Sessions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
