import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Search,
  Filter,
  ChevronRight,
  TrendingUp,
  Activity,
} from "lucide-react";

// Mock data interfaces
interface ConfusionCell {
  actual: string;
  predicted: string;
  count: number;
  color: string;
}

interface Feature {
  name: string;
  importance: number;
  description: string;
}

interface Prediction {
  timestamp: string;
  status: "Fatigued" | "Normal";
}

interface Clue {
  type: "warning" | "success";
  message: string;
}

interface TelemetryRow {
  timestamp: string;
  key: string;
  finger: string;
  dwellTime: number;
  flightTime: number;
  predicted: string;
  actual: string;
}

export function XAIDashboard() {
  const [selectedUser, setSelectedUser] = useState("user_a@test.com");
  const [selectedPrediction, setSelectedPrediction] = useState("2023-11-20 14:35");
  const [timeRange, setTimeRange] = useState("last-7-days");

  // Mock confusion matrix data
  const confusionMatrix: ConfusionCell[] = [
    { actual: "Normal", predicted: "Normal", count: 150, color: "bg-indigo-900" },
    { actual: "Normal", predicted: "Fatigued", count: 15, color: "bg-amber-900/40" },
    { actual: "Fatigued", predicted: "Normal", count: 8, color: "bg-indigo-900/40" },
    { actual: "Fatigued", predicted: "Fatigued", count: 60, color: "bg-amber-900" },
  ];

  // Mock feature importance data
  const features: Feature[] = [
    { name: "Left Pinky Dwell Time", importance: 75, description: "Time finger stays pressed on keys like 'A', 'Q', 'Z'" },
    { name: "Spacebar Flight Time", importance: 60, description: "Time between releasing previous key and pressing spacebar" },
    { name: "Index Finger Dwell Time", importance: 55, description: "Dwell time for index fingers on home row" },
    { name: "Flight Time Space-Enter", importance: 52, description: "Transition speed between spacebar and enter key" },
    { name: "Ring Finger Flight Time", importance: 48, description: "Flight time for ring fingers between key presses" },
    { name: "Right Hand WPM Variance", importance: 40, description: "Variability in words-per-minute for right hand" },
    { name: "Shift Key Consistency", importance: 38, description: "Consistency of shift key press duration" },
    { name: "Middle Finger Dwell Time", importance: 35, description: "Dwell time for middle fingers" },
    { name: "Backspace Frequency", importance: 30, description: "Number of corrections per minute" },
    { name: "Error Rate Pattern", importance: 28, description: "Pattern of typing errors over time" },
    { name: "Left Hand Transitions", importance: 25, description: "Speed of key-to-key transitions on left hand" },
    { name: "Thumb Movement Speed", importance: 20, description: "Speed of thumb movement to spacebar" },
  ];

  // Mock predictions
  const predictions: Prediction[] = [
    { timestamp: "2023-11-20 14:35", status: "Fatigued" },
    { timestamp: "2023-11-20 14:30", status: "Normal" },
    { timestamp: "2023-11-20 14:25", status: "Normal" },
    { timestamp: "2023-11-20 14:20", status: "Fatigued" },
    { timestamp: "2023-11-20 14:15", status: "Normal" },
  ];

  // Mock local explanation clues
  const explanationClues: Clue[] = [
    { type: "warning", message: "Left Pinky Dwell Time increased on key 'A' by +120ms (40% slow down)." },
    { type: "warning", message: "Flight Time between 'Space' and 'Enter' was 350ms slower than user's baseline (50% slow down)." },
    { type: "warning", message: "Dwell Time on 'Shift' key was inconsistent across multiple occurrences." },
    { type: "success", message: "Right hand transitions remained relatively stable." },
  ];

  // Mock telemetry data
  const telemetryData: TelemetryRow[] = [
    { timestamp: "14:35:42.123", key: "A", finger: "Left Pinky", dwellTime: 180, flightTime: 95, predicted: "Fatigued", actual: "Fatigued" },
    { timestamp: "14:35:42.303", key: "Space", finger: "Right Thumb", dwellTime: 75, flightTime: 420, predicted: "Fatigued", actual: "Fatigued" },
    { timestamp: "14:35:42.798", key: "Enter", finger: "Right Pinky", dwellTime: 90, flightTime: 65, predicted: "Fatigued", actual: "Fatigued" },
    { timestamp: "14:35:43.012", key: "T", finger: "Left Index", dwellTime: 85, flightTime: 78, predicted: "Normal", actual: "Fatigued" },
    { timestamp: "14:35:43.175", key: "H", finger: "Right Index", dwellTime: 92, flightTime: 82, predicted: "Normal", actual: "Fatigued" },
    { timestamp: "14:35:43.340", key: "E", finger: "Left Middle", dwellTime: 88, flightTime: 75, predicted: "Normal", actual: "Fatigued" },
    { timestamp: "14:35:43.490", key: "Shift", finger: "Left Pinky", dwellTime: 165, flightTime: 125, predicted: "Fatigued", actual: "Fatigued" },
    { timestamp: "14:35:43.740", key: "Q", finger: "Left Pinky", dwellTime: 175, flightTime: 88, predicted: "Fatigued", actual: "Fatigued" },
    { timestamp: "14:35:43.915", key: "U", finger: "Right Index", dwellTime: 95, flightTime: 70, predicted: "Normal", actual: "Fatigued" },
    { timestamp: "14:35:44.065", key: "I", finger: "Right Middle", dwellTime: 90, flightTime: 68, predicted: "Normal", actual: "Fatigued" },
  ];

  const maxImportance = Math.max(...features.map(f => f.importance));

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Explainable AI (XAI) Deep Dive
          </h1>
          <p className="text-slate-400">
            Personalized Typing Fatigue Detection - Model Transparency & Analysis
          </p>
        </div>

        {/* HEADER & GLOBAL STATUS - 4 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left: Overall System Confidence Gauge */}
          <Card className="bg-slate-800 border-slate-700 col-span-1">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                  System Confidence
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    {/* Arc chart simulation */}
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(88 / 100) * 351.86} 351.86`}
                        className="text-indigo-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-slate-100">88%</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Badge className="bg-amber-900/50 text-amber-300 border-amber-700">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Fatigued
                  </Badge>
                  <p className="text-xs text-slate-500 mt-2">High confidence detection</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Middle Left: Feature Stability */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                  Average Feature Stability
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-indigo-400">8.5</span>
                  <span className="text-xl text-slate-400">/10</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                <p className="text-sm text-slate-400">Status: <span className="text-indigo-400 font-semibold">Stable</span></p>
              </div>
            </CardContent>
          </Card>

          {/* Middle Right: Personal vs Global Comparison */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                  Personal vs Global Baseline
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Accuracy</span>
                    <span className="text-sm font-semibold text-slate-200">+5.2%</span>
                  </div>
                  <div className="h-8 flex items-end gap-0.5">
                    {[65, 68, 70, 72, 71, 73, 75, 76, 74, 77].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-indigo-600 rounded-t"
                        style={{ height: `${(val / 80) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">F1-Score</span>
                    <span className="text-sm font-semibold text-slate-200">+3.8%</span>
                  </div>
                  <div className="h-8 flex items-end gap-0.5">
                    {[70, 72, 71, 74, 76, 75, 78, 79, 77, 80].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-indigo-600 rounded-t"
                        style={{ height: `${(val / 85) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: Controls */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">User</label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user_a@test.com">user_a@test.com</SelectItem>
                      <SelectItem value="user_b@test.com">user_b@test.com</SelectItem>
                      <SelectItem value="user_c@test.com">user_c@test.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Time Range</label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-24-hours">Last 24 Hours</SelectItem>
                      <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Refresh
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MIDDLE ROW: Confusion Matrix + Feature Importance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Confusion Matrix */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                Classification Accuracy (Confusion Matrix)
              </CardTitle>
              <p className="text-sm text-slate-400 mt-1">
                Actual vs. Predicted classification performance
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {/* Header row */}
                  <div className="text-center text-sm font-semibold text-slate-400"></div>
                  <div className="text-center text-sm font-semibold text-slate-300">
                    Predicted<br />Normal
                  </div>
                  <div className="text-center text-sm font-semibold text-slate-300">
                    Predicted<br />Fatigued
                  </div>

                  {/* Row 1: Actual Normal */}
                  <div className="text-sm font-semibold text-slate-300 flex items-center">
                    Actual Normal
                  </div>
                  <div className={`${confusionMatrix[0].color} p-6 rounded-lg border border-indigo-700 text-center`}>
                    <div className="text-3xl font-bold text-indigo-100">{confusionMatrix[0].count}</div>
                    <div className="text-xs text-indigo-300 mt-1">True Negative</div>
                  </div>
                  <div className={`${confusionMatrix[1].color} p-6 rounded-lg border border-amber-700 text-center`}>
                    <div className="text-3xl font-bold text-amber-100">{confusionMatrix[1].count}</div>
                    <div className="text-xs text-amber-300 mt-1">False Positive</div>
                  </div>

                  {/* Row 2: Actual Fatigued */}
                  <div className="text-sm font-semibold text-slate-300 flex items-center">
                    Actual Fatigued
                  </div>
                  <div className={`${confusionMatrix[2].color} p-6 rounded-lg border border-indigo-700 text-center`}>
                    <div className="text-3xl font-bold text-indigo-100">{confusionMatrix[2].count}</div>
                    <div className="text-xs text-indigo-300 mt-1">False Negative</div>
                  </div>
                  <div className={`${confusionMatrix[3].color} p-6 rounded-lg border border-amber-700 text-center`}>
                    <div className="text-3xl font-bold text-amber-100">{confusionMatrix[3].count}</div>
                    <div className="text-xs text-amber-300 mt-1">True Positive</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Overall Accuracy:</span>
                    <span className="font-semibold text-indigo-400">90.1%</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-slate-400">Precision (Fatigued):</span>
                    <span className="font-semibold text-amber-400">80.0%</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-slate-400">Recall (Fatigued):</span>
                    <span className="font-semibold text-amber-400">88.2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: Global Feature Importance */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Global Feature Importance
              </CardTitle>
              <p className="text-sm text-slate-400 mt-1">
                Top biomechanical typing features driving predictions
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {features.map((feature, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300 group-hover:text-indigo-400 transition-colors">
                        {feature.name}
                      </span>
                      <span className="text-sm font-bold text-indigo-400">{feature.importance}</span>
                    </div>
                    <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full transition-all duration-300 group-hover:from-indigo-500 group-hover:to-indigo-400"
                        style={{ width: `${(feature.importance / maxImportance) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 hidden group-hover:block">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-400 italic">
                  Overall, the model heavily relies on left pinky dwelling and spacebar transitions for this user.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BOTTOM ROW: Local Explanation + Raw Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Local Explanation */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-slate-100">Why was this prediction made?</CardTitle>
              <p className="text-sm text-slate-400 mt-1">
                Local explanation for specific prediction instance
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Select Prediction Instance</label>
                  <Select value={selectedPrediction} onValueChange={setSelectedPrediction}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {predictions.map((pred) => (
                        <SelectItem key={pred.timestamp} value={pred.timestamp}>
                          {pred.timestamp} - {pred.status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 mt-6">
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                    Biomechanical Clues
                  </h4>
                  {explanationClues.map((clue, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        clue.type === "warning"
                          ? "bg-amber-900/20 border-amber-700/50"
                          : "bg-green-900/20 border-green-700/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {clue.type === "warning" ? (
                          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm ${
                            clue.type === "warning" ? "text-amber-100" : "text-green-100"
                          }`}>
                            {clue.message}
                          </p>
                          <button className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 flex items-center gap-1">
                            Drill down to data snippet
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: Raw Telemetry Explorer */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-slate-100">Raw Telemetry Explorer</CardTitle>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                >
                  <Search className="w-3 h-3 mr-1" />
                  Search
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                >
                  <Filter className="w-3 h-3 mr-1" />
                  Filter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-900/50 border-b border-slate-700 hover:bg-slate-900/50">
                      <TableHead className="text-slate-300 font-semibold">Timestamp</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Key</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Finger</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Dwell (ms)</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Flight (ms)</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Predicted</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Actual</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {telemetryData.map((row, index) => (
                      <TableRow
                        key={index}
                        className={`border-b border-slate-700 ${
                          row.dwellTime > 150 || row.flightTime > 400
                            ? "bg-amber-900/20"
                            : "hover:bg-slate-700/50"
                        }`}
                      >
                        <TableCell className="text-slate-400 text-xs font-mono">
                          {row.timestamp}
                        </TableCell>
                        <TableCell className="text-slate-200 font-semibold">
                          {row.key}
                        </TableCell>
                        <TableCell className="text-slate-300 text-sm">
                          {row.finger}
                        </TableCell>
                        <TableCell
                          className={`text-sm font-mono ${
                            row.dwellTime > 150 ? "text-amber-400 font-bold" : "text-slate-300"
                          }`}
                        >
                          {row.dwellTime}
                        </TableCell>
                        <TableCell
                          className={`text-sm font-mono ${
                            row.flightTime > 400 ? "text-amber-400 font-bold" : "text-slate-300"
                          }`}
                        >
                          {row.flightTime}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              row.predicted === "Fatigued"
                                ? "border-amber-600 text-amber-300 bg-amber-900/30"
                                : "border-indigo-600 text-indigo-300 bg-indigo-900/30"
                            }
                          >
                            {row.predicted}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              row.actual === "Fatigued"
                                ? "border-amber-600 text-amber-300 bg-amber-900/30"
                                : "border-indigo-600 text-indigo-300 bg-indigo-900/30"
                            }
                          >
                            {row.actual}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="p-4 border-t border-slate-700 flex justify-between items-center bg-slate-900/50">
                <span className="text-sm text-slate-400">
                  Showing 10 of 1,247 rows
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-slate-200"
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-slate-200"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
