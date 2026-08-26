import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import About from "@/components/About";
import Cases from "@/components/Cases";
import Compare from "@/components/Compare";
import Roadmap from "@/components/Roadmap";
import Deliverables from "@/components/Deliverables";
import Qualify from "@/components/Qualify";
import Pricing from "@/components/Pricing";
import Apply from "@/components/Apply";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PainPoints />
        <About />
        <Cases />
        <Compare />
        <Roadmap />
        <Deliverables />
        <Qualify />
        <Pricing />
        <Apply />
      </main>
      <Footer />
    </>
  );
}
