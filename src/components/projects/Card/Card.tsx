import { ImageGallery } from "@components/projects";
import type { StackItem } from "@/types/stack";
import { stackItems } from "@assets/icons";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  subtitle: string;
  stack: string[];
  content: string;
  images: string[];
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  stack,
  content,
  images,
}: CardProps) => {
  const items = stackItems.filter((item) => stack.includes(item.title));

  return (
    <article className={styles["card"]}>
      <fieldset>
        <legend>{title}</legend>
        <div className={styles["card-stack"]}>
          <ul className={styles["stack-list"]}>
            {items.map((item: StackItem, index) => (
              <li key={index} className={styles["stack-list-item"]}>
                <i className={item.devicon}></i>
              </li>
            ))}
          </ul>
        </div>
      </fieldset>
      <div className={styles["card-image"]}>
        <ImageGallery title={title} subtitle={subtitle} images={images} />
      </div>
      <div className={styles["card-content"]}>
        <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
      </div>
    </article>
  );
};
