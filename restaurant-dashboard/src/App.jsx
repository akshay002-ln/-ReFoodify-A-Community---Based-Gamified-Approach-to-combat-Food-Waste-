// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";

// Lazy-loaded pages
const MenuManagement = lazy(() => import("./pages/MenuManagement"));
const QRCodeGenerator = lazy(() => import("./pages/QRCodeGenerator"));
const Orders = lazy(() => import("./pages/Orders"));
const FeedbackRatings = lazy(() => import("./pages/FeedbackRatings"));
const NGOCoordination = lazy(() => import("./pages/NGOCoordination"));
const Analytics = lazy(() => import("./pages/Analytics"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardHome = lazy(() => import("./pages/DashboardHome"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading...
          </div>
        </div>
      }
    >
      <Main />
    </Suspense>
  );
};

const Main = () => {
  const location = useLocation();
  const { user, loading } = useAuth(); // <-- make sure AuthContext provides `loading`

  // Wait until AuthContext finishes loading user from storage
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-700 animate-pulse">
          Checking authentication...
        </div>
      </div>
    );
  }

  // Routes considered part of the dashboard (will render inside Layout)
  const isDashboardRoute = [
    "/dashboard",
    "/menu-management",
    "/orders",
    "/analytics",
    "/feedback-ratings",
    "/ngo-coordination",
    "/qr-code-generator",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <>
      {/* Public routes (no dashboard layout) */}
      {!isDashboardRoute ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="/register"
            element={!user ? <RegisterPage /> : <Navigate to="/dashboard" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        // Dashboard routes wrapped in Layout (protected)
        <Layout>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <DashboardHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/menu-management"
              element={
                <ProtectedRoute user={user}>
                  <MenuManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute user={user}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute user={user}>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback-ratings"
              element={
                <ProtectedRoute user={user}>
                  <FeedbackRatings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ngo-coordination"
              element={
                <ProtectedRoute user={user}>
                  <NGOCoordination />
                </ProtectedRoute>
              }
            />
            <Route
              path="/qr-code-generator"
              element={
                <ProtectedRoute user={user}>
                  <QRCodeGenerator />
                </ProtectedRoute>
              }
            />
            {/* default dashboard fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

// Simple reusable protected-route wrapper
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default App;
