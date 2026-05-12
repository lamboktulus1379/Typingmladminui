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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Activity, Search, Download } from "lucide-react";
import { useState } from "react";

interface SessionData {
  sesi: string;
  wpm: number;
  flightTime: number;
  dwellTime: number;
  errorRate: number;
  prediksiAI: string;
  ddaPhase: string;
  expModifier: string;
  statusLevel: string;
  isRehabilitation?: boolean;
  isLevelUp?: boolean;
}

const sessionData: SessionData[] = [
  {
    sesi: "Sesi #001",
    wpm: 45,
    flightTime: 320,
    dwellTime: 180,
    errorRate: 12.5,
    prediksiAI: "Jari Manis Kiri",
    ddaPhase: "Baseline",
    expModifier: "+0%",
    statusLevel: "Level 2",
  },
  {
    sesi: "Sesi #002",
    wpm: 42,
    flightTime: 380,
    dwellTime: 210,
    errorRate: 18.3,
    prediksiAI: "Kelingking Kanan",
    ddaPhase: "Decline Detected",
    expModifier: "+0%",
    statusLevel: "Level 2",
  },
  {
    sesi: "Sesi #003",
    wpm: 38,
    flightTime: 420,
    dwellTime: 245,
    errorRate: 22.7,
    prediksiAI: "Jari Tengah Kiri",
    ddaPhase: "Rehabilitation",
    expModifier: "+25%",
    statusLevel: "Level 2",
    isRehabilitation: true,
  },
  {
    sesi: "Sesi #004",
    wpm: 52,
    flightTime: 280,
    dwellTime: 165,
    errorRate: 8.2,
    prediksiAI: "Jari Telunjuk Kanan",
    ddaPhase: "Recovery",
    expModifier: "+50%",
    statusLevel: "Level 4 (Up!)",
    isLevelUp: true,
  },
];

