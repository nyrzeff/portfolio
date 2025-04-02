import React from "react";
import ImageGallery from "../ImageGallery";
import { IGatsbyImageData } from "gatsby-plugin-image";
import "./style.scss";

interface CardProps {
  title: string;
  subtitle: string;
  content: string;
  images: IGatsbyImageData[];
}

const Card: React.FC<CardProps> = ({ title, subtitle, content, images }) => {
  return (
    <div className="card">
      <h1 className="card-title">{title}</h1>
      <h2 className="card-subtitle">{subtitle}</h2>
      <div className="card-image">
        <ImageGallery images={images} />
      </div>
      <div className="card-content">
        <p
          className="card-text"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Card;
