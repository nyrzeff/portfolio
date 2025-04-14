import { type ReactNode, useState } from "react";
import { Header, SideMenu, Footer } from "@components";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`${styles["layout-wrapper"]} ${menuOpen ? styles["menu-open"] : ""}`}
    >
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SideMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
      <main className={styles["content"]}>{children}</main>
      <Footer />
    </div>
  );
};
