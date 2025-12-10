import { useState } from "react";
import json from "../../content/project-timeline.json";
import styles from "./Timeline.module.scss";
import "./Timeline.css";

interface Project {
    title: string;
    dateStart: string;
    dateEnd: string;
    description: string;
    technologies: string;
};

export const Timeline: React.FC = () => {
    let [tooltip, setTooltip] = useState<SVGGElement>();

    let projects: Project[] = json.projects;

    if (!projects) return;

    window.addEventListener("load", () => {
        const tt = createTooltip();
        setTooltip(tt);
    });

    const oldestProjectStartDate = new Date(projects.at(0)!.dateStart);

    const latestProject = projects.at(projects.length - 1)
    const latestProjectEndDate = latestProject!.dateEnd == "Present"
        ? new Date(Date.now()) : new Date(latestProject!.dateEnd);
    // const lastQuarter = Math.ceil(actualDate.getMonth() / 3);

    let dates = [];
    let date = new Date(oldestProjectStartDate);

    dates.push(date);

    while (date < latestProjectEndDate) {
        date = new Date(date.getFullYear(), date.getMonth() + 3, date.getDate());
        dates.push(date);
    }

    // console.log(dates);

    const formatQuarter = (date: Date) => {
        const chunks = date.toDateString().split(" ");
        return chunks[1] + " " + chunks[3];
    };

    const getAmountOfDays = (dateStart: Date, dateEnd: Date) => {
        // console.log(`End: ${dateEnd}\nStart: ${dateStart}`);
        // console.log((dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24));
        return (dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24);
    };

    const initialX = 200;

    function createTooltip(): SVGGElement {
        const tooltip =
            document.createElementNS("http://www.w3.org/2000/svg", "g");

        tooltip.classList.add("tooltip");
        tooltip.style.display = "none";

        const rectangle =
            document.createElementNS("http://www.w3.org/2000/svg", "rect");

        rectangle.style.fill = "#2de2e6";
        rectangle.style.width = "50";
        rectangle.style.height = "50";

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

    const displayTooltip = (project: Project, i: number) => {
        if (!tooltip) return;

        const tooltipContainer = tooltip.children[0] as HTMLElement;
        const tooltipText = tooltip.children[1] as HTMLElement;

        if (!tooltipContainer || !tooltipText) return;

        tooltip.style.display = "block";

        const containerX = (initialX + getAmountOfDays(oldestProjectStartDate,
            new Date(project.dateStart)));
        const containerY = (90 + (70 * i));

        tooltip.setAttribute("x", containerX.toString());
        tooltip.setAttribute("y", containerY.toString());

        const textX =
            (initialX + getAmountOfDays(oldestProjectStartDate,
                new Date(project.dateStart)));
        const textY = 100 + 70 * i;

        tooltip.insertAdjacentElement("beforeend", tooltipContainer);
        tooltip.insertAdjacentElement("beforeend", tooltipText);

        let textFragments = tooltipText.children;

        for (let i = 0; i < Object.keys(project).length; i++) {
            textFragments[i].innerHTML = Object.entries(project)[i][1];
            textFragments[i].setAttribute("x", textX.toString());
            textFragments[i].setAttribute("y", (textY + (20 * i)).toString());
        }

        const textDimensions = tooltipText.getBoundingClientRect();
        const x = textDimensions.width;
        const y = textDimensions.height;

        tooltipContainer.setAttribute("x", containerX.toString());
        tooltipContainer.setAttribute("y", containerY.toString());

        tooltipContainer.setAttribute("width", x.toString());
        tooltipContainer.setAttribute("height", y.toString());

        const gantt = document.getElementById("gantt");

        if (gantt) gantt.appendChild(tooltip);
    };

    return (
        <section id="timeline" className={styles["timeline"]}>
            <header className={styles["timeline-header"]}>
                <h2>Timeline</h2>
            </header>
            <svg id="gantt">
                {dates.map((date, i) => (
                    <>
                        <rect
                            fill="white"
                            x={initialX + (90 * i)}
                            y="10"
                            width={90}
                            height="45"
                        />
                        <text
                            x={(initialX + 10) + (90 * i)}
                            y="40"
                        >
                            {formatQuarter(date)}
                        </text>
                    </>
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
                            x={initialX + getAmountOfDays(
                                oldestProjectStartDate,
                                new Date(project.dateStart))}
                            y={100 + (70 * i)}
                            width={getAmountOfDays(new Date(
                                project.dateStart),
                                project.dateEnd === "Present"
                                    ? new Date(Date.now())
                                    : new Date(project.dateEnd))}
                            height="30"
                            onMouseEnter={() => {
                                displayTooltip(project, i)
                            }}
                            onMouseLeave={() => {
                                if (tooltip)
                                    tooltip.style.display = "none";
                            }}
                        />
                    </g>
                ))}
            </svg>
        </section>
    );
};
