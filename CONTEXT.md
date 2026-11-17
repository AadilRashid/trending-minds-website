# Trending Minds — Full Project Context

## Project Overview
- **Company**: Trending Minds — social media & digital media agency
- **Domain**: trendingminds.video
- **Email**: contact@trendingminds.video
- **Instagram**: @trending__minds
- **WhatsApp**: +91 788 938 0382 → `917889380382` for wa.me URL
- **Accent colour**: `#00ff87` (acid green)
- **Background**: `#090909`
- **Stack**: Next.js 16, React 19, Tailwind v4, GSAP 3, Lenis, Framer Motion, Lucide React, Resend

## File Structure
```
mahroof-media/
├── app/
│   ├── page.js                  ← main homepage (all sections)
│   ├── layout.js                ← Inter + Playfair Display, metadata
│   ├── globals.css              ← Tailwind v4, accent vars, grain, marquee keyframe
│   ├── not-found.js             ← 404 page
│   ├── about/page.js
│   ├── services/page.js
│   ├── work/page.js
│   ├── pricing/page.js
│   ├── contact/page.js
│   └── api/contact/route.js     ← Resend email handler
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Marquee.jsx
│   ├── ReelsShowcase.jsx
│   ├── Stats.jsx
│   ├── Services.jsx
│   ├── Photography.jsx
│   ├── Work.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Background.jsx
│   ├── WhatsAppButton.jsx
│   ├── Cursor.jsx
│   └── BlurText.jsx
├── public/
│   ├── videos/                  ← local mp4 reels (secret.mp4, dont-pitch.mp4, 3-6.mp4)
│   └── images/nslogo.png
├── .env.local
├── next.config.mjs
└── package.json
```

## Key Design Decisions
- All GSAP contexts scoped with `gsap.context(() => {}, ref)` — unique class names per section to avoid conflicts
- Lenis: `lerp:0.07, duration:1.4, wheelMulteel:0.8`, exponential easing `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- GSAP ticker drives Lenis RAF: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- Lucide React for all icons — NO brand logos (Instagram/TikTok use inline SVGs)
- `ghost` class = Playfair italic, transparent, white stroke 1px
- `ghost-accent` class = Playfair italic, transparent, green stroke 1.2px
- `hero-clamp` = `clamp(3.8rem, 11vw, 10.5rem)`
- `section-clamp` = `clamp(2.8rem, 7.5vw, 6.5rem)`
- Contact form uses Web3Forms (`https://api.web3forms.com/submit`) with access key `fb451609-fd21-4852-83c6-030f68c01bed`
- `/api/contact/route.js` uses Resend (placeholder key in `.env.local`)
- Photography section: placeholder cards with dot grid + Camera icon — real photos go in `/public/photos/`
- Instagram embeds: load `embed.js` once via useEffect, use `/embed/` suffix on post URL

## Section Order (homepage)
Hero → Marquee → ReelsShowcase → Stats → Services → Photography → Work → About → Contact → Footer

---

## app/page.js
```js
"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ReelsShowcase from "@/components/ReelsShowcase";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Photography from "@/components/Photography";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const blurWrapRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true, wheelMultiplier: 0.8, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      if (blurWrapRef.current && footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const vh = window.innerHeight;
        const opacity = footerTop >= vh ? 1 : Math.max(0, footerTop / vh);
        blurWrapRef.current.style.opacity = opacity;
      }
    });

    const tick = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => { lenis.destroy(); gsap.ticker.remove(tick); };
  }, []);

  return (
    <main>
      <div className="grain-overlay" />
      <Cursor />
      <Background />
      <WhatsAppButton />
      <Navbar />
      <div ref={blurWrapRef} className="bottom-blur" />

      <div className="relative z-10">
        <Hero />
        <Marquee />
        <ReelsShowcase />
        <Stats />
        <Services />
        <Photography />
        <Work />
        <About />
        <Contact />
        <div ref={footerRef}><Footer /></div>
      </div>
    </main>
  );
}
```

---

