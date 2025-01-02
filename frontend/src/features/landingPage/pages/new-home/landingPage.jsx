import React from "react";
import LandingNav from "../../../../shared/components/navbar/landingNav";
import LandingHero from "../../components/home/landingHero";
import Faq from "../../components/home/faq";
import Testimonials from "../../components/home/testimonials";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <LandingNav />
      <LandingHero />
      <Testimonials />
      <Faq />
    </div>
  );
}
