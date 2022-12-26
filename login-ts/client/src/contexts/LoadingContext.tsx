import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface ILoadingContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext<ILoadingContext>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("There is no Loading provider");
  return context;
};

export function LoadingProvider({ children }: { children: any }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
