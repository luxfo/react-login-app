import { useAuth } from "../contexts/AuthContext";

function PublicRoute({ children }) {
  const { isAuthenticated, setAuthUser } = useAuth();

  if (isAuthenticated()) {
    setAuthUser(null);
  }

  return children;
}

export default PublicRoute;
