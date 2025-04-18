import { icons } from "@assets/icons";
import styles from "./BigHeader.module.scss";

export const BigHeader: ReactFC = () => {
  const Eye = icons["eye"];

  return (
    <header className={styles["big-header"]}>
      <div className={styles["banner"]}>
        <Eye alt="Eye of Nyrzeff" className={styles["hero-image"]} />
      </div>
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
