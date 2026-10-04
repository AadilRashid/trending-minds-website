"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 });
  }, []);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    gsap.fromTo(menuRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
    gsap.fromTo(".mobile-nav-link", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.1 });
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-6 md:px-20 py-7"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        <Link href="/" className="relative text-white font-black tracking-tighter text-xl hover:opacity-80 transition-opacity duration-300">
          Trending<span className="text-[#00ff87]">Minds</span>
        </Link>

        <ul className="relative hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] font-medium">
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={`px-4 py-2 transition-all duration-300 ${pathname === href ? "text-[#00ff87]" : "text-white/50 hover:text-white/80"}`}>
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <Link href="/contact" className="px-5 py-2 bg-[#00ff87] text-black font-bold rounded-full hover:bg-white hover:text-black transition-colors duration-300">
              Get Started
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setOpen(v => !v)}
          className="relative md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] z-[60]"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7.5px]" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
        </button>
      </nav>

      {open && (
        <div ref={menuRef} className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl flex flex-col justify-center items-start px-10 md:hidden">
          <ul className="flex flex-col gap-8 w-full">
            {LINKS.map(({ label, href }) => (
              <li key={href} className="mobile-nav-link">
                <Link href={href} onClick={() => setOpen(false)}
                  className={`block text-4xl font-black tracking-tighter transition-colors duration-300 ${pathname === href ? "text-[#00ff87]" : "text-white/70 hover:text-white"}`}>
                  {label}
                </Link>
              </li>
            ))}
            <li className="mobile-nav-link mt-4 pt-4 border-t border-white/10">
              <Link href="/contact" onClick={() => setOpen(false)}
                className="block w-full py-4 bg-[#00ff87] text-black text-xl font-bold tracking-tight rounded-2xl text-center hover:bg-white transition-colors duration-300">
                Get Started
              </Link>
            </li>
          </ul>
          <div className="mobile-nav-link mt-16 text-[10px] text-white/20 tracking-[0.4em] uppercase">
            Trending Minds · Digital Media Agency
          </div>
        </div>
      )}
    </>
  );
}