## app/globals.css
```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair);
}

:root {
  --accent: #00ff87;
}

*, *::before, *::after { box-sizing: border-box; }

@media (pointer: fine) {
  * { cursor: none !important; }
}

html, body {
  margin: 0;
  padding: 0;
  background: #090909;
  color: #f0f0f0;
  font-family: var(--font-inter), "Inter", sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

html { scrollbar-width: none; }
html::-webkit-scrollbar { display: none; }

::selection { background: #00ff87; color: #000; }

.ghost {
  font-family: var(--font-playfair), "Playfair Display", serif;
  font-style: italic;
  font-weight: 400;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
}

.ghost-accent {
  font-family: var(--font-playfair), "Playfair Display", serif;
  font-style: italic;
  font-weight: 400;
  color: transparent;
  -webkit-text-stroke: 1.2px #00ff87;
}

.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.bottom-blur {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  pointer-events: none;
  z-index: 40;
  background: linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0.95) 100%);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  mask-image: linear-gradient(to bottom, transparent, black 60%);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 60%);
}

.hero-clamp { font-size: clamp(3.8rem, 11vw, 10.5rem); }
.section-clamp { font-size: clamp(2.8rem, 7.5vw, 6.5rem); }

a, button { transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }

.section-rule { width: 100%; height: 1px; background: rgba(255,255,255,0.06); }

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 22s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

.custom-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,255,135,0.3) transparent; }
.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,255,135,0.25); border-radius: 99px; }

.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
```

---

## app/layout.js
```js
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Trending Minds — Social Media & Digital Media Agency",
    template: "%s — Trending Minds",
  },
  description:
    "Trending Minds is a full-service social media and digital media agency crafting scroll-stopping content, brand strategies, and cinematic campaigns that grow your audience and drive results.",
  keywords: [
    "Trending Minds", "Social Media Agency", "Digital Media Company", "Content Creation",
    "Brand Strategy", "Social Media Marketing", "Video Production",
    "Influencer Marketing", "Paid Ads", "Creative Agency", "trendingminds.video",
  ],
  metadataBase: new URL("https://trendingminds.video"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <div className="bottom-blur" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
```

---

## app/api/contact/route.js
```js
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Trending Minds Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:40px;border-radius:12px;">
          <h2 style="color:#00ff87;font-size:24px;margin:0 0 24px;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;width:120px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #222;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;">Email</td><td style="padding:10px 0;border-bottom:1px solid #222;"><a href="mailto:${email}" style="color:#00ff87;">${email}</a></td></tr>
            ${service ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;">Service</td><td style="padding:10px 0;border-bottom:1px solid #222;">${service}</td></tr>` : ""}
            <tr><td style="padding:10px 0;color:#888;vertical-align:top;">Message</td><td style="padding:10px 0;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</td></tr>
          </table>
          <p style="margin-top:32px;color:#444;font-size:12px;">Sent from trendingminds.video contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
