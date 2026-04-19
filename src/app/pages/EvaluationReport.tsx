import { useState } from "react";
import { MLOpsEvaluationReport } from "../components/MLOpsEvaluationReport";
import { LineChart, User } from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function EvaluationReport() {
  const [selectedUser, setSelectedUser] = useState<string>("admin@test.com");

  const handleDeploy = () => {
    alert("Deploying XGBoost model to production...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* User Selection Control Area */}
        <div className="mb-8 max-w-5xl mx-auto">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <label
                htmlFor="user-select-report"
                className="text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                Select Subject / User:
              </label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger
                  id="user-select-report"
                  className="w-64 bg-white border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <SelectValue placeholder="Choose a user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin@test.com">
                    admin@test.com
                  </SelectItem>
                  <SelectItem value="user1@example.com">
                    user1@example.com
                  </SelectItem>
                  <SelectItem value="user2@example.com">
                    user2@example.com
                  </SelectItem>
                  <SelectItem value="ahmad.hidayat@test.com">
                    ahmad.hidayat@test.com
                  </SelectItem>
                  <SelectItem value="siti.nurhaliza@test.com">
                    siti.nurhaliza@test.com
                  </SelectItem>
                </SelectContent>
              </Select>
              <Badge
                variant="outline"
                className="border-rose-300 text-rose-700 bg-rose-50 font-semibold"
              >
                Personalized Model
              </Badge>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            MLOps Evaluation Report
          </h1>

          {/* Personalized Model Badge */}
          <div className="mb-3">
            <Badge className="bg-rose-50 hover:bg-rose-100 text-rose-800 border-2 border-rose-200 px-4 py-2.5 text-base font-bold shadow-sm">
              <User className="w-5 h-5 mr-2" />
              Personalized Model for: {selectedUser}
            </Badge>
          </div>

          <p className="text-gray-600">
            Review training results and deploy the winning model to production
          </p>
        </div>

        <MLOpsEvaluationReport onDeploy={handleDeploy} />

        {/* --- MODEL INSIGHTS (BARU DITAMBAHKAN UNTUK SIDANG SKRIPSI) --- */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-white border-2 border-rose-100 rounded-lg p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-rose-600" />
              Winning Model Insights (XGBoost)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Top Predictive Feature:</p>
                <p className="font-semibold text-gray-900">Flight Time (Left Pinky)</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Macro Precision:</p>
                <p className="font-semibold text-gray-900">93.5%</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Macro Recall:</p>
                <p className="font-semibold text-gray-900">94.8%</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Primary Misclassification:</p>
                <p className="font-semibold text-rose-600">Left Ring confused as Left Pinky</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section (ASLI DARI ANDA) */}
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Training Pipeline Information
            </h3>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Pipeline ID:</p>
                <p className="font-mono text-gray-900">
                  mlops-pipeline-2026-10-24-001
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Environment:</p>
                <p className="font-semibold text-gray-900">Production</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Training Duration:</p>
                <p className="font-semibold text-gray-900">2m 34s</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Dataset Version:</p>
                <p className="font-semibold text-gray-900">v2.3.1</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Feature Count:</p>
                <p className="font-semibold text-gray-900">42 features</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Cross-Validation Folds:</p>
                <p className="font-semibold text-gray-900">5-fold CV</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
