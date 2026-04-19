import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Brain,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

interface FeatureData {
  name: string;
  importance: number;
}

const MetricCard = ({ title, value, trend, trendValue }: MetricCardProps) => {
  const getTrendIcon = () => {
    if (trend === "up")
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === "down")
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-500";
  };

  return (
    <Card className="border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {trendValue}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function MLOpsDashboard() {
  const [selectedUser, setSelectedUser] = useState<string>("admin@test.com");

  // Mock function to check if user has personalized model
  const hasPersonalizedModel = (userEmail: string): boolean => {
    const usersWithModels = ["ahmad.hidayat@test.com"];
    return usersWithModels.includes(userEmail);
  };

  const isPersonalized = hasPersonalizedModel(selectedUser);

  // Mock metrics data
  const metrics = {
    f1Score: { value: "88.5%", trend: "up" as const, trendValue: "+2.3%" },
    precision: { value: "91.2%", trend: "up" as const, trendValue: "+1.8%" },
    recall: { value: "85.9%", trend: "down" as const, trendValue: "-0.5%" },
  };

  // Mock feature importance data
  const topFeatures: FeatureData[] = [
    { name: "Flight Time (Left Pinky)", importance: 34 },
    { name: "Dwell Time (Index Finger)", importance: 28 },
    { name: "WPM Variance", importance: 18 },
    { name: "Error Rate Pattern", importance: 12 },
    { name: "Session Duration", importance: 8 },
  ];

  const maxImportance = Math.max(...topFeatures.map((f) => f.importance));

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER & CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              MLOps Evaluation Report
            </h1>
            <p className="text-slate-600 mt-1">
              Real-time model performance metrics and insights
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="subject-select"
              className="text-sm font-medium text-slate-700 whitespace-nowrap"
            >
              Select Subject:
            </label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger
                id="subject-select"
                className="w-64 bg-white border-slate-300"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin@test.com">admin@test.com</SelectItem>
                <SelectItem value="user1@example.com">
                  user1@example.com
                </SelectItem>
                <SelectItem value="ahmad.hidayat@test.com">
                  ahmad.hidayat@test.com
                </SelectItem>
                <SelectItem value="siti.nurhaliza@test.com">
                  siti.nurhaliza@test.com
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* DYNAMIC STATUS AREA */}
        <div className="space-y-3">
          {/* Status Badge */}
          {!isPersonalized ? (
            <div>
              <Badge className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-4 py-2 text-sm font-semibold">
                <AlertTriangle className="w-4 h-4 mr-2" />
                ⚠️ Fallback: Global Baseline Used
              </Badge>
            </div>
          ) : (
            <div>
              <Badge className="bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border border-indigo-300 px-4 py-2 text-sm font-semibold">
                <Brain className="w-4 h-4 mr-2" />
                ✓ Personalized Model Active
              </Badge>
            </div>
          )}

          {/* Alert Banner - Only shows in fallback state */}
          {!isPersonalized && (
            <Alert className="bg-amber-50 border-2 border-amber-300">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertDescription className="ml-2 text-base text-amber-900">
                <span className="font-semibold">
                  Insufficient telemetry data for {selectedUser}.
                </span>{" "}
                The system is temporarily displaying the Global Baseline model.
                Collect more data to unlock personalized AI.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* CORE METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="F1-Score"
            value={metrics.f1Score.value}
            trend={metrics.f1Score.trend}
            trendValue={metrics.f1Score.trendValue}
          />
          <MetricCard
            title="Precision"
            value={metrics.precision.value}
            trend={metrics.precision.trend}
            trendValue={metrics.precision.trendValue}
          />
          <MetricCard
            title="Recall"
            value={metrics.recall.value}
            trend={metrics.recall.trend}
            trendValue={metrics.recall.trendValue}
          />
        </div>

        {/* CHARTS & INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Bar Chart (2/3 width) */}
          <Card className="lg:col-span-2 border-slate-200">
            <CardHeader className="border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <CardTitle className="text-lg">
                  Top Predictive Features
                </CardTitle>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Feature importance ranked by contribution to model predictions
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {topFeatures.map((feature, index) => (
                  <div key={feature.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700">
                          {index + 1}.
                        </span>
                        <span className="text-sm font-medium text-slate-900">
                          {feature.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-indigo-600">
                        {feature.importance}%
                      </span>
                    </div>
                    <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${(feature.importance / maxImportance) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Insights & Anomalies (1/3 width) */}
          <Card className="border-slate-200">
            <CardHeader className="border-b border-slate-200 bg-slate-50">
              <CardTitle className="text-lg">Insights & Anomalies</CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Key findings from model analysis
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Insight 1 */}
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                  <h4 className="text-sm font-semibold text-rose-900 mb-2">
                    Primary Misclassification
                  </h4>
                  <p className="text-sm text-rose-800 leading-relaxed">
                    The model frequently confuses{" "}
                    <span className="font-semibold">
                      Left Ring finger as Left Pinky
                    </span>{" "}
                    (12% error rate). This accounts for 68% of all
                    misclassifications.
                  </p>
                </div>

                {/* Insight 2 */}
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <h4 className="text-sm font-semibold text-indigo-900 mb-2">
                    Strongest Pattern
                  </h4>
                  <p className="text-sm text-indigo-800 leading-relaxed">
                    Flight time from Left Pinky shows the highest predictive
                    power (34% importance), indicating strong behavioral
                    consistency in this metric.
                  </p>
                </div>

                {/* Insight 3 */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="text-sm font-semibold text-amber-900 mb-2">
                    Data Quality Note
                  </h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {!isPersonalized
                      ? "Global baseline uses 1,500+ aggregated sessions. Personalized model requires minimum 50 user sessions."
                      : "Model trained on 127 user sessions. Confidence improves with additional data collection."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information Footer */}
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Model Type
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {isPersonalized ? "XGBoost (Personalized)" : "XGBoost (Global Baseline)"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Last Updated
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  2 hours ago
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Training Samples
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {isPersonalized ? "127 sessions" : "1,542 sessions"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Model Version
                </p>
                <p className="text-sm font-semibold text-slate-900">v2.3.1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
