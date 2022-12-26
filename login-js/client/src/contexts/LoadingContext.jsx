import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("There is no Loading provider");
  return context;
};

export function LoadingProvider(props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
}
