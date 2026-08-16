import Navbar from '@/components/Navbar';
import ArchitecturalWalkthrough from '@/components/ArchitecturalWalkthrough';
import ProjectIntro from '@/components/ProjectIntro';
import DesignPhilosophy from '@/components/DesignPhilosophy';
import Materials from '@/components/Materials';
import DetailGallery from '@/components/DetailGallery';
import StudioIntro from '@/components/StudioIntro';
import SheraSection from '@/components/SheraSection';
import StudioHistory from '@/components/StudioHistory';
import StudioStats from '@/components/StudioStats';
import WhyUs from '@/components/WhyUs';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#0E0D0C]">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Architectural Walkthrough Scroll Engine */}
      <ArchitecturalWalkthrough />

      {/* Editorial Narrative & Studio Presentation */}
      <ProjectIntro />
      <DesignPhilosophy />
      <Materials />
      <DetailGallery />
      <StudioIntro />
      <SheraSection />
      <StudioHistory />
      <StudioStats />
      <WhyUs />
      <Services />
      <Portfolio />
      <Testimonials />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
