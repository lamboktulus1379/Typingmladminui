import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Check, Loader2 } from "lucide-react";
import {
  ExpandableSessionTable,
  SessionFeaturePreviewDto,
} from "../components/ExpandableSessionTable";

type Step = 1 | 2 | 3 | 4;

const steps = [
  { number: 1, label: "Extract Data" },
  { number: 2, label: "Train Models" },
  { number: 3, label: "Evaluate" },
  { number: 4, label: "Deploy" },
];

const pendingSessions: SessionFeaturePreviewDto[] = [
  {
    id: "session-a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    userName: "Ahmad Hidayat",
    wpm: 45,
    weakestFinger: "Pinky Left",
    accuracy: 92.5,
    rawTextTyped: "The quick brown fox jumps over the lazy dog",
    dwellLeftPinky: 120,
    flightLeftPinky: 85,
  },
  {
    id: "session-b2c3d4e5-f6a7-8901-bcde-f12345678901",
    userName: "Siti Nurhaliza",
    wpm: 62,
    weakestFinger: "Ring Right",
    accuracy: 96.8,
    rawTextTyped: "Machine learning algorithms analyze typing patterns effectively",
    dwellLeftPinky: 95,
    flightLeftPinky: 70,
  },
  {
    id: "session-c3d4e5f6-a7b8-9012-cdef-123456789012",
    userName: "Budi Santoso",
    wpm: 38,
    weakestFinger: "Index Left",
    accuracy: 88.3,
    rawTextTyped: "Practice makes perfect in touch typing skills",
    dwellLeftPinky: 145,
    flightLeftPinky: 110,
  },
  {
    id: "session-d4e5f6a7-b8c9-0123-def1-234567890123",
    userName: "Rina Wijaya",
    wpm: 55,
    weakestFinger: "Middle Right",
    accuracy: 94.2,
    rawTextTyped: "Data science requires both statistical knowledge and programming",
    dwellLeftPinky: 108,
    flightLeftPinky: 92,
  },
  {
    id: "session-e5f6a7b8-c9d0-1234-ef12-345678901234",
    userName: "Andi Pratama",
    wpm: 71,
    weakestFinger: "Ring Left",
    accuracy: 97.5,
    rawTextTyped: "Artificial intelligence transforms how we interact with technology",
    dwellLeftPinky: 88,
    flightLeftPinky: 65,
  },
];

const modelResults = [
  {
    algorithm: "Logistic Regression",
    accuracy: 75,
    f1Score: 0.72,
    status: "Completed",
  },
  {
    algorithm: "Random Forest",
    accuracy: 88,
    f1Score: 0.86,
    status: "Completed",
  },
  {
    algorithm: "XGBoost",
    accuracy: 94,
    f1Score: 0.91,
    status: "Winner",
  },
];

export function MLOpsWizard() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [progress, setProgress] = useState<number>(0);

  const handleExtractData = () => {
    setCurrentStep(2);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep(3), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDeploy = () => {
    setCurrentStep(4);
  };

  const handleReturnToDashboard = () => {
    window.location.href = "/";
  };

  const handleReset = () => {
    setCurrentStep(1);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            MLOps Retraining Wizard
          </h1>
          <p className="text-gray-600">
            Automated model retraining and deployment pipeline
          </p>
        </div>

        {/* Horizontal Stepper */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                        currentStep >= step.number
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p
                        className={`text-sm font-medium ${
                          currentStep >= step.number
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-4 relative top-[-16px]">
                      <div
                        className={`h-full rounded ${
                          currentStep > step.number
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* State 1: Data Preview */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900">
                      {pendingSessions.length} Pending Typing Sessions Found
                    </h3>
                    <p className="text-blue-700 mt-1">
                      Ready for model retraining
                    </p>
                  </div>
                  <Badge className="bg-blue-600 text-white px-4 py-2 text-lg">
                    {pendingSessions.length} Sessions
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Data Preview</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Expand rows to view detailed session metrics and typing patterns
                </p>
              </CardHeader>
              <CardContent>
                <ExpandableSessionTable pendingSessions={pendingSessions} />
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleExtractData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    Extract Data & Start Training
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* State 2: Training Progress */}
        {currentStep === 2 && (
          <Card>
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center space-y-6">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Python Engine is training...
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Evaluating Logistic Regression, Random Forest, and XGBoost
                    models. Please wait.
                  </p>
                </div>
                <div className="w-full max-w-md">
                  <Progress value={progress} className="h-3" />
                  <p className="text-center text-sm text-gray-500 mt-2">
                    {progress}% Complete
                  </p>
                </div>
                <Button disabled className="bg-gray-400 text-white px-6">
                  Training...
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* State 3: Evaluation Board */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Model Comparison Table</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Evaluation results from the training pipeline
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Algorithm</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>F1-Score</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modelResults.map((model) => (
                    <TableRow
                      key={model.algorithm}
                      className={
                        model.status === "Winner"
                          ? "bg-green-50 border-l-4 border-green-500"
                          : ""
                      }
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {model.algorithm}
                          {model.status === "Winner" && (
                            <Badge className="bg-green-600 text-white">
                              Recommended
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            model.status === "Winner"
                              ? "font-semibold text-green-700"
                              : ""
                          }
                        >
                          {model.accuracy}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            model.status === "Winner"
                              ? "font-semibold text-green-700"
                              : ""
                          }
                        >
                          {model.f1Score.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            model.status === "Winner" ? "default" : "secondary"
                          }
                          className={
                            model.status === "Winner"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {model.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleDeploy}
                  className="bg-green-600 hover:bg-green-700 text-white px-6"
                >
                  Deploy XGBoost & Advance Phase
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* State 4: Success Confirmation */}
        {currentStep === 4 && (
          <Card>
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-12 h-12 text-green-600" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-semibold text-gray-900">
                    Deployment Successful!
                  </h3>
                  <p className="text-gray-600 max-w-lg">
                    Model V2 is now active in production. The user has been
                    successfully upgraded to Phase 2 (Intervention).
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleReturnToDashboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    Return to Dashboard
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="px-6"
                  >
                    Start New Retraining
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
