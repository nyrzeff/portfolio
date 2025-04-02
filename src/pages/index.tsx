import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import ProjectGallery from "../components/ProjectGallery";

const container = {
  textAlign: "center",
};

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={container}>
      <h1>Project Gallery</h1>
      <ProjectGallery />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
