// pages/index.js
import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Experience from "../components/Experience/Experience";
import Portfolio from "../components/Portfolio/Portfolio";
import Certifications from "../components/Certifications/Certifications";
import Contact from "../components/Contact/Contact";

export default function Index() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Portfolio />
      <Certifications />
      <Contact />
    </MainLayout>
  );
}