import styles from "./BigHeader.module.scss";

interface BigHeaderProps {
  imagePath: string;
}

export const BigHeader: ReactFC<BigHeaderProps> = ({
  imagePath,
}): BigHeaderProps => {
  return (
    <header className={styles["big-header"]}>
      <div className={styles["banner"]}>
        <img
          src={imagePath}
          alt="Eye of Nyrzeff"
          className={styles["hero-image"]}
        />
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
