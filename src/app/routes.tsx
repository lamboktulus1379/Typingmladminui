import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { Roles } from "./pages/Roles";
import { Typing } from "./pages/Typing";
import { FingerLibrary } from "./pages/FingerLibrary";
import { DrillLibrary } from "./pages/DrillLibrary";
import { TypingAnalysis } from "./pages/TypingAnalysis";
import { RecommendationAnalytics } from "./pages/RecommendationAnalytics";
import { Settings } from "./pages/Settings";
import { Help } from "./pages/Help";
import { Login } from "./pages/Login";
import { MLOpsWizard } from "./pages/MLOpsWizard";
import { EvaluationReport } from "./pages/EvaluationReport";
import { MLOpsDashboard } from "./pages/MLOpsDashboard";
import { XAIDashboard } from "./pages/XAIDashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "users", Component: Users },
      { path: "roles", Component: Roles },
      { path: "typing", Component: Typing },
      { path: "finger-library", Component: FingerLibrary },
      { path: "drill-library", Component: DrillLibrary },
      { path: "typing-analysis", Component: TypingAnalysis },
      { path: "recommendation-analytics", Component: RecommendationAnalytics },
      { path: "mlops-wizard", Component: MLOpsWizard },
      { path: "evaluation-report", Component: EvaluationReport },
      { path: "mlops-dashboard", Component: MLOpsDashboard },
      { path: "xai-dashboard", Component: XAIDashboard },
      { path: "settings", Component: Settings },
      { path: "help", Component: Help },
    ],
  },
]);