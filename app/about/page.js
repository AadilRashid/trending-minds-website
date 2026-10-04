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

const VALUES = [
  { num: "01", title: "Social-First", desc: "We don't resize TV ads into Reels. Everything is built for the feed from day one — paced, captioned, and optimised for the platform it lives on." },
  { num: "02", title: "Fast", desc: "Brief to publishable content in days, not months. Speed is a creative advantage and we treat it as one." },
  { num: "03", title: "Iterative", desc: "Every piece teaches us what to make next. Data and creativity run in the same loop — not separate departments." },
  { num: "04", title: "Performance-Aware", desc: "We care about retention, shares, saves and conversions — not just pretty frames. Beautiful content that doesn't perform is just expensive decoration." },
];

const TEAM = [
  { name: "Mahroof", role: "Founder & Creative Director", desc: "The vision behind Trending Minds. Obsessed with content that earns attention rather than buying it." },
  { name: "Creative Team", role: "Video & Content", desc: "A tight team of editors, cinematographers, and designers who live on the feed." },
  { name: "Strategy Team", role: "Growth & Analytics", desc: "The people who make sure every piece of content has a reason to exist and a metric to prove it." },
];

export default function AboutPage() {
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
      gsap.from(".a-label", { y: 14, opacity: 0, duration: 0.4, ease: "power3.out", delay: 0.3 });
      gsap.from(".a-h", { y: 50, opacity: 0, duration: 0.7, ease: "power4.out", delay: 0.45 });
      gsap.from(".a-sub", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out", delay: 0.65 });
      gsap.from(".value-item", {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".values-section", start: "top 85%", once: true },
      });
      gsap.from(".team-card", {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".team-section", start: "top 85%", once: true },
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
      <section className="relative min-h-[70vh] flex flex-col justify-center px-10 md:px-20 pt-40 pb-20">
        <p className="a-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">Our Story</p>
        <h1 className="a-h font-black tracking-tighter text-white leading-none hero-clamp max-w-4xl">
          We don't make<br />content. <span className="ghost">We make noise.</span>
        </h1>
        <p className="a-sub mt-8 text-white/40 text-base md:text-lg font-light leading-relaxed max-w-xl">
          Trending Minds is a social-first studio. We build content systems that turn brands into the thing people talk about — on Instagram, TikTok, and everywhere the feed lives.
        </p>
      </section>

      {/* Mission statement */}
      <section className="px-10 md:px-20 py-24 border-t border-white/5">
        <div className="max-w-4xl">
          <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-8 font-medium">Why We Exist</p>
          <p className="text-2xl md:text-4xl font-black tracking-tighter text-white leading-tight">
            Most brands treat social media like a billboard. We treat it like a conversation — one that earns attention, builds trust, and drives real results.
          </p>
          <p className="mt-8 text-white/35 text-base font-light leading-relaxed max-w-2xl">
            We started Trending Minds because we saw too many brands spending money on content that looked good in a deck but died on the feed. We built a studio that thinks platform-first, moves fast, and measures everything.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="values-section px-10 md:px-20 py-24 border-t border-white/5">
        <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">How We Work</p>
        <h2 className="font-black tracking-tighter text-white leading-none section-clamp mb-16 max-w-xl">
          Our<br /><span className="ghost">principles.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {VALUES.map((v) => (
            <div key={v.num} className="value-item bg-[#080808] p-10 hover:bg-white/[0.02] transition-colors duration-300">
              <span className="font-mono text-[10px] text-[#00ff87] tracking-widest">{v.num}</span>
              <h3 className="mt-4 text-2xl font-black tracking-tighter text-white mb-3">{v.title}</h3>
              <p className="text-sm text-white/40 font-light leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="team-section px-10 md:px-20 py-24 border-t border-white/5">
        <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">The Team</p>
        <h2 className="font-black tracking-tighter text-white leading-none section-clamp mb-16 max-w-xl">
          The people<br /><span className="ghost">behind it.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TEAM.map((t) => (
            <div key={t.name} className="team-card rounded-2xl border border-white/8 bg-white/[0.02] p-8 hover:border-white/20 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 mb-6" />
              <h3 className="text-lg font-black tracking-tighter text-white mb-1">{t.name}</h3>
              <p className="text-[10px] text-[#00ff87] tracking-widest uppercase mb-4">{t.role}</p>
              <p className="text-sm text-white/35 font-light leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-10 md:px-20 py-24 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {[
            { value: "42M+", label: "Organic Views" },
            { value: "150+", label: "Brands Grown" },
            { value: "4.6×", label: "Avg. Engagement Lift" },
            { value: "98%", label: "Client Retention" },
          ].map((s) => (
            <div key={s.label} className="bg-[#080808] px-8 py-12 text-center hover:bg-white/[0.02] transition-colors duration-300">
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-[#00ff87]">{s.value}</p>
              <p className="mt-2 text-[10px] text-white/30 tracking-widest uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 md:px-20 py-32 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <h2 className="font-black tracking-tighter text-white leading-none section-clamp max-w-xl">
          Let's build<br /><span className="ghost">something.</span>
        </h2>
        <Link href="/contact" className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-[#00ff87] text-black font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300">
          Get In Touch <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
