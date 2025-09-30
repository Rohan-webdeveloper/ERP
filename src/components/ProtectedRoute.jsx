// src/components/ProtectedRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>; // wait for session check

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}
