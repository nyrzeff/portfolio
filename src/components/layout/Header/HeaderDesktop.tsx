import { useState } from "react";
import { icons } from "@assets/icons";
import styles from "./HeaderDesktop.module.scss";

export const HeaderDesktop = () => {
  let [isHovered, setIsHovered] = useState(false);
  const Eye = icons["eye"];

  const displayMessage = () => {
    return <p>Coming soon...</p>;
  };

  return (
    <header className={styles["header-desktop"]}>
      <a href="#" className={styles["hero-image-container"]}>
        <Eye title="Eye of Nyrzeff" className={styles["hero-image"]} />
      </a>
      <nav className={styles["nav-link-container"]}>
        <a href="#">Home</a>
        <a href="#intro">Intro</a>
        <a
          href="#blog"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={styles["blog-link"]}
        >
          {isHovered ? displayMessage() : "Blog"}
        </a>
        <a href="#stack">Stack</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};
