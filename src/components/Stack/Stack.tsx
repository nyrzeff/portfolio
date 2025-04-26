import { devicons } from "@assets/icons";
import styles from "./Stack.module.scss";

export const Stack: React.FC = () => {
  return (
    <section className={styles["stack-section"]}>
      <h2>Stack (languages, libraries, frameworks, tools)</h2>
      <p>These are some of the technologies I've worked with, hover over them to see my current level of experience on each of them:</p>
      <ul className={styles["stack-list"]}>
        {Object.entries(devicons).map((item, index) => (
          <li key={index}>
            <i className={item[1]}></i>
            <span>{item[0]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
