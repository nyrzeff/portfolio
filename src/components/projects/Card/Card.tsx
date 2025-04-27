import { ImageGallery } from "@components/projects";
import Markdown from "react-markdown";
import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  subtitle: string;
  content: string;
  images: string[];
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  content,
  images,
}: CardProps) => {
  return (
    <article className={styles["card"]}>
      <h1 className={styles["card-title"]}>{title}</h1>
      <h2 className={styles["card-subtitle"]}>{subtitle}</h2>
      <div className={styles["card-image"]}>
        <ImageGallery images={images} />
      </div>
      <div className={styles["card-content"]}>
        <Markdown>{content}</Markdown>
      </div>
    </article>
  );
};
