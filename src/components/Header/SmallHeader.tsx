import styles from "./SmallHeader.module.scss";

interface SmallHeaderProps {
  imagePath: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const SmallHeader: ReactFC<SmallHeaderProps> = ({
  imagePath,
  isOpen,
  setIsOpen,
}): SmallHeaderProps => {
  return (
    <header className={styles["small-header"]}>
      <a href="#" className={styles["hero-image-container"]}>
        <img
          src={imagePath}
          alt="Eye of Nyrzeff"
          className={styles["hero-image"]}
        />
      </a>
      <div className={styles["batatas-container"]}>
        <button
          className={`${styles["batatas"]} ${isOpen ? styles["open"] : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            zIndex: 100,
          }}
        >
          <span className={styles["batatinhas"]}></span>
          <span className={styles["batatinhas"]}></span>
          <span className={styles["batatinhas"]}></span>
        </button>
      </div>
    </header>
  );
};
