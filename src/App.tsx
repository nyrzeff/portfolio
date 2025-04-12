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

function App() {
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

export default App;
