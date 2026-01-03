import styles from "./SideMenu.module.scss";

interface SideMenuProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const SideMenu = ({ isOpen, setIsOpen }: SideMenuProps) => {
    const closeMenu = () => setIsOpen(false);

    return (
        <aside
            className={`${styles["side-menu"]} ${isOpen ? styles["open"] : ""}`}
        >
            <ul>
                <a href="#">
                    <li onClick={closeMenu}>Home</li>
                </a>
                <a href="#intro">
                    <li onClick={closeMenu}>Intro</li>
                </a>
                <a href="#stack">
                    <li onClick={closeMenu}>Stack</li>
                </a>
                <a href="#projects">
                    <li onClick={closeMenu}>Projects</li>
                </a>
                <a href="#contact">
                    <li onClick={closeMenu}>Contact me!</li>
                </a>
                <a href="#blog">
                    <li className={styles["blog"]} onClick={closeMenu}>
                        Blog (coming soon...)
                    </li>
                </a>
            </ul>
        </aside>
    );
};
