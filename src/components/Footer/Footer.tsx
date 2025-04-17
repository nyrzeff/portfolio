import { Contact, Mail, Github, MapPin } from "lucide-react";
import styles from "./Footer.module.scss";

interface FooterProps {
  imagePath: string;
}

export const Footer: React.FC<FooterProps> = ({ imagePath }): FooterProps => {
  const getUtcOffset = () => {
    const options = {
      timeZone: "Europe/Lisbon",
      timeZoneName: "shortOffset",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(new Date());

    return parts.find((p) => p.type === "timeZoneName")?.value || "GMT+0";
  };

  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-line"]}></div>
      <div className={styles["footer-top"]}>
        <figure>
          <img src={imagePath} alt="Eye of Nyrzeff" />
          <div className={styles["caption-container"]}>
            <figcaption>
              Real Name: Felipe Ferreira{"\n"}Pseudonym: <b>Nyrzeff</b>
            </figcaption>
            <span>
              <em>
                Guided by <strong>The Elemental Septet</strong>
              </em>
            </span>
          </div>
        </figure>
      </div>
      <nav className={styles["footer-main"]}>
        <div className={styles["nav-container"]}>
          <h2>Navigation</h2>
          <a href="#home">Home</a>
          <a href="#intro">Intro</a>
          <a href="#blog">Blog</a>
          <a href="#stack">Stack</a>
          <a href="#projects">Projects</a>
        </div>
        <div className={styles["social-container"]}>
          <h2>Social</h2>
          <a href="#contact" className={styles["icon-container"]}>
            <Contact />
            <span>Contact me</span>
          </a>
          <a
            href="mailto:nyrghzef@keemail.me"
            className={styles["icon-container"]}
          >
            <Mail />
            <span>Mail me</span>
          </a>
          <a
            href="https://github.com/nyrzeff"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["icon-container"]}
          >
            <Github />
            <span>GitHub</span>
          </a>
          <div className={styles["icon-container"]}>
            <MapPin />
            <span>Remote • {getUtcOffset()}</span>
          </div>
        </div>
      </nav>
      <div className={styles["footer-line"]}></div>
      <div className={styles["footer-bottom"]}>
        <span>
          2025. All code and content freely available under the CC0 License. No
          rights reserved. Identity and likeness remain protected.
        </span>
        <span>
          {" "}
          Crafted with ⚡ by <b>Nyrzeff</b>. Powered by React, Vite and
          TypeScript.
        </span>
      </div>
    </footer>
  );
};
