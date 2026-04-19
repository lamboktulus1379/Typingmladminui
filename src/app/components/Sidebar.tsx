import { Link, useLocation } from "react-router";
import {
  Home,
  Users,
  UserCog,
  Keyboard,
  Hand,
  BookOpen,
  BarChart3,
  Lightbulb,
  Cpu,
  ClipboardCheck,
  Activity,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const menuItems = [
  { path: "/", label: "Home", icon: Home, section: "You" },
  { path: "/users", label: "Users", icon: Users, section: "You" },
  { path: "/roles", label: "Roles", icon: UserCog, section: "You" },
  { path: "/typing", label: "Typing", icon: Keyboard, section: "You" },
  { path: "/finger-library", label: "Finger Library", icon: Hand, section: "You" },
  { path: "/drill-library", label: "Drill Library", icon: BookOpen, section: "You" },
  { path: "/typing-analysis", label: "Typing Analysis", icon: BarChart3, section: "You" },
  {
    path: "/recommendation-analytics",
    label: "Recommendation Analytics",
    icon: Lightbulb,
    section: "You",
  },
  {
    path: "/mlops-wizard",
    label: "MLOps Wizard",
    icon: Cpu,
    section: "You",
  },
  {
    path: "/evaluation-report",
    label: "Evaluation Report",
    icon: ClipboardCheck,
    section: "You",
  },
  {
    path: "/mlops-dashboard",
    label: "MLOps Dashboard",
    icon: Activity,
    section: "You",
  },
  { path: "/settings", label: "Settings", icon: Settings, section: "More" },
  { path: "/help", label: "Help", icon: HelpCircle, section: "More" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-60 bg-[#1e293b] h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Sections */}
      <div className="flex-1 pt-6 pb-4">
        {/* You Section */}
        <div className="mb-10">
          <h3 className="px-6 mb-4 text-xs uppercase tracking-wider text-slate-400 font-medium">
            You
          </h3>
          <nav className="space-y-1.5">
            {menuItems
              .filter((item) => item.section === "You")
              .map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-6 py-3.5 text-sm transition-all ${
                      isActive
                        ? "bg-slate-700/50 text-white border-l-2 border-blue-500"
                        : "text-slate-300 hover:bg-slate-700/30 hover:text-white border-l-2 border-transparent"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3.5" strokeWidth={1.5} />
                    <span className="font-normal">{item.label}</span>
                  </Link>
                );
              })}
          </nav>
        </div>

        {/* More Section */}
        <div>
          <h3 className="px-6 mb-4 text-xs uppercase tracking-wider text-slate-400 font-medium">
            More
          </h3>
          <nav className="space-y-1.5">
            {menuItems
              .filter((item) => item.section === "More")
              .map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-6 py-3.5 text-sm transition-all ${
                      isActive
                        ? "bg-slate-700/50 text-white border-l-2 border-blue-500"
                        : "text-slate-300 hover:bg-slate-700/30 hover:text-white border-l-2 border-transparent"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3.5" strokeWidth={1.5} />
                    <span className="font-normal">{item.label}</span>
                  </Link>
                );
              })}
          </nav>
        </div>
      </div>

      {/* Logout Button at Bottom */}
      <div className="p-4 border-t border-slate-700">
        <Link
          to="/login"
          className="flex items-center px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/30 hover:text-white rounded-lg transition-all border border-transparent hover:border-slate-600"
        >
          <LogOut className="w-5 h-5 mr-3.5" strokeWidth={1.5} />
          <span className="font-normal">Logout</span>
        </Link>
      </div>
    </div>
  );
}