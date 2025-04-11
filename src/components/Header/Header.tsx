import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import * as styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const imagePath = "../../../favicon.png";

  return (
    <header className={styles.header}>
      <a href="#">
        <StaticImage
          src={imagePath}
          alt="Eye of Nyrzeff"
          className={styles.heroImage}
        />
      </a>
      <nav>
        <input type="checkbox" id="checkbox" className={styles.checkbox} />
        <label htmlFor="checkbox" className={styles.borgar}>
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className={styles.navMobile}>
          <a href="#">Blog</a>
          <a href="#">Stack</a>
          <a href="#">Projects</a>
          <a href="#">Contact me!</a>
        </div>
      </nav>
    </header>
  );
};
