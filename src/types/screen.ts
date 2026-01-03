import { createContext } from "react";

interface ScreenContextType {
    isDesktopExperience: boolean;
}

export const ScreenContext = createContext<ScreenContextType | null>(null);
