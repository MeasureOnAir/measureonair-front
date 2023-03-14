import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AboutUs from "./AboutUs";
import Features from "./Features";
import HeroSection from "./HeroSection";
import OurPartners from "./OurPartners";
import OurTeam from "./OurTeam";

const Home = ({ scrollTo }) => {
  // auto scroll to the relavant element
  useEffect(() => {
    const element = document.getElementById(scrollTo);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollTo]);

  console.log(scrollTo);

  return (
    <div className="overflow-hidden dark:bg-secondary-gray500">
      {/* <Navbar /> */}
      <div id="heroSection_id">
        <HeroSection />
      </div>
      <div id="features_id" className="pt-12">
        <Features />
      </div>
      <div id="ourPartners_id" className="pt-12">
        <OurPartners />
      </div>
      <div id="aboutUs_id" className="md:pt-0 sm:pt-0 pt-10">
        <AboutUs />
      </div>
      <div id="ourTeam_id" className="md:pt-8 lg:pt-0 pt-10">
        <OurTeam />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
