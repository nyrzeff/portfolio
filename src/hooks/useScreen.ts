import { useContext } from "react";
import { ScreenContext } from "@/types/screen";

export const useScreen = () => {
  const context = useContext(ScreenContext);
  if (!context) throw new Error("useScreen must be used within ScreenProvider");
  return context;
};
