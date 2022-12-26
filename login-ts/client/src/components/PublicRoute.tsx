import { useAuth } from "../contexts/AuthContext";

function PublicRoute({ children }: { children: any }) {
  const { isAuthenticated, setAuth } = useAuth();

  if (isAuthenticated()) {
    setAuth(null);
  }

  return children;
}

export default PublicRoute;
