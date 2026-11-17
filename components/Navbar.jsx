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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(navRef.current, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out", delay: .15 });
  }, []);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(menuRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .32, ease: "power3.out" });
    gsap.fromTo(".mobile-nav-link", { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: .06, duration: .38, ease: "power3.out", delay: .06 });
  }, [open]);

  return (
    <>
      <nav ref={navRef} aria-label="Main navigation" className="fixed left-0 right-0 top-0 z-[60] flex items-center justify-between border-b border-white/[.07] bg-[#080a09]/65 px-5 py-4 backdrop-blur-xl md:px-10 lg:px-16">
        <Link href="/" aria-label="Trending Minds home" className="relative text-lg font-black tracking-[-.06em] text-white transition-opacity hover:opacity-75">
          Trending<span className="text-[#00ff87]">Minds</span><span className="ml-1 align-top text-[8px] font-medium tracking-normal text-white/35">®</span>
        </Link>

        <ul className="relative hidden items-center gap-1 text-[10px] font-medium uppercase tracking-[.2em] md:flex">
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} aria-current={pathname === href ? "page" : undefined} className={`rounded-full px-4 py-2.5 transition-colors duration-300 ${pathname === href ? "text-[#00ff87]" : "text-white/55 hover:text-white"}`}>
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-[#00ff87] px-5 py-3 font-bold text-black transition-all duration-300 hover:bg-white">
              Let’s talk <span aria-hidden="true">↗</span>
            </Link>
          </li>
        </ul>

        <button type="button" onClick={() => setOpen(v => !v)} className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full border border-white/15 md:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation">
          <span className={`block h-px w-5 bg-white transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-white transition-all duration-300 ${open ? "scale-x-0 opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-white transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" ref={menuRef} className="fixed inset-0 z-[55] flex flex-col justify-center bg-[#080a09]/[.98] px-8 backdrop-blur-2xl md:hidden">
          <p className="mb-8 text-[9px] uppercase tracking-[.35em] text-[#00ff87]">Navigate / Trending Minds</p>
          <ul className="flex w-full flex-col gap-5">
            {LINKS.map(({ label, href }, index) => (
              <li key={href} className="mobile-nav-link">
                <Link href={href} onClick={() => setOpen(false)} className={`block text-5xl font-black tracking-[-.07em] transition-colors ${pathname === href ? "text-[#00ff87]" : "text-white/75 hover:text-white"}`}>
                  <span className="mr-4 align-middle text-[10px] font-medium tracking-widest text-white/25">0{index + 1}</span>{label}
                </Link>
              </li>
            ))}
            <li className="mobile-nav-link mt-5 border-t border-white/10 pt-6">
              <Link href="/contact" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-full bg-[#00ff87] px-6 py-4 text-base font-bold text-black">
                Start a project <span aria-hidden="true">↗</span>
              </Link>
            </li>
          </ul>
          <p className="absolute bottom-8 left-8 text-[9px] uppercase tracking-[.3em] text-white/25">Social Media · Digital Media Agency</p>
        </div>
      )}
    </>
  );
}
