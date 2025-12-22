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

    let fontSize = 1;
    let [tooltip] = useState<SVGGElement>(() => createTooltip());

    let hasBeenExecutedOnce = false;

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
        const ySpacing = 30;

        const xOffset = fontSize * 100;
        let dateRectangleX = xOffset;
        let multiplier = -1;
        let textYOffset = 0;

        const gantt =
            document.getElementById("gantt");

        const container =
            document.querySelector(".container");

        const dateContainer =
            document.createElementNS("http://www.w3.org/2000/svg", "g");
        dateContainer.classList.add("date-container");
        gantt?.appendChild(dateContainer);

        for (let date of dates) {
            // console.count("Run");
            const formattedDate = formatDate(date);

            const dateText =
                document.createElementNS("http://www.w3.org/2000/svg", "text");

            dateText.style.fill = "white";
            dateText.style.fontSize = `${fontSize}em`;
            dateText.textContent = formattedDate;

            const dateCell =
                document.createElementNS("http://www.w3.org/2000/svg", "g");
            dateCell?.appendChild(dateText);

            dateCell.classList.add("date-cell");
            dateContainer.appendChild(dateCell);

            const days = getDaysInMonth(date);
            const dateTextDimensions = dateText.getBoundingClientRect();

            if (multiplier === -1)
                multiplier =
                    (Math.ceil(dateTextDimensions.width / days) * 1.3);

            const dateRectangle =
                document.createElementNS("http://www.w3.org/2000/svg", "rect");

            dateCell?.insertAdjacentElement("afterbegin", dateRectangle);

            dateRectangle.classList.add("date-rectangle");
            dateRectangle.setAttribute("x", `${dateRectangleX}`);
            dateRectangle.setAttribute("y", "0");
            dateRectangle.setAttribute("width", `${days * multiplier}px`);
            dateRectangle
                .setAttribute("height",
                    `${dateTextDimensions.height * 2}px`);
            dateRectangle.style.fill = "#0f0f0f";

            const dateRectangleDimensions =
                dateRectangle.getBoundingClientRect();

            const dateTextX =
                dateRectangleX
                + ((dateRectangleDimensions.width - dateTextDimensions.width)
                    / 2);

            textYOffset = dateRectangleDimensions.y - dateTextDimensions.y;
            const dateTextY = textYOffset + ((dateRectangleDimensions.height
                - dateTextDimensions.height) / 2);

            // console.group("Date text y");
            // console.log("Y1");
            // console.log(dateRectangleDimensions.y);
            // console.log("Y2");
            // console.log(dateTextDimensions.y);
            // console.log("Result");
            // console.log(dateRectangleDimensions.y - dateTextDimensions.y);
            // console.groupEnd();
            //
            // console.group("Text Positioning");
            // console.log("Calculation: ");
            // console.log(`${dateRectangleX} + (${dateRectangleDimensions.width} - ${dateTextDimensions.width}) / 2`);
            // console.log("Cx1:");
            // console.log(dateRectangleX);
            // console.log("Cx2:");
            // console.log(dateRectangleX + dateRectangleDimensions.width);
            // console.log("Tx1:");
            // console.log(dateTextX);
            // console.log("Tx2:");
            // console.log(dateTextX + dateTextDimensions.width);
            // console.log("Veredict: ");
            // console.log(`Distance between Cx1 and Tx1: ${dateTextX - dateRectangleX}`);
            // console.log(`Distance between Cx2 and Tx2: ${(dateRectangleX + dateRectangleDimensions.width) - (dateTextX + dateTextDimensions.width)}`);
            // console.groupEnd();

            dateText.setAttribute("x", `${dateTextX}`);
            dateText.setAttribute("y", `${dateTextY}`);

            dateRectangleX += dateRectangleDimensions.width;
        }

        let projectContainerYOffset =
            (dateContainer.getBoundingClientRect().height) * 6;

        const ganttWidth = dateRectangleX;

        const projectContainer =
            document.createElementNS("http://www.w3.org/2000/svg", "g");
        projectContainer.classList.add("project-container");
        gantt?.appendChild(projectContainer);

        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];

            const projectTitle =
                document.createElementNS("http://www.w3.org/2000/svg", "text");

            projectTitle.style.fontSize = `${fontSize}em`;
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

            const elapsedDays = getAmountOfDays(
                new Date(project.startDate),
                project.endDate === "Present"
                    ? new Date(Date.now())
                    : new Date(project.endDate)
            );

            projectBar.setAttribute("width",
                `${elapsedDays * multiplier}`);

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

        const ganttHeight =
            projectContainerHeight + projectContainerYOffset;

        gantt?.setAttribute("width", `${ganttWidth}px`);
        gantt?.setAttribute("height", `${ganttHeight}px`);

        gantt!.style.width = `${ganttWidth + 1}px`;
        gantt!.style.height = `${ganttHeight}px`;

        const containerHeight = container?.getBoundingClientRect().height;

        const timelineHeaderHeight =
            document.querySelector("#timeline > header")
                ?.getBoundingClientRect().height;

        if (containerHeight && timelineHeaderHeight) {
            document.getElementById("timeline")!.style.height =
                `${containerHeight + timelineHeaderHeight}px`;
        }
    }

    function createTooltip(): SVGGElement {
        const tt =
            document.createElementNS("http://www.w3.org/2000/svg", "g");

        tt.classList.add("tooltip");
        tt.style.display = "none";

        const rectangle =
            document.createElementNS("http://www.w3.org/2000/svg", "rect");

        rectangle.style.fill = "#4d94ff";

        const text =
            document.createElementNS("http://www.w3.org/2000/svg", "text");

        text.style.fill = "white";
        text.style.fontSize = `${fontSize}em`;

        let fragments = [];

        for (let i = 0; i < Object.keys(projects[0]).length; i++) {
            fragments[i] =
                document.createElementNS("http://www.w3.org/2000/svg", "tspan");
            text.appendChild(fragments[i]);
        }

        tt.insertAdjacentElement("beforeend", rectangle);
        tt.insertAdjacentElement("beforeend", text);

        return tt;
    }

    const displayTooltip = (e: any, project: Project): void => {
        if (!tooltip) return;

        if (hasBeenExecutedOnce) {
            tooltip.style.display = "block";
        }

        const padding = 10;

        const gantt = e.relatedTarget;
        const b = gantt.getBoundingClientRect();

        const tooltipX = (e.clientX - b.x) - padding;
        const tooltipY = (e.clientY - b.y) - 100;

        tooltip.setAttribute("x", tooltipX.toString());
        tooltip.setAttribute("y", tooltipY.toString());

        const textX = tooltipX + padding;

        const tooltipContainer = tooltip.children[0] as HTMLElement;
        const tooltipText = tooltip.children[1] as HTMLElement;

        if (!tooltipContainer || !tooltipText) return;

        let textFragments = tooltipText.children;

        for (let i = 0; i < Object.keys(project!).length; i++) {
            const property = Object.entries(project!)[i];

            const spanDimensions = textFragments[i].getBoundingClientRect()
            const textY = tooltipY + (spanDimensions.height * (i + 1));

            textFragments[i].textContent =
                `${beautify(property[0])}: ${property[1]}`;
            textFragments[i].setAttribute("x", textX.toString());
            textFragments[i].setAttribute("y", textY.toString());
        }

        tooltipContainer.setAttribute("x", tooltipX.toString());
        tooltipContainer.setAttribute("y", tooltipY.toString());

        const textDimensions = tooltipText.getBoundingClientRect();
        const width = textDimensions.width + padding * 2;
        const height = textDimensions.height + padding * 2;

        tooltipContainer.setAttribute("width", `${width}px`);
        tooltipContainer.setAttribute("height", `${height}px`);

        gantt.appendChild(tooltip);

        hasBeenExecutedOnce = true;
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
