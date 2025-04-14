import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  menuOpen,
  setMenuOpen,
}: HeaderProps) => {
  const imagePath = "/src/assets/images/eye-of-nyrzeff.svg";

  return (
    <header className={styles["header"]}>
      <a href="#">
        <img
          src={imagePath}
          alt="Eye of Nyrzeff"
          className={styles["hero-image"]}
        />
      </a>
      <nav>
        <button
          className={`${styles["batatas"]} ${menuOpen ? styles["open"] : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};
