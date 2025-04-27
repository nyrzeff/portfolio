import { devicons } from "@assets/icons";
import styles from "./Stack.module.scss";

export const Stack: React.FC = () => {
  return (
    <section
      tabIndex={0}
      id={styles["stack"]}
    >
      <h2>Stack (languages, libraries, frameworks, tools)</h2>
      <p>These are some of the technologies I've worked with:</p>
      <ul className={styles["stack-list"]}>
        {Object.entries(devicons).map((item, index) => (
          <li key={index}>
            <i className={item[1]}></i>
            <span><b>{item[0]}</b></span>
          </li>
        ))}
      </ul>
    </section>
  );
};
