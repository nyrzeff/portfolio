import { useRef } from "react";
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
    colors: string[];
}

export const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    stack,
    content,
    images,
    colors,
}: CardProps) => {
    const dialog = useRef<HTMLDialogElement>(null);
    const items = stackItems.filter((item) => stack.includes(item.title));

    const gradient = `linear-gradient(145deg, ${colors[0]}, ${colors[1]})`;

    const handleDialog = (show: boolean): void => {
        if (dialog.current instanceof HTMLDialogElement) {
            show ? (
                dialog.current.style.display = "flex",
                dialog.current.showModal()
            ) : (
                dialog.current.style.display = "none",
                dialog.current.close()
            );
        }
    };

    const DialogButton = (show: boolean) => (
        <button
            className={styles["dialog-button"]}
            type="button"
            onClick={() => handleDialog(show)}
        >
            {show ? (
                <svg className={styles["dialog-symbol"]}>
                    <polyline points="5 5,10 5,5 5,5 10" />
                    <line x1="5" y1="5" x2="10" y2="10" />
                    <polyline points="25 5,20 5,25 5,25 10" />
                    <line x1="25" y1="5" x2="20" y2="10" />
                    <polyline points="5 25,10 25,5 25,5 20" />
                    <line x1="5" y1="25" x2="10" y2="20" />
                    <polyline points="25 25,20 25,25 25,25 20" />
                    <line x1="25" y1="25" x2="20" y2="20" />
                </svg>) : (
                <svg className={styles["dialog-symbol"]}>
                    <polyline points="5 5,25 25" />
                    <polyline points="5 25,25 5" />
                </svg>
            )}
        </button>
    );

    return (
        <article
            style={{ background: gradient }}
            className={styles["card"]}
        >
            <div className={styles["card-intro"]}>
                <summary>{title}</summary>
                {DialogButton(true)}
            </div>
            <dialog
                className={styles["project-content"]}
                ref={dialog}
            >
                <div className={styles["project-header-container"]}>
                    <div
                        style={{ background: gradient }}
                        className={styles["project-header"]}
                    >
                        <summary>{title}</summary>
                        {DialogButton(false)}
                    </div>
                </div>
                <div className={styles["project-stack"]}>
                    <ul className={styles["stack-list"]}>
                        {items.map((item: StackItem, index: number) => (
                            <li key={index}>
                                <i className={item.devicon}></i>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles["project-text"]}>
                    <Markdown rehypePlugins={[rehypeRaw]}>
                        {content}
                    </Markdown>
                </div>
                <div className={styles["project-images"]}>
                    <ImageGallery
                        title={title}
                        subtitle={subtitle}
                        images={images}
                    />
                </div>
            </dialog>
        </article>
    );
};
