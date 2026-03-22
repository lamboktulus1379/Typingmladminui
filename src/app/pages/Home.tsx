import { Link } from "react-router";
import { BarChart3, List, Hand, Users, FileText, Database } from "lucide-react";

const statusCards = [
  { label: "TYPING ANALYSIS", status: "Active", color: "bg-blue-500" },
  { label: "TYPING LIBRARY", status: "Active", color: "bg-emerald-500" },
  { label: "FINGER LIBRARY", status: "Active", color: "bg-amber-500" },
  { label: "USERS", status: "Active", color: "bg-purple-500" },
];

const actionCards = [
  {
    title: "Open Typing Analysis",
    icon: BarChart3,
    link: "/typing-analysis",
  },
  {
    title: "Go to Typing List",
    icon: List,
    link: "/typing",
  },
  {
    title: "Go to Finger Library",
    icon: Hand,
    link: "/finger-library",
  },
  {
    title: "Open User Management",
    icon: Users,
    link: "/users",
  },
];

export function Home() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Database className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-slate-800">Admin Dashboard</h1>
        </div>
        <p className="text-slate-500">Operations center for typing quality and analysis workflows.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8">
        <Link
          to="/typing-analysis"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          Typing Analysis
        </Link>
        <Link
          to="/typing"
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Typings
        </Link>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {statusCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                {card.label === "TYPING ANALYSIS" && <BarChart3 className="w-6 h-6 text-white" />}
                {card.label === "TYPING LIBRARY" && <List className="w-6 h-6 text-white" />}
                {card.label === "FINGER LIBRARY" && <Hand className="w-6 h-6 text-white" />}
                {card.label === "USERS" && <Users className="w-6 h-6 text-white" />}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {card.label}
                </p>
                <p className="text-lg font-semibold text-slate-800">{card.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Quick Actions</h2>
          <Link to="/settings" className="text-sm text-blue-600 hover:text-blue-700">
            Fluent Admin Surface
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.link}
                className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <Icon className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="font-medium text-slate-700">{card.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
