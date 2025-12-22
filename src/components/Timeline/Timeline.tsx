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
        const ySpacing: number = 30;
        let xOffset: number = 0;
        let dateRectX: number = 0;
        let multiplier: number = -1;
        let textYOffset: number = 0;

        const container: HTMLElement | null =
            document.querySelector(".container");

        if (!container) return;

        const gantt: HTMLElement | null =
            document.getElementById("gantt");

        if (!gantt) return;

        let projContainerYOffset: number = 0;

        const projContainer: SVGGElement =
            document.createElementNS("http://www.w3.org/2000/svg", "g");
        projContainer.classList.add("proj-container");
        gantt.appendChild(projContainer);

        const dateContainer: SVGGElement =
            document.createElementNS("http://www.w3.org/2000/svg", "g");
        dateContainer.classList.add("date-container");
        gantt?.appendChild(dateContainer);

        let widestProjTitleWidth: number = 0;

        for (let i = 0; i < projects.length; i++) {
            const proj: Project = projects[i];

            const projRow: SVGGElement =
                document.createElementNS("http://www.w3.org/2000/svg", "g");
            projRow.classList.add("proj-row");
            projContainer.appendChild(projRow);

            const projTitle: SVGTextElement =
                document.createElementNS("http://www.w3.org/2000/svg", "text");
            projTitle.style.fontSize = `${fontSize}em`;
            projTitle.style.fill = "white";
            projTitle.textContent = proj.title;
            projRow.appendChild(projTitle);

            const projBar: SVGRectElement =
                document.createElementNS("http://www.w3.org/2000/svg", "rect");
            projBar.classList.add("proj-bar");
            projBar.style.fill = "#4d94ff";
            projRow.appendChild(projBar);

            const projTitleDim: DOMRect =
                projTitle.getBoundingClientRect();

            if (projTitleDim.width > widestProjTitleWidth)
                widestProjTitleWidth = projTitleDim.width;

            projTitle.setAttribute("x", "0");
            projTitle.setAttribute("y",
                `${(projTitleDim.height + ySpacing) * i}`);

            projBar.addEventListener("mouseenter", (e) => {
                displayTooltip(e, proj);
            });

            projBar.addEventListener("mouseleave", () => {
                if (tooltip)
                    tooltip.style.display = "none";
            });
        }

        const containerHeight: number =
            container.getBoundingClientRect().height;

        const timelineHeaderHeight: number | undefined =
            document.querySelector("#timeline > header")
                ?.getBoundingClientRect().height;

        if (containerHeight && timelineHeaderHeight) {
            document.getElementById("timeline")!.style.height =
                `${containerHeight + timelineHeaderHeight}px`;
        }

        xOffset = dateRectX = widestProjTitleWidth + 30;

        for (let date of dates) {
            const formattedDate: string = formatDate(date);

            const dateCell: SVGGElement =
                document.createElementNS("http://www.w3.org/2000/svg", "g");
            dateCell.classList.add("date-cell");
            dateContainer.appendChild(dateCell);

            const dateText: SVGTextElement =
                document.createElementNS("http://www.w3.org/2000/svg", "text");
            dateText.style.fill = "white";
            dateText.style.fontSize = `${fontSize}em`;
            dateText.textContent = formattedDate;
            dateCell.appendChild(dateText);

            const days: number = getDaysInMonth(date);
            const dateTextDim: DOMRect =
                dateText.getBoundingClientRect();

            // all cells need to be multiplied by the same number
            if (multiplier === -1)
                multiplier =
                    (Math.ceil(dateTextDim.width / days) * 1.3);

            const dateRect: SVGRectElement =
                document.createElementNS("http://www.w3.org/2000/svg", "rect");
            dateRect.classList.add("date-rect");
            dateRect.setAttribute("x", `${dateRectX}`);
            dateRect.setAttribute("y", "0");
            dateRect.setAttribute("width", `${days * multiplier}px`);
            dateRect.setAttribute("height",
                `${dateTextDim.height * 2}px`);
            dateRect.style.fill = "#0f0f0f";
            dateCell.insertAdjacentElement("afterbegin", dateRect);

            const dateRectDim: DOMRect =
                dateRect.getBoundingClientRect();

            const dateTextX: number = dateRectX +
                ((dateRectDim.width -
                    dateTextDim.width) / 2);

            textYOffset = dateRectDim.y - dateTextDim.y;
            const dateTextY: number = textYOffset +
                ((dateRectDim.height -
                    dateTextDim.height) / 2);

            // console.group("Date text y");
            // console.log("Y1");
            // console.log(dateRectDim.y);
            // console.log("Y2");
            // console.log(dateTextDim.y);
            // console.log("Result");
            // console.log(dateRectDim.y - dateTextDim.y);
            // console.groupEnd();
            //
            // console.group("Text Positioning");
            // console.log("Calculation: ");
            // console.log(`${dateRectX} + (${dateRectDim.width} - ${dateTextDim.width}) / 2`);
            // console.log("Cx1:");
            // console.log(dateRectX);
            // console.log("Cx2:");
            // console.log(dateRectX + dateRectDim.width);
            // console.log("Tx1:");
            // console.log(dateTextX);
            // console.log("Tx2:");
            // console.log(dateTextX + dateTextDim.width);
            // console.log("Veredict: ");
            // console.log(`Distance between Cx1 and Tx1: ${dateTextX - dateRectX}`);
            // console.log(`Distance between Cx2 and Tx2: ${(dateRectX + dateRectDim.width) - (dateTextX + dateTextDim.width)}`);
            // console.groupEnd();

            dateText.setAttribute("x", `${dateTextX}`);
            dateText.setAttribute("y", `${dateTextY}`);

            dateRectX += dateRectDim.width;
        }

        const dateContainerDim: DOMRect =
            dateContainer.getBoundingClientRect();

        projContainerYOffset =
            dateContainerDim.height + textYOffset + 30;

        const ganttWidth: number = dateRectX;

        gantt.setAttribute("width", `${ganttWidth}px`);
        gantt.style.width = `${ganttWidth + 1}px`;

        for (let i = 0; i < projects.length; i++) {
            const proj: Project = projects[i];

            const projRow = projContainer.children[i] as HTMLElement;
            const projTitle = projRow.children[0] as HTMLElement;
            const projBar = projRow.children[1] as HTMLElement;

            const projTitleDim: DOMRect =
                projTitle.getBoundingClientRect();

            projTitle.setAttribute("y", `${projContainerYOffset +
                ((projTitleDim.height + ySpacing) * i)}`);

            const elapsedDays: number = getAmountOfDays(
                new Date(proj.startDate),
                proj.endDate === "Present"
                    ? new Date(Date.now())
                    : new Date(proj.endDate)
            );

            projBar.setAttribute("width",
                `${elapsedDays * multiplier}`);

            projBar.setAttribute("height",
                `${projTitleDim.height}`);

            projBar.setAttribute("x", `${xOffset + ((getAmountOfDays(
                new Date(
                    oldestProjectStartDate.getUTCFullYear(),
                    oldestProjectStartDate.getMonth(),
                    1,
                ),
                new Date(proj.startDate))) * multiplier)}`);

            projBar.setAttribute("y",
                `${(projContainerYOffset - textYOffset) +
                ((projTitleDim.height + ySpacing) * i)}`);
        }

        const projContainerHeight: number =
            projContainer?.getBoundingClientRect().height;

        const ganttHeight: number =
            projContainerHeight + projContainerYOffset;

        gantt.setAttribute("height", `${ganttHeight}px`);
        gantt.style.height = `${ganttHeight}px`;
    }

    function createTooltip(): SVGGElement {
        const tt =
            document.createElementNS("http://www.w3.org/2000/svg", "g");

        tt.classList.add("tooltip");
        tt.style.display = "none";

        const rect =
            document.createElementNS("http://www.w3.org/2000/svg", "rect");

        rect.style.fill = "#4d94ff";

        const text =
            document.createElementNS("http://www.w3.org/2000/svg", "text");

        text.style.fill = "white";
        text.style.fontSize = `${fontSize / 1.5}em`;

        let fragments = [];

        for (let i = 0; i < Object.keys(projects[0]).length; i++) {
            fragments[i] =
                document.createElementNS("http://www.w3.org/2000/svg", "tspan");
            text.appendChild(fragments[i]);
        }

        tt.insertAdjacentElement("beforeend", rect);
        tt.insertAdjacentElement("beforeend", text);

        return tt;
    }

    const displayTooltip = (e: any, proj: Project): void => {
        if (!tooltip) return;

        if (hasBeenExecutedOnce) {
            tooltip.style.display = "block";
        }

        const padding: number = 10;

        const gantt: HTMLElement = e.relatedTarget;

        if (!gantt) {
            tooltip.style.display = "none";
            return;
        }

        const ganttDim: DOMRect = gantt.getBoundingClientRect();

        let ttX: number = (e.clientX - ganttDim.x) - padding;
        let ttY: number = (e.clientY - ganttDim.y) - 100;

        let textX: number = ttX + padding;

        const ttRect = tooltip.children[0] as HTMLElement;
        const ttText = tooltip.children[1] as HTMLElement;

        if (!ttRect || !ttText) return;

        let textFragments: HTMLCollection = ttText.children;

        let widestSpanWidth: number = 0;

        const amountOfProperties: number = Object.keys(proj).length;

        for (let i = 0; i < amountOfProperties; i++) {
            const property: [string, any] = Object.entries(proj!)[i];

            let spanDim: DOMRect =
                textFragments[i].getBoundingClientRect();

            let textY: number =
                ttY + (spanDim.height * (i + 1));

            textFragments[i].textContent =
                `${beautify(property[0])}: ${property[1]}`;
            textFragments[i].setAttribute("x", `${textX}`);
            textFragments[i].setAttribute("y", `${textY}`);

            // get freshly computed span dimensions
            spanDim = textFragments[i].getBoundingClientRect();

            if (spanDim.width > widestSpanWidth)
                widestSpanWidth = spanDim.width;

            // avoid computing multiple times
            const estimatedRectHeight = spanDim.height * amountOfProperties
                + padding * 2;

            if (ttY + estimatedRectHeight >
                ganttDim.height) {
                const visibleRectHeight: number = ganttDim.height - ttY;
                const yOffset: number =
                    estimatedRectHeight - visibleRectHeight;

                textY -= yOffset;
                ttY -= yOffset;

                textFragments[i].setAttribute("y", `${textY}`);
            }
        }

        widestSpanWidth += padding;

        if (textX + widestSpanWidth > ganttDim.width) {
            for (let i = 0; i < Object.keys(proj!).length; i++) {
                const visibleTextWidth: number =
                    ganttDim.width - textX;
                const xOffset: number =
                    widestSpanWidth - visibleTextWidth;

                textX -= xOffset;
                ttX -= xOffset;

                textFragments[i].setAttribute("x", `${textX}`);
            }
        }

        const textDim: DOMRect = ttText.getBoundingClientRect();
        const width: number = textDim.width + padding * 2;
        const height: number = textDim.height + padding * 2;

        ttRect.setAttribute("x", `${ttX}`);
        ttRect.setAttribute("y", `${ttY}`);

        ttRect.setAttribute("width", `${width}px`);
        ttRect.setAttribute("height", `${height}px`);

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
