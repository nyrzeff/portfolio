import styles from "./ImageGallery.module.scss";

interface ImageData {
    title: string;
    subtitle: string;
    images: string[];
}

export const ImageGallery: React.FC<ImageData> = ({
    title,
    subtitle,
    images,
}: ImageData) => {
    const imageDescriptor = `${title} - ${subtitle}`;

    return (
        <ul className={styles["image-container"]}>
            {images.map((image, index) => (
                <li key={index} className={styles["image"]}>
                    <img
                        src={image}
                        alt={`${imageDescriptor}
                        (image ${index + 1})`}
                    />
                </li>
            ))}
        </ul>
    );
};
