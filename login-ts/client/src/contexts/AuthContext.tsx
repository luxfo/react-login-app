import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { TAuth } from "../types/auth.type";

interface IAuthContext {
  auth: TAuth;
  setAuth: Dispatch<SetStateAction<any>>;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<IAuthContext>({
  auth: { id: "", token: "" },
  setAuth: () => {},
  isAuthenticated: () => {
    return false;
  },
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

function useStorageAuth() {
  const key: string = "auth";

  const [auth, setauth] = useState(JSON.parse(localStorage.getItem(key)!));

  // update stored theme
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(auth));
  }, [auth, key]);

  return [auth, setauth];
}

export function AuthProvider({ children }: { children: any }) {
  const [auth, setAuth] = useStorageAuth();

  function isAuthenticated() {
    if (auth != null) return true;

    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
