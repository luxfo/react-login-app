import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
