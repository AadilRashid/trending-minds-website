"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "42M+", label: "Organic Views",    sub: "generated across platforms"  },
  { value: "150+", label: "Brands Grown",      sub: "from startups to globals"    },
  { value: "4.6×", label: "Avg. Engagement",   sub: "lift vs. industry baseline"  },
  { value: "98%",  label: "Client Retention",  sub: "they come back every time"   },
];

export default function Stats() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stats-number", {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
      gsap.from(".stats-label", {
        y: 20, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    }, ref); // scoped to ref — no global selector conflicts
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full z-20 px-10 md:px-20 py-24">

      <div className="w-full h-px bg-white/8 mb-16" />

      {/* eyebrow */}
      <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase font-medium mb-12 flex items-center gap-3">
        <span className="w-5 h-px bg-[#00ff87]" />
        By the numbers
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-[#080808] px-8 py-12 group hover:bg-white/[0.025] transition-colors duration-500"
          >
            <p
              className="stats-number font-black tracking-tighter text-white leading-none mb-4 group-hover:text-[#00ff87] transition-colors duration-500"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              {s.value}
            </p>
            <p className="stats-label text-white/70 text-sm font-semibold mb-1.5">{s.label}</p>
            <p className="stats-label text-white/25 text-[11px] font-light tracking-wide leading-relaxed">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-white/8 mt-16" />

    </section>
  );
}
