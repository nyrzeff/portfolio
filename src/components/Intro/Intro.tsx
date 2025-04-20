// import { useScreen } from "@/context/ScreenContext";
import styles from "./Intro.module.scss";

export const Intro: React.FC = () => {
  // const { isLandscapeOrWide } = useScreen();

  return (
    <article>
      <div
        className={styles["card"]}
        onClick={(e) =>
          e.currentTarget.classList.toggle(`${styles["flipped"]}`)
        }
      >
        <div className={`${styles["front"]} ${styles["face"]}`}>
          <footer>
            <span>
              <b>Felipe William Calil Ferreira</b>
            </span>
            <span>
              Pseudonym: <strong>Nyrzeff</strong>
            </span>
            <p>
              Fullstack web dev / software engineer
              {"\n"}
              <em>Tap or click the card for more info</em>
            </p>
          </footer>
        </div>
        <div className={`${styles["back"]} ${styles["face"]}`}>
          <article className={styles["description"]}>
            <p>
              What thrills me? Just imagine building 1000 projects. More than
              1000 projects. Thousands upon thousands of commits and
              contributions! Robust, scalable, extensible, maintainable,
              beneficial tools and systems for everyone! Undeniable mastery of
              the science, art and craft of software design and development!
            </p>
          </article>
        </div>
      </div>
    </article>
  );
};
