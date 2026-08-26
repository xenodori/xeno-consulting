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

// 관리자 편집 내용이 바로 반영되도록 매 요청 시 최신 콘텐츠를 읽는다.
export const dynamic = "force-dynamic";

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
