import { useState, useEffect } from "react";
import { type GrayMatterFile, default as matter } from "gray-matter";
import { Card } from "@components";

interface Frontmatter {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  stack: string[];
}

interface Project {
  frontmatter: Frontmatter;
  content: string;
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
  const modules = import.meta.glob("/src/content/*.md", {
    query: "?raw",
    import: "default",
  });

  const projects = await Promise.all(
    Object.entries(modules).map(async ([, loader]) => {
      const rawContent = (await loader()) as GrayMatterFile<string>;
      const { data, content } = matter(rawContent);
      const frontmatter = data as Frontmatter;
      const images = await getProjectImages(frontmatter.id);

      return {
        frontmatter,
        content,
        images,
      };
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
    <div>
      {projects.map((project) => (
        <Card
          key={project.frontmatter.id}
          title={project.frontmatter.title}
          subtitle={project.frontmatter.subtitle}
          content={project.content}
          images={project.images}
        />
      ))}
    </div>
  );
};
