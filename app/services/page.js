"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import {
  LayoutGrid, Clapperboard, ChartNoAxesCombined,
  Users, Fingerprint, PenLine, ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01", Icon: LayoutGrid, title: "Social Media Management",
    tagline: "Your brand, always on.",
    desc: "Full-service management of your Instagram, TikTok, LinkedIn, and X — strategy, content calendar, posting, and community engagement handled end-to-end.",
    deliverables: ["Content strategy", "Content calendar", "Posting & scheduling", "Community management", "Monthly analytics report"],
  },
  {
    num: "02", Icon: Clapperboard, title: "Video Production",
    tagline: "Content that stops the scroll.",
    desc: "Cinematic brand films, reels, short-form content, and motion graphics built for the feed — not repurposed from TV.",
    deliverables: ["Concept & scripting", "Filming & direction", "Editing & colour grade", "Captions & subtitles", "Platform-optimised export"],
  },
  {
    num: "03", Icon: ChartNoAxesCombined, title: "Paid Advertising",
    tagline: "Every rupee working harder.",
    desc: "Data-driven Meta, Google, and TikTok ad campaigns engineered for maximum ROAS, audience growth, and measurable results.",
    deliverables: ["Campaign strategy", "Ad creative production", "Audience targeting", "A/B testing", "Performance reporting"],
  },
  {
    num: "04", Icon: Users, title: "Influencer Marketing",
    tagline: "The right voice, the right audience.",
    desc: "End-to-end influencer campaigns — from talent sourcing and briefing to execution, content approval, and performance reporting.",
    deliverables: ["Talent identification", "Brief & negotiation", "Campaign execution", "Content review", "ROI reporting"],
  },
  {
    num: "05", Icon: Fingerprint, title: "Brand Identity",
    tagline: "Instantly recognisable.",
    desc: "Logo design, visual systems, brand guidelines, and creative direction that make your brand impossible to ignore.",
    deliverables: ["Logo & mark design", "Colour & typography", "Brand guidelines", "Social kit", "Creative direction"],
  },
  {
    num: "06", Icon: PenLine, title: "Content Creation",
    tagline: "Built for every platform.",
    desc: "Photography, copywriting, graphic design, and creative content packages tailored to every platform and audience.",
    deliverables: ["Photography", "Copywriting", "Graphic design", "Story & reel assets", "Platform-specific formats"],
  },
];

export default function ServicesPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", () => ScrollTrigger.update());
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(tick); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".s-label", { y: 14, opacity: 0, duration: 0.4, ease: "power3.out", delay: 0.3 });
      gsap.from(".s-h", { y: 50, opacity: 0, duration: 0.7, ease: "power4.out", delay: 0.45 });
      gsap.from(".s-sub", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out", delay: 0.65 });
      gsap.from(".svc-row", {
        y: 50, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".svc-list", start: "top 85%", once: true },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef}>
      <div className="grain-overlay" />
      <Cursor />
      <Background />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-10 md:px-20 pt-40 pb-20">
        <p className="s-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">What We Do</p>
        <h1 className="s-h font-black tracking-tighter text-white leading-none hero-clamp max-w-4xl">
          Services that<br /><span className="ghost">move brands.</span>
        </h1>
        <p className="s-sub mt-8 text-white/40 text-base md:text-lg font-light leading-relaxed max-w-lg">
          Everything your brand needs to dominate the digital landscape — strategy, content, production, and distribution under one roof.
        </p>
      </section>

      {/* Services list */}
      <section className="svc-list px-10 md:px-20 pb-32">
        {SERVICES.map((svc) => (
          <div key={svc.num} className="svc-row group border-t border-white/8 hover:border-white/20 transition-colors duration-500 py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="shrink-0 flex items-start gap-6 md:w-[320px]">
              <span className="font-mono text-[10px] text-white/20 group-hover:text-[#00ff87] transition-colors duration-300 mt-1">{svc.num}</span>
              <div>
                <div className="w-10 h-10 rounded-xl border border-white/10 group-hover:border-[#00ff87]/40 flex items-center justify-center mb-4 transition-colors duration-300">
                  <svc.Icon size={18} strokeWidth={1.5} className="text-white/40 group-hover:text-[#00ff87] transition-colors duration-300" />
                </div>
                <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white group-hover:text-[#00ff87] transition-colors duration-300">{svc.title}</h2>
                <p className="mt-1 text-[11px] text-white/30 tracking-widest uppercase">{svc.tagline}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-white/45 text-sm font-light leading-relaxed mb-8 max-w-xl">{svc.desc}</p>
              <ul className="flex flex-wrap gap-2">
                {svc.deliverables.map((d) => (
                  <li key={d} className="px-3 py-1.5 rounded-full border border-white/8 text-[10px] text-white/35 tracking-widest uppercase group-hover:border-white/15 transition-colors duration-300">{d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="border-t border-white/8" />
      </section>

      {/* CTA */}
      <section className="px-10 md:px-20 py-32 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div>
          <h2 className="font-black tracking-tighter text-white leading-none section-clamp max-w-xl">
            Ready to<br /><span className="ghost">get started?</span>
          </h2>
        </div>
        <Link href="/contact" className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-[#00ff87] text-black font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300">
          Start a Project <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
