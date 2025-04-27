import { useState } from "react";
import styles from "./ImageGallery.module.scss";

interface ImageData {
  images: string[];
}

export const ImageGallery: React.FC<ImageData> = ({ images }: ImageData) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className={styles["image-container"]}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles["image"]}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image ?? ""} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className={styles["fullscreen-image-container"]}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Fullscreen"
            className={styles["fullscreen-image"]}
          />
        </div>
      )}
    </>
  );
};
