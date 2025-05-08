import styles from "./ImageGallery.module.scss";

interface ImageData {
  images: string[];
}

export const ImageGallery: React.FC<ImageData> = ({ images }: ImageData) => {
  return (
    <div className={styles["image-container"]}>
      {images.map((image, index) => (
        <div key={index} className={styles["image"]}>
          <img src={image ?? ""} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};
