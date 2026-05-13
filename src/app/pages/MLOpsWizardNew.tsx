import { useState, useEffect, useRef, useMemo } from "react";
import Plot from "react-plotly.js";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
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
  Database,
  Filter,
  BrainCircuit,
  Activity,
  Check,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  ShieldCheck,
  Sparkles,
  FileSpreadsheet,
  Trophy,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

const stepDefinitions = [
  { number: 1 as Step, label: "Data Ingestion", Icon: Database },
  { number: 2 as Step, label: "EDA & Preprocessing", Icon: Filter },
  { number: 3 as Step, label: "Model Training", Icon: BrainCircuit },
  { number: 4 as Step, label: "Evaluation & Registry", Icon: Activity },
];

const userEmails = [
  "admin@test.com",
  "ahmad.hidayat@test.com",
  "siti.nurhaliza@test.com",
  "budi.santoso@test.com",
  "rina.wijaya@test.com",
];

type PreviewRow = {
  id: string;
  targetUser: string;
  dwellTime: number;
  flightTime: number;
  isOutlier: boolean;
};

const buildPreviewRows = (source: "synthetic" | "sql", user: string): PreviewRow[] => {
  if (source === "synthetic") {
    return [
      { id: "syn-0001", targetUser: "synthetic_subject_a", dwellTime: 118, flightTime: 125, isOutlier: false },
      { id: "syn-0002", targetUser: "synthetic_subject_a", dwellTime: 122, flightTime: 131, isOutlier: false },
      { id: "syn-0003", targetUser: "synthetic_subject_b", dwellTime: 105, flightTime: 268, isOutlier: true },
      { id: "syn-0004", targetUser: "synthetic_subject_b", dwellTime: 129, flightTime: 137, isOutlier: false },
      { id: "syn-0005", targetUser: "synthetic_subject_c", dwellTime: 142, flightTime: 290, isOutlier: true },
    ];
  }
  return [
    { id: "sql-1041", targetUser: user, dwellTime: 112, flightTime: 119, isOutlier: false },
    { id: "sql-1042", targetUser: user, dwellTime: 121, flightTime: 128, isOutlier: false },
    { id: "sql-1043", targetUser: user, dwellTime: 134, flightTime: 142, isOutlier: false },
    { id: "sql-1044", targetUser: user, dwellTime: 108, flightTime: 215, isOutlier: true },
    { id: "sql-1045", targetUser: user, dwellTime: 127, flightTime: 133, isOutlier: false },
  ];
};

const mockBoxPlotData = {
  rawSamples: [
    98, 102, 105, 108, 110, 112, 113, 115, 116, 118, 119, 120, 121, 122, 123,
    124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 137, 139, 142,
    145, 148, 151, 155, 160,
  ],
  outliers: [42, 51, 58, 215, 240, 268, 290],
  q1: 115,
  median: 125,
  q3: 137,
  iqr: 22,
};

type AlgorithmKey = "logistic" | "rf" | "xgboost";

const algorithms: { key: AlgorithmKey; name: string; accuracy: number; f1: number; precision: number; recall: number }[] = [
  { key: "logistic", name: "Logistic Regression", accuracy: 0.78, f1: 0.74, precision: 0.72, recall: 0.76 },
  { key: "rf", name: "Random Forest", accuracy: 0.93, f1: 0.92, precision: 0.91, recall: 0.93 },
  { key: "xgboost", name: "XGBoost", accuracy: 0.96, f1: 0.95, precision: 0.94, recall: 0.96 },
];

