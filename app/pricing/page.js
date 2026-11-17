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

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    num: "01",
    name: "Presence",
    price: "12,000",
    currency: "₹",
    tagline: "Get your Instagram moving.",
    desc: "For businesses that need a consistent, professional presence on Instagram.",
    reels: "8 Reels / month",
    features: [
      "Content strategy",
      "Content calendar",
      "Captions & hashtags",
      "Posting & scheduling",
      "Account management",
      "Monthly report",
    ],
    cta: "Get Started",
    href: "/contact",
    highlight: false,
  },
  {
    num: "02",
    name: "Growth",
    price: "15,000",
    currency: "₹",
    tagline: "More content. More momentum.",
    desc: "For brands ready to take Instagram more seriously.",
    reels: "10 Reels / month",
    features: [
      "Everything in Presence",
      "2 Carousels / month",
      "Advanced content strategy",
      "Basic community management",
      "Performance optimisation",
      "Monthly strategy review",
    ],
    cta: "Choose Growth",
    href: "/contact",
    highlight: true,
    badge: "Most Popular",
  },
  {
    num: "03",
    name: "Brand",
    price: "25,000",
    currency: "₹",
    tagline: "Turn Instagram into a real brand channel.",
    desc: "More creative direction, more formats, more hands-on management.",
    reels: "14 Reels / month",
    features: [
      "Everything in Growth",
      "4 Carousels / month",
      "Creative campaigns",
      "Full community management",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Choose Brand",
    href: "/contact",
    highlight: false,
  },
  {
    num: "04",
    name: "Premium",
    price: "40,000+",
    currency: "₹",
    tagline: "Your dedicated Instagram team.",
    desc: "For businesses that want Instagram to become a major marketing channel.",
    reels: "18+ Reels / month",
    features: [
      "Everything in Brand",
      "6+ Carousels / month",
      "Campaign concepts",
      "Production support",
      "Custom content requirements",
      "Dedicated account manager",
    ],
    cta: "Let's Talk",
    href: "/contact",
    highlight: false,
  },
];

const PROCESS = [
  { num: "01", title: "Plan", body: "We understand your brand, audience and goals before a single frame is shot." },
  { num: "02", title: "Create", body: "We develop concepts, scripts and Reels built for your audience." },
  { num: "03", title: "Edit", body: "Raw footage becomes content built for Instagram — paced, captioned, optimised." },
  { num: "04", title: "Publish", body: "Captions, scheduling, publishing and consistency — handled." },
  { num: "05", title: "Manage", body: "We keep your account active, engaged and moving every day." },
  { num: "06", title: "Learn", body: "We track what's working and improve the next month." },
];

const FAQS = [
  {
    q: "Do I need to provide the videos?",
    a: "Not necessarily. We'll discuss your existing content, products and location and determine the best workflow for your brand.",
  },
  {
    q: "Can you manage our entire Instagram?",
    a: "Yes. Depending on the plan, we handle strategy, content planning, Reels, editing, captions, publishing, management and reporting.",
  },
  {
    q: "Is ₹12,000 the final price?",
    a: "₹12,000 is the starting plan. The final recommendation depends on your content volume and requirements.",
  },
  {
    q: "Can we upgrade later?",
    a: "Yes. Your plan can grow with your account — most clients move up within the first 3 months.",
  },
  {
    q: "Is there a contract?",
    a: "We work on a monthly basis. No long lock-ins — just consistent results that make you want to stay.",
  },
];

