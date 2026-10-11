"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00ff87]/60 transition-colors duration-300 text-sm";

const SERVICES = [
  "Social Media Management", "Video Production", "Paid Advertising",
  "Influencer Marketing", "Brand Identity", "Content Creation", "Not sure yet",
];

export default function ContactPage() {
  const pageRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "f85430a9-310a-4a04-a46f-f977d9cb1d48",
          subject: `New enquiry from ${form.name}`,
          from_name: "Trending Minds Website",
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", service: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
      gsap.from(".c-label", { y: 14, opacity: 0, duration: 0.4, ease: "power3.out", delay: 0.3 });
      gsap.from(".c-h", { y: 50, opacity: 0, duration: 0.7, ease: "power4.out", delay: 0.45 });
      gsap.from(".c-field", { y: 20, opacity: 0, stagger: 0.07, duration: 0.4, ease: "power3.out", delay: 0.7 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef}>
      <div className="grain-overlay" />
      <Cursor />
      <Background />
      <Navbar />

      <section className="relative min-h-screen px-10 md:px-20 pt-40 pb-32">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 w-full max-w-7xl">

          {/* Left */}
          <div className="lg:w-[45%]">
            <p className="c-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-6 font-medium">Get In Touch</p>
            <h1 className="c-h font-black tracking-tighter text-white leading-none mb-8" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
              Got something<br />worth saying?<br /><span className="ghost">Let's make it travel.</span>
            </h1>
            <p className="text-white/35 text-sm font-light leading-relaxed max-w-sm mb-12">
              Tell us what you're trying to achieve. We'll figure out the content, the strategy, and the execution.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: "Email", value: "hello@trendingminds.video" },
                { label: "Instagram", value: "@trending__minds" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-[10px] text-white/25 tracking-widest uppercase w-20">{item.label}</span>
                  <span className="text-sm text-white/50">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:w-[55%]">
            {status === "sent" ? (
              <div className="flex flex-col items-start justify-center h-full gap-6 py-20">
                <div className="w-16 h-16 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center">
                  <span className="text-[#00ff87] text-2xl">✓</span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter text-white">Message sent.</h2>
                <p className="text-white/40 text-sm font-light leading-relaxed max-w-sm">
                  We'll be in touch within 24 hours. In the meantime, follow us on Instagram for a taste of what we do.
                </p>
                <button onClick={() => setStatus("idle")} className="mt-4 text-[11px] text-white/30 uppercase tracking-widest hover:text-white transition-colors duration-300">
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="c-field flex flex-col gap-1.5">
                  <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Name</span>
                  <input className={inputCls} type="text" placeholder="Your name" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="c-field flex flex-col gap-1.5">
                  <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Email</span>
                  <input className={inputCls} type="email" placeholder="email@company.com" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="c-field flex flex-col gap-1.5">
                  <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Service</span>
                  <select className={inputCls} value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option value="" className="bg-[#111]">Select a service…</option>
                    {SERVICES.map((s) => <option key={s} value={s} className="bg-[#111]">{s}</option>)}
                  </select>
                </div>
                <div className="c-field flex flex-col gap-1.5">
                  <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Monthly Budget</span>
                  <select className={inputCls} value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                    <option value="" className="bg-[#111]">Select a range…</option>
                    <option value="12k" className="bg-[#111]">₹12,000 – ₹15,000</option>
                    <option value="25k" className="bg-[#111]">₹15,000 – ₹25,000</option>
                    <option value="40k" className="bg-[#111]">₹25,000 – ₹40,000</option>
                    <option value="40k+" className="bg-[#111]">₹40,000+</option>
                  </select>
                </div>
                <div className="c-field flex flex-col gap-1.5">
                  <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Message</span>
                  <textarea className={`${inputCls} resize-none`} rows={5}
                    placeholder="Tell us about your brand and what you're trying to achieve…" required
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" disabled={status === "sending"}
                  className="c-field w-full bg-[#00ff87] text-black font-bold py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-60 mt-2">
                  {status === "sending" ? "Sending…" : status === "error" ? "Something went wrong — try again" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
