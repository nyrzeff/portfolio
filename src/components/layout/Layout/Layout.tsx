import { type ReactNode, useState, useEffect } from "react";
import { Header, SideMenu, Footer } from "@components/layout";
import { ScreenProvider } from "@/context/ScreenContext";
import styles from "./Layout.module.scss";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTouchscreen, setIsTouchscreen] = useState(false);
  const [isDesktopExperience, setIsDesktopExperience] = useState(false);

  useEffect(() => {
    const onFirstTouch = () => {
      setIsTouchscreen(true);
      window.removeEventListener("touchstart", onFirstTouch);
    };

    window.addEventListener("touchstart", onFirstTouch);

    return () => {
      window.removeEventListener("touchstart", onFirstTouch);
    };
  }, []);

  useEffect(() => {
    const isTouch = isTouchscreen || window.matchMedia(`(pointer: coarse)`).matches || "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isWide = window.matchMedia(`(min-width: 768px)`);

    const updateState = () => {
      setIsDesktopExperience(isWide.matches && !isTouch);
    };

    updateState();

    isWide.addEventListener("change", updateState);

    return () => {
      isWide.removeEventListener("change", updateState);
    };
  }, [isTouchscreen]);

  useEffect(() => {
    const html = document.documentElement;

    if (menuOpen) html.classList.add("menu-open");
    else html.classList.remove("menu-open");

    return () => html.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <ScreenProvider isDesktopExperience={isDesktopExperience}>
      <div className={styles["layout-wrapper"]}>
        <Header isOpen={menuOpen} setIsOpen={setMenuOpen} />
        <SideMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        {menuOpen && (
          <div
            className={styles["overlay"]}
            onClick={() => setMenuOpen(false)}
          />
        )}
        <main className={styles["content"]}>{children}</main>
        <Footer />
      </div>
    </ScreenProvider>
  );
};
