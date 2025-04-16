import styles from "./Footer.module.scss";

interface FooterProps {
  imagePath: string;
}

export const Footer: React.FC<FooterProps> = ({ imagePath }): FooterProps => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-top"]}>
        <figure>
          <img src={imagePath} alt="Eye of Nyrzeff" />
          <div className={styles["caption-container"]}>
            <figcaption>Felipe Ferreira, aka Nyrzeff </figcaption>
            <span>
              Guided by <strong>The Elemental Septet</strong>
            </span>
          </div>
        </figure>
      </div>
      <nav className={styles["footer-main"]}>
        <div className={styles["nav-container"]}>
          <h2>Navigation</h2>
          <a href="#home">Home</a>
          <a href="#intro">Intro</a>
          <a href="#blog">Blog</a>
          <a href="#stack">Stack</a>
          <a href="#projects">Projects</a>
        </div>
        <div className={styles["social-container"]}>
          <h2>Contact</h2>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <hr />
      <div className={styles["footer-bottom"]}>
        <span>
          All code and content freely available under the CC0 License. No rights
          reserved. Identity and likeness remain protected. 2025
        </span>
        <span>
          {" "}
          Crafted with ⚡ by <i>Nyrzeff</i>. Powered by React, Vite and
          TypeScript.
        </span>
      </div>
    </footer>
  );
};
