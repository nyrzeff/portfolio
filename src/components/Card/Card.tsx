import React from "react";
import { ImageGallery } from "@/components";
import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  subtitle: string;
  content: string;
  images: string[];
}

console.log(styles);

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  content,
  images,
}) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.cardTitle}>{title}</h1>
      <h2 className={styles.cardSubtitle}>{subtitle}</h2>
      <div className={styles.cardImage}>
        <ImageGallery images={images} />
      </div>
      <div className={styles.cardContent}>
        <p
          className={styles.cardText}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};
