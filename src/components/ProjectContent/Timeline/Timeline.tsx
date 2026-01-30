import { useRef, useLayoutEffect } from "react";
import {
    getDaysInMonth,
    formatDate,
    getAmountOfDays,
    beautify,
} from "@/lib/dateUtils";
import type { Frontmatter } from "@/types/markdown";
import styles from "./Timeline.module.scss";
import "./Timeline.css";

interface TimelineProps {
    // actually only includes the metadata (frontmatter) from each project
    projects?: Frontmatter[];
}

export const Timeline: React.FC<TimelineProps> = ({
    projects,
}: TimelineProps) => {
    if (!projects) return null;

    const usedProperties = [
        "title",
        "subtitle",
        "startDate",
        "endDate",
        "stack",
    ];

    if (projects && projects.length > 0) {
        // show only relevant properties in tooltip
        projects.map((proj: Frontmatter) => {
            Object.keys(proj).forEach((key) => {
                if (!usedProperties.includes(key)) {
                    delete proj[key as keyof Frontmatter];
                }
            });
            return proj;
        });
    }

    let gantt = useRef<SVGSVGElement>(null);

    let dates: Date[] | null = [];
    let oldestProjectStartDate: Date;
    let hasBeenExecutedOnce = false;

    const fontSize = 1;
    const defaultPadding = 50;

    dates = getDates();

    useLayoutEffect(() => {
        const tooltip = createTooltip();
        if (dates && tooltip) createGanttChart(dates, tooltip);
        if (gantt.current && tooltip) gantt.current.appendChild(tooltip);
    }, [dates]);

    function getDates(): Date[] | null {
        if (!projects || projects.length === 0) return null;

        oldestProjectStartDate = new Date(projects[0].startDate);

        const latestProject: Frontmatter | undefined = projects.at(
            projects.length - 1,
        );

        if (!latestProject) return null;

        const latestProjectEndDate: Date =
            latestProject.endDate == "Present"
                ? new Date(Date.now())
                : new Date(latestProject.endDate);

        let date: Date = oldestProjectStartDate;

        dates?.push(date);

        while (date < latestProjectEndDate) {
            date = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
            );
            dates?.push(date);
        }

        return dates;
    }

    function createGanttChart(dates: Date[], tooltip: SVGGElement): void {
        if (!projects || projects.length === 0) return;

        const ySpacing: number = defaultPadding;
        let xOffset = 0;
        let dateRectX = 0;
        let multiplier = -1;
        let textYOffset = 0;

        const container = document.querySelector(".container");

        if (!container || !gantt.current) return;

        let projContainerYOffset = 0;

        const projContainer: SVGGElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
        );
        projContainer.classList.add("proj-container");
        gantt.current.appendChild(projContainer);

        const dateContainer: SVGGElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
        );
        dateContainer.classList.add("date-container");
        gantt.current.appendChild(dateContainer);

        let widestProjTitleWidth = 0;

        for (let i = 0; i < projects.length; i++) {
            const proj: Frontmatter = projects[i];

            const projRow: SVGGElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g",
            );
            projRow.classList.add("proj-row");
            projContainer.appendChild(projRow);

            const projTitle: SVGTextElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text",
            );
            projTitle.style.fontSize = `${fontSize}em`;
            projTitle.style.fill = "white";
            projTitle.textContent = proj.title;
            projRow.appendChild(projTitle);

            const projBar: SVGRectElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect",
            );

            projBar.classList.add("proj-bar");
            projBar.style.fill = "#4d94ff";
            projRow.appendChild(projBar);

            const projTitleDim: DOMRect = projTitle.getBoundingClientRect();

            if (projTitleDim.width > widestProjTitleWidth)
                widestProjTitleWidth = projTitleDim.width;

            projTitle.setAttribute("x", "0");
            projTitle.setAttribute(
                "y",
                `${(projTitleDim.height + ySpacing) * i}`,
            );

            if (!hasBeenExecutedOnce) {
                // hack to prevent having to hover over the
                // project bar twice in order to show the tooltip
                projBar.addEventListener("mouseenter", (e: MouseEvent) => {
                    displayTooltip(e, proj, tooltip);
                });
            }

            projBar.addEventListener("mouseenter", (e: MouseEvent) => {
                displayTooltip(e, proj, tooltip);
            });

            projBar.addEventListener("mouseleave", () => {
                if (tooltip) tooltip.style.display = "none";
            });
        }

        xOffset = dateRectX = widestProjTitleWidth + defaultPadding;

        for (const date of dates) {
            const formattedDate: string = formatDate(date);

            const dateCell: SVGGElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g",
            );
            dateCell.classList.add("date-cell");
            dateContainer.appendChild(dateCell);

            const dateText: SVGTextElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text",
            );
            dateText.style.fill = "white";
            dateText.style.fontSize = `${fontSize}em`;
            dateText.textContent = formattedDate;
            dateCell.appendChild(dateText);

            const days: number = getDaysInMonth(date);
            const dateTextDim: DOMRect = dateText.getBoundingClientRect();

            // all cells need to be multiplied by the same number
            if (multiplier === -1)
                multiplier = Math.ceil(dateTextDim.width / days) * 1.3;

            const dateRect: SVGRectElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect",
            );
            dateRect.classList.add("date-rect");
            dateRect.setAttribute("x", `${dateRectX}`);
            dateRect.setAttribute("y", "1");
            dateRect.setAttribute("width", `${days * multiplier}px`);
            dateRect.setAttribute("height", `${dateTextDim.height * 2}px`);
            dateRect.style.fill = "#0f0f0f";
            dateCell.insertAdjacentElement("afterbegin", dateRect);

            const dateRectDim: DOMRect = dateRect.getBoundingClientRect();

            const dateTextX: number =
                dateRectX + (dateRectDim.width - dateTextDim.width) / 2;

            textYOffset = dateRectDim.y - dateTextDim.y;
            const dateTextY: number =
                textYOffset + (dateRectDim.height - dateTextDim.height) / 2;

            dateText.setAttribute("x", `${dateTextX}`);
            dateText.setAttribute("y", `${dateTextY}`);

            dateRectX += dateRectDim.width;
        }

        const dateContainerDim: DOMRect = dateContainer.getBoundingClientRect();

        projContainerYOffset =
            dateContainerDim.height + textYOffset + defaultPadding;

        const ganttWidth: number = dateRectX;

        gantt.current.setAttribute("width", `${ganttWidth}px`);
        gantt.current.style.width = `${ganttWidth + 1}px`;

        for (let i = 0; i < projects.length; i++) {
            const proj: Frontmatter = projects[i];

            const projRow = projContainer.children[i] as HTMLElement;
            const projTitle = projRow.children[0] as HTMLElement;
            const projBar = projRow.children[1] as HTMLElement;

            const projTitleDim: DOMRect = projTitle.getBoundingClientRect();

            projTitle.setAttribute(
                "y",
                `${projContainerYOffset + (projTitleDim.height + ySpacing) * i}`,
            );

            const elapsedDays: number = getAmountOfDays(
                new Date(proj.startDate),
                proj.endDate === "Present"
                    ? new Date(Date.now())
                    : new Date(proj.endDate),
            );

            projBar.setAttribute("width", `${elapsedDays * multiplier}`);

            projBar.setAttribute("height", `${projTitleDim.height}`);

            projBar.setAttribute(
                "x",
                `${xOffset + getAmountOfDays(new Date(oldestProjectStartDate.getUTCFullYear(), oldestProjectStartDate.getMonth(), 1), new Date(proj.startDate)) * multiplier}`,
            );

            projBar.setAttribute(
                "y",
                `${projContainerYOffset - textYOffset + (projTitleDim.height + ySpacing) * i}`,
            );
        }

        const projContainerHeight: number =
            projContainer?.getBoundingClientRect().height;

        const ganttHeight: number = projContainerHeight + projContainerYOffset;

        gantt.current.setAttribute("height", `${ganttHeight}px`);
        gantt.current.style.height = `${ganttHeight}px`;

        const containerHeight: number =
            container.getBoundingClientRect().height;

        const header = document.querySelector(".timeline-header");
        if (!header) return;

        const timelineHeaderHeight: number | undefined =
            header.getBoundingClientRect().height;

        if (containerHeight && timelineHeaderHeight) {
            const timeline = document.getElementById("timeline");
            if (!timeline) return;

            timeline.style.height = `${containerHeight + timelineHeaderHeight}px`;
        }
    }

    const displayTooltip = (
        e: MouseEvent,
        proj: Frontmatter | null,
        tooltip: SVGGElement | null,
    ): void => {
        if (!tooltip || !proj) return;

        const padding = 10;

        if (!gantt.current) {
            tooltip.style.display = "none";
            return;
        }

        if (hasBeenExecutedOnce) {
            tooltip.style.display = "block";
        }

        const ganttDim: DOMRect = gantt.current.getBoundingClientRect();

        let ttX: number = e.clientX - ganttDim.x - padding;
        let ttY: number = e.clientY - ganttDim.y - 100;

        let textX: number = ttX + padding;

        const ttRect = tooltip.children[0] as HTMLElement;
        const ttText = tooltip.children[1] as HTMLElement;

        if (!ttRect || !ttText) return;

        const textFragments: HTMLCollection = ttText.children;

        let widestSpanWidth = 0;

        const amountOfProperties = Object.keys(proj).length;

        for (let i = 0; i < amountOfProperties; i++) {
            const property: [string, any] = Object.entries(proj)[i];

            let spanDim: DOMRect = textFragments[i].getBoundingClientRect();

            let textY = ttY + spanDim.height * (i + 1);

            textFragments[i].textContent =
                `${beautify(property[0])}: ${property[1]}`;
            textFragments[i].setAttribute("x", `${textX}`);
            textFragments[i].setAttribute("y", `${textY}`);

            // get freshly computed span dimensions
            spanDim = textFragments[i].getBoundingClientRect();

            if (spanDim.width > widestSpanWidth)
                widestSpanWidth = spanDim.width;

            // avoid computing multiple times
            const estimatedRectHeight =
                spanDim.height * amountOfProperties + padding * 2;

            if (ttY + estimatedRectHeight > ganttDim.height) {
                const visibleRectHeight: number = ganttDim.height - ttY;
                const yOffset: number = estimatedRectHeight - visibleRectHeight;

                textY -= yOffset;
                ttY -= yOffset;

                textFragments[i].setAttribute("y", `${textY}`);
            }
        }

        widestSpanWidth += padding;

        if (textX + widestSpanWidth > ganttDim.width) {
            for (let i = 0; i < Object.keys(proj).length; i++) {
                const visibleTextWidth: number = ganttDim.width - textX;
                const xOffset: number = widestSpanWidth - visibleTextWidth;

                textX -= xOffset;
                ttX -= xOffset;

                textFragments[i].setAttribute("x", `${textX}`);
            }
        }

        const textDim: DOMRect = ttText.getBoundingClientRect();
        const width = textDim.width + padding * 2;
        const height = textDim.height + padding * 2;

        console.log(`X is ${ttX} and Y is ${ttY}`);
        ttRect.setAttribute("x", `${ttX}`);
        ttRect.setAttribute("y", `${ttY}`);

        ttRect.setAttribute("width", `${width}px`);
        ttRect.setAttribute("height", `${height}px`);

        hasBeenExecutedOnce = true;
    };

    const createTooltip = (): SVGGElement | null => {
        if (!projects || projects.length === 0) return null;

        const tt = document.createElementNS("http://www.w3.org/2000/svg", "g");

        tt.classList.add("tooltip");
        tt.style.display = "none";

        const rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect",
        );

        rect.style.fill = "#4d94ff";

        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
        );

        text.style.fill = "white";
        text.style.fontSize = `${fontSize / 1.5}em`;

        const fragments = [];

        for (let i = 0; i < Object.keys(projects[0]).length; i++) {
            fragments[i] = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "tspan",
            );
            text.appendChild(fragments[i]);
        }

        tt.insertAdjacentElement("beforeend", rect);
        tt.insertAdjacentElement("beforeend", text);

        return tt;
    };

    return (
        <section id="timeline" className={styles["timeline"]}>
            <header className={styles["timeline-header"]}>
                <h2>Timeline</h2>
            </header>
            <div className="container">
                <svg ref={gantt} id="gantt" />
            </div>
        </section>
    );
};
