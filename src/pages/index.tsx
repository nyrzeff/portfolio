import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import ProjectGallery from "../components/ProjectGallery";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="container">
      <h1 className="title">Project Gallery</h1>
      <ProjectGallery />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
