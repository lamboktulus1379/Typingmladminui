import { useState } from "react";
import { Search, Filter, Plus, Eye, Download, Trash2, RefreshCw, Calendar, Clock, Target } from "lucide-react";

const typingSessionsData = [
  {
    id: 1,
    userName: "E2E User",
    email: "e2e.1772577722@example.com",
    wpm: 75,
    accuracy: 96.5,
    duration: "5:23",
    date: "3/4/26, 2:15 PM",
    drillCode: "DL001",
    status: "Completed",
  },
  {
    id: 2,
    userName: "System Administrator",
    email: "admin@local.test",
    wpm: 82,
    accuracy: 98.2,
    duration: "4:45",
    date: "3/4/26, 10:30 AM",
    drillCode: "DL002",
    status: "Completed",
  },
  {
    id: 3,
    userName: "Demo User",
    email: "demo@ulus.tech",
    wpm: 68,
    accuracy: 94.8,
    duration: "6:12",
    date: "3/3/26, 4:22 PM",
    drillCode: "DL003",
    status: "Completed",
  },
  {
    id: 4,
    userName: "E2E User",
    email: "e2e.1772574666@example.com",
    wpm: 45,
    accuracy: 89.3,
    duration: "3:18",
    date: "3/3/26, 1:55 PM",
    drillCode: "DL004",
    status: "Incomplete",
  },
  {
    id: 5,
    userName: "Demo User",
    email: "demo@ulus.tech",
    wpm: 91,
    accuracy: 99.1,
    duration: "5:47",
    date: "3/2/26, 9:40 AM",
    drillCode: "DL005",
    status: "Completed",
  },
];

export function Typing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Calculate statistics
  const totalSessions = typingSessionsData.length;
  const avgWPM = Math.round(
    typingSessionsData.reduce((sum, session) => sum + session.wpm, 0) / totalSessions
  );
  const avgAccuracy = (
    typingSessionsData.reduce((sum, session) => sum + session.accuracy, 0) / totalSessions
  ).toFixed(1);
  const completedSessions = typingSessionsData.filter(s => s.status === "Completed").length;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Typing Sessions</h1>
        <p className="text-slate-500">Monitor and analyze user typing performance</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Total Sessions</p>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalSessions}</p>
          <p className="text-xs text-slate-400 mt-2">All time</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Avg WPM</p>
            <Target className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{avgWPM}</p>
          <p className="text-xs text-slate-400 mt-2">Words per minute</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Avg Accuracy</p>
            <Target className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{avgAccuracy}%</p>
          <p className="text-xs text-slate-400 mt-2">Correct keystrokes</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Completed</p>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{completedSessions}</p>
          <p className="text-xs text-slate-400 mt-2">Finished sessions</p>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by user name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Status Filter */}
          <div className="w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>

          {/* Refresh */}
          <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4 text-slate-600" />
          </button>

          {/* Create Session */}
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Session
          </button>

          {/* Export */}
          <button className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">User</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">WPM</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Accuracy</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Duration</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Drill Code</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {typingSessionsData.map((session, index) => (
                <tr
                  key={session.id}
                  className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-slate-800">{session.userName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{session.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      session.wpm >= 80 ? "text-emerald-600" : 
                      session.wpm >= 60 ? "text-blue-600" : 
                      "text-amber-600"
                    }`}>
                      {session.wpm}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      session.accuracy >= 95 ? "text-emerald-600" : 
                      session.accuracy >= 90 ? "text-blue-600" : 
                      "text-amber-600"
                    }`}>
                      {session.accuracy}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{session.duration}</td>
                  <td className="px-6 py-4 text-sm text-slate-800">{session.drillCode}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{session.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
