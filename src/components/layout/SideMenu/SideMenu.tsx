import styles from "./SideMenu.module.scss";

interface SideMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const SideMenu = ({ isOpen, setIsOpen }: SideMenuProps) => {
  const closeMenu = () => setIsOpen(false);

  return (
    <aside className={`${styles["side-menu"]} ${isOpen ? styles["open"] : ""}`}>
      <ul>
        <li onClick={closeMenu}>
          <a href="#">Home</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#intro">Intro</a>
        </li>
        <li className={styles["blog"]} onClick={closeMenu}>
          <a href="#blog">Blog (coming soon...)</a>
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
