import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";

// Guard: User must have filled registration form to access categories, dashboard, or movies.
const RequireRegistration = ({ children }) => {
  const user = useStore((state) => state.user);
  const isRegistered = user.name && user.username && user.email && user.mobile;
  
  if (!isRegistered) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Guard: User must have selected at least 3 categories to access dashboard or movies.
const RequireCategories = ({ children }) => {
  const categories = useStore((state) => state.categories);
  const hasCategories = categories && categories.length >= 3;
  
  if (!hasCategories) {
    return <Navigate to="/categories" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route: Registration */}
      <Route path="/" element={<Register />} />
      
      {/* Protected Routes */}
      <Route
        path="/categories"
        element={
          <RequireRegistration>
            <Categories />
          </RequireRegistration>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireRegistration>
            <RequireCategories>
              <Dashboard />
            </RequireCategories>
          </RequireRegistration>
        }
      />
      <Route
        path="/movies"
        element={
          <RequireRegistration>
            <RequireCategories>
              <Movies />
            </RequireCategories>
          </RequireRegistration>
        }
      />
      
      {/* Fallback to Registration */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
