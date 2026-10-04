"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { label: "Social-First",       desc: "We don't resize TV ads into Reels. Everything is built for the feed from day one." },
  { label: "Fast",               desc: "Brief to publishable content in days, not months. Speed is a creative advantage." },
  { label: "Iterative",          desc: "Every piece teaches us what to make next. Data and creativity in the same loop." },
  { label: "Performance-Aware",  desc: "We care about retention, shares, saves and conversions — not just pretty frames." },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      tl.from(".about-label", { y: 14, opacity: 0, duration: 0.3, ease: "power3.out" })
        .from(".about-h",     { y: 40, opacity: 0, duration: 0.5, ease: "power4.out" }, 0.05)
        .from(".about-pillar",{ y: 24, opacity: 0, stagger: 0.09, duration: 0.45, ease: "power3.out" }, 0.2);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about-section" className="relative w-full px-10 md:px-20 py-32 z-20">
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">

        {/* Left */}
        <div className="lg:w-[45%] flex flex-col justify-between">
          <div>
            <p className="about-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium flex items-center gap-3">
              <span className="w-5 h-px bg-[#00ff87]" />
              Built for the Feed
            </p>
            <h2
              className="about-h font-black tracking-tighter leading-[0.88] mb-8"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              <span className="block text-white">We don't</span>
              <span className="block text-white">make content.</span>
              <span className="block ghost">We make noise.</span>
            </h2>
            <p className="text-white/35 text-sm font-light leading-relaxed max-w-sm mb-10">
              Trending Minds is a social-first studio. We build content systems that turn brands into the thing people talk about.
            </p>
          </div>
          <Link
            href="/about"
            className="about-label inline-flex items-center gap-2 text-[11px] text-white/40 uppercase tracking-widest hover:text-[#00ff87] transition-colors duration-300 group"
          >
            Our story
            <ArrowRight size={12} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Right — pillars */}
        <div className="lg:w-[55%] flex flex-col divide-y divide-white/6">
          {PILLARS.map((p) => (
            <div key={p.label} className="about-pillar group py-7 flex items-start gap-6 hover:pl-2 transition-all duration-300">
              <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-[#00ff87]/40 group-hover:bg-[#00ff87] transition-colors duration-300" />
              <div>
                <p className="text-white font-bold text-base mb-1 group-hover:text-[#00ff87] transition-colors duration-300">{p.label}</p>
                <p className="text-white/35 text-sm font-light leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
