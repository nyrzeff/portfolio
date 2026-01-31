import { useState, useEffect } from "react";
import { Timeline } from "./Timeline";
import { Projects } from "./Projects";
import type { Frontmatter, Project } from "@/types/markdown";
import { parseMarkdownFromDir } from "@/lib/parseMarkdown";

const allowed = ["title", "subtitle", "startDate", "endDate", "stack"] as const;
type Allowed = (typeof allowed)[number];
export type PartialFrontmatter = Pick<Frontmatter, Allowed>;

export const ProjectContent: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await parseMarkdownFromDir();
            data.sort(byDate);
            setProjects(data);
        };

        fetchData();
    }, []);

    if (!projects) return <p>Loading...</p>;

    const byDate = (
        a: Project | PartialFrontmatter,
        b: Project | PartialFrontmatter,
    ) => {
        const startDate =
            "frontmatter" in a ? a.frontmatter.startDate : a.startDate;
        const endDate =
            "frontmatter" in b ? b.frontmatter.startDate : b.startDate;

        const date1 = new Date(startDate);
        const date2 = new Date(endDate);

        if (date1 > date2) return 1;
        if (date1 < date2) return -1;

        return 0;
    };

    const filteredMetadata: PartialFrontmatter[] = projects
        .map((proj: Project) => proj.frontmatter)
        .map((metadata: Frontmatter) => {
            const partialMetadata = {} as PartialFrontmatter;

            Object.keys(metadata).forEach((metadataKey) => {
                const key = metadataKey as keyof Frontmatter;
                const partialKey = metadataKey as keyof PartialFrontmatter;

                // bad practice but idk how to satisfy tsc
                if (allowed.includes(partialKey)) {
                    partialMetadata[partialKey] = metadata[
                        key as keyof PartialFrontmatter
                    ] as string & string[];
                }
            });
            return partialMetadata;
        });

    return (
        <>
            {filteredMetadata && <Timeline metadata={filteredMetadata} />}
            {projects && <Projects projects={projects} />}
        </>
    );
};
