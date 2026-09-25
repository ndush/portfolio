import Background from "@/components/Background";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <footer>
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
