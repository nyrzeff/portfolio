import { useRef, useState } from "react";
import { useScreen } from "@/hooks/useScreen";
import styles from "./ImageGallery.module.scss";

interface ImageData {
    title: string;
    subtitle: string;
    images: string[];
    colors: string[];
}

export const ImageGallery: React.FC<ImageData> = ({
    title,
    subtitle,
    images,
    colors,
}: ImageData) => {
    const { isDesktopExperience } = useScreen();
    const imageContainer = useRef<HTMLUListElement>(null);
    const [buttonLeftDisabled, setButtonLeftDisabled] = useState<boolean>(true);
    const [buttonRightDisabled, setButtonRightDisabled] =
        useState<boolean>(false);

    const imageDescriptor = `${title} - ${subtitle}`;

    const goToPreviousImage = () => {
        imageContainer.current?.scrollBy(
            -imageContainer.current.clientWidth,
            0,
        );
    };

    const goToNextImage = () => {
        imageContainer.current?.scrollBy(imageContainer.current.clientWidth, 0);
    };

    function handleScroll() {
        imageContainer.current?.scrollLeft! <=
        imageContainer.current?.clientWidth!
            ? setButtonLeftDisabled(true)
            : setButtonLeftDisabled(false);

        const maxScroll =
            imageContainer.current?.scrollWidth! -
            imageContainer.current?.clientWidth!;

        imageContainer.current?.scrollLeft! >=
        maxScroll - imageContainer.current?.clientWidth!
            ? setButtonRightDisabled(true)
            : setButtonRightDisabled(false);
    }

    return (
        <>
            {!isDesktopExperience && (
                <em className={styles.tip}>Scroll to see other images </em>
            )}
            <div className={styles["image-gallery"]}>
                {isDesktopExperience && (
                    <button
                        style={{ color: colors[0] }}
                        disabled={buttonLeftDisabled}
                        onClick={goToPreviousImage}
                    >
                        ◄
                    </button>
                )}
                <ul
                    ref={imageContainer}
                    onScroll={handleScroll}
                    className={styles["image-container"]}
                >
                    {images.map((image, index) => (
                        <li key={image} className={styles["image"]}>
                            <img
                                src={image}
                                alt={`${imageDescriptor}
                        (image ${index + 1})`}
                            />
                        </li>
                    ))}
                </ul>
                {isDesktopExperience && (
                    <button
                        style={{ color: colors[1] }}
                        disabled={buttonRightDisabled}
                        onClick={goToNextImage}
                    >
                        ►
                    </button>
                )}
            </div>
        </>
    );
};
