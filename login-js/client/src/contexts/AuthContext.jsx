import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

function useStorageAuth() {
  const key = "auth";

  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem(key))
  );

  // update stored theme
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(authUser));
  }, [authUser, key]);

  return [authUser, setAuthUser];
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useStorageAuth();

  function isAuthenticated() {
    if (authUser != null) return true;

    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
