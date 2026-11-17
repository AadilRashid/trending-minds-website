"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/trending__minds" },
];

export default function Footer() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(48px)";
    el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; observer.disconnect(); }
    }, { threshold: 0.01 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className="relative border-t border-white/8 px-5 sm:px-8 lg:px-16 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
        <div>
          <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-4 font-medium">Social Media & Digital Media Agency</p>
          <h2 className="font-black tracking-tighter leading-[0.85]" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            <span className="block text-white">Trending</span>
            <span className="block text-[#00ff87]">Minds</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.2em] font-medium">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className="text-white/40 hover:text-[#00ff87] transition-colors duration-300">{label}</Link>
            ))}
          </nav>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.2em] font-medium">
            {SOCIALS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-white/25 hover:text-white/70 transition-colors duration-300">{label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-white/8 mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-[10px] text-white/20 tracking-widest" style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: "italic" }}>
          contact@trendingminds.video
        </p>
        <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Trending Minds. All rights reserved.
        </p>
      </div>

      <div className="flex justify-center mt-10 pt-8 border-t border-white/5">
        <a href="https://www.nucleosight.com/contact" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity duration-300">
          <img src="/images/nslogo.png" alt="Nucleosight" className="h-5 w-auto" />
          <span className="text-[10px] text-white tracking-[0.3em] uppercase">Powered by Nucleosight</span>
        </a>
      </div>
    </footer>
  );
}
