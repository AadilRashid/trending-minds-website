"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";

export default function NotFound() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nf-404", { y: 60, opacity: 0, duration: 0.8, ease: "power4.out", delay: 0.2 });
      gsap.from(".nf-label", { y: 14, opacity: 0, duration: 0.4, ease: "power3.out", delay: 0.5 });
      gsap.from(".nf-h", { y: 40, opacity: 0, duration: 0.6, ease: "power4.out", delay: 0.65 });
      gsap.from(".nf-sub", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out", delay: 0.8 });
      gsap.from(".nf-links", { y: 16, opacity: 0, duration: 0.4, ease: "power3.out", delay: 0.95 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={ref} className="relative min-h-screen flex flex-col">
      <div className="grain-overlay" />
      <Cursor />
      <Background />
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-10 md:px-20 text-center">

        {/* Big 404 */}
        <p
          className="nf-404 font-black tracking-tighter text-white/5 select-none leading-none"
          style={{ fontSize: "clamp(10rem, 30vw, 26rem)" }}
        >
          404
        </p>

        {/* Content overlaid */}
        <div className="-mt-16 md:-mt-24 relative z-10">
          <p className="nf-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-4 font-medium">
            Page Not Found
          </p>
          <h1 className="nf-h font-black tracking-tighter text-white leading-none mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            You've gone<br /><span className="ghost">off the feed.</span>
          </h1>
          <p className="nf-sub text-white/35 text-sm font-light leading-relaxed max-w-sm mx-auto mb-10">
            This page doesn't exist — but the rest of the site does. Head back and find what you're looking for.
          </p>

          <div className="nf-links flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="px-7 py-3.5 bg-[#00ff87] text-black font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300">
              Back to Home
            </Link>
            <Link href="/contact" className="px-7 py-3.5 border border-white/15 text-white/50 font-medium rounded-full text-sm uppercase tracking-widest hover:border-white/40 hover:text-white transition-all duration-300">
              Contact Us
            </Link>
          </div>

          {/* Quick nav */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "Services", href: "/services" },
              { label: "Work", href: "/work" },
              { label: "About", href: "/about" },
              { label: "Pricing", href: "/pricing" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-[10px] text-white/20 uppercase tracking-widest hover:text-[#00ff87] transition-colors duration-300">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
