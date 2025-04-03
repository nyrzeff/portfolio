import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Projects from "../components/Projects";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1>My Projects</h1>
      <Projects />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
