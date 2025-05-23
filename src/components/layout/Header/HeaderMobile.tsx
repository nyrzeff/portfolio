import { icons } from "@assets/icons";
import styles from "./HeaderMobile.module.scss";

interface HeaderMobileProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const HeaderMobile: React.FC<HeaderMobileProps> = ({
  isOpen,
  setIsOpen,
}: HeaderMobileProps) => {
  const Eye = icons["eye"];

  return (
    <header className={styles["header"]}>
      <a href="#" className={styles["hero-image-container"]}>
        <Eye title="Eye of Nyrzeff" className={styles["hero-image"]} />
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
