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
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  {
    num: "01", cat: "Social Media", title: "42M Organic Views", client: "Trending Minds",
    desc: "Built a content system from scratch that generated 42 million organic views across Instagram and TikTok in under 12 months — no paid amplification.",
    tags: ["Instagram", "TikTok", "Reels", "Strategy"],
    stat: "42M+", statLabel: "Organic Views",
  },
  {
    num: "02", cat: "Video Production", title: "Brand Film Series", client: "Confidential",
    desc: "Produced a 6-part cinematic brand film series for a D2C brand, driving a 4.6× lift in engagement and a measurable increase in direct traffic.",
    tags: ["Brand Film", "Reels", "Motion", "Editing"],
    stat: "4.6×", statLabel: "Engagement Lift",
  },
  {
    num: "03", cat: "Paid Advertising", title: "ROAS-Driven Campaign", client: "Confidential",
    desc: "Designed and executed a full-funnel Meta campaign that delivered consistent ROAS across a 90-day period for a fashion brand.",
    tags: ["Meta Ads", "Creative", "Targeting", "Analytics"],
    stat: "98%", statLabel: "Client Retention",
  },
  {
    num: "04", cat: "Brand Identity", title: "Visual Identity System", client: "Confidential",
    desc: "Created a complete brand identity — logo, colour system, typography, and social kit — for a startup entering a competitive lifestyle market.",
    tags: ["Logo", "Brand System", "Social Kit", "Guidelines"],
    stat: "150+", statLabel: "Brands Grown",
  },
];

export default function WorkPage() {
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
      gsap.from(".w-label", { y: 14, opacity: 0, duration: 0.4, ease: "power3.out", delay: 0.3 });
      gsap.from(".w-h", { y: 50, opacity: 0, duration: 0.7, ease: "power4.out", delay: 0.45 });
      gsap.from(".w-sub", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out", delay: 0.65 });
      gsap.from(".case-card", {
        y: 60, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".cases-grid", start: "top 85%", once: true },
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
        <p className="w-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">Selected Work</p>
        <h1 className="w-h font-black tracking-tighter text-white leading-none hero-clamp max-w-4xl">
          Work that<br /><span className="ghost">speaks.</span>
        </h1>
        <p className="w-sub mt-8 text-white/40 text-base md:text-lg font-light leading-relaxed max-w-lg">
          A selection of campaigns, content systems, and brand work that moved the needle for our clients.
        </p>
      </section>

      {/* Case studies */}
      <section className="cases-grid px-10 md:px-20 pb-32 grid grid-cols-1 md:grid-cols-2 gap-5">
        {CASE_STUDIES.map((c) => (
          <div key={c.num} className="case-card group relative rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 p-8 md:p-10 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] text-white/20 group-hover:text-[#00ff87] transition-colors duration-300">{c.num}</span>
                <span className="text-[10px] text-white/25 tracking-widest uppercase border border-white/8 px-3 py-1 rounded-full">{c.cat}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-3 group-hover:text-[#00ff87] transition-colors duration-300">{c.title}</h2>
              <p className="text-[11px] text-white/25 tracking-widest uppercase mb-6">{c.client}</p>
              <p className="text-sm text-white/40 font-light leading-relaxed mb-8">{c.desc}</p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full border border-white/8 text-[10px] text-white/30 tracking-widest uppercase">{t}</span>
                ))}
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-white/8 flex items-end justify-between">
              <div>
                <p className="text-4xl font-black tracking-tighter text-white group-hover:text-[#00ff87] transition-colors duration-300">{c.stat}</p>
                <p className="text-[10px] text-white/30 tracking-widest uppercase mt-1">{c.statLabel}</p>
              </div>
              <ArrowRight size={20} strokeWidth={1.5} className="text-white/20 group-hover:text-[#00ff87] group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="px-10 md:px-20 py-32 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <h2 className="font-black tracking-tighter text-white leading-none section-clamp max-w-xl">
          Want results<br /><span className="ghost">like these?</span>
        </h2>
        <Link href="/contact" className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-[#00ff87] text-black font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300">
          Start a Project <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
