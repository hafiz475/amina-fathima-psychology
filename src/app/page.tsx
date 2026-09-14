import Hero from "@/components/hero/Hero";
import Credentials from "@/components/sections/Credentials";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import SupportAreas from "@/components/sections/SupportAreas";
import Approach from "@/components/sections/Approach";
import WorkplaceSupport from "@/components/sections/WorkplaceSupport";
import ClinicalExperience from "@/components/sections/ClinicalExperience";
import Languages from "@/components/sections/Languages";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Credentials />
      <SupportAreas />
      <Services />
      <About />
      <Approach />
      <WorkplaceSupport />
      <ClinicalExperience />
      <Languages />
      <FAQ />
      <FinalCTA />
    </>
  );
}
