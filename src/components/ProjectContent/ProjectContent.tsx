import { useState, useEffect } from "react";
import { Timeline } from "./Timeline";
import { Projects } from "./Projects";
import type { Frontmatter, Project } from "@/types/markdown";
import { parseMarkdownFromDir } from "@/lib/parseMarkdown";

const importProjects = async () => await parseMarkdownFromDir();

export const ProjectContent: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await importProjects();
            setProjects(data);
        };

        fetchData();
    }, []);

    if (!projects) return <p>Loading...</p>;

    const metadataOnly: Frontmatter[] = projects.map(
        (proj) => proj.frontmatter,
    );

    const byDate = (a: Project | Frontmatter, b: Project | Frontmatter) => {
        const startDate =
            "frontmatter" in a ? a.frontmatter.startDate : a.startDate;
        const endDate =
            "frontmatter" in b ? b.frontmatter.startDate : b.startDate;

        const date1 = new Date(startDate);
        const date2 = new Date(endDate);

        if (date1 > date2) return 1;
        return 0;
    };

    return (
        <>
            {metadataOnly && <Timeline projects={metadataOnly.sort(byDate)} />}
            {projects && <Projects projects={projects.sort(byDate)} />}
        </>
    );
};
