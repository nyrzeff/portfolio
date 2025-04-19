import { createContext, useContext } from "react";

interface ScreenContext {
  isLandscapeOrWide: boolean;
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export const useScreen = () => {
  const context = useContext(ScreenContext);
  if (!context) throw new Error("useScreen must be used within ScreenProvider");
  return context;
};

export const ScreenProvider: React.FC<{
  isLandscapeOrWide: boolean;
  children: ReactNode;
}> = ({ isLandscapeOrWide, children }) => (
  <ScreenContext.Provider value={{ isLandscapeOrWide }}>
    {children}
  </ScreenContext.Provider>
);
