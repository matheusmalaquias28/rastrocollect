import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Machine from "@/components/sections/Machine";
import HowItWorks from "@/components/sections/HowItWorks";
import Products from "@/components/sections/Products";
import ForMalls from "@/components/sections/ForMalls";
import Operation from "@/components/sections/Operation";
import Technology from "@/components/sections/Technology";
import Experience from "@/components/sections/Experience";
import Market from "@/components/sections/Market";
import Venture from "@/components/sections/Venture";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Machine />
      <HowItWorks />
      <Products />
      <ForMalls />
      <Operation />
      <Technology />
      <Experience />
      <Market />
      <Venture />
      <FinalCta />
    </>
  );
}
