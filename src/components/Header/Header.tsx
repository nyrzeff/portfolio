import styles from "./Header.module.scss";

export const Header: React.FC = () => {
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
      </nav>
    </header>
  );
};
