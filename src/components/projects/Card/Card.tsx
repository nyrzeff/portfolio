import { ImageGallery } from "@components/projects";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
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
      <header className={styles["card-header"]}>
        <h2 className={styles["card-title"]}>
          {title} - {subtitle}
        </h2>
      </header>
      <div className={styles["card-content"]}>
        <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
      </div>
      <div className={styles["card-image"]}>
        <ImageGallery images={images} />
      </div>
    </article>
  );
};
