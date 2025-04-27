import { createContext, useContext } from "react";

interface ScreenContext {
  isDesktopExperience: boolean;
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export const useScreen = () => {
  const context = useContext(ScreenContext);
  if (!context) throw new Error("useScreen must be used within ScreenProvider");
  return context;
};

export const ScreenProvider: React.FC<{
  isDesktopExperience: boolean;
  children: ReactNode;
}> = ({ isDesktopExperience, children }) => (
  <ScreenContext.Provider value={{ isDesktopExperience }}>
    {children}
  </ScreenContext.Provider>
);