export function MLOpsWizardNew() {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Step 1
  const [dataSource, setDataSource] = useState<"synthetic" | "sql">("synthetic");
  const [sessionCount, setSessionCount] = useState("500");
  const [injectOutliers, setInjectOutliers] = useState(true);
  const [sqlUser, setSqlUser] = useState<string>(userEmails[0]);
  const [ingestState, setIngestState] = useState<"idle" | "running" | "done">("idle");
  const [ingestProgress, setIngestProgress] = useState(0);
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([]);

  // Step 2
  const [edaState, setEdaState] = useState<"idle" | "running" | "done">("idle");

  // Step 3
  const [selectedAlgos, setSelectedAlgos] = useState<Record<AlgorithmKey, boolean>>({
    logistic: false,
    rf: true,
    xgboost: true,
  });
  const [trainState, setTrainState] = useState<"idle" | "running" | "done">("idle");
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const selectedAlgoList = useMemo(
    () => algorithms.filter((a) => selectedAlgos[a.key]),
    [selectedAlgos],
  );

  const championKey = useMemo(() => {
    if (selectedAlgoList.length === 0) return null;
    return selectedAlgoList.reduce((champ, curr) => (curr.f1 > champ.f1 ? curr : champ)).key;
  }, [selectedAlgoList]);

  // ----- Step 1 handlers -----
  const handleIngest = () => {
    setIngestState("running");
    setIngestProgress(0);
    setPreviewRows([]);
    const interval = setInterval(() => {
      setIngestProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPreviewRows(buildPreviewRows(dataSource, sqlUser));
          setIngestState("done");
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const resetIngest = () => {
    setIngestState("idle");
    setIngestProgress(0);
    setPreviewRows([]);
  };

  // ----- Step 2 -----
  const handleRunOutlierDetection = () => {
    setEdaState("running");
    setTimeout(() => setEdaState("done"), 1400);
  };

  // ----- Step 3 -----
  const toggleAlgo = (key: AlgorithmKey) =>
    setSelectedAlgos((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleTrain = () => {
    setTrainState("running");
    setVisibleLogs([]);
  };

  const trainingLogLines = useMemo(() => {
    const lines: string[] = [
      "[INFO] Fetching cleaned data from staging table...",
      "[INFO] Loaded 8,500 training samples / 1,500 validation samples",
      "[INFO] Feature engineering: dwell_time, flight_time, finger_pressure",
    ];
    selectedAlgoList.forEach((a) => {
      lines.push(`> Training ${a.name}...`);
      lines.push(`[INFO] ${a.name} fit complete — acc=${a.accuracy.toFixed(3)} f1=${a.f1.toFixed(3)}`);
    });
    lines.push("[SUCCESS] All selected models trained. Persisting artifacts to registry.");
    return lines;
  }, [selectedAlgoList]);

  useEffect(() => {
    if (trainState !== "running") return;
    const interval = setInterval(() => {
      setVisibleLogs((prev) => {
        if (prev.length >= trainingLogLines.length) {
          clearInterval(interval);
          setTimeout(() => setTrainState("done"), 500);
          return prev;
        }
        return [...prev, trainingLogLines[prev.length]];
      });
    }, 400);
    return () => clearInterval(interval);
  }, [trainState, trainingLogLines]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleLogs]);

  // ----- Navigation -----
  const canAdvance =
    (currentStep === 1 && ingestState === "done" && previewRows.length > 0) ||
    (currentStep === 2 && edaState === "done") ||
    (currentStep === 3 && trainState === "done");

  const handleNext = () => {
    if (!canAdvance) return;
    setCurrentStep((s) => (Math.min(s + 1, 4) as Step));
  };

  const handleReset = () => {
    setCurrentStep(1);
    resetIngest();
    setEdaState("idle");
    setTrainState("idle");
    setVisibleLogs([]);
  };

  const totalRaw = mockBoxPlotData.rawSamples.length + mockBoxPlotData.outliers.length;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            MLOps Data Engineering Pipeline
          </h1>
          <p className="text-slate-600">
            Ingest → Preprocess → Train → Register · Champion model promoted to real-time inference
          </p>
        </div>

        {/* Stepper */}
        <Card className="mb-6 border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {stepDefinitions.map((step, index) => {
                const isComplete = currentStep > step.number;
                const isActive = currentStep === step.number;
                const Icon = step.Icon;
                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isComplete
                            ? "bg-indigo-600 text-white"
                            : isActive
                            ? "bg-indigo-100 text-indigo-700 ring-4 ring-indigo-100"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isComplete ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <div className="mt-2 text-center w-32">
                        <p
                          className={`text-sm font-medium ${
                            isActive ? "text-indigo-700" : isComplete ? "text-slate-700" : "text-slate-400"
                          }`}
                        >
                          Step {step.number}
                        </p>
                        <p
                          className={`text-xs ${
                            isActive ? "text-indigo-600" : isComplete ? "text-slate-600" : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    </div>
                    {index < stepDefinitions.length - 1 && (
                      <div className="flex-1 h-1 mx-4 relative top-[-22px]">
                        <div
                          className={`h-full rounded transition-colors ${
                            isComplete ? "bg-indigo-600" : "bg-slate-200"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* ---------- STEP 1 ---------- */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Database className="w-5 h-5 text-indigo-600" />
                Data Ingestion
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Choose a data source and load typing telemetry into the staging table.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs
                value={dataSource}
                onValueChange={(v) => {
                  setDataSource(v as "synthetic" | "sql");
                  resetIngest();
                }}
              >
                <TabsList className="grid grid-cols-2 w-full max-w-md">
                  <TabsTrigger value="synthetic" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Generate Synthetic
                  </TabsTrigger>
                  <TabsTrigger value="sql" className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    Load from SQL
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Synthetic */}
                <TabsContent value="synthetic" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-slate-700 font-medium mb-2 block">
                        Number of Sessions to Generate
                      </label>
                      <Input
                        type="number"
                        placeholder="e.g., 500"
                        value={sessionCount}
                        onChange={(e) => setSessionCount(e.target.value)}
                        disabled={ingestState !== "idle"}
                        className="h-11"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div>
                        <label className="text-sm text-slate-700 font-medium block">
                          Inject Extreme Outliers
                        </label>
                        <p className="text-xs text-slate-500 mt-1">For IQR filter testing in Step 2</p>
                      </div>
                      <Switch
                        checked={injectOutliers}
                        onCheckedChange={setInjectOutliers}
                        disabled={ingestState !== "idle"}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={handleIngest}
                      disabled={ingestState !== "idle"}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {ingestState === "running" ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : ingestState === "done" ? (
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                      ) : (
                        <Sparkles className="w-4 h-4 mr-2" />
                      )}
                      {ingestState === "done" ? "Generated" : "Generate Synthetic Data"}
                    </Button>
                  </div>
                </TabsContent>

                {/* Tab 2: SQL */}
                <TabsContent value="sql" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-slate-700 font-medium mb-2 block">
                        Select User Email
                      </label>
                      <Select value={sqlUser} onValueChange={setSqlUser} disabled={ingestState !== "idle"}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Choose a user" />
                        </SelectTrigger>
                        <SelectContent>
                          {userEmails.map((email) => (
                            <SelectItem key={email} value={email}>
                              {email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
                      Pulls historical typing sessions for the selected user from{" "}
                      <span className="font-mono text-slate-800">TypingDb.sessions</span>.
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={handleIngest}
                      disabled={ingestState !== "idle"}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {ingestState === "running" ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : ingestState === "done" ? (
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                      ) : (
                        <Database className="w-4 h-4 mr-2" />
                      )}
                      {ingestState === "done" ? "Loaded" : "Load from SQL"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Progress */}
              {ingestState !== "idle" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 font-medium">
                      {ingestState === "done" ? "Ingestion complete" : "Loading rows into staging..."}
                    </span>
                    <span className="text-slate-500">{ingestProgress}%</span>
                  </div>
                  <Progress value={ingestProgress} className="h-2" />
                </div>
              )}

              {/* Data Preview */}
              {previewRows.length > 0 && (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">Data Preview</span>
                      <Badge variant="secondary" className="ml-1">
                        First 5 rows
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">staging.typing_telemetry</span>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-white">
                        <TableHead className="font-semibold">ID</TableHead>
                        <TableHead className="font-semibold">TargetUser</TableHead>
                        <TableHead className="font-semibold text-right">DwellTime (ms)</TableHead>
                        <TableHead className="font-semibold text-right">FlightTime (ms)</TableHead>
                        <TableHead className="font-semibold">IsOutlier</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewRows.map((row) => (
                        <TableRow key={row.id} className={row.isOutlier ? "bg-rose-50/60" : ""}>
                          <TableCell className="font-mono text-xs">{row.id}</TableCell>
                          <TableCell className="text-slate-700">{row.targetUser}</TableCell>
                          <TableCell className="text-right font-mono">{row.dwellTime}</TableCell>
                          <TableCell className="text-right font-mono">{row.flightTime}</TableCell>
                          <TableCell>
                            {row.isOutlier ? (
                              <Badge className="bg-rose-100 text-rose-700 border border-rose-200">true</Badge>
                            ) : (
                              <Badge variant="secondary">false</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleNext}
                  disabled={!canAdvance}
                  variant={canAdvance ? "default" : "secondary"}
                  className={canAdvance ? "bg-slate-900 hover:bg-slate-800 text-white" : ""}
                >
                  Next Step →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ---------- STEP 2 ---------- */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Filter className="w-5 h-5 text-indigo-600" />
                EDA & Preprocessing
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Run interquartile-range (IQR) outlier detection on the ingested telemetry distribution.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleRunOutlierDetection}
                  disabled={edaState !== "idle"}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {edaState === "running" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : edaState === "done" ? (
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                  ) : (
                    <Filter className="w-4 h-4 mr-2" />
                  )}
                  Run Outlier Detection (IQR)
                </Button>
                {edaState === "done" && (
                  <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">
                    Preprocessing complete
                  </Badge>
                )}
              </div>

              {edaState === "done" && (
                <Card className="border-indigo-200 bg-indigo-50/40">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-indigo-900">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      Data Quality Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Stat label="Total Rows" value={totalRaw.toLocaleString()} />
                      <Stat
                        label="Outliers Detected"
                        value={mockBoxPlotData.outliers.length.toString()}
                        accent="rose"
                      />
                      <Stat label="Q1" value={`${mockBoxPlotData.q1} ms`} />
                      <Stat label="Q3" value={`${mockBoxPlotData.q3} ms`} />
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                      <p className="text-sm font-medium text-slate-700 mb-2">
                        Dwell-Time Distribution (ms) — Box Plot with Outliers
                      </p>
                      <Plot
                        data={[
                          {
                            type: "box",
                            y: mockBoxPlotData.rawSamples,
                            name: "Distribution",
                            boxpoints: false,
                            marker: { color: "#6366f1" },
                            line: { color: "#4338ca" },
                            fillcolor: "rgba(99, 102, 241, 0.25)",
                          },
                          {
                            type: "scatter",
                            mode: "markers",
                            x: mockBoxPlotData.outliers.map(() => 0),
                            y: mockBoxPlotData.outliers,
                            name: "Outliers (IQR)",
                            marker: {
                              color: "#ef4444",
                              size: 10,
                              symbol: "x",
                              line: { color: "#b91c1c", width: 1 },
                            },
                          },
                        ] as never}
                        layout={{
                          autosize: true,
                          height: 360,
                          margin: { l: 50, r: 20, t: 20, b: 40 },
                          showlegend: true,
                          legend: { orientation: "h", y: -0.15 },
                          yaxis: { title: { text: "Dwell Time (ms)" }, zeroline: false, gridcolor: "#e2e8f0" },
                          xaxis: { showticklabels: false },
                          paper_bgcolor: "white",
                          plot_bgcolor: "white",
                        } as never}
                        config={{ displayModeBar: false, responsive: true }}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!canAdvance}
                  variant={canAdvance ? "default" : "secondary"}
                  className={canAdvance ? "bg-slate-900 hover:bg-slate-800 text-white" : ""}
                >
                  Next Step →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ---------- STEP 3 ---------- */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <BrainCircuit className="w-5 h-5 text-indigo-600" />
                Model Training
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Select algorithms to train against the cleaned dataset.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Stat label="Training Samples" value="8,500" accent="indigo" />
                <Stat label="Validation Samples" value="1,500" />
                <Stat label="Features" value="14" />
              </div>

              {/* Algorithm selection */}
              <div className="border border-slate-200 rounded-lg p-5 bg-white">
                <p className="text-sm font-semibold text-slate-800 mb-4">Algorithm Selection</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {algorithms.map((algo) => {
                    const checked = selectedAlgos[algo.key];
                    return (
                      <label
                        key={algo.key}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                          checked
                            ? "border-indigo-300 bg-indigo-50/60"
                            : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                        } ${trainState !== "idle" ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => trainState === "idle" && toggleAlgo(algo.key)}
                          disabled={trainState !== "idle"}
                        />
                        <span className="text-sm font-medium text-slate-800">{algo.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleTrain}
                  disabled={trainState !== "idle" || selectedAlgoList.length === 0}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {trainState === "running" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : trainState === "done" ? (
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                  ) : (
                    <BrainCircuit className="w-4 h-4 mr-2" />
                  )}
                  Train {selectedAlgoList.length} Model{selectedAlgoList.length !== 1 ? "s" : ""}
                </Button>
                {trainState === "done" && (
                  <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">
                    Training complete
                  </Badge>
                )}
              </div>

              {trainState !== "idle" && (
                <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-slate-400 mb-3 pb-2 border-b border-slate-800">
                    <Terminal className="w-4 h-4" />
                    <span>python-engine@trainer:~$</span>
                  </div>
                  <div className="space-y-1 max-h-72 overflow-y-auto">
                    {visibleLogs.map((line, i) => (
                      <div
                        key={i}
                        className={
                          line?.startsWith(">")
                            ? "text-emerald-400"
                            : line?.includes("[SUCCESS]")
                            ? "text-emerald-400"
                            : line?.includes("[INFO]")
                            ? "text-emerald-300/80"
                            : "text-slate-300"
                        }
                      >
                        {line}
                      </div>
                    ))}
                    {trainState === "running" && (
                      <div className="text-emerald-400 animate-pulse">▊</div>
                    )}
                    <div ref={logsEndRef} />
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!canAdvance}
                  variant={canAdvance ? "default" : "secondary"}
                  className={canAdvance ? "bg-slate-900 hover:bg-slate-800 text-white" : ""}
                >
                  Next Step →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ---------- STEP 4 ---------- */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-100/40">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900">
                    Champion model deployed for real-time inference.
                  </h3>
                  <p className="text-sm text-emerald-800/80 mt-1">
                    {algorithms.find((a) => a.key === championKey)?.name ?? "—"} promoted to the Model
                    Registry. Discarded candidates archived for audit.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Model Comparison
                </CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Validation metrics across the {selectedAlgoList.length} selected algorithm
                  {selectedAlgoList.length !== 1 ? "s" : ""}. Highest F1-score promoted.
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Algorithm</TableHead>
                      <TableHead className="font-semibold text-right">Accuracy</TableHead>
                      <TableHead className="font-semibold text-right">F1-Score</TableHead>
                      <TableHead className="font-semibold text-right">Precision</TableHead>
                      <TableHead className="font-semibold text-right">Recall</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedAlgoList.map((algo) => {
                      const isChampion = algo.key === championKey;
                      return (
                        <TableRow
                          key={algo.key}
                          className={
                            isChampion
                              ? "bg-emerald-50 border-l-4 border-emerald-500"
                              : "opacity-80"
                          }
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {isChampion && <Trophy className="w-4 h-4 text-amber-500" />}
                              {algo.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {(algo.accuracy * 100).toFixed(1)}%
                          </TableCell>
                          <TableCell
                            className={`text-right font-mono ${
                              isChampion ? "font-bold text-emerald-700" : ""
                            }`}
                          >
                            {(algo.f1 * 100).toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {(algo.precision * 100).toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {(algo.recall * 100).toFixed(1)}%
                          </TableCell>
                          <TableCell>
                            {isChampion ? (
                              <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">
                                <ShieldCheck className="w-3 h-3 mr-1" />
                                Deployed
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-slate-200 text-slate-600">
                                Discarded
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                <div className="flex justify-end gap-3 mt-6">
                  <Button onClick={handleReset} variant="outline">
                    Start New Pipeline
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "rose" | "emerald" | "indigo";
}) {
  const accentColor =
    accent === "rose"
      ? "text-rose-600"
      : accent === "emerald"
      ? "text-emerald-600"
      : accent === "indigo"
      ? "text-indigo-600"
      : "text-slate-900";
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${accentColor}`}>{value}</p>
    </div>
  );
}