function FAQ({ q, a }) {
  const ref = useRef(null);
  const bodyRef = useRef(null);
  const isOpen = useRef(false);

  const toggle = () => {
    isOpen.current = !isOpen.current;
    const icon = ref.current.querySelector(".faq-icon");
    if (isOpen.current) {
      gsap.to(bodyRef.current, { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(icon, { rotation: 45, duration: 0.3 });
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" });
      gsap.to(icon, { rotation: 0, duration: 0.3 });
    }
  };

  return (
    <div ref={ref} className="border-b border-white/8">
      <button onClick={toggle} className="w-full flex items-center justify-between py-6 text-left gap-6 group">
        <span className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors duration-300 font-medium">{q}</span>
        <span className="faq-icon shrink-0 w-5 h-5 flex items-center justify-center text-white/30 group-hover:text-[#00ff87] transition-colors duration-300 text-xl leading-none">+</span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p className="pb-6 text-sm text-white/40 font-light leading-relaxed max-w-2xl">{a}</p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, syncTouch: false });
    lenis.on("scroll", () => ScrollTrigger.update());
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(tick); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from(".p-hero-label", { y: 14, opacity: 0, duration: 0.4, ease: "power3.out", delay: 0.3 });
      gsap.from(".p-hero-h", { y: 50, opacity: 0, duration: 0.7, ease: "power4.out", delay: 0.45 });
      gsap.from(".p-hero-sub", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out", delay: 0.65 });
      gsap.from(".p-hero-cta", { y: 16, opacity: 0, duration: 0.4, ease: "power3.out", delay: 0.8 });

      // Plan cards — no animation, always visible

      // Process items
      gsap.from(".process-item", {
        y: 40, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".process-grid", start: "top 85%", once: true },
      });

      // Sections
      [".faq-section", ".final-cta"].forEach((sel) => {
        gsap.from(sel, {
          y: 40, opacity: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sel, start: "top 88%", once: true },
        });
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

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex flex-col justify-center px-5 sm:px-8 lg:px-16 pt-36 pb-24">
        <p className="p-hero-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">Pricing</p>
        <h1 className="p-hero-h font-black tracking-tighter text-white leading-none hero-clamp max-w-4xl">
          Instagram,<br /><span className="ghost">fully managed.</span>
        </h1>
        <p className="p-hero-sub mt-8 text-white/40 text-base md:text-lg font-light leading-relaxed max-w-xl">
          Everything your brand needs to show up consistently, look great, and stay active on Instagram — handled by one team.
        </p>
        <div className="p-hero-cta mt-10 flex flex-wrap gap-4">
          <a href="#plans" className="px-7 py-3.5 bg-[#00ff87] text-black font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300">
            See Plans
          </a>
          <Link href="/contact" className="px-7 py-3.5 border border-white/15 text-white/60 font-medium rounded-full text-sm uppercase tracking-widest hover:border-white/40 hover:text-white transition-all duration-300">
            Talk to Us
          </Link>
        </div>
        <p className="p-hero-label mt-8 text-white/20 text-xs tracking-widest uppercase">Plans starting at ₹ 12,000 / month</p>
      </section>

      {/* ── PLANS ── */}
      <section id="plans" className="px-5 sm:px-8 lg:px-16 py-24">
        <div className="plans-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.num}
              className={`plan-card relative flex flex-col rounded-2xl p-8 border transition-all duration-500 ${
                plan.highlight
                  ? "border-[#00ff87]/40 bg-[#00ff87]/5"
                  : "border-white/8 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-[#00ff87] text-black text-[9px] font-bold uppercase tracking-widest rounded-full">
                  {plan.badge}
                </span>
              )}

              <div className="mb-8">
                <span className="font-mono text-[10px] text-white/20 tracking-widest">{plan.num}</span>
                <h3 className="mt-2 text-2xl font-black tracking-tighter text-white">{plan.name}</h3>
                <div className="mt-4 flex items-start gap-1">
                  <span className="text-white/50 text-lg font-bold mt-1">{plan.currency}</span>
                  <span className={`text-5xl font-black tracking-tighter leading-none ${plan.highlight ? "text-[#00ff87]" : "text-white"}`}>{plan.price}</span>
                </div>
                <span className="text-white/30 text-xs tracking-widest uppercase mt-1 block">/month</span>
                <p className="mt-3 text-[11px] text-white/40 font-light leading-relaxed">{plan.desc}</p>
              </div>

              <div className="mb-8 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
                <span className={`text-xs font-bold tracking-widest uppercase ${plan.highlight ? "text-[#00ff87]" : "text-white/60"}`}>{plan.reels}</span>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-white/50 font-light">
                    <span className={`mt-0.5 shrink-0 w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] ${plan.highlight ? "border-[#00ff87]/50 text-[#00ff87]" : "border-white/20 text-white/30"}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-10 w-full py-3.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-center transition-all duration-300 ${
                  plan.highlight
                    ? "bg-[#00ff87] text-black hover:bg-white"
                    : "border border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-white/20 text-xs font-light leading-relaxed max-w-2xl mx-auto">
          Plans cover strategy, creation, editing and management. Production requirements such as professional shoots, travel or large-scale campaigns can be added separately.
        </p>
      </section>

      {/* ── WHAT HAPPENS EVERY MONTH ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-24 border-t border-white/5">
        <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">The Process</p>
        <h2 className="font-black tracking-tighter text-white leading-none section-clamp mb-16 max-w-2xl">
          What happens<br /><span className="ghost">every month.</span>
        </h2>
        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {PROCESS.map((step) => (
            <div key={step.num} className="process-item bg-[#080808] p-8 hover:bg-white/[0.02] transition-colors duration-300">
              <span className="font-mono text-[10px] text-[#00ff87] tracking-widest">{step.num}</span>
              <h3 className="mt-3 text-lg font-black tracking-tighter text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-white/35 font-light leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 md:p-12 rounded-2xl border border-white/8 bg-white/[0.02]">
          <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-6">What you're really paying for</p>
          <p className="text-xl md:text-2xl font-black tracking-tighter text-white mb-8 max-w-xl">
            A team that thinks about your Instagram every day.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {["Strategy", "Creative", "Production", "Editing", "Publishing", "Analytics"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-[#00ff87] shrink-0" />
                <span className="text-sm text-white/50 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section px-5 sm:px-8 lg:px-16 py-24 border-t border-white/5">
        <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">FAQ</p>
        <h2 className="font-black tracking-tighter text-white leading-none section-clamp mb-16 max-w-xl">
          Good<br /><span className="ghost">questions.</span>
        </h2>
        <div className="max-w-3xl">
          {FAQS.map((faq) => <FAQ key={faq.q} {...faq} />)}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta px-5 sm:px-8 lg:px-16 py-32 border-t border-white/5">
        <p className="text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">Ready?</p>
        <h2 className="font-black tracking-tighter text-white leading-none section-clamp max-w-3xl">
          Ready to take<br /><span className="ghost">Instagram seriously?</span>
        </h2>
        <p className="mt-8 text-white/35 text-base md:text-lg font-light leading-relaxed max-w-lg">
          You don't need another social media agency. You need a team that understands your brand, makes the content, and keeps your Instagram moving.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <Link href="/contact" className="px-8 py-4 bg-[#00ff87] text-black font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300">
            Start a conversation →
          </Link>
          <span className="text-white/20 text-xs tracking-widest uppercase">Plans from ₹ 12,000 / month</span>
        </div>
      </section>

      <Footer />
    </main>
  );
}
