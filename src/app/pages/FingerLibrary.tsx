import { useState } from "react";
import { Hand, Info, TrendingUp, Award, Target } from "lucide-react";

const fingerData = [
  { id: 1, name: "Left Pinky", code: "left_pinky", drills: 15, accuracy: 89.2, improvement: 5.3 },
  { id: 2, name: "Left Ring", code: "left_ring", drills: 18, accuracy: 92.5, improvement: 3.8 },
  { id: 3, name: "Left Middle", code: "left_middle", drills: 22, accuracy: 94.7, improvement: 2.1 },
  { id: 4, name: "Left Index", code: "left_index", drills: 28, accuracy: 96.3, improvement: 1.5 },
  { id: 5, name: "Right Index", code: "right_index", drills: 27, accuracy: 95.8, improvement: 2.3 },
  { id: 6, name: "Right Middle", code: "right_middle", drills: 21, accuracy: 93.2, improvement: 4.2 },
  { id: 7, name: "Right Ring", code: "right_ring", drills: 17, accuracy: 90.8, improvement: 6.1 },
  { id: 8, name: "Right Pinky", code: "right_pinky", drills: 14, accuracy: 87.5, improvement: 7.3 },
];

const keyboardLayout = [
  { keys: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], row: 1 },
  { keys: ["A", "S", "D", "F", "G", "H", "J", "K", "L"], row: 2 },
  { keys: ["Z", "X", "C", "V", "B", "N", "M"], row: 3 },
];

const getFingerForKey = (key: string) => {
  const leftPinky = ["Q", "A", "Z"];
  const leftRing = ["W", "S", "X"];
  const leftMiddle = ["E", "D", "C"];
  const leftIndex = ["R", "T", "F", "G", "V", "B"];
  const rightIndex = ["Y", "U", "H", "J", "N", "M"];
  const rightMiddle = ["I", "K"];
  const rightRing = ["O", "L"];
  const rightPinky = ["P"];

  if (leftPinky.includes(key)) return { finger: "left_pinky", color: "bg-red-500" };
  if (leftRing.includes(key)) return { finger: "left_ring", color: "bg-orange-500" };
  if (leftMiddle.includes(key)) return { finger: "left_middle", color: "bg-amber-500" };
  if (leftIndex.includes(key)) return { finger: "left_index", color: "bg-yellow-500" };
  if (rightIndex.includes(key)) return { finger: "right_index", color: "bg-lime-500" };
  if (rightMiddle.includes(key)) return { finger: "right_middle", color: "bg-green-500" };
  if (rightRing.includes(key)) return { finger: "right_ring", color: "bg-cyan-500" };
  if (rightPinky.includes(key)) return { finger: "right_pinky", color: "bg-blue-500" };
  
  return { finger: "unknown", color: "bg-slate-300" };
};

export function FingerLibrary() {
  const [selectedFinger, setSelectedFinger] = useState<string | null>(null);

  const selectedFingerData = fingerData.find(f => f.code === selectedFinger);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Hand className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-slate-800">Finger Library</h1>
        </div>
        <p className="text-slate-500">Visual keyboard mapping and finger training analytics</p>
      </div>

      {/* Keyboard Visualization */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Interactive Keyboard Map</h2>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">Click on a key to view finger details</span>
          </div>
        </div>

        {/* Keyboard */}
        <div className="flex flex-col items-center gap-2 py-8">
          {keyboardLayout.map((row) => (
            <div key={row.row} className="flex gap-2" style={{ paddingLeft: row.row === 2 ? '20px' : row.row === 3 ? '40px' : '0' }}>
              {row.keys.map((key) => {
                const fingerInfo = getFingerForKey(key);
                const isSelected = selectedFinger === fingerInfo.finger;
                
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedFinger(fingerInfo.finger)}
                    className={`w-12 h-12 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all ${
                      fingerInfo.color
                    } ${isSelected ? 'ring-4 ring-blue-300 scale-110' : ''}`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Color Legend */}
        <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm text-slate-600">Left Pinky</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span className="text-sm text-slate-600">Left Ring</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500"></div>
            <span className="text-sm text-slate-600">Left Middle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500"></div>
            <span className="text-sm text-slate-600">Left Index</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-lime-500"></div>
            <span className="text-sm text-slate-600">Right Index</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-slate-600">Right Middle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cyan-500"></div>
            <span className="text-sm text-slate-600">Right Ring</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-sm text-slate-600">Right Pinky</span>
          </div>
        </div>
      </div>

      {/* Selected Finger Details */}
      {selectedFingerData && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm border border-blue-100 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {selectedFingerData.name} Details
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-slate-500">Available Drills</p>
              </div>
              <p className="text-2xl font-bold text-slate-800">{selectedFingerData.drills}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-emerald-500" />
                <p className="text-sm text-slate-500">Avg Accuracy</p>
              </div>
              <p className="text-2xl font-bold text-slate-800">{selectedFingerData.accuracy}%</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <p className="text-sm text-slate-500">Improvement</p>
              </div>
              <p className="text-2xl font-bold text-emerald-600">+{selectedFingerData.improvement}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Finger Statistics Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Finger Performance Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Finger</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Code</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Available Drills</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Avg Accuracy</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Improvement</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Performance</th>
              </tr>
            </thead>
            <tbody>
              {fingerData.map((finger, index) => (
                <tr
                  key={finger.id}
                  onClick={() => setSelectedFinger(finger.code)}
                  className={`border-b border-slate-100 last:border-0 hover:bg-blue-50 transition-colors cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  } ${selectedFinger === finger.code ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{finger.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{finger.code}</td>
                  <td className="px-6 py-4 text-sm text-slate-800">{finger.drills}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      finger.accuracy >= 95 ? "text-emerald-600" : 
                      finger.accuracy >= 90 ? "text-blue-600" : 
                      "text-amber-600"
                    }`}>
                      {finger.accuracy}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-emerald-600">+{finger.improvement}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${
                            finger.accuracy >= 95 ? "bg-emerald-500" : 
                            finger.accuracy >= 90 ? "bg-blue-500" : 
                            "bg-amber-500"
                          }`}
                          style={{ width: `${finger.accuracy}%` }}
                        ></div>
                      </div>
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
