import { type ReactNode, useState, useLayoutEffect } from "react";
import { Header, SideMenu, Footer } from "@components";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLandscapeOrWide, setIsLandscapeOrWide] = useState(false);
  const imagePath = "/src/assets/images/eye-of-nyrzeff.svg";

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

  return (
    <>
      <div className={styles["layout-wrapper"]}>
        <Header
          isLandscapeOrWide={isLandscapeOrWide}
          isOpen={menuOpen}
          setIsOpen={setMenuOpen}
          imagePath={imagePath}
        />
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
        <Footer imagePath={imagePath} />
      </div>
    </>
  );
};
