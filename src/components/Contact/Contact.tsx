import React, { useState } from "react";
import styles from "./Contact.module.scss";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if(!res.ok) throw new Error("Failed to send message");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id={styles["contact"]}>
      <h2>Contact me!</h2>
      <p>No need for formalities, whether you want to hire me, discuss a project/idea or simply talk, just drop a message below:</p>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        <label className={styles["name"]}>Name
          <input
            name="name"
            placeholder="Your name/username/handle"
            value={formData.name}
            onChange={handleChange}
            required
            type="text"
          />
        </label>
        <label className={styles["email"]}>Email
          <input
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            type="text"
          />
        </label>
        <label className={styles["message"]}>Message
          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <button
          type="submit"
          value="Send"
          className={styles["send"]}
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        {status === "success" && <p>Message sent!</p>}
        {status === "error" && <p>Looks like something went wrong...</p>}
      </form>
    </section>
  );
};
