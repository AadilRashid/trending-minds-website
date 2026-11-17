"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".hero-kicker", { y: 14, opacity: 0, duration: .55 })
        .from(".hero-line", { yPercent: 115, opacity: 0, rotateX: -14, stagger: .11, duration: .9 }, "-=.2")
        .from(".hero-copy, .hero-actions", { y: 18, opacity: 0, duration: .65, stagger: .12 }, "-=.35")
        .from(".hero-film", { y: 26, opacity: 0, scale: .97, duration: .9 }, "-=.7")
        .from(".hero-footnote", { opacity: 0, duration: .5 }, "-=.35");

      gsap.to(".hero-content", {
        y: -48,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root, start: "bottom 78%", end: "bottom 18%", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-32 md:px-10 lg:px-16">
      <div className="hero-content relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)] lg:gap-16">
        <div className="max-w-[900px]">
          <p className="hero-kicker mb-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.34em] text-[#00ff87] md:mb-10">
            <span className="h-px w-8 bg-[#00ff87]" />
            Independent social & digital studio
          </p>

          <h1 className="mb-8 font-black leading-[.82] tracking-[-.075em]" style={{ fontSize: "clamp(4rem, 10.7vw, 10.2rem)" }}>
            <span className="block overflow-hidden pb-[.08em]"><span className="hero-line inline-block">We make</span></span>
            <span className="block overflow-hidden pb-[.08em]"><span className="hero-line inline-block text-white/90">people stop</span></span>
            <span className="block overflow-hidden pb-[.08em]"><span className="hero-line inline-block text-[#00ff87]">scrolling<span className="text-white">.</span></span></span>
          </h1>

          <p className="hero-copy max-w-[430px] text-base font-light leading-relaxed text-white/55 md:text-lg">
            Short-form content with a point of view. We help ambitious brands earn attention, build relevance and turn audiences into action.
          </p>

          <div className="hero-actions mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="group inline-flex items-center gap-8 rounded-full bg-[#00ff87] px-6 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-black transition-all duration-300 hover:bg-white">
              Start a project
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link href="/work" className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-[11px] font-semibold uppercase tracking-[.18em] text-white/70 transition-colors duration-300 hover:border-[#00ff87]/70 hover:text-white">
              Explore our work <ArrowDownRight size={15} className="text-[#00ff87]" />
            </Link>
          </div>
        </div>

        <div className="hero-film mx-auto w-full max-w-[390px] lg:ml-auto lg:mr-0">
          <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[.25em] text-white/35">
            <span>In the feed / out in the world</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] shadow-[0_0_12px_#00ff87]" /> Featured reel</span>
          </div>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#111713] shadow-[0_30px_100px_rgba(0,0,0,.5)]">
            <video
              src="/videos/dont-pitch.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Featured short-form video produced by Trending Minds"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 md:p-6">
              <div>
                <p className="mb-2 text-[9px] uppercase tracking-[.28em] text-[#00ff87]">Make them look twice</p>
                <p className="text-2xl font-semibold tracking-tight">Built for the scroll.</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/20 text-white backdrop-blur-sm"><ArrowUpRight size={17} /></span>
            </div>
          </div>
          <div className="mt-5 flex items-end justify-between border-t border-white/12 pt-4">
            <div><p className="text-[9px] uppercase tracking-[.25em] text-white/35">Reach that travels</p><p className="mt-1 text-3xl font-bold tracking-[-.06em] text-[#00ff87]">42M<span className="text-white">+</span></p></div>
            <p className="max-w-[125px] text-right text-[9px] uppercase leading-relaxed tracking-[.2em] text-white/35">Organic views<br />across our work</p>
          </div>
        </div>
      </div>

      <div className="hero-footnote absolute bottom-7 left-5 right-5 z-10 flex items-center justify-between border-t border-white/10 pt-4 text-[9px] uppercase tracking-[.25em] text-white/30 md:left-10 md:right-10 lg:left-16 lg:right-16">
        <span>Instagram · TikTok · YouTube Shorts</span>
        <span className="hidden items-center gap-2 sm:flex">Scroll to explore <span className="text-[#00ff87]">↓</span></span>
        <span className="sm:hidden">01 / 06</span>
      </div>
    </section>
  );
}
