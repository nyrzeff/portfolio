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
    let projects: Project[] = json.projects;
    if (!projects) return;

    let [tooltip, setTooltip] = useState<SVGGElement>(() => createTooltip());

    const oldestProjectStartDate = new Date(projects.at(0)!.startDate);

    const latestProject = projects.at(projects.length - 1)
    const latestProjectEndDate = latestProject!.endDate == "Present"
        ? new Date(Date.now()) : new Date(latestProject!.endDate);

    let dates = [];
    let date = oldestProjectStartDate;

    dates.push(date);

    while (date < latestProjectEndDate) {
        date = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate());
        dates.push(date);
    }

    useEffect(() => {
        createGanttChart(dates);
    }, []);

    function createGanttChart(dates: Date[]): void {
        const fontSize = 2;
        const ySpacing = 30;

        const xOffset = 200 + (100 * fontSize);
        let cellX = xOffset;
        let multiplier = 1;
        let textYOffset = 0;

        const gantt = document.getElementById("gantt");

        const dateContainer =
            document.createElementNS("http://www.w3.org/2000/svg", "g");
        dateContainer.classList.add("date-container");
        gantt?.appendChild(dateContainer);

        for (let date of dates) {
            // console.count("Run");
            const formattedDate = formatDate(date);

            const dateText =
                document.createElementNS("http://www.w3.org/2000/svg", "text");

            dateText.style.fontSize = `${fontSize}rem`;
            dateText.textContent = formattedDate;

            const dateCell =
                document.createElementNS("http://www.w3.org/2000/svg", "g");
            dateCell?.appendChild(dateText);

            dateCell.classList.add("date-cell");
            dateContainer.appendChild(dateCell);

            const days = getDaysInMonth(date);
            const dateTextDimensions = dateText.getBoundingClientRect();
            multiplier = Math.ceil(dateTextDimensions.width / days);

            const dateRectangle =
                document.createElementNS("http://www.w3.org/2000/svg", "rect");

            dateCell?.insertAdjacentElement("afterbegin", dateRectangle);

            dateRectangle.setAttribute("x", `${cellX}`);
            dateRectangle.setAttribute("y", "0");
            dateRectangle.setAttribute("width", `${days * multiplier}`);
            dateRectangle.setAttribute("height", `${dateTextDimensions.height}`);
            dateRectangle.style.fill = "white";

            const cellDimensions = dateRectangle.getBoundingClientRect();

            const dateTextX = cellX +
                ((cellDimensions.width - dateTextDimensions.width) / 2);
            textYOffset = cellDimensions.y - dateTextDimensions.y;
            const dateTextY = textYOffset;

            // console.group("Date text y");
            // console.log("Y1");
            // console.log(cellDimensions.y);
            // console.log("Y2");
            // console.log(dateTextDimensions.y);
            // console.log("Result");
            // console.log(cellDimensions.y - dateTextDimensions.y);
            // console.groupEnd();

            // console.group("Text Positioning");
            // console.log("Calculation: ");
            // console.log(`${cellX} + (${cellDimensions.width} - ${dateTextDimensions.width}) / 2`);
            // console.log("Cx1:");
            // console.log(cellX);
            // console.log("Cx2:");
            // console.log(cellX + cellDimensions.width);
            // console.log("Tx1:");
            // console.log(textX);
            // console.log("Tx2:");
            // console.log(textX + dateTextDimensions.width);
            // console.log("Veredict: ");
            // console.log(`Distance between Cx1 and Tx1: ${textX - cellX}`);
            // console.log(`Distance between Cx2 and Tx2: ${(cellX + cellDimensions.width) - (textX + dateTextDimensions.width)}`);
            // console.groupEnd();

            dateText.setAttribute("x", `${dateTextX}`);
            dateText.setAttribute("y", `${dateTextY}`);

            cellX += cellDimensions.width;
        }

        let projectContainerYOffset =
            (dateContainer.getBoundingClientRect().height) * 3;

        const ganttWidth = cellX;

        const projectContainer =
            document.createElementNS("http://www.w3.org/2000/svg", "g");
        projectContainer.classList.add("project-container");
        gantt?.appendChild(projectContainer);

        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];

            const projectTitle =
                document.createElementNS("http://www.w3.org/2000/svg", "text");

            projectTitle.style.fontSize = `${fontSize}rem`;
            projectTitle.style.fill = "white";
            projectTitle.textContent = project.title;

            const projectRow =
                document.createElementNS("http://www.w3.org/2000/svg", "g");
            projectRow?.appendChild(projectTitle);

            projectRow.classList.add("project-row");
            projectContainer.appendChild(projectRow);

            const projectTitleDimensions =
                projectTitle.getBoundingClientRect();

            projectTitle.setAttribute("x", "0");
            projectTitle.setAttribute("y",
                `${projectContainerYOffset +
                ((projectTitleDimensions.height + ySpacing) * i)
                }`);

            const projectBar =
                document.createElementNS("http://www.w3.org/2000/svg", "rect");

            projectRow?.appendChild(projectBar);

            projectBar.classList.add("project-bar");
            projectBar.style.fill = "#4d94ff";

            projectBar.setAttribute("width", `${(getAmountOfDays(
                new Date(project.startDate),
                project.endDate === "Present"
                    ? new Date(Date.now())
                    : new Date(project.endDate))) * multiplier
                } `);

            projectBar.setAttribute("height",
                `${projectTitleDimensions.height}`);

            projectBar.addEventListener("mouseenter", (e) => {
                displayTooltip(e, project);
            });

            projectBar.addEventListener("mouseleave", () => {
                if (tooltip)
                    tooltip.style.display = "none";
            });

            projectBar.setAttribute("x", `${xOffset + ((getAmountOfDays(
                new Date(
                    oldestProjectStartDate.getUTCFullYear(),
                    oldestProjectStartDate.getMonth(),
                    1,
                ),
                new Date(project.startDate))) * multiplier)}`);

            projectBar.setAttribute("y",
                `${(projectContainerYOffset - textYOffset) +
                ((projectTitleDimensions.height + ySpacing) * i)}`);
        }

        const projectContainerHeight =
            projectContainer?.getBoundingClientRect().height as number;
        const additionalY =
            parseInt((projectContainer?.firstChild?.firstChild as HTMLElement)
                .attributes[2].value);

        gantt?.setAttribute("width", `${ganttWidth} `);
        gantt?.setAttribute("height",
            `${projectContainerHeight + additionalY} `);
    }

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
        text.style.fontSize = "1rem";

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

    const displayTooltip = (e: any, project: Project): void => {
        if (!tooltip) return;

        tooltip.style.display = "block";

        const padding = 10;

        const gantt = e.relatedTarget;
        const b = gantt.getBoundingClientRect();

        const tooltipX = (e.clientX - b.x) - padding;
        // const tooltipY = (e.clientY - b.y) - padding;
        const tooltipY = (e.clientY - b.y) - 100;

        tooltip.setAttribute("x", tooltipX.toString());
        tooltip.setAttribute("y", tooltipY.toString());

        const textX = tooltipX + padding;
        let textY = 0;

        const tooltipContainer = tooltip.children[0] as HTMLElement;
        const tooltipText = tooltip.children[1] as HTMLElement;

        if (!tooltipContainer || !tooltipText) return;

        let textFragments = tooltipText.children;

        for (let i = 0; i < Object.keys(project).length; i++) {
            const property = Object.entries(project)[i];

            textY = tooltipY + 20 * (i + 1);

            textFragments[i].textContent =
                `${beautify(property[0])
                }: ${property[1]} `;
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
                <svg id="gantt" />
            </div>
        </section >
    );
};
