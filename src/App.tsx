import {
  Layout,
  Header,
  Intro,
  Stack,
  Projects,
  Contact,
  Footer,
} from "@components";

export function App() {
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
}
