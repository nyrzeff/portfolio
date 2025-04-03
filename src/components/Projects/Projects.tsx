import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import Card from "../Card";
import { useContent } from "../../hooks/useContent";
import { useImages } from "../../hooks/useImages";

interface Frontmatter {
  title: string;
  subtitle: string;
  tags: string[];
  tech: string[];
}

interface MarkdownRemarkNode {
  frontmatter: Frontmatter;
  html: string;
  id: string;
}

interface ProjectImage {
  title: string;
  image: IGatsbyImageData;
}

const Projects: React.FC = () => {
  const content: MarkdownRemarkNode = useContent();
  const frontmatter = content[0].frontmatter;
  const images: Record<string, IGatsbyImageData[]> = useImages(
    frontmatter.title,
  );

  return (
    <div>
      {Object.entries(images).map(([project, imgs]) => (
        <Card
          key={content[0].id}
          project={frontmatter.title}
          description={frontmatter.subtitle}
          content={content[0].html}
          images={imgs}
        />
      ))}
    </div>
  );
};

export default Projects;
