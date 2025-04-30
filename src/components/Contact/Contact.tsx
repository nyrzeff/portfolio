import styles from "./Contact.module.scss";

export const Contact: React.FC = () => {
  return (
    <section id={styles["contact"]}>
      <h2>Contact me!</h2>
      <p>No need for formalities, whether you want to hire me, discuss a project/idea or simply talk, just drop a message below:</p>
      <form className={styles["form"]}>
        <label className={styles["name"]}>Name
          <input type="text" />
        </label>
        <label className={styles["email"]}>Email
          <input type="text" />
        </label>
        <label className={styles["message"]}>Message
          <textarea />
        </label>
        <input type="submit" value="Send" className={styles["send"]}/>
      </form>
    </section>
  );
};
