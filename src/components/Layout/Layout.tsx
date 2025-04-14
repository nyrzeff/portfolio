import { type ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { Header, SideMenu, Footer } from "@components";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`${styles["layout-wrapper"]} ${menuOpen ? styles["menu-open"] : ""}`}
      >
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className={styles["content"]}>{children}</main>
        <Footer />
      </div>

      {menuOpen &&
        createPortal(
          <SideMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />,
          document.getElementById("menu-root"),
        )}
    </>
  );
};
