// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/Dashboard.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);

// 🧱 Error Boundary / Suspense Wrapper
function ErrorBoundary({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
          Loading Application...
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}
