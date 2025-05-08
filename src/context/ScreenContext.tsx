import { type ReactNode } from "react";
import { ScreenContext } from "@/types/screen";

export const ScreenProvider: React.FC<{
  isDesktopExperience: boolean;
  children: ReactNode;
}> = ({ isDesktopExperience, children }) => (
  <ScreenContext.Provider value={{ isDesktopExperience }}>
    {children}
  </ScreenContext.Provider>
);
