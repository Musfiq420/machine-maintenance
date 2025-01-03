import React from "react";
import LandingNav from "../../../shared/components/navbar/landingNav";
import LandingHero from "../components/home/landingHero";
import Faq from "../components/home/faq";
import Testimonials from "../components/home/testimonials";
import LandingFeatures from "../components/home/landingFeatures";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <LandingNav />
      <LandingHero />
      <LandingFeatures />
      <Testimonials />
      <Faq />
    </div>
  );
}
