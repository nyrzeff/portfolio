import type { StackItem } from "@/types/stack";
import { stackItems } from "@assets/icons";
import styles from "./Stack.module.scss";

interface TooltipProps {
  item: StackItem;
}

const Tooltip: React.FC<TooltipProps> = ({ item }: TooltipProps) => {
  return (
    <div className={styles["tooltip"]}>
      <p className={styles["tooltip-text"]}>
        <b>Skill level</b>: {item.additionalInfo.skillLevel}
        <br />
        {item.additionalInfo.isActivelyLearning && <em>Actively learning</em>}
      </p>
    </div>
  );
};

export const Stack: React.FC = () => {
  return (
    <section tabIndex={0} id="stack" className={styles["stack"]}>
      <header className={styles["stack-header"]}>
        <h2>Stack</h2>
        <p>
          These are some of the technologies (languages, libraries, frameworks,
          tools and other systems) I've worked with, either in personal,
          academic or professional settings, with varying levels of competency.
          Tap/hover over each item for additional information. For more
          information about my development environment, take a look at the About
          section.
        </p>
        <fieldset>
          <legend>Skill levels</legend>
          <span>
            <strong>Novice:</strong> Beginner
          </span>
          <span>
            <strong>Familiar:</strong> Advanced Beginner
          </span>
          <span>
            <strong>Competent:</strong> Intermediate
          </span>
          <span>
            <strong>Proficient:</strong> Advanced
          </span>
          <span>
            <strong>Master:</strong> Expert
          </span>
          <p>
            Actively learning means I'm currently upskilling in the highlighted
            technology (building projects, updating mental models and reading
            docs, references, books and articles on it){" "}
          </p>
        </fieldset>
      </header>
      <ul className={styles["stack-list"]}>
        {stackItems.map((item: StackItem, index) => (
          <li key={index} className={styles["stack-list-item"]}>
            <Tooltip item={item} />
            <div className={styles["stack-item-container"]}>
              <i className={item.devicon}></i>
              <span>
                <b>{item.title}</b>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
