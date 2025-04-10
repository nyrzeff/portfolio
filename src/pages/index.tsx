import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Layout, Projects } from "@/components";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Projects />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
