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
    let projects: Project[] = json.projects;

    if (!projects) return;

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

    console.log(dates);

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

    const displayTooltip = (isShown: boolean, project: Project, i: number) => {
        const tooltip = document.querySelector(".tooltip");

        if (!tooltip) return;

        const tooltipContainer = tooltip.children[0] as HTMLElement;
        const tooltipText = tooltip.children[1] as HTMLElement;

        if (!tooltipContainer || !tooltipText) return;

        if (isShown) {
            tooltipContainer.style.display = "block";
            tooltipText.style.display = "block";
            tooltipContainer.style.zIndex = "999";
        } else {
            tooltipContainer.style.display = "none";
            tooltipText.style.display = "none";
        }

        tooltipContainer.setAttribute(
            "x",
            (initialX + getAmountOfDays(oldestProjectStartDate,
                new Date(project.dateStart)
            )).toString());

        tooltipContainer.setAttribute("y", (100 + (70 * i)).toString());

        const textX =
            (initialX + getAmountOfDays(oldestProjectStartDate,
                new Date(project.dateStart)));
        const textY = 100 + 70 * i;

        // tooltipText.innerHTML = `
        //     Title: ${project.title}\n
        //     Start: ${project.dateStart}\n
        //     End: ${project.dateEnd}\n
        //     Description: ${project.description}\n
        //     Technologies used: ${project.technologies}
        // `;

        const textFragments = tooltipText.children;

        for (let i = 0; i < Object.keys(project).length; i++) {
            console.log(textFragments);
            textFragments[i].setAttribute("x", textX.toString());
            textFragments[i].setAttribute("y",
                (textY + (20 * i)).toString());
            // Object.entries(project).forEach((info) => {
            //     textFragments[i].innerHTML = info[1];
            //     console.log(project);
            // });
        }

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
                        <g className="tooltip">
                            <rect
                                display="none"
                                fill="blue"
                                width="50"
                                height="50"
                            />
                            <text
                                fill="white"
                                display="none"
                                x="50"
                                y="50"
                            >
                                {/* <tspan>{project.title}</tspan> */}
                                {/* <tspan>{project.dateStart}</tspan> */}
                                {/* <tspan>{project.dateEnd}</tspan> */}
                                {/* <tspan>{project.description}</tspan> */}
                                {/* <tspan>{project.technologies}</tspan> */}
                            </text>
                        </g>
                        <rect
                            className="project"
                            fill="#4d94ff"
                            // x={initialX + (90 * i)}
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
                            onMouseEnter={() =>
                                displayTooltip(true, project, i)}
                            onMouseLeave={() =>
                                displayTooltip(false, project, i)}
                        />
                    </g>
                ))}
            </svg>
        </section>
    );
};
