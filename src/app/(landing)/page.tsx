"use client"

import CTASection from "@/components/publicComponents/CTASection";
import FeaturesSection from "@/components/publicComponents/Features";
import HeroSection from "@/components/publicComponents/HeroSection";
import HowItWorksSection from "@/components/publicComponents/HowItWorks";
import TestimonialSection from "@/components/publicComponents/Testimonials";
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
      <TestimonialSection />
      <CTASection />
    </>
  );
};

export default Home;
