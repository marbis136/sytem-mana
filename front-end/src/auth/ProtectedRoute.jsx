import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirige al login y guarda de dónde venías
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
