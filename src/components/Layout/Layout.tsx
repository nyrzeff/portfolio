import { type ReactNode, useState } from "react";
import { Header, SideMenu, Footer } from "@components";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={styles["layout-wrapper"]}>
        <Header
          isOpen={menuOpen}
          setIsOpen={setMenuOpen}
        />
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
    </>
  );
};
