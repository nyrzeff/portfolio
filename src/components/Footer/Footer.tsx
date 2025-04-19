import { useScreen } from "@/context/ScreenContext";
import { icons } from "@assets/icons";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  const { isLandscapeOrWide } = useScreen();

  const getUtcOffset = () => {
    const options = {
      timeZone: "Europe/Lisbon",
      timeZoneName: "shortOffset",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(new Date());

    return parts.find((p) => p.type === "timeZoneName")?.value || "GMT+0";
  };

  const Eye = icons["eye"];
  const ChevronRight = icons["chevronRight"];
  const Contact = icons["contact"];
  const Mail = icons["mail"];
  const Github = icons["github"];
  const MapPin = icons["mapPin"];

  return (
    <footer className={styles["footer"]}>
      {!isLandscapeOrWide && (
        <div className={styles["footer-fancy-divider"]}>
          <div className={styles["line"]}></div>
          <Eye alt="Eye of Nyrzeff" />
          <div className={styles["line"]}></div>
        </div>
      )}
      <div className={styles["footer-simple-divider"]}></div>
      <div className={styles["footer-main"]}>
        <div className={styles["footer-top"]}>
          <figure>
            <Eye alt="Eye of Nyrzeff" />
            <div className={styles["caption-container"]}>
              <figcaption>
                Pseudonym: <b>Nyrzeff</b>
                {"\n"}
                <em>
                  Guided by <strong>The Elemental Septet</strong>
                </em>
              </figcaption>
            </div>
          </figure>
        </div>
        <nav className={styles["footer-middle"]}>
          <div className={styles["nav-container"]}>
            <h2>Navigation</h2>
            <a href="#home" className={styles["icon-container"]}>
              <ChevronRight />
              <span>Home</span>
            </a>
            <a href="#intro" className={styles["icon-container"]}>
              <ChevronRight />
              <span>Intro</span>
            </a>
            <a href="#blog" className={styles["icon-container"]}>
              <ChevronRight />
              <span>Blog</span>
            </a>
            <a href="#stack" className={styles["icon-container"]}>
              <ChevronRight />
              <span>Stack</span>
            </a>
            <a href="#projects" className={styles["icon-container"]}>
              <ChevronRight />
              <span>Projects</span>
            </a>
          </div>
          <div className={styles["social-container"]}>
            <h2>Social</h2>
            <a href="#contact" className={styles["icon-container"]}>
              <Contact />
              <span>Contact</span>
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
      </div>
      <div className={styles["footer-simple-divider"]}></div>
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
