import { useState } from "react";
import { Search, Filter, X, FileUp, Download, Pencil, Trash2, Plus } from "lucide-react";

const drillsData = [
  {
    code: "DL_SOFT_023931",
    text: "soft delete probe",
    primary: "right_index",
    secondary: "right_middle",
    difficulty: "medium",
    type: "word",
    active: "Inactive",
    updated: "3/1/26, 3:09 AM",
  },
  {
    code: "DL_SOFT_023943",
    text: "soft delete probe",
    primary: "right_index",
    secondary: "right_middle",
    difficulty: "medium",
    type: "word",
    active: "Inactive",
    updated: "3/1/26, 3:09 AM",
  },
  {
    code: "DL001",
    text: "ask",
    primary: "left_pinky",
    secondary: "left_ring",
    difficulty: "easy",
    type: "word",
    active: "Active",
    updated: "2/28/26, 7:40 PM",
  },
  {
    code: "DL002",
    text: "sad",
    primary: "left_ring",
    secondary: "left_middle",
    difficulty: "easy",
    type: "word",
    active: "Active",
    updated: "3/1/26, 3:06 AM",
  },
  {
    code: "DL003",
    text: "led",
    primary: "left_middle",
    secondary: "left_index",
    difficulty: "easy",
    type: "word",
    active: "Active",
    updated: "3/1/26, 3:06 AM",
  },
  {
    code: "DL004",
    text: "fail",
    primary: "left_index",
    secondary: "left_middle",
    difficulty: "easy",
    type: "word",
    active: "Active",
    updated: "3/1/26, 3:06 AM",
  },
  {
    code: "DL005",
    text: "jam",
    primary: "right_index",
    secondary: "right_middle",
    difficulty: "easy",
    type: "word",
    active: "Active",
    updated: "3/1/26, 3:06 AM",
  },
];

export function DrillLibrary() {
  const [primaryFinger, setPrimaryFinger] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [textType, setTextType] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div>
      {/* Filter and Action Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
        {/* Filters Row */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">Primary Finger</label>
            <select
              value={primaryFinger}
              onChange={(e) => setPrimaryFinger(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">All</option>
              <option value="left_pinky">Left Pinky</option>
              <option value="left_ring">Left Ring</option>
              <option value="left_middle">Left Middle</option>
              <option value="left_index">Left Index</option>
              <option value="right_index">Right Index</option>
              <option value="right_middle">Right Middle</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">Text Type</label>
            <input
              type="text"
              value={textType}
              onChange={(e) => setTextType(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter type"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-4">
          <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Search className="w-4 h-4 text-slate-600" />
          </button>
          <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <X className="w-4 h-4 text-slate-600" />
          </button>

          {/* Create Drill Button */}
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Drill
          </button>

          <div className="flex-1"></div>

          {/* CSV/XLSX Import */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
              <FileUp className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-700">Select CSV</span>
              <input type="file" accept=".csv" className="hidden" />
            </label>
            <span className="text-sm text-slate-500">No file selected</span>
          </div>

          {/* Checkboxes */}
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-slate-300" />
            <span className="text-sm text-slate-700">Update existing</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-slate-300" />
            <span className="text-sm text-slate-700">Dry run</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-slate-300" />
            <span className="text-sm text-slate-700">Full refresh</span>
          </label>

          {/* Import Button */}
          <button className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Import CSV
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Client filter"
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Code</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Text</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Primary</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Secondary
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Difficulty
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Type</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Active</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Updated</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drillsData.map((drill, index) => (
                <tr
                  key={drill.code}
                  className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-slate-800">{drill.code}</td>
                  <td className="px-6 py-4 text-sm text-slate-800">{drill.text}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{drill.primary}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{drill.secondary}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{drill.difficulty}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{drill.type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        drill.active === "Active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {drill.active}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{drill.updated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
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