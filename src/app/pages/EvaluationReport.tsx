import { MLOpsEvaluationReport } from "../components/MLOpsEvaluationReport";
import { LineChart } from "lucide-react";

export function EvaluationReport() {
  const handleDeploy = () => {
    alert("Deploying XGBoost model to production...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MLOps Evaluation Report
          </h1>
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
