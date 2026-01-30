import { useState, useEffect } from "react";
import { Timeline } from "./Timeline";
import { Projects } from "./Projects";
import type { Frontmatter, Project } from "@/types/markdown";
import { parseMarkdownFromDir } from "@/lib/parseMarkdown";

const importProjects = async () => {
    const files = await parseMarkdownFromDir();
    return files;
};

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

    const byDate = (a: Frontmatter, b: Frontmatter) => {
        const date1 = new Date(a.startDate);
        const date2 = new Date(b.startDate);

        if (date1 > date2) return 1;
        return 0;
    };

    return (
        <>
            {projects && metadataOnly && (
                <Timeline projects={metadataOnly.sort(byDate)} />
                // ) // <Projects projects={projects} />
            )}
        </>
    );
};
