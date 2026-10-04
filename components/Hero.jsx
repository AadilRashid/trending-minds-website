"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", { y: 16, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.3 });
      gsap.from(".hero-word", {
        y: 110, opacity: 0, rotateX: -30,
        stagger: 0.08, duration: 1.1, ease: "power4.out", delay: 0.5,
      });
      gsap.from(".hero-sub",  { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", delay: 1.1 });
      gsap.from(".hero-cta",  { y: 20, opacity: 0, duration: 0.6, ease: "power3.out", delay: 1.3 });
      gsap.from(".hero-reel", { x: 60, opacity: 0, duration: 1.0, ease: "power3.out", delay: 0.9 });

      gsap.to(ref.current, {
        scrollTrigger: { trigger: ref.current, start: "bottom 55%", end: "bottom 5%", scrub: 1.2 },
        opacity: 0, y: -60,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = ["We", "make", "people", "stop", "scrolling."];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center px-10 md:px-20 pt-32 pb-20 overflow-hidden"
    >
      <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">

        {/* Left — headline */}
        <div className="flex-1 max-w-3xl">
          <p className="hero-label text-[10px] text-[#00ff87] tracking-[0.35em] uppercase font-semibold mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00ff87]" />
            Social Media · Digital Media Agency
          </p>

          <h1
            className="font-black tracking-tighter leading-[0.82] mb-10"
            style={{ fontSize: "clamp(4.2rem, 11vw, 10.5rem)", perspective: "1000px" }}
          >
            {words.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-[0.18em] last:mr-0">
                {word === "stop" || word === "scrolling."
                  ? <span className="text-[#00ff87]">{word}</span>
                  : <span className="text-white">{word}</span>
                }
              </span>
            ))}
          </h1>

          <p className="hero-sub text-white/40 text-base md:text-lg font-light leading-relaxed max-w-md mb-10">
            Short-form content for brands that want attention.<br />
            <span className="text-white/20 text-sm">Instagram · TikTok · YouTube Shorts</span>
          </p>

          <div className="hero-cta flex items-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#00ff87] text-black font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300"
            >
              Start a Project
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/50 font-medium rounded-full text-sm uppercase tracking-widest hover:border-white/40 hover:text-white transition-colors duration-300"
            >
              See Our Work
            </Link>
          </div>
        </div>

        {/* Right — reel card */}
        <div className="hero-reel shrink-0 flex justify-center lg:block">
          <div className="relative w-[180px] lg:w-[220px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] border border-white/10">
            <video
              src="/videos/dont-pitch.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white/60 text-[10px] tracking-widest uppercase">Latest Reel</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-[#00ff87] font-black text-lg tracking-tighter">42M+</span>
            <span className="text-white/30 text-[10px] tracking-widest uppercase">organic views</span>
          </div>
        </div>

      </div>

      {/* scroll hint */}
      <p className="absolute bottom-8 left-10 md:left-20 text-[10px] text-white/25 tracking-[0.4em] uppercase">
        Scroll ↓
      </p>
    </section>
  );
}
