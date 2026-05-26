"use client";

import FooterHomepage from "@/components/parts/footer/FooterHomepage";
import Features from "@/components/parts/homepage/Features";
import Hero from "@/components/parts/homepage/Hero";
import HowItWorks from "@/components/parts/homepage/HowItWorks";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <HowItWorks />
      <FooterHomepage />
    </div>
  );
};

export default HomePage;
