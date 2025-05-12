import { useScreen } from "@/hooks/useScreen";
import { icons } from "@assets/icons";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  const { isDesktopExperience } = useScreen();

  const getUtcOffset = () => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Lisbon",
      timeZoneName: "shortOffset",
    });

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
      {!isDesktopExperience && (
        <div className={styles["footer-fancy-divider"]}>
          <div className={styles["line"]}></div>
          <Eye title="Eye of Nyrzeff" />
          <div className={styles["line"]}></div>
        </div>
      )}
      <div className={styles["footer-simple-divider"]}></div>
      <div className={styles["footer-main"]}>
        <div className={styles["footer-top"]}>
          <figure>
            <Eye title="Eye of Nyrzeff" />
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
            <a href="#" className={styles["icon-container"]}>
              <ChevronRight />
              <span>Home</span>
            </a>
            <a href="#intro" className={styles["icon-container"]}>
              <ChevronRight />
              <span>Intro</span>
            </a>
            <a
              href="#blog"
              className={`${styles["icon-container"]} ${styles["blog-link"]}`}
            >
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
          Crafted with ⚡ by <b>Nyrzeff</b>. Powered by React, Vite, TypeScript
          and Vercel.
        </span>
      </div>
    </footer>
  );
};
