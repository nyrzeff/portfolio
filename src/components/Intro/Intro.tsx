import Markdown from "react-markdown";
import about from "@/content/about.md?raw";
import rehypeRaw from "rehype-raw";
import styles from "./Intro.module.scss";

export const Intro: React.FC = () => {
  return (
    <section tabIndex={0} id="intro" className={styles["intro"]}>
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
            <q>
              <em>
                Code to save, protect, secure, prevent, anticipate, nullify,
                maximize, enhance, increase, evolve
              </em>
            </q>
            <p>
              Fullstack web dev / software engineer
              {"\n"}
              <em>Tap or click the card for more info</em>
            </p>
          </footer>
        </div>
        <div className={`${styles["back"]} ${styles["face"]}`}>
          <article className={styles["about"]}>
            <Markdown rehypePlugins={[rehypeRaw]}>{about}</Markdown>
          </article>
        </div>
      </div>
    </section>
  );
};
