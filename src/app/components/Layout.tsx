import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Header />
      <main className="ml-60 pt-16 min-h-screen pb-16">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
      <footer className="ml-60 border-t border-slate-200 bg-white py-4 px-8">
        <p className="text-sm text-slate-500 text-center">
          © 2025 MyTypingApp Admin. All rights reserved.
        </p>
      </footer>
    </div>
  );
}