"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Clapperboard, Fingerprint, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    num: "01", label: "Social Media", title: "Social Campaigns",
    description: "Viral campaigns, content series, and community-building strategies that grew audiences by millions across Instagram, TikTok, and LinkedIn.",
    href: "/work?cat=social",
    Icon: Globe,
  },
  {
    num: "02", label: "Video & Motion", title: "Video Production",
    description: "Brand films, product launches, reels, and motion graphics that captivate audiences and communicate brand stories with cinematic precision.",
    href: "/work?cat=video",
    Icon: Clapperboard,
  },
  {
    num: "03", label: "Brand Identity", title: "Branding & Design",
    description: "Visual identities, brand systems, and creative direction for startups and established brands looking to redefine their market presence.",
    href: "/work?cat=brand",
    Icon: Fingerprint,
  },
];

export default function Work() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".work-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        });
      });
      gsap.to(ref.current, {
        scrollTrigger: { trigger: ref.current, start: "bottom 80%", end: "bottom 20%", scrub: 1 },
        opacity: 0, y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="work-section" className="relative w-full min-h-screen px-10 md:px-20 pt-64 pb-72 flex flex-col justify-center">
      <div className="max-w-4xl w-full">
        <div className="mb-14 md:mb-20">
          <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-4 font-medium">Selected Work</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="font-black tracking-tighter text-white leading-none section-clamp">Case Studies.</h2>
            <div className="flex flex-wrap gap-2 lg:pb-2">
              {["Social", "Video", "Brand"].map((cat) => (
                <Link key={cat} href={`/work?cat=${cat.toLowerCase()}`}
                  className="px-4 py-2 rounded-full text-[10px] font-medium tracking-widest uppercase transition-all duration-300 bg-transparent text-white/40 border border-white/10 hover:text-white hover:border-white/30">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {CATEGORIES.map((cat) => (
            <Link key={cat.num} href={cat.href}
              className="work-item group relative flex items-start gap-8 py-10 md:py-14 border-b border-white/8 hover:border-white/20 transition-all duration-500">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#00ff87] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              <div className="pl-3 shrink-0 w-8 pt-1">
                <span className="font-mono text-[10px] text-white/20 group-hover:text-[#00ff87] tracking-widest transition-colors duration-300">{cat.num}</span>
              </div>
              <div className="flex-1 min-w-0 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-500 ease-out">
                <p className="text-[10px] text-white/30 group-hover:text-[#00ff87]/70 tracking-[0.4em] uppercase font-light mb-2 transition-colors duration-300">{cat.label}</p>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter mb-3">{cat.title}</h3>
                <p className="text-sm text-white/35 group-hover:text-white/60 font-light leading-relaxed max-w-2xl transition-colors duration-300">{cat.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-white/20 group-hover:text-white/55 tracking-widest uppercase transition-colors duration-200">
                  View Case Studies
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
              <div className="hidden md:flex shrink-0 items-center pt-2 text-white">
                <cat.Icon size={28} strokeWidth={1} className="opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
              </div>
            </Link>
          ))}

          <Link href="/work"
            className="work-item group relative flex items-center gap-8 py-10 md:py-14 border-b border-white/8 hover:border-white/20 transition-all duration-500">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#00ff87] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
            <div className="pl-3 shrink-0 w-8">
              <span className="font-mono text-[10px] text-white/20 group-hover:text-[#00ff87] tracking-widest transition-colors duration-300">→</span>
            </div>
            <div className="flex-1 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-500 ease-out">
              <p className="text-[10px] text-white/30 group-hover:text-[#00ff87]/70 tracking-[0.4em] uppercase font-light mb-2 transition-colors duration-300">Full Portfolio</p>
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter">View All Case Studies</h3>
            </div>
            <div className="hidden md:flex items-center text-white/20 group-hover:text-[#00ff87] transition-colors duration-300 pr-2">
              <ArrowRight size={28} strokeWidth={1.5} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
