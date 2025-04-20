import { icons } from "@assets/icons";
import styles from "./SmallHeader.module.scss";

interface SmallHeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const SmallHeader: ReactFC<SmallHeaderProps> = ({
  isOpen,
  setIsOpen,
}): SmallHeaderProps => {
  const Eye = icons["eye"];

  return (
    <header className={styles["small-header"]}>
      <a href="#" className={styles["hero-image-container"]}>
        <Eye alt="Eye of Nyrzeff" className={styles["hero-image"]} />
      </a>
      <q className={styles["header-message"]}>
        <em>
          Code to save, protect, secure, prevent, anticipate, nullify, maximize,
          enhance, increase, evolve
        </em>
      </q>
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
