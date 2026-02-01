import { useState, useEffect, useRef } from "react";
import { ImageGallery } from "./ImageGallery/";
import type { StackItem } from "@/types/stack";
import type { Frontmatter } from "@/types/markdown";
import { stackItems } from "@assets/icons";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useScreen } from "@/hooks/useScreen";
import styles from "./Card.module.scss";

interface CardProps extends Frontmatter {
    content: string | null;
    images: string[];
}

export const Card: React.FC<CardProps> = ({
    id,
    title,
    subtitle,
    repo,
    startDate,
    endDate,
    stack,
    colors,
    tags,
    content,
    images,
}: CardProps) => {
    const dialog = useRef<HTMLDialogElement>(null);
    const intro = useRef<HTMLDivElement>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const items = stackItems.filter((item) => stack.includes(item.title));
    const { isDesktopExperience } = useScreen();

    useEffect(() => {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (dialog.current instanceof HTMLDialogElement) {
                    setModalOpen(false);
                    dialog.current.close();
                    dialog.current.style.display = "none";

                    const html = document.documentElement;
                    html.style.overflow = "auto";
                    html.style.position = "static";
                }
            }
        });

        if (!content && intro.current) {
            intro.current.style.opacity = "0.5";

            const button = intro.current.querySelector("button");
            if (button) button.style.pointerEvents = "none";

            const summary = intro.current.querySelector("summary");

            intro.current.addEventListener("mouseenter", () => {
                if (!summary) return;
                summary.textContent = "In progress...";
            });

            intro.current.addEventListener("mouseleave", () => {
                if (!summary) return;
                summary.textContent = title;
            });
        }
    }, []);

    const gradient = (degrees: number): string =>
        `linear-gradient(${degrees}deg, ${colors && (colors[0] ?? "#ffffff")}, ${colors && (colors[1] ?? "#000000")})`;

    const handleDialog = (show: boolean) => {
        if (dialog.current instanceof HTMLDialogElement) {
            const html = document.documentElement;

            if (show) {
                setModalOpen(true);
                dialog.current.showModal();
                dialog.current.style.display = "flex";

                html.style.overflow = "hidden";
                html.style.position = "fixed";

                if (images.length === 0 && isDesktopExperience) {
                    dialog.current.style.maxWidth = "40dvw";
                    const projectText = dialog.current
                        .children[2] as HTMLElement;
                    projectText.style.paddingInline = "5dvw";
                }
            } else {
                setModalOpen(false);
                dialog.current.close();
                dialog.current.style.display = "none";

                html.style.overflow = "auto";
                html.style.position = "static";
            }
        }
    };

    const DialogButton = (show: boolean) => (
        <button
            className={styles["dialog-button"]}
            type="button"
            onClick={() => handleDialog(show)}
            style={modalOpen ? { marginTop: "1rem", marginRight: "1rem" } : {}}
        >
            {show ? (
                <svg className={styles["dialog-symbol"]}>
                    <polyline points="5 5,15 5,5 5,5 15" />
                    <line x1="5" y1="5" x2="15" y2="15" />
                    <polyline points="35 5,25 5,35 5,35 15" />
                    <line x1="35" y1="5" x2="25" y2="15" />
                    <polyline points="5 35,15 35,5 35,5 25" />
                    <line x1="5" y1="35" x2="15" y2="25" />
                    <polyline points="35 35,25 35,35 35,35 25" />
                    <line x1="35" y1="35" x2="25" y2="25" />
                </svg>
            ) : (
                <svg className={styles["dialog-symbol"]}>
                    <polyline points="5 5,35 35" />
                    <polyline points="5 35,35 5" />
                </svg>
            )}
        </button>
    );

    return (
        <article className={styles["card"]}>
            <div ref={intro} className={styles["card-intro"]}>
                <div style={{ background: gradient(45) }}></div>
                <summary>{title}</summary>
                {DialogButton(true)}
            </div>
            {modalOpen && <div className={styles["overlay"]} />}
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
                {images.length > 0 && (
                    <div className={styles["project-images"]}>
                        <ImageGallery
                            title={title}
                            subtitle={subtitle}
                            images={images}
                            colors={colors ?? []}
                        />
                    </div>
                )}
            </dialog>
        </article>
    );
};