export function BiometricSessionHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("demo_student_01");
  const [phaseFilter, setPhaseFilter] = useState("all");

  const handleExport = () => {
    console.log("Exporting CSV...");
  };

  return (
    <div className="w-full">
      <Card className="bg-[#1A1A1A] border-[#2A2A2A] shadow-2xl">
        <CardHeader className="border-b border-[#2A2A2A] pb-6">
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#DEFF9A]/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#DEFF9A]" strokeWidth={2.5} />
            </div>
            Log Hasil Pengujian Integrasi (Real-time)
          </CardTitle>
          <p className="text-sm text-gray-400 mt-2 ml-[52px]">
            Biometric Session History & AI Prediction Analytics
          </p>

          {/* Control Bar */}
          <div className="mt-6 ml-[52px] grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            {/* Search Input */}
            <div className="lg:col-span-4">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block font-semibold">
                Search Sessions
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search User ID or Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#101010] border-[#2A2A2A] text-white placeholder:text-gray-600 focus:border-[#DEFF9A] focus:ring-[#DEFF9A]/20 h-11"
                />
              </div>
            </div>

            {/* User Select */}
            <div className="lg:col-span-3">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block font-semibold">
                Select User
              </label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="bg-[#101010] border-[#2A2A2A] text-white focus:border-[#DEFF9A] focus:ring-[#DEFF9A]/20 h-11">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectItem
                    value="demo_student_01"
                    className="text-white focus:bg-[#DEFF9A]/10 focus:text-white"
                  >
                    User: Demo_Student_01
                  </SelectItem>
                  <SelectItem
                    value="demo_student_02"
                    className="text-white focus:bg-[#DEFF9A]/10 focus:text-white"
                  >
                    User: Demo_Student_02
                  </SelectItem>
                  <SelectItem
                    value="demo_student_03"
                    className="text-white focus:bg-[#DEFF9A]/10 focus:text-white"
                  >
                    User: Demo_Student_03
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phase Filter */}
            <div className="lg:col-span-3">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block font-semibold">
                Phase Filter
              </label>
              <Select value={phaseFilter} onValueChange={setPhaseFilter}>
                <SelectTrigger className="bg-[#101010] border-[#2A2A2A] text-white focus:border-[#DEFF9A] focus:ring-[#DEFF9A]/20 h-11">
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectItem
                    value="all"
                    className="text-white focus:bg-[#DEFF9A]/10 focus:text-white"
                  >
                    All Phases
                  </SelectItem>
                  <SelectItem
                    value="baseline"
                    className="text-white focus:bg-[#DEFF9A]/10 focus:text-white"
                  >
                    Baseline
                  </SelectItem>
                  <SelectItem
                    value="decline"
                    className="text-white focus:bg-[#DEFF9A]/10 focus:text-white"
                  >
                    Decline Detected
                  </SelectItem>
                  <SelectItem
                    value="rehabilitation"
                    className="text-white focus:bg-[#DEFF9A]/10 focus:text-white"
                  >
                    Rehabilitation
                  </SelectItem>
                  <SelectItem
                    value="recovery"
                    className="text-white focus:bg-[#DEFF9A]/10 focus:text-white"
                  >
                    Recovery
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Button */}
            <div className="lg:col-span-2">
              <Button
                onClick={handleExport}
                className="w-full bg-[#DEFF9A] hover:bg-[#DEFF9A]/90 text-[#101010] font-bold h-11 shadow-lg shadow-[#DEFF9A]/20 transition-all hover:shadow-[#DEFF9A]/40"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#101010] hover:bg-[#101010] border-b-2 border-[#DEFF9A]/20">
                  <TableHead className="text-[#DEFF9A] font-bold text-sm uppercase tracking-wider py-5 px-6">
                    Sesi
                  </TableHead>
                  <TableHead className="text-[#DEFF9A] font-bold text-sm uppercase tracking-wider py-5 px-6 text-right">
                    WPM
                  </TableHead>
                  <TableHead className="text-[#DEFF9A] font-bold text-sm uppercase tracking-wider py-5 px-6 text-right">
                    Flight Time (ms)
                  </TableHead>
                  <TableHead className="text-[#DEFF9A] font-bold text-sm uppercase tracking-wider py-5 px-6 text-right">
                    Dwell Time (ms)
                  </TableHead>
                  <TableHead className="text-[#DEFF9A] font-bold text-sm uppercase tracking-wider py-5 px-6 text-right">
                    Error Rate (%)
                  </TableHead>
                  <TableHead className="text-[#DEFF9A] font-bold text-sm uppercase tracking-wider py-5 px-6">
                    Prediksi AI
                  </TableHead>
                  <TableHead className="text-[#DEFF9A] font-bold text-sm uppercase tracking-wider py-5 px-6">
                    DDA Phase
                  </TableHead>
                  <TableHead className="text-[#DEFF9A] font-bold text-sm uppercase tracking-wider py-5 px-6 text-right">
                    EXP (Modifier)
                  </TableHead>
                  <TableHead className="text-[#DEFF9A] font-bold text-sm uppercase tracking-wider py-5 px-6">
                    Status Level
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessionData.map((session, index) => (
                  <TableRow
                    key={session.sesi}
                    className={`
                      ${
                        session.isRehabilitation
                          ? "bg-[#DEFF9A]/10 border-l-4 border-l-[#DEFF9A] hover:bg-[#DEFF9A]/[0.15]"
                          : "bg-[#1A1A1A] hover:bg-[#222222]"
                      }
                      ${index !== sessionData.length - 1 ? "border-b border-[#2A2A2A]" : ""}
                      transition-all duration-200
                    `}
                  >
                    <TableCell className="py-5 px-6 font-mono text-white font-medium">
                      {session.sesi}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right text-white font-semibold text-base">
                      {session.wpm}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right text-gray-300 font-medium">
                      {session.flightTime}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right text-gray-300 font-medium">
                      {session.dwellTime}
                    </TableCell>
                    <TableCell
                      className={`py-5 px-6 text-right font-semibold ${
                        session.errorRate > 20
                          ? "text-red-400"
                          : session.errorRate > 15
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {session.errorRate.toFixed(1)}%
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Badge className="bg-[#2A2A2A] text-gray-200 border-[#3A3A3A] hover:bg-[#333333] px-3 py-1.5 text-xs font-medium rounded-full">
                        {session.prediksiAI}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`py-5 px-6 font-semibold ${
                        session.ddaPhase === "Rehabilitation"
                          ? "text-[#DEFF9A]"
                          : session.ddaPhase === "Recovery"
                          ? "text-emerald-400"
                          : session.ddaPhase === "Decline Detected"
                          ? "text-amber-400"
                          : "text-gray-300"
                      }`}
                    >
                      {session.ddaPhase}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right font-mono font-semibold text-white">
                      {session.expModifier}
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      {session.isLevelUp ? (
                        <span className="font-bold text-[#DEFF9A] text-base drop-shadow-[0_0_8px_rgba(222,255,154,0.6)] animate-pulse">
                          {session.statusLevel}
                        </span>
                      ) : (
                        <span className="text-gray-300 font-medium">
                          {session.statusLevel}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
