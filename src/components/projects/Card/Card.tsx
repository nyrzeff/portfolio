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
      <div className={styles["card-image"]}>
        <ImageGallery title={title} subtitle={subtitle} images={images} />
      </div>
      <div className={styles["card-content"]}>
        <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
      </div>
    </article>
  );
};
