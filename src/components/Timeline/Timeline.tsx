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
  const projects = [
    {
      title: "Pomometrics",
      dateStart: "2024-09-22",
      dateEnd: "2025-04-30",
      description: "Responsive Pomodoro visualization tool",
      technologies: "HTML, CSS, JavaScript, Chart.js"
    },
    {
      title: "Portfolio",
      dateStart: "2025-02-26",
      dateEnd: "2025-05-12",
      description: "My online portfolio, updated as needed",
      technologies: "React, Vite, TypeScript, SCSS, Vercel"
    },
    {
      title: "Chromokinesis",
      dateStart: "2025-09-06",
      dateEnd: "Present",
      description: "CLI tool to quickly generate color palettes",
      technologies: "Node.js, JavaScript, Clack"
    },
    {
      title: "Bubblyous",
      dateStart: "2025-09-19",
      dateEnd: "Present",
      description: "Bubble tea data aggregation, visualization and tracking tool",
      technologies: "ASP.NET Core Web API, React, C#, TypeScript, GCP, PostgreSQL"
    },
    {
      title: "Diaphthora",
      dateStart: "2025-10-14",
      dateEnd: "Present",
      description: "Minecraft mod about a conflict between 3 groups - cultists, robots and aliens",
      technologies: "Java, Blockbench, various image and audio tools"
    }
  ];

  const oldestProjectStartDate = new Date(projects.at(0)!.dateStart);

  const latestProject = projects.at(projects.length - 1)
  const latestProjectEndDate = latestProject!.dateEnd == "Present" ? new Date(Date.now()) : new Date(latestProject!.dateEnd);
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
    console.log((dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24));
    return (dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24);
  };

  const displayTooltip = (isShown: boolean, i: number) => {
    const rectangle = document.getElementById("tooltip");

    if (rectangle) {
      isShown ? rectangle.style.display = "block" : rectangle.style.display = "none";
    }

    const tooltip = (
      <svg>
        <rect
          id="tooltip"
          display="none"
          fill="blue"
          x={initialX + (90 * i)}
          y={100 + (70 * i)}
          width="50"
          height="50"
        />
      </svg>
    ) as unknown as SVGElement;

    console.log(document.querySelector(".project-container"));

    const el = document.createElement("rect");
    el.id = "tooltip";
    el.style.fill = "blue";
    el.style.x = (initialX + (90 * i)).toString();
    el.style.y = (100 + (70 * i)).toString();
    el.style.width = "50";
    el.style.height = "50";

    // el.appendChild(
    //     <rect
    //       id="tooltip"
    //       display="none"
    //       fill="blue"
    //     />
    // );

    // document.querySelector(".project-container")!.appendChild(el);
  };


  const initialX = 200;

  return (
    <section id="timeline" className={styles["timeline"]}>
      <header className={styles["timeline-header"]}>
        <h2>Timeline</h2>
      </header>
      <svg id="gantt">
        {dates.map((date, i) => (
          <>
            <rect fill="white" x={initialX + (90 * i)} y="10" width={90} height="45" />
            <text x={(initialX + 10) + (90 * i)} y="40">{formatQuarter(date)}</text>
          </>
        ))}
        {projects.map((project, i) => (
          <g className="project-container">
            <text fill="white" x="10" y={120 + (70 * i)}>{project.title}</text>
            <rect
              className="project"
              fill="#4d94ff"
              // x={initialX + (90 * i)}
              x={initialX + getAmountOfDays(oldestProjectStartDate, new Date(project.dateStart))}
              y={100 + (70 * i)}
              width={getAmountOfDays(new Date(project.dateStart), project.dateEnd === "Present" ? new Date(Date.now()) : new Date(project.dateEnd))}
              height="30"
              onMouseEnter={() => displayTooltip(true, i)}
              onMouseLeave={() => displayTooltip(false, i)}
            />
          </g>
        ))}
      </svg>
    </section>
  );
};
