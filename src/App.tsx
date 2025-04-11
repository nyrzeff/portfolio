import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Layout,
  Header,
  Intro,
  Stack,
  Projects,
  Contact,
  Footer,
} from "@/components";

function App() {
  const [count, setCount] = useState(0);

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
