import { type ReactNode, useState, useEffect, useLayoutEffect } from "react";
import { Header, SideMenu, Footer } from "@components";
import { ScreenProvider } from "@/context/ScreenContext";
import styles from "./Layout.module.scss";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLandscapeOrWide, setIsLandscapeOrWide] = useState(false);

  useLayoutEffect(() => {
    const isLandscape = window.matchMedia("(orientation: landscape)");
    const isWide = window.matchMedia("(min-width: 768px)");

    const updateState = () => {
      setIsLandscapeOrWide(isLandscape.matches || isWide.matches);
    };

    updateState();

    isLandscape.addEventListener("change", updateState);
    isWide.addEventListener("change", updateState);

    return () => {
      isLandscape.removeEventListener("change", updateState);
      isWide.removeEventListener("change", updateState);
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    if (menuOpen) html.classList.add("menu-open");
    else html.classList.remove("menu-open");

    return () => html.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <ScreenProvider isLandscapeOrWide={isLandscapeOrWide}>
      <div className={styles["layout-wrapper"]}>
        <Header isOpen={menuOpen} setIsOpen={setMenuOpen} />
        {!isLandscapeOrWide && (
          <SideMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        )}
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
