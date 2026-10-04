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
    // Replace with your API endpoint or email service
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", service: "", message: "" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top bottom", toggleActions: "play none none none", once: true },
      });
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
              <input className={`contact-field ${inputCls}`} type="text" placeholder="Your name" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Email</span>
              <input className={`contact-field ${inputCls}`} type="email" placeholder="email@company.com" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Service</span>
              <select className={`contact-field ${inputCls}`} value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}>
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
              <textarea className={`contact-field ${inputCls} resize-none`} rows={4}
                placeholder="Tell us about your project…" required
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>

            {status === "sent" ? (
              <p className="contact-btn text-[#00ff87] text-sm uppercase tracking-widest font-bold">
                Message sent — we'll be in touch within 24 hours!
              </p>
            ) : (
              <button type="submit" disabled={status === "sending"}
                className="contact-btn w-full bg-[#00ff87] text-black font-bold py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-60">
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
            Tell us what you're trying to achieve.<br />
            We'll figure out the content.
          </p>
        </div>
      </div>
    </section>
  );
}
