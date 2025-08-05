import styles from "./ImageGallery.module.scss";

interface ImageData {
  title: string;
  subtitle: string;
  images: string[];
}

export const ImageGallery: React.FC<ImageData> = ({ title, subtitle, images }: ImageData) => {
  let imageDescriptor = `${title} - ${subtitle}`;

  return (
    <div className={styles["image-container"]}>
      {images.map((image, index) => (
        <div key={index} className={styles["image"]}>
          <img src={image ?? ""} alt={`${imageDescriptor} (image ${index + 1})`} />
        </div>
      ))}
    </div>
  );
};
