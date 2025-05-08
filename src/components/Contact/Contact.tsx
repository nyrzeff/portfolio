import React, { useState } from "react";
import type { FormData, FormStatus } from "@/types/contact";
import styles from "./Contact.module.scss";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const setText = (status: FormStatus) => {
    switch (status) {
      case "sending":
        return "Sending...";
        break;
      case "success":
        return "Sent!";
        break;
      case "error":
        return "Something went wrong!";
        break;
      default:
        return "Send";
    }
  };

  return (
    <section id={styles["contact"]}>
      <h2>Contact me</h2>
      <p>
        No need for formalities, whether you want to hire me, discuss a
        project/idea or simply talk, just drop a message below:
      </p>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        <div className={styles["name-wrapper"]}>
          <label>Name</label>
          <input
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            type="text"
          />
        </div>
        <div className={styles["email-wrapper"]}>
          <label>Email</label>
          <input
            name="email"
            placeholder="example@domain.com"
            value={formData.email}
            onChange={handleChange}
            required
            type="text"
          />
        </div>
        <div className={styles["message-wrapper"]}>
          <label>Message</label>
          <textarea
            name="message"
            placeholder="Hey, are you interested in a project..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          value="Send"
          className={`${styles["send"]} ${styles[status]}`}
        >
          <strong>{setText(status)}</strong>
        </button>
      </form>
    </section>
  );
};
