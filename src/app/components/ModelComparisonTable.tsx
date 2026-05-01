import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy } from "lucide-react";

interface ModelMetrics {
  algorithm: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  isChampion?: boolean;
}

const modelData: ModelMetrics[] = [
  {
    algorithm: "XGBoost",
    accuracy: 94.2,
    precision: 91.8,
    recall: 93.5,
    f1Score: 92.6,
    isChampion: true,
  },
  {
    algorithm: "Random Forest",
    accuracy: 91.7,
    precision: 88.3,
    recall: 90.1,
    f1Score: 89.2,
  },
  {
    algorithm: "Logistic Regression",
    accuracy: 85.4,
    precision: 82.1,
    recall: 84.7,
    f1Score: 83.4,
  },
];

export function ModelComparisonTable() {
  return (
    <div className="space-y-6">
      {/* Model Comparison Table */}
      <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" />
            Model Comparison & Validation Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-700/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-900/60 border-slate-700/50 hover:bg-slate-900/60">
                  <TableHead className="text-slate-300 font-semibold">
                    Algorithm
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold text-right">
                    Accuracy
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold text-right">
                    Macro Precision
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold text-right">
                    Macro Recall
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold text-right">
                    F1-Score
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modelData.map((model) => (
                  <TableRow
                    key={model.algorithm}
                    className={
                      model.isChampion
                        ? "bg-emerald-950/30 border-emerald-700/40 hover:bg-emerald-950/40 transition-all duration-300"
                        : "bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/40"
                    }
                  >
                    <TableCell className="font-medium text-slate-100">
                      <div className="flex items-center gap-3">
                        {model.algorithm}
                        {model.isChampion && (
                          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-400/50 shadow-lg shadow-emerald-500/30 animate-pulse">
                            <Trophy className="w-3 h-3 mr-1" />
                            Champion
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      className={
                        model.isChampion
                          ? "text-emerald-300 font-semibold text-right"
                          : "text-slate-100 text-right"
                      }
                    >
                      {model.accuracy.toFixed(1)}%
                    </TableCell>
                    <TableCell
                      className={
                        model.isChampion
                          ? "text-emerald-300 font-semibold text-right"
                          : "text-slate-100 text-right"
                      }
                    >
                      {model.precision.toFixed(1)}%
                    </TableCell>
                    <TableCell
                      className={
                        model.isChampion
                          ? "text-emerald-300 font-semibold text-right"
                          : "text-slate-100 text-right"
                      }
                    >
                      {model.recall.toFixed(1)}%
                    </TableCell>
                    <TableCell
                      className={
                        model.isChampion
                          ? "text-emerald-300 font-semibold text-right"
                          : "text-slate-100 text-right"
                      }
                    >
                      {model.f1Score.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart Placeholder */}
      <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-100">
            Multi-Metric Radar Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-lg border border-slate-700/50 flex items-center justify-center overflow-hidden">
            {/* Radar Chart Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                {/* Concentric circles */}
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="112.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="37.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                />
                {/* Axis lines */}
                <line
                  x1="200"
                  y1="50"
                  x2="200"
                  y2="350"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                />
                <line
                  x1="50"
                  y1="200"
                  x2="350"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                />
                <line
                  x1="93.93"
                  y1="93.93"
                  x2="306.07"
                  y2="306.07"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                />
                <line
                  x1="306.07"
                  y1="93.93"
                  x2="93.93"
                  y2="306.07"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                />
              </svg>
            </div>

            {/* Placeholder Content */}
            <div className="relative z-10 text-center space-y-4 p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/40 backdrop-blur-sm">
                <svg
                  className="w-10 h-10 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">
                  Radar Chart Visualization
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  Interactive radar chart comparing XGBoost, Random Forest, and
                  Logistic Regression across Accuracy, Precision, Recall, and
                  F1-Score metrics.
                </p>
                <p className="text-xs text-slate-500 mt-3">
                  Integrate using <code className="px-2 py-1 bg-slate-900/60 rounded text-indigo-400 font-mono">recharts</code> or <code className="px-2 py-1 bg-slate-900/60 rounded text-indigo-400 font-mono">react-chartjs-2</code>
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
                  <span className="text-xs text-slate-300 font-medium">
                    XGBoost
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                  <span className="text-xs text-slate-300 font-medium">
                    Random Forest
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                  <span className="text-xs text-slate-300 font-medium">
                    Logistic Regression
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
