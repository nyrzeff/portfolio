import {
  Layout,
  Header,
  Intro,
  Stack,
  Projects,
  Contact,
  Footer,
} from "./components";
import "./App.css";

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
