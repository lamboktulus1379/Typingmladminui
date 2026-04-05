import { useState } from "react";
import { UserCog, Plus, Pencil, Trash2, Shield, Users, CheckCircle, XCircle, Search, RefreshCw } from "lucide-react";

const rolesData = [
  {
    id: 1,
    name: "Super Administrator",
    description: "Full system access with all permissions",
    users: 1,
    permissions: {
      users: { create: true, read: true, update: true, delete: true },
      drills: { create: true, read: true, update: true, delete: true },
      typing: { create: true, read: true, update: true, delete: true },
      analytics: { create: true, read: true, update: true, delete: true },
      roles: { create: true, read: true, update: true, delete: true },
      settings: { create: true, read: true, update: true, delete: true },
    },
    createdAt: "2/28/26",
    color: "bg-red-500",
  },
  {
    id: 2,
    name: "Administrator",
    description: "Manage users, drills, and view analytics",
    users: 3,
    permissions: {
      users: { create: true, read: true, update: true, delete: false },
      drills: { create: true, read: true, update: true, delete: true },
      typing: { create: true, read: true, update: true, delete: false },
      analytics: { create: false, read: true, update: false, delete: false },
      roles: { create: false, read: true, update: false, delete: false },
      settings: { create: false, read: true, update: true, delete: false },
    },
    createdAt: "2/28/26",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Content Manager",
    description: "Manage drill library and typing content",
    users: 5,
    permissions: {
      users: { create: false, read: true, update: false, delete: false },
      drills: { create: true, read: true, update: true, delete: true },
      typing: { create: true, read: true, update: true, delete: false },
      analytics: { create: false, read: true, update: false, delete: false },
      roles: { create: false, read: false, update: false, delete: false },
      settings: { create: false, read: false, update: false, delete: false },
    },
    createdAt: "3/1/26",
    color: "bg-emerald-500",
  },
  {
    id: 4,
    name: "Analyst",
    description: "View analytics and generate reports",
    users: 2,
    permissions: {
      users: { create: false, read: true, update: false, delete: false },
      drills: { create: false, read: true, update: false, delete: false },
      typing: { create: false, read: true, update: false, delete: false },
      analytics: { create: false, read: true, update: false, delete: false },
      roles: { create: false, read: false, update: false, delete: false },
      settings: { create: false, read: true, update: false, delete: false },
    },
    createdAt: "3/2/26",
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "Viewer",
    description: "Read-only access to most modules",
    users: 8,
    permissions: {
      users: { create: false, read: true, update: false, delete: false },
      drills: { create: false, read: true, update: false, delete: false },
      typing: { create: false, read: true, update: false, delete: false },
      analytics: { create: false, read: true, update: false, delete: false },
      roles: { create: false, read: false, update: false, delete: false },
      settings: { create: false, read: false, update: false, delete: false },
    },
    createdAt: "3/2/26",
    color: "bg-slate-500",
  },
];

const permissionModules = [
  { key: "users", label: "Users Management" },
  { key: "drills", label: "Drill Library" },
  { key: "typing", label: "Typing Sessions" },
  { key: "analytics", label: "Analytics & Reports" },
  { key: "roles", label: "Role Management" },
  { key: "settings", label: "System Settings" },
];

export function Roles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const totalRoles = rolesData.length;
  const totalUsers = rolesData.reduce((sum, role) => sum + role.users, 0);
  const activeRoles = rolesData.filter(role => role.users > 0).length;

  const selectedRoleData = rolesData.find(role => role.id === selectedRole);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <UserCog className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-slate-800">Role Management</h1>
        </div>
        <p className="text-slate-500">Manage user roles and permissions across the system</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Total Roles</p>
            <Shield className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalRoles}</p>
          <p className="text-xs text-slate-400 mt-2">Configured roles</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Active Roles</p>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{activeRoles}</p>
          <p className="text-xs text-slate-400 mt-2">With assigned users</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Total Users</p>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalUsers}</p>
          <p className="text-xs text-slate-400 mt-2">Across all roles</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Permission Sets</p>
            <UserCog className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{permissionModules.length}</p>
          <p className="text-xs text-slate-400 mt-2">Module permissions</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search roles by name or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Refresh */}
          <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4 text-slate-600" />
          </button>

          {/* Create Role */}
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Role
          </button>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        {rolesData.map((role) => (
          <div
            key={role.id}
            className={`bg-white rounded-xl shadow-sm border transition-all ${
              selectedRole === role.id ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-100"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{role.name}</h3>
                    <p className="text-sm text-slate-500 mb-2">{role.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {role.users} users
                      </span>
                      <span>Created: {role.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                  >
                    {selectedRole === role.id ? "Hide Details" : "View Details"}
                  </button>
                  <button className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  {role.users === 0 && (
                    <button className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Permissions Table - Show when selected */}
              {selectedRole === role.id && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-800 mb-4">Permission Matrix</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Module</th>
                          <th className="text-center px-4 py-3 text-sm font-medium text-slate-600">Create</th>
                          <th className="text-center px-4 py-3 text-sm font-medium text-slate-600">Read</th>
                          <th className="text-center px-4 py-3 text-sm font-medium text-slate-600">Update</th>
                          <th className="text-center px-4 py-3 text-sm font-medium text-slate-600">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {permissionModules.map((module) => {
                          const perms = role.permissions[module.key as keyof typeof role.permissions];
                          return (
                            <tr key={module.key} className="border-b border-slate-100 last:border-0">
                              <td className="px-4 py-3 text-sm text-slate-800">{module.label}</td>
                              <td className="px-4 py-3 text-center">
                                {perms.create ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-slate-300 mx-auto" />
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {perms.read ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-slate-300 mx-auto" />
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {perms.update ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-slate-300 mx-auto" />
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {perms.delete ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-slate-300 mx-auto" />
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Permission Legend */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Permission Guidelines</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div>
                <span className="font-medium text-slate-800">Create:</span> Ability to add new records
              </div>
              <div>
                <span className="font-medium text-slate-800">Read:</span> Ability to view and access data
              </div>
              <div>
                <span className="font-medium text-slate-800">Update:</span> Ability to modify existing records
              </div>
              <div>
                <span className="font-medium text-slate-800">Delete:</span> Ability to remove records (permanent)
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              <strong>Note:</strong> Roles with assigned users cannot be deleted. Reassign users before deletion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
