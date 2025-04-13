import { ImageGallery } from "@components";
import styles from "./Card.module.scss";
import Markdown from "react-markdown";

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
    <article className={styles.card}>
      <h1 className={styles.cardTitle}>{title}</h1>
      <h2 className={styles.cardSubtitle}>{subtitle}</h2>
      <div className={styles.cardImage}>
        <ImageGallery images={images} />
      </div>
      <div className={styles.cardContent}>
        <Markdown class={styles.cardText}>{content}</Markdown>
      </div>
    </article>
  );
};
