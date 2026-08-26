import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import About from "@/components/About";
import Cases from "@/components/Cases";
import Compare from "@/components/Compare";
import Roadmap from "@/components/Roadmap";
import Deliverables from "@/components/Deliverables";
import Qualify from "@/components/Qualify";
import Guarantee from "@/components/Guarantee";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Apply from "@/components/Apply";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
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
        <Guarantee />
        <Pricing />
        <Faq />
        <Apply />
      </main>
      <Footer />
    </>
  );
}
