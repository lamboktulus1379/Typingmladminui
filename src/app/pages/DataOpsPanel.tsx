import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Database, Download, Terminal, Activity } from "lucide-react";
import { useState } from "react";

export function DataOpsPanel() {
  const [sessionCount, setSessionCount] = useState("");
  const [injectOutliers, setInjectOutliers] = useState(false);

  const logs = [
    { time: "14:02:00", message: "Success: 50 rows ingested to TypingDb_Test", status: "success" },
    { time: "12:15:00", message: "Snapshot exported to production_telemetry.csv", status: "success" },
    { time: "10:47:32", message: "Warning: 3 outliers detected in Flight Time distribution", status: "warning" },
  ];

  return (
    <div className="min-h-screen bg-[#101010] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#DEFF9A]/10 flex items-center justify-center">
                <Database className="w-6 h-6 text-[#DEFF9A]" strokeWidth={2} />
              </div>
              DataOps Control Panel
            </h1>
            <Badge className="bg-emerald-950/50 text-emerald-400 border-emerald-500/50 px-4 py-2 text-sm font-semibold shadow-lg shadow-emerald-500/20">
              <Activity className="w-4 h-4 mr-2 animate-pulse" />
              Environment: Production
            </Badge>
          </div>
          <p className="text-gray-400 text-sm ml-[52px]">
            Manage synthetic data generation and production telemetry export workflows
          </p>
        </div>

        {/* Main Control Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Panel: Synthetic Data Generator */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] shadow-2xl">
            <CardHeader className="border-b border-[#2A2A2A]">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-gray-400" />
                Synthetic Data Generator
              </CardTitle>
              <p className="text-sm text-gray-400 mt-2">
                Trigger Python ML Engine to generate Gaussian-distributed typing telemetry.
              </p>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Input Field */}
              <div>
                <label className="text-sm text-gray-300 font-medium mb-2 block">
                  Number of Sessions to Generate
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  value={sessionCount}
                  onChange={(e) => setSessionCount(e.target.value)}
                  className="bg-[#101010] border-[#2A2A2A] text-white placeholder:text-gray-600 focus:border-[#DEFF9A] focus:ring-[#DEFF9A]/20 h-11"
                />
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center justify-between p-4 bg-[#101010] rounded-lg border border-[#2A2A2A]">
                <div>
                  <label className="text-sm text-gray-300 font-medium block">
                    Inject Extreme Outliers
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    For IQR Filter Testing
                  </p>
                </div>
                <button
                  onClick={() => setInjectOutliers(!injectOutliers)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    injectOutliers ? "bg-[#DEFF9A]" : "bg-[#2A2A2A]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      injectOutliers ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Generate Button (Disabled) */}
              <Button
                disabled
                className="w-full bg-[#2A2A2A] text-gray-500 font-semibold h-11 cursor-not-allowed opacity-50"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Generate Synthetic Data
              </Button>
              <p className="text-xs text-amber-400/80 text-center">
                ⚠️ Disabled in Production environment
              </p>
            </CardContent>
          </Card>

          {/* Right Panel: Production Data & SQL Export */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] shadow-2xl">
            <CardHeader className="border-b border-[#2A2A2A]">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-[#DEFF9A]" />
                Production Data & SQL Export
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Total Records Stat */}
              <div className="p-6 bg-gradient-to-br from-[#DEFF9A]/5 to-[#DEFF9A]/10 rounded-lg border border-[#DEFF9A]/20">
                <p className="text-sm text-gray-400 mb-1 font-medium">
                  Total Telemetry Records
                </p>
                <p className="text-5xl font-bold text-[#DEFF9A] tracking-tight">
                  12,450
                </p>
              </div>

              {/* Primary Export Button */}
              <Button className="w-full bg-[#DEFF9A] hover:bg-[#DEFF9A]/90 text-[#101010] font-bold h-12 shadow-lg shadow-[#DEFF9A]/30 transition-all hover:shadow-[#DEFF9A]/50">
                <Download className="w-5 h-5 mr-2" />
                Export SQL to CSV (Snapshot)
              </Button>

              {/* Secondary Sync Button */}
              <Button className="w-full bg-[#2A2A2A] hover:bg-[#333333] text-white font-semibold h-11 border border-[#3A3A3A]">
                <Database className="w-4 h-4 mr-2" />
                Sync Dataset to Jupyter Workspace
              </Button>

              {/* Helper Text */}
              <p className="text-xs text-gray-500 text-center px-4 leading-relaxed">
                Generates a flat CSV file for Chapter 4 offline thesis validation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Pipeline Logs */}
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] shadow-2xl">
          <CardHeader className="border-b border-[#2A2A2A]">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-gray-400" />
              Data Pipeline Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="bg-[#101010] rounded-lg border border-[#2A2A2A] p-4 font-mono text-sm">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`py-2 ${
                    index !== logs.length - 1 ? "border-b border-[#1A1A1A]" : ""
                  }`}
                >
                  <span className="text-gray-500">[{log.time}]</span>{" "}
                  <span
                    className={
                      log.status === "success"
                        ? "text-emerald-400"
                        : log.status === "warning"
                        ? "text-amber-400"
                        : "text-gray-300"
                    }
                  >
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Real-time activity feed • Auto-refresh enabled
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
              >
                View Full Logs →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
