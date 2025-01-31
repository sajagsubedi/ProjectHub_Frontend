import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorks";
import TestimonialSection from "@/components/Testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React from "react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialSection/>
    </>
  );
};

export default Home;