```

---

## next.config.mjs
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.instagram.com https://connect.facebook.net",
              "frame-src https://www.instagram.com",
              "img-src 'self' data: https://www.instagram.com https://scontent*.cdninstagram.com https://scontent*.fbcdn.net",
              "style-src 'self' 'unsafe-inline'",
              "connect-src 'self' https://www.instagram.com https://api.web3forms.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## .env.local
```
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=contact@trendingminds.video
```

---

## package.json (dependencies)
```json
{
  "dependencies": {
    "framer-motion": "^14.0.0",
    "gsap": "^3.15.0",
    "lenis": "^1.3.26",
    "lucide-react": "^1.51.0",
    "motion": "^14.0.0",
    "next": "16.3.8",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-icons": "^5.7.0",
    "resend": "^6.32.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "16.3.8",
    "tailwindcss": "^4"
  }
}
```

---

## components/Background.jsx
```jsx
"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 bg-[#090909]">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 75% 10%, rgba(0,255,135,0.04) 0%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 15% 90%, rgba(0,255,135,0.025) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
```

---

## components/Cursor.jsx
```jsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const [isTouch, setIsTouch] = useState(null);

  useEffect(() => { setIsTouch(window.matchMedia("(pointer: coarse)").matches); }, []);

  useEffect(() => {
    if (isTouch !== false) return;
    const el = cursorRef.current;
    if (!el) return;
    let mx = -200, my = -200, cx = -200, cy = -200;
    let scale = 1, targetScale = 1, raf = null;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onEnter = () => { targetScale = 2.6; };
    const onLeave = () => { targetScale = 1; };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.querySelectorAll("a, button").forEach((n) => {
      n.addEventListener("mouseenter", onEnter);
      n.addEventListener("mouseleave", onLeave);
    });
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a:not([data-cur]), button:not([data-cur])").forEach((n) => {
        n.setAttribute("data-cur", "1");
        n.addEventListener("mouseenter", onEnter);
        n.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const frame = () => {
      raf = requestAnimationFrame(frame);
      cx += (mx - cx) * 0.11;
      cy += (my - cy) * 0.11;
      scale += (targetScale - scale) * 0.10;
      el.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${scale})`;
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); window.removeEventListener("mousemove", onMove); };
  }, [isTouch]);

  if (isTouch !== false) return null;
  return (
    <div ref={cursorRef} style={{ position: "fixed", top: 0, left: 0, width: 38, height: 38, borderRadius: "50%", background: "#fff", mixBlendMode: "difference", pointerEvents: "none", zIndex: 99999, willChange: "transform" }} />
  );
}
```

---

## components/WhatsAppButton.jsx
```jsx
"use client";
import { useState, useEffect } from "react";

const WA_NUMBER = "917889380382";
const WA_MESSAGE = encodeURIComponent("Hi Trending Minds! I'd like to discuss a project.");

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      className="fixed bottom-8 right-8 z-[9999] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-500"
      style={{ background: "#25D366", opacity: visible ? 1 : 0, transform: visible ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)", animation: visible ? "wa-pulse 2.5s ease-out infinite" : "none" }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="absolute right-16 bg-[#111] text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap border border-white/10 transition-all duration-200 pointer-events-none"
        style={{ opacity: tooltip ? 1 : 0, transform: tooltip ? "translateX(0)" : "translateX(6px)" }}>
        Chat with us
      </span>
      <style>{`@keyframes wa-pulse { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.45); } 70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }`}</style>
    </a>
  );
}
```

---

