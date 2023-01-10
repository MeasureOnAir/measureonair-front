import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AboutUs from "./AboutUs";
import Features from "./Features";
import HeroSection from "./HeroSection";
import OurPartners from "./OurPartners";
import OurTeam from "./OurTeam";

const Home = () => {
  return (
    <div className="overflow-hidden dark:bg-secondary-gray500">
      {/* <Navbar /> */}
      <HeroSection />
      <Features />
      <OurPartners />
      <AboutUs />
      <OurTeam />
      <Footer />
    </div>
  );
};

export default Home;
