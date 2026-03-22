import { Search, Bell, HelpCircle, MessageSquare, ChevronDown } from "lucide-react";
import { Link } from "react-router";

export function Header() {
  return (
    <header className="h-16 fixed top-0 left-60 right-0 z-10 glassmorphism">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-lg">T</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">Typing Admin</h1>
              <p className="text-xs text-slate-500">Control center · Insights in real-time</p>
            </div>
          </div>
        </div>

        {/* Right: Search, Icons, Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Quick search"
              className="pl-10 pr-4 py-2 w-64 bg-white/50 border border-slate-200/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-400"
            />
          </div>

          {/* Icons */}
          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5 text-slate-600" />
          </button>

          {/* Profile Dropdown */}
          <Link to="/login" className="flex items-center gap-2 pl-3 pr-2 py-2 hover:bg-white/50 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-800">admin</p>
              <p className="text-xs text-slate-500">Sign out</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>
    </header>
  );
}