## components/BlurText.jsx
```jsx
"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes = {};
  keys.forEach((k) => { keyframes[k] = [from[k], ...steps.map((s) => s[k])]; });
  return keyframes;
};

export default function BlurText({
  text = "", delay = 200, className = "",
  animateBy = "words", direction = "top",
  threshold = 0.1, rootMargin = "0px",
  animationFrom, animationTo, easing = (t) => t,
  onAnimationComplete, stepDuration = 0.35,
}) {
  const elements = useMemo(() => {
    if (animateBy !== "words") return text.split("").map(c => ({ word: c, punctuation: "", isItalic: false }));
    let inItalic = false;
    return text.split(" ").map((word) => {
      let currentItalic = inItalic, cleanWord = word, punctuation = "";
      if (cleanWord.startsWith("*")) { cleanWord = cleanWord.slice(1); inItalic = true; currentItalic = true; }
      const m = cleanWord.match(/^(.*?)\*([.,\/#!$%\^&\*;:{}=\-_`~()]*)$/);
      if (m) { cleanWord = m[1]; punctuation = m[2]; inItalic = false; }
      return { word: cleanWord, punctuation, isItalic: currentItalic };
    });
  }, [text, animateBy]);

  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(ref.current); } },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(() =>
    direction === "top" ? { filter: "blur(10px)", opacity: 0, y: -50 } : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );
  const defaultTo = useMemo(() => [
    { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ], [direction]);

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => stepCount === 1 ? 0 : i / (stepCount - 1));

  return (
    <p ref={ref} className={className}>
      {elements.map((seg, i) => (
        <motion.span key={i} style={{ display: "inline-block" }}
          initial={fromSnapshot}
          animate={inView ? buildKeyframes(fromSnapshot, toSnapshots) : fromSnapshot}
          transition={{ duration: totalDuration, times, delay: (i * delay) / 1000, ease: easing }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {seg.isItalic ? <span className="font-serif italic text-white/90">{seg.word}</span> : seg.word}
          {seg.punctuation}&nbsp;
        </motion.span>
      ))}
    </p>
  );
}
```

---

## components/Navbar.jsx
```jsx
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
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-6 md:px-20 py-7">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <Link href="/" className="relative text-white font-black tracking-tighter text-xl hover:opacity-80 transition-opacity duration-300">
          Trending<span className="text-[#00ff87]">Minds</span>
        </Link>
        <ul className="relative hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] font-medium">
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={`px-4 py-2 transition-all duration-300 ${pathname === href ? "text-[#00ff87]" : "text-white/50 hover:text-white/80"}`}>{label}</Link>
            </li>
          ))}
          <li className="ml-2">
            <Link href="/contact" className="px-5 py-2 bg-[#00ff87] text-black font-bold rounded-full hover:bg-white hover:text-black transition-colors duration-300">Get Started</Link>
          </li>
        </ul>
        <button onClick={() => setOpen(v => !v)} className="relative md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] z-[60]" aria-label={open ? "Close menu" : "Open menu"}>
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
          <div className="mobile-nav-link mt-16 text-[10px] text-white/20 tracking-[0.4em] uppercase">Trending Minds · Digital Media Agency</div>
        </div>
      )}
    </>
  );
}
```

---

## components/Hero.jsx
```jsx
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
      gsap.from(".hero-word", { y: 110, opacity: 0, rotateX: -30, stagger: 0.08, duration: 1.1, ease: "power4.out", delay: 0.5 });
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
    <section ref={ref} className="relative min-h-screen flex items-center px-10 md:px-20 pt-32 pb-20 overflow-hidden">
      <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
        <div className="flex-1 max-w-3xl">
          <p className="hero-label text-[10px] text-[#00ff87] tracking-[0.35em] uppercase font-semibold mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00ff87]" />
            Social Media · Digital Media Agency
          </p>
          <h1 className="font-black tracking-tighter leading-[0.82] mb-10" style={{ fontSize: "clamp(4.2rem, 11vw, 10.5rem)", perspective: "1000px" }}>
            {words.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-[0.18em] last:mr-0">
                {word === "stop" || word === "scrolling."
                  ? <span className="text-[#00ff87]">{word}</span>
                  : <span className="text-white">{word}</span>}
              </span>
            ))}
          </h1>
          <p className="hero-sub text-white/40 text-base md:text-lg font-light leading-relaxed max-w-md mb-10">
            Short-form content for brands that want attention.<br />
            <span className="text-white/20 text-sm">Instagram · TikTok · YouTube Shorts</span>
          </p>
          <div className="hero-cta flex items-center gap-4 flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#00ff87] text-black font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300">
              Start a Project <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <Link href="/work" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/50 font-medium rounded-full text-sm uppercase tracking-widest hover:border-white/40 hover:text-white transition-colors duration-300">
              See Our Work
            </Link>
          </div>
        </div>
        <div className="hero-reel shrink-0 flex justify-center lg:block">
          <div className="relative w-[180px] lg:w-[220px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] border border-white/10">
            <video src="/videos/dont-pitch.mp4" autoPlay muted loop playsInline preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }} />
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
      <p className="absolute bottom-8 left-10 md:left-20 text-[10px] text-white/25 tracking-[0.4em] uppercase">Scroll ↓</p>
    </section>
  );
}
```

---

## components/Marquee.jsx
```jsx
"use client";

