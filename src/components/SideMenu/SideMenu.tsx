import styles from "./SideMenu.module.scss";

interface SideMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const SideMenu = ({ isOpen, setIsOpen }: SideMenuProps) => {
  const closeMenu = () => setIsOpen(false);

  console.log(`Is open? ${isOpen}`);

  return (
    <aside className={`${styles["side-menu"]} ${isOpen ? styles["open"] : ""}`}>
      <button
        className={`${styles["batatas"]} ${isOpen ? styles["open"] : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul>
        <li onClick={closeMenu}>
          <a href="#intro">Intro</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#blog">Blog</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#stack">Stack</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#projects">Projects</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#contact">Contact me!</a>
        </li>
      </ul>
    </aside>
  );
};
