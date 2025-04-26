import { icons } from "@assets/icons";
import styles from "./Header.module.scss";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isOpen,
  setIsOpen,
}: HeaderProps) => {
  const Eye = icons["eye"];

  return (
    <header className={styles["small-header"]}>
      <a href="#" className={styles["hero-image-container"]}>
        <Eye alt="Eye of Nyrzeff" className={styles["hero-image"]} />
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
