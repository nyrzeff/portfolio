import type { StackItem } from "@/types/stack";
import { stackItems } from "@assets/icons";
import styles from "./Stack.module.scss";

export const Stack: React.FC = () => {
  return (
    <section tabIndex={0} id="stack" className={styles["stack"]}>
      <header className={styles["stack-header"]}>
        <h2>Stack</h2>
      </header>
      <ul className={styles["stack-list"]}>
        {stackItems.map((item: StackItem, index) => (
          <li key={index} className={styles["stack-list-item"]}>
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
