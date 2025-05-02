import { icons } from "@assets/icons";
import styles from "./HeaderDesktop.module.scss";

export const HeaderDesktop = () => {
  const Eye = icons["eye"];

  return (
    <header className={styles["header-desktop"]}>
      <a href="#" className={styles["hero-image-container"]}>
        <Eye title="Eye of Nyrzeff" className={styles["hero-image"]} />
      </a>
      <div className={styles["nav-link-container"]}>
        <a href="#home">Home</a>
        <a href="#intro">Intro</a>
        <a href="#blog">Blog</a>
        <a href="#stack">Stack</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </header>
  );
};
