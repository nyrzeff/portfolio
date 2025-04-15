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
        <li>
          <a href="#intro" onClick={closeMenu}>
            Intro
          </a>
        </li>
        <li>
          <a href="#blog" onClick={closeMenu}>
            Blog
          </a>
        </li>
        <li>
          <a href="#stack" onClick={closeMenu}>
            Stack
          </a>
        </li>
        <li>
          <a href="#projects" onClick={closeMenu}>
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" onClick={closeMenu}>
            Contact me!
          </a>
        </li>
      </ul>
    </aside>
  );
};
