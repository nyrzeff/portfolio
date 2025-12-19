import { useState, useEffect } from "react";
import json from "@/content/project-timeline.json";
import {
    getDaysInMonth,
    formatDate,
    getAmountOfDays,
    beautify
} from "@/lib/dateUtils";
import styles from "./Timeline.module.scss";
import "./Timeline.css";

interface Project {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies: string;
};

export const Timeline: React.FC = () => {
    let [tooltip, setTooltip] = useState<SVGGElement>();
    const initialX = 200;

    let projects: Project[] = json.projects;

    if (!projects) return;

    useEffect(() => {
        const tt = createTooltip();
        setTooltip(tt);
    }, []);

    const oldestProjectStartDate = new Date(projects.at(0)!.startDate);

    const latestProject = projects.at(projects.length - 1)
    const latestProjectEndDate = latestProject!.endDate == "Present"
        ? new Date(Date.now()) : new Date(latestProject!.endDate);
    // const lastQuarter = Math.ceil(actualDate.getMonth() / 3);

    let dates = [];
    let date = new Date(oldestProjectStartDate);

    dates.push(date);

    while (date < latestProjectEndDate) {
        date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
        dates.push(date);
    }

    let dateX = [];
    let c = 0;
    const multiplier = 3;

    for (let date of dates) {
        const d = getDaysInMonth(date) * multiplier;
        dateX.push(c);
        c += d;
    }

    // console.log(dates);

    const formatQuarter = (date: Date) => {
        const chunks = date.toDateString().split(" ");
        return chunks[1] + " " + chunks[3];
    };



    function createTooltip(): SVGGElement {
        const tooltip =
            document.createElementNS("http://www.w3.org/2000/svg", "g");

        tooltip.classList.add("tooltip");
        tooltip.style.display = "none";

        const rectangle =
            document.createElementNS("http://www.w3.org/2000/svg", "rect");

        rectangle.style.fill = "#4d94ff";

        const text =
            document.createElementNS("http://www.w3.org/2000/svg", "text");

        text.style.fill = "white";

        let fragments = [];

        for (let i = 0; i < Object.keys(projects[0]).length; i++) {
            fragments[i] =
                document.createElementNS("http://www.w3.org/2000/svg", "tspan");
            text.appendChild(fragments[i]);
        }

        tooltip.insertAdjacentElement("beforeend", rectangle);
        tooltip.insertAdjacentElement("beforeend", text);

        return tooltip;
    }

    const displayTooltip = (e: any, project: Project) => {
        if (!tooltip) return;

        // console.log(e);

        tooltip.style.display = "block";

        const padding = 10;

        const gantt = e.relatedTarget;
        const b = gantt.getBoundingClientRect();

        const tooltipX = (e.clientX - b.x) - padding;
        const tooltipY = (e.clientY - b.y) - padding;

        tooltip.setAttribute("x", tooltipX.toString());
        tooltip.setAttribute("y", tooltipY.toString());

        console.log(`
                    Client X: ${e.clientX} | SVG X: ${b.x}\n
                    Client Y: ${e.clientY} | SVG Y: ${b.y}\n
                    Final X: ${tooltipX} | Final Y: ${tooltipY}\n
                    `);

        const textX = tooltipX + padding;
        let textY = 0;

        const tooltipContainer = tooltip.children[0] as HTMLElement;
        const tooltipText = tooltip.children[1] as HTMLElement;

        if (!tooltipContainer || !tooltipText) return;

        // tooltip.insertAdjacentElement("beforeend", tooltipContainer);
        // tooltip.insertAdjacentElement("beforeend", tooltipText);

        let textFragments = tooltipText.children;

        for (let i = 0; i < Object.keys(project).length; i++) {
            const property = Object.entries(project)[i];

            textY = tooltipY + 20 * (i + 1);

            textFragments[i].innerHTML =
                `${beautify(property[0])}: ${property[1]}`;
            textFragments[i].setAttribute("x", textX.toString());
            textFragments[i].setAttribute("y", textY.toString());
        }

        const textDimensions = tooltipText.getBoundingClientRect();
        const x = textDimensions.width + padding * 2;
        const y = textDimensions.height + padding * 2;

        tooltipContainer.setAttribute("x", tooltipX.toString());
        tooltipContainer.setAttribute("y", tooltipY.toString());

        tooltipContainer.setAttribute("width", x.toString());
        tooltipContainer.setAttribute("height", y.toString());

        gantt.appendChild(tooltip);
    };

    return (
        <section id="timeline" className={styles["timeline"]}>
            <header className={styles["timeline-header"]}>
                <h2>Timeline</h2>
            </header>
            <div className="container">
                <svg
                    id="gantt"
                    // width={timescaleWidth * dates.length}
                    width="2000px"
                    height={90 * projects.length}
                >
                    {dates.map((date, i) => (
                        <g className="date-container">
                            <rect
                                fill="white"
                                x={initialX + dateX[i]}
                                y="10"
                                width={getDaysInMonth(date) * multiplier}
                                height="45"
                            />
                            <text
                                x={(initialX + 20) + dateX[i]}
                                y="40"
                            >
                                {formatQuarter(date)}
                            </text>
                        </g>
                    ))}
                    {projects.map((project, i) => (
                        <g className="project-container">
                            <text
                                fill="white"
                                x="10"
                                y={120 + (70 * i)}
                            >
                                {project.title}
                            </text>
                            <rect
                                className="project"
                                fill="#4d94ff"
                                x={initialX + ((getAmountOfDays(
                                    new Date(
                                        oldestProjectStartDate.getUTCFullYear(),
                                        oldestProjectStartDate.getMonth(),
                                        1,
                                    ),
                                    new Date(project.startDate))) *
                                    multiplier)
                                }
                                y={100 + (70 * i)}
                                width={(getAmountOfDays(new Date(
                                    project.startDate),
                                    project.endDate === "Present"
                                        ? new Date(Date.now())
                                        : new Date(project.endDate)))
                                    * multiplier
                                }
                                height="30"
                                onMouseEnter={(e) => {
                                    displayTooltip(e, project)
                                }}
                                onMouseLeave={() => {
                                    if (tooltip)
                                        tooltip.style.display = "none";
                                }}
                            />
                        </g>
                    ))}
                </svg>
            </div>
        </section >
    );
};
