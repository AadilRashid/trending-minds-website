"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";
import {
  LayoutGrid, Clapperboard, ChartNoAxesCombined,
  Users, Fingerprint, PenLine,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { Icon: LayoutGrid,            title: "Social Media Management",  desc: "Full-service management of your Instagram, TikTok, LinkedIn, and X — strategy, content calendar, posting, and community engagement." },
  { Icon: Clapperboard,          title: "Video Production",          desc: "Cinematic brand films, reels, short-form content, and motion graphics that stop the scroll and tell your story." },
  { Icon: ChartNoAxesCombined,   title: "Paid Advertising",          desc: "Data-driven Meta, Google, and TikTok ad campaigns engineered for maximum ROAS and audience growth." },
  { Icon: Users,                 title: "Influencer Marketing",      desc: "End-to-end influencer campaigns — from talent sourcing and briefing to execution and performance reporting." },
  { Icon: Fingerprint,           title: "Brand Identity",            desc: "Logo design, visual systems, brand guidelines, and creative direction that make your brand instantly recognisable." },
  { Icon: PenLine,               title: "Content Creation",          desc: "Photography, copywriting, graphic design, and creative content packages tailored to every platform and audience." },
];

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top bottom", toggleActions: "play none none none", once: true },
      });
      tl.from(".svc-label", { y: 14, opacity: 0, duration: 0.3, ease: "power3.out" })
        .from(".svc-h", { y: 35, opacity: 0, duration: 0.4, ease: "power4.out" }, 0.05)
        .from(".svc-card", { y: 30, opacity: 0, stagger: 0.08, duration: 0.4, ease: "power3.out" }, 0.2);

      gsap.to(ref.current, {
        scrollTrigger: { trigger: ref.current, start: "bottom 80%", end: "bottom 15%", scrub: 1.2 },
        opacity: 0, y: -45,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="services-section" className="relative w-full min-h-screen px-10 md:px-20 py-32 z-20">
      <p className="svc-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">What We Do</p>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <h2 className="svc-h font-black tracking-tighter text-white leading-none section-clamp">
          Our Services.
        </h2>
        <BlurText
          text="Everything your brand needs to *dominate* the digital landscape — under one roof."
          delay={25} animateBy="words" direction="bottom" stepDuration={0.2}
          className="max-w-sm text-sm text-white/40 font-light leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
        {SERVICES.map(({ Icon, title, desc }) => (
          <div key={title} className="svc-card group bg-[#080808] p-8 hover:bg-white/[0.03] transition-colors duration-500">
            <div className="mb-5 w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 group-hover:border-[#00ff87]/40 transition-colors duration-300">
              <Icon size={18} strokeWidth={1.5} className="text-white/40 group-hover:text-[#00ff87] transition-colors duration-300" />
            </div>
            <h3 className="text-white font-bold text-lg tracking-tight mb-3 group-hover:text-[#00ff87] transition-colors duration-300">{title}</h3>
            <p className="text-white/35 text-sm font-light leading-relaxed group-hover:text-white/55 transition-colors duration-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
