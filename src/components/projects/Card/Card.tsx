import { useState, useEffect, useRef } from "react";
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
    const [modalOpen, setModalOpen] = useState(false);
    const items = stackItems.filter((item) => stack.includes(item.title));

    useEffect(() => {
        const html = document.documentElement;

        if (modalOpen) html.classList.add("modal-open");
        else html.classList.remove("modal-open");

        return () => html.classList.remove("modal-open");
    }, [modalOpen]);

    if (dialog.current instanceof HTMLDialogElement) {
        modalOpen ? dialog.current.showModal() : dialog.current.close();
    }

    const gradient = (degrees: number): string =>
        `linear-gradient(${degrees}deg, ${colors[0]}, ${colors[1]})`;

    const DialogButton = (show: boolean) => (
        <button
            className={styles["dialog-button"]}
            type="button"
            onClick={() => setModalOpen(show)}
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
                </svg>
            ) : (
                <svg className={styles["dialog-symbol"]}>
                    <polyline points="5 5,25 25" />
                    <polyline points="5 25,25 5" />
                </svg>
            )}
        </button>
    );

    return (
        <article className={styles["card"]}>
            <div className={styles["card-intro"]}>
                <div style={{ background: gradient(45) }}></div>
                <summary>{title}</summary>
                {DialogButton(true)}
            </div>
            <dialog className={styles["project-content"]} ref={dialog}>
                <div className={styles["project-header-container"]}>
                    <div className={styles["project-header"]}>
                        <summary
                            style={{
                                background: gradient(90),
                                whiteSpace: "nowrap",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {title}
                        </summary>
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
                    <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
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
