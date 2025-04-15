import styles from "./Header.module.scss";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isOpen,
  setIsOpen,
}: HeaderProps) => {
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
          <button
            className={`${styles["batatas"]} ${isOpen ? styles["open"] : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              zIndex: 100,
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
      </nav>
    </header>
  );
};
