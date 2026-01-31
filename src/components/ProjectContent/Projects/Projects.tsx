import { useState, useEffect } from "react";
import type { Project } from "@/types/markdown";
import { Card } from "./Card";
import styles from "./Projects.module.scss";

export interface EnrichedProject extends Project {
    images?: string[];
}

const getProjectImages = async (projectId: string): Promise<string[]> => {
    // import everything and then filter during runtime because
    // glob import is a build-time feature
    const imageModules = import.meta.glob("/src/assets/images/**", {
        eager: true,
        query: "?url",
    });

    const imagePaths: string[] = Object.entries(imageModules)
        .filter(([path]) => path.includes(`/assets/images/${projectId}/`))
        .map(([, mod]) => (mod as { default: string }).default);

    return imagePaths;
};

const enrichProjects = async (
    projects: Project[],
): Promise<EnrichedProject[]> => {
    const enrichedProjects = await Promise.all(
        projects.map(async (project: Project) => {
            const images = await getProjectImages(project.frontmatter.id);
            return { ...project, images };
        }),
    );

    return enrichedProjects;
};

interface ProjectsProps {
    projects?: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({
    projects,
}: ProjectsProps) => {
    if (!projects) return null;

    const [enrichedProjects, setEnrichedProjects] = useState<EnrichedProject[]>(
        [],
    );

    useEffect(() => {
        const fetchData = async () => {
            if (projects.length === 0) return;
            const data: EnrichedProject[] = await enrichProjects(projects);
            setEnrichedProjects(data);
        };

        fetchData();
    }, [projects]);

    if (!enrichedProjects) return <p>Loading...</p>;

    return (
        <section id="projects" className={styles["projects"]}>
            {enrichedProjects.map((project: EnrichedProject) => (
                <Card
                    key={project.frontmatter.id}
                    id={project.frontmatter.id}
                    title={project.frontmatter.title}
                    subtitle={project.frontmatter.subtitle}
                    repo={project.frontmatter.repo ?? ""}
                    startDate={project.frontmatter.startDate}
                    endDate={project.frontmatter.endDate}
                    stack={project.frontmatter.stack}
                    colors={project.frontmatter.colors ?? []}
                    tags={project.frontmatter.tags ?? []}
                    content={project.content ?? null}
                    images={project.images ?? []}
                />
            ))}
        </section>
    );
};