const ITEMS = [
  "Instagram", "·", "TikTok", "·", "YouTube Shorts", "·",
  "Reels", "·", "Brand Films", "·", "Paid Social", "·",
  "Influencer", "·", "Content Strategy", "·", "UGC", "·",
  "Instagram", "·", "TikTok", "·", "YouTube Shorts", "·",
  "Reels", "·", "Brand Films", "·", "Paid Social", "·",
  "Influencer", "·", "Content Strategy", "·", "UGC", "·",
];

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/6 py-4 z-20">
      <div className="marquee-track">
        {ITEMS.map((item, i) => (
          <span key={i} className={`shrink-0 px-5 text-[11px] font-medium tracking-[0.25em] uppercase whitespace-nowrap ${item === "·" ? "text-[#00ff87]/40" : "text-white/20"}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
```

---

## components/Stats.jsx
```jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "42M+", label: "Organic Views",   sub: "generated across platforms" },
  { value: "150+", label: "Brands Grown",     sub: "from startups to globals" },
  { value: "4.6×", label: "Avg. Engagement",  sub: "lift vs. industry baseline" },
  { value: "98%",  label: "Client Retention", sub: "they come back every time" },
];

export default function Stats() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stats-number", { y: 50, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
      gsap.from(".stats-label", { y: 20, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full z-20 px-10 md:px-20 py-24">
      <div className="w-full h-px bg-white/8 mb-16" />
      <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase font-medium mb-12 flex items-center gap-3">
        <span className="w-5 h-px bg-[#00ff87]" />By the numbers
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#080808] px-8 py-12 group hover:bg-white/[0.025] transition-colors duration-500">
            <p className="stats-number font-black tracking-tighter text-white leading-none mb-4 group-hover:text-[#00ff87] transition-colors duration-500" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>{s.value}</p>
            <p className="stats-label text-white/70 text-sm font-semibold mb-1.5">{s.label}</p>
            <p className="stats-label text-white/25 text-[11px] font-light tracking-wide leading-relaxed">{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="w-full h-px bg-white/8 mt-16" />
    </section>
  );
}
```

---

## components/Services.jsx
```jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";
import { LayoutGrid, Clapperboard, ChartNoAxesCombined, Users, Fingerprint, PenLine } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { Icon: LayoutGrid,          title: "Social Media Management", desc: "Full-service management of your Instagram, TikTok, LinkedIn, and X — strategy, content calendar, posting, and community engagement." },
  { Icon: Clapperboard,        title: "Video Production",         desc: "Cinematic brand films, reels, short-form content, and motion graphics that stop the scroll and tell your story." },
  { Icon: ChartNoAxesCombined, title: "Paid Advertising",         desc: "Data-driven Meta, Google, and TikTok ad campaigns engineered for maximum ROAS and audience growth." },
  { Icon: Users,               title: "Influencer Marketing",     desc: "End-to-end influencer campaigns — from talent sourcing and briefing to execution and performance reporting." },
  { Icon: Fingerprint,         title: "Brand Identity",           desc: "Logo design, visual systems, brand guidelines, and creative direction that make your brand instantly recognisable." },
  { Icon: PenLine,             title: "Content Creation",         desc: "Photography, copywriting, graphic design, and creative content packages tailored to every platform and audience." },
];

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top bottom", toggleActions: "play none none none", once: true } });
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
        <h2 className="svc-h font-black tracking-tighter text-white leading-none section-clamp">Our Services.</h2>
        <BlurText text="Everything your brand needs to *dominate* the digital landscape — under one roof."
          delay={25} animateBy="words" direction="bottom" stepDuration={0.2}
          className="max-w-sm text-sm text-white/40 font-light leading-relaxed" />
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
```

---

## components/About.jsx
```jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { label: "Social-First",      desc: "We don't resize TV ads into Reels. Everything is built for the feed from day one." },
  { label: "Fast",              desc: "Brief to publishable content in days, not months. Speed is a creative advantage." },
  { label: "Iterative",         desc: "Every piece teaches us what to make next. Data and creativity in the same loop." },
  { label: "Performance-Aware", desc: "We care about retention, shares, saves and conversions — not just pretty frames." },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } });
      tl.from(".about-label", { y: 14, opacity: 0, duration: 0.3, ease: "power3.out" })
        .from(".about-h",     { y: 40, opacity: 0, duration: 0.5, ease: "power4.out" }, 0.05)
        .from(".about-pillar",{ y: 24, opacity: 0, stagger: 0.09, duration: 0.45, ease: "power3.out" }, 0.2);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about-section" className="relative w-full px-10 md:px-20 py-32 z-20">
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
        <div className="lg:w-[45%] flex flex-col justify-between">
          <div>
            <p className="about-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium flex items-center gap-3">
              <span className="w-5 h-px bg-[#00ff87]" />Built for the Feed
            </p>
            <h2 className="about-h font-black tracking-tighter leading-[0.88] mb-8" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
              <span className="block text-white">We don't</span>
              <span className="block text-white">make content.</span>
              <span className="block ghost">We make noise.</span>
            </h2>
            <p className="text-white/35 text-sm font-light leading-relaxed max-w-sm mb-10">
              Trending Minds is a social-first studio. We build content systems that turn brands into the thing people talk about.
            </p>
          </div>
          <Link href="/about" className="about-label inline-flex items-center gap-2 text-[11px] text-white/40 uppercase tracking-widest hover:text-[#00ff87] transition-colors duration-300 group">
            Our story <ArrowRight size={12} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        <div className="lg:w-[55%] flex flex-col divide-y divide-white/6">
          {PILLARS.map((p) => (
            <div key={p.label} className="about-pillar group py-7 flex items-start gap-6 hover:pl-2 transition-all duration-300">
              <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-[#00ff87]/40 group-hover:bg-[#00ff87] transition-colors duration-300" />
              <div>
                <p className="text-white font-bold text-base mb-1 group-hover:text-[#00ff87] transition-colors duration-300">{p.label}</p>
                <p className="text-white/35 text-sm font-light leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## components/Contact.jsx
```jsx
"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00ff87]/60 transition-colors duration-300 text-sm";

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const formData = new FormData();
      formData.append("access_key", "fb451609-fd21-4852-83c6-030f68c01bed");
      formData.append("subject", `New enquiry from ${form.name}`);
      formData.append("from_name", "Trending Minds Website");
      formData.append("replyto", form.email);
      formData.append("botcheck", "");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("service", form.service);
      formData.append("message", form.message);
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) { setStatus("sent"); setForm({ name: "", email: "", service: "", message: "" }); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top bottom", toggleActions: "play none none none", once: true } });
      tl.from(".contact-label", { y: 14, opacity: 0, duration: 0.3, ease: "power3.out" })
        .from(".contact-h", { y: 35, opacity: 0, duration: 0.4, ease: "power4.out" }, 0.05)
        .from(".contact-field", { y: 25, opacity: 0, stagger: 0.08, duration: 0.35, ease: "power3.out" }, 0.18)
        .from(".contact-btn", { y: 15, opacity: 0, duration: 0.3, ease: "power2.out" }, 0.45);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact-section" className="relative min-h-screen flex flex-col justify-center px-10 md:px-20 pt-24 pb-24">
      <p className="contact-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-12 font-medium">Get In Touch</p>
      <div className="flex flex-col md:flex-row items-stretch gap-0 w-full max-w-7xl min-h-[65vh]">
        <div className="w-full md:w-[42%] pr-0 md:pr-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Name</span>
              <input className={`contact-field ${inputCls}`} type="text" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Email</span>
              <input className={`contact-field ${inputCls}`} type="email" placeholder="email@company.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Service</span>
              <select className={`contact-field ${inputCls}`} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                <option value="" className="bg-[#111]">Select a service…</option>
                <option value="social" className="bg-[#111]">Social Media Management</option>
                <option value="video" className="bg-[#111]">Video Production</option>
                <option value="ads" className="bg-[#111]">Paid Advertising</option>
                <option value="influencer" className="bg-[#111]">Influencer Marketing</option>
                <option value="brand" className="bg-[#111]">Brand Identity</option>
                <option value="content" className="bg-[#111]">Content Creation</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Message</span>
              <textarea className={`contact-field ${inputCls} resize-none`} rows={4} placeholder="Tell us about your project…" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            {status === "error" && <p className="text-red-400 text-xs uppercase tracking-widest">Something went wrong — please try again.</p>}
            {status === "sent" ? (
              <p className="contact-btn text-[#00ff87] text-sm uppercase tracking-widest font-bold">Message sent — we'll be in touch within 24 hours!</p>
            ) : (
              <button type="submit" disabled={status === "sending"} className="contact-btn w-full bg-[#00ff87] text-black font-bold py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            )}
          </form>
        </div>
        <div className="hidden md:block w-px self-stretch bg-white/10 mx-8" />
        <div className="w-full md:w-[58%] pl-0 md:pl-6 mt-16 md:mt-0 flex flex-col justify-end text-right">
          <h2 className="contact-h font-black tracking-tighter leading-[0.88]" style={{ fontSize: "clamp(2.6rem, 5.5vw, 6.5rem)" }}>
            <span className="block text-white">Got something</span>
            <span className="block text-white">worth saying?</span>
            <span className="block ghost-accent">Let's make it travel.</span>
          </h2>
          <p className="contact-label mt-6 text-white/20 text-sm font-light leading-relaxed text-right">
            Tell us what you're trying to achieve.<br />We'll figure out the content.
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## components/Footer.jsx
```jsx
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
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "X", href: "https://x.com" },
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
    <footer ref={ref} className="relative border-t border-white/8 px-10 md:px-20 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
        <div>
          <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-4 font-medium">Social Media & Digital Media Agency</p>
          <h2 className="font-black tracking-tighter leading-[0.85]" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            <span className="block text-white">Trending</span>
            <span className="block text-[#00ff87]">Minds</span>
          </h2>
        </div>
        <div className="flex flex-col gap-8 md:items-end">
          <nav className="flex gap-8 text-[11px] uppercase tracking-[0.3em] font-medium">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className="text-white/40 hover:text-[#00ff87] transition-colors duration-300">{label}</Link>
            ))}
          </nav>
          <div className="flex flex-wrap gap-8 text-[11px] uppercase tracking-[0.3em] font-medium">
            {SOCIALS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white/70 transition-colors duration-300">{label}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-white/8 mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-[10px] text-white/20 tracking-widest" style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: "italic" }}>
          contact@trendingminds.video
        </p>
        <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase">© {new Date().getFullYear()} Trending Minds. All rights reserved.</p>
      </div>
      <div className="flex justify-center mt-10 pt-8 border-t border-white/5">
        <a href="https://www.nucleosight.com/contact" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity duration-300">
          <img src="/images/nslogo.png" alt="Nucleosight" className="h-5 w-auto" />
          <span className="text-[10px] text-white tracking-[0.3em] uppercase">Powered by Nucleosight</span>
        </a>
      </div>
    </footer>
  );
}
```

---

## Notes for next agent

- `npm run dev` to start, `npm run build` to verify — build was clean as of last session
- Photography section (`components/Photography.jsx`) has 7 placeholder cards — real photos go in `/public/photos/`, update `src` fields in the `PHOTOS` array
- ReelsShowcase (`components/ReelsShowcase.jsx`) uses local videos from `/public/videos/` — 6 cards + "see all" link to Instagram
- Contact form uses **Web3Forms** (not Resend) — access key `fb451609-fd21-4852-83c6-030f68c01bed` already wired in both `components/Contact.jsx` and `app/contact/page.js`
- Resend route at `app/api/contact/route.js` exists but is secondary — needs real `RESEND_API_KEY` in `.env.local`
- `output: 'export'` in next.config.mjs means static export — `/api/contact` route won't work on static hosts; use Web3Forms for contact on static deploys
- Deploy target: Hostinger (`.hostinger.json` present in root)
- GitHub Actions deploy workflow at `.github/workflows/deploy.yml`
