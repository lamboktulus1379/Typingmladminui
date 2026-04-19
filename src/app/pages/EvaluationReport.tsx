import { MLOpsEvaluationReport } from "../components/MLOpsEvaluationReport";

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

        {/* Additional Information Section */}
        <div className="mt-12 max-w-5xl mx-auto">
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
