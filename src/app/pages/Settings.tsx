import { useState } from "react";
import { Settings as SettingsIcon, User, Lock, Bell, Globe, Database, Shield, Save } from "lucide-react";

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
        </div>
        <p className="text-slate-500">Configure your application preferences and settings</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Settings Column */}
        <div className="col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-800">Profile Settings</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Admin Name</label>
                <input
                  type="text"
                  defaultValue="System Administrator"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="admin@local.test"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <input
                  type="text"
                  defaultValue="Super Administrator"
                  disabled
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500"
                />
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Profile
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-slate-800">Security Settings</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Update Password
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-slate-800">Notification Settings</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p className="font-medium text-slate-800">Email Notifications</p>
                  <p className="text-sm text-slate-500">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    emailNotifications ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      emailNotifications ? "translate-x-6" : ""
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p className="font-medium text-slate-800">Push Notifications</p>
                  <p className="text-sm text-slate-500">Receive browser push notifications</p>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    pushNotifications ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      pushNotifications ? "translate-x-6" : ""
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-slate-800">Weekly Reports</p>
                  <p className="text-sm text-slate-500">Receive weekly analytics summary</p>
                </div>
                <button
                  onClick={() => setWeeklyReports(!weeklyReports)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    weeklyReports ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      weeklyReports ? "translate-x-6" : ""
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          {/* Application Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-slate-800">Application</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="id">Indonesian</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="asia/jakarta">Asia/Jakarta (WIB)</option>
                  <option value="asia/makassar">Asia/Makassar (WITA)</option>
                  <option value="asia/jayapura">Asia/Jayapura (WIT)</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-slate-100">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Dark Mode</p>
                  <p className="text-xs text-slate-500">Coming soon</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  disabled
                  className={`relative w-12 h-6 rounded-full transition-colors bg-slate-300 opacity-50 cursor-not-allowed`}
                >
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-semibold text-slate-800">Data</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Auto Backup</p>
                  <p className="text-xs text-slate-500">Daily at 2:00 AM</p>
                </div>
                <button
                  onClick={() => setAutoBackup(!autoBackup)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    autoBackup ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      autoBackup ? "translate-x-6" : ""
                    }`}
                  ></div>
                </button>
              </div>

              <button className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                Export All Data
              </button>

              <button className="w-full px-4 py-2.5 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                Clear Cache
              </button>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm border border-blue-100">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">System Information</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Version</span>
                <span className="text-slate-800 font-medium">2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Last Updated</span>
                <span className="text-slate-800 font-medium">3/4/26</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">License</span>
                <span className="text-slate-800 font-medium">Enterprise</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
