import { useState } from "react";
import { Search, Filter, RefreshCw, Plus, Eye, Pencil, Trash2, Download } from "lucide-react";

const usersData = [
  {
    id: 1,
    firstName: "E2E",
    lastName: "User",
    roles: "No role",
    email: "e2e.1772577722@example.com",
    createdAt: "3/4/26",
  },
  {
    id: 2,
    firstName: "System",
    lastName: "Administrator",
    roles: "No role",
    email: "admin@local.test",
    createdAt: "2/28/26",
  },
  {
    id: 3,
    firstName: "Demo",
    lastName: "User",
    roles: "No role",
    email: "demo@ulus.tech",
    createdAt: "2/28/26",
  },
  {
    id: 4,
    firstName: "E2E",
    lastName: "User",
    roles: "No role",
    email: "e2e.1772574666@example.com",
    createdAt: "3/4/26",
  },
  {
    id: 5,
    firstName: "E2E",
    lastName: "User",
    roles: "No role",
    email: "e2e.1772583167@example.com",
    createdAt: "3/4/26",
  },
];

export function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      {/* Filter and Action Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <p className="text-xs text-slate-400 mt-1 ml-1">Enter at least 5 characters</p>
          </div>

          {/* Filter */}
          <div className="flex-1 relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter users"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Refresh */}
          <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4 text-slate-600" />
          </button>

          {/* Create User */}
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create User
          </button>

          {/* Import XLSX */}
          <button className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Import XLSX
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  First Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Last Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Roles
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Created At
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-slate-800">{user.firstName}</td>
                  <td className="px-6 py-4 text-sm text-slate-800">{user.lastName}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{user.roles}</td>
                  <td className="px-6 py-4 text-sm text-slate-800">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                        <Pencil className="w-4 h-4" />
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
