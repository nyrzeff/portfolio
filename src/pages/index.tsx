import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import {
  Layout,
  Header,
  Intro,
  Stack,
  Projects,
  Contact,
  Footer,
} from "@/components";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Header />
      <Intro />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
