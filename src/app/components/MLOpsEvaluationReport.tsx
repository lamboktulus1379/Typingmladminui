import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Trophy } from "lucide-react";

interface AlgorithmResult {
  algorithm: string;
  f1Score: string;
  accuracy: string;
  trainingLatency: string;
  isWinner?: boolean;
}

interface MLOpsEvaluationReportProps {
  trainedDate?: string;
  totalRows?: number;
  productionModel?: string;
  results?: AlgorithmResult[];
  onDeploy?: () => void;
}

const defaultResults: AlgorithmResult[] = [
  {
    algorithm: "XGBoost",
    f1Score: "94.2%",
    accuracy: "93.8%",
    trainingLatency: "450ms",
    isWinner: true,
  },
  {
    algorithm: "Random Forest",
    f1Score: "89.5%",
    accuracy: "90.1%",
    trainingLatency: "620ms",
  },
  {
    algorithm: "Logistic Regression",
    f1Score: "82.1%",
    accuracy: "81.0%",
    trainingLatency: "120ms",
  },
];

export function MLOpsEvaluationReport({
  trainedDate = "Oct 24, 2026",
  totalRows = 200,
  productionModel = "XGBoost",
  results = defaultResults,
  onDeploy,
}: MLOpsEvaluationReportProps) {
  const handleDeploy = () => {
    if (onDeploy) {
      onDeploy();
    } else {
      console.log("Deploying model to production...");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header Section - Summary Card */}
      <Card className="border-2 border-gray-200 shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Training Session Results
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Trained On:</span> {trainedDate}{" "}
                <span className="mx-2">|</span>
                <span className="font-medium">Total Rows:</span> {totalRows}
              </p>
            </div>
            <Badge className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 text-base font-bold shadow-md">
              <Trophy className="w-5 h-5 mr-2" />
              Production Model: {productionModel}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Middle Section - The Leaderboard Data Grid */}
      <Card className="border-2 border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50 border-b-2 border-gray-200">
                <TableHead className="font-bold text-gray-900 text-base py-5 px-8">
                  Algorithm
                </TableHead>
                <TableHead className="font-bold text-gray-900 text-base py-5 px-6">
                  F1-Score
                </TableHead>
                <TableHead className="font-bold text-gray-900 text-base py-5 px-6">
                  Accuracy
                </TableHead>
                <TableHead className="font-bold text-gray-900 text-base py-5 px-6">
                  Training Latency
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow
                  key={result.algorithm}
                  className={`
                    ${
                      result.isWinner
                        ? "bg-rose-50/60 hover:bg-rose-50/80 border-l-4 border-l-rose-500"
                        : "bg-white hover:bg-gray-50"
                    }
                    ${index !== results.length - 1 ? "border-b border-gray-200" : ""}
                  `}
                >
                  <TableCell
                    className={`py-6 px-8 ${
                      result.isWinner
                        ? "font-bold text-gray-900 text-lg"
                        : "font-semibold text-gray-800 text-base"
                    }`}
                  >
                    {result.algorithm}
                    {result.isWinner && (
                      <Badge
                        variant="outline"
                        className="ml-3 border-rose-500 text-rose-700 bg-rose-50 font-semibold"
                      >
                        WINNER
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell
                    className={`py-6 px-6 ${
                      result.isWinner
                        ? "font-bold text-rose-700 text-lg"
                        : "font-medium text-gray-700 text-base"
                    }`}
                  >
                    {result.f1Score}
                  </TableCell>
                  <TableCell
                    className={`py-6 px-6 ${
                      result.isWinner
                        ? "font-semibold text-gray-800 text-base"
                        : "font-medium text-gray-700 text-base"
                    }`}
                  >
                    {result.accuracy}
                  </TableCell>
                  <TableCell
                    className={`py-6 px-6 ${
                      result.isWinner
                        ? "font-semibold text-gray-700 text-base"
                        : "font-medium text-gray-600 text-base"
                    }`}
                  >
                    {result.trainingLatency}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom Section - Action Area */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleDeploy}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all"
        >
          Acknowledge & Deploy
        </Button>
      </div>
    </div>
  );
}
