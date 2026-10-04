"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ReelsShowcase from "@/components/ReelsShowcase";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Photography from "@/components/Photography";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const blurWrapRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      if (blurWrapRef.current && footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const vh = window.innerHeight;
        const opacity = footerTop >= vh ? 1 : Math.max(0, footerTop / vh);
        blurWrapRef.current.style.opacity = opacity;
      }
    });

    const tick = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => { lenis.destroy(); gsap.ticker.remove(tick); };
  }, []);

  return (
    <main>
      <div className="grain-overlay" />
      <Cursor />
      <Background />
      <Navbar />
      <div ref={blurWrapRef} className="bottom-blur" />

      <div className="relative z-10">
        <Hero />
        <Marquee />
        <ReelsShowcase />
        <Stats />
        <Services />
        <Photography />
        <Work />
        <About />
        <Contact />
        <div ref={footerRef}><Footer /></div>
      </div>
    </main>
  );
}
