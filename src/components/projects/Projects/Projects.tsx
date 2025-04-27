import { useState, useEffect } from "react";
import { parseMarkdownFromDir } from "@/lib/parseMarkdown";
import type { MarkdownFile } from "@/types/markdown";
import { Card } from "@components/projects";
import styles from "./Projects.module.scss";

export interface Project extends MarkdownFile {
  images: string[];
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

const importProjects = async () => {
  const files = await parseMarkdownFromDir();

  const projects = await Promise.all(
    files.map(async (file) => {
      const images = await getProjectImages(file.frontmatter.id);
      return { ...file, images };
    }),
  );

  return projects;
};

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await importProjects();
      setProjects(data);
    };
    fetchData();
  }, []);

  if (!projects) return <p>Loading...</p>;

  return (
    <section id={styles["projects"]}>
      {projects.map((project) => (
        <Card
          key={project.frontmatter.id}
          title={project.frontmatter.title}
          subtitle={project.frontmatter.subtitle}
          content={project.content}
          images={project.images}
        />
      ))}
    </section>
  );
};
