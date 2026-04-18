import { RouterProvider } from "react-router";
import { router } from "./routes";

// Main application component
export default function App() {
  return <RouterProvider router={router} />;
}