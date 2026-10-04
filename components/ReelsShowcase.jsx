"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const LOCAL_VIDEOS = [
  { id: "v1", src: "/videos/secret.mp4", label: "Secret" },
  { id: "v2", src: "/videos/dont-pitch.mp4", label: "Don't Pitch for Sales" },
  { id: "v3", src: "/videos/3.mp4", label: "Trending Minds" },
  { id: "v5", src: "/videos/5.mp4", label: "Trending Minds" },
  { id: "v4", src: "/videos/4.mp4", label: "Trending Minds" },
  { id: "v6", src: "/videos/6.mp4", label: "Trending Minds" },
];

const REELS = [
  { id: "r1", url: "https://www.instagram.com/p/DdjILNfhPgn/", caption: "Trending Minds" },
  { id: "r3", url: "https://www.instagram.com/p/DdoFoVryj76/", caption: "Trending Minds" },
  { id: "r4", url: "https://www.instagram.com/p/DbqGNv8hPuf/", caption: "Trending Minds" },
  { id: "r5", url: "https://www.instagram.com/p/DaxiIhIBXwf/", caption: "Trending Minds" },
];

function LocalVideoCard({ video }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.setAttribute("muted", "");
    const tryPlay = () => el.play().catch(() => {});
    const obs = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? tryPlay() : el.pause(); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    tryPlay();
    return () => obs.disconnect();
  }, []);

  return (
    <div className="reel-card shrink-0 w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] border border-white/10 hover:border-[#00ff87]/40 transition-all duration-500 relative group">
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="w-full h-full object-cover"
      />
      {/* unmute toggle */}
      <button
        onClick={() => setMuted(m => !m)}
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        )}
      </button>
      {/* label */}
      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-[10px] text-white/60 tracking-widest uppercase">{video.label}</p>
      </div>
    </div>
  );
}

function ReelEmbed({ reel }) {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = `${reel.url}embed/`;

  return (
    <div className="reel-card shrink-0 w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] border border-white/10 hover:border-[#00ff87]/40 transition-all duration-500 relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#00ff87] animate-spin" />
        </div>
      )}
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        title={reel.caption}
      />
    </div>
  );
}

export default function ReelsShowcase() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

  // Load Instagram embed script once
  useEffect(() => {
    if (document.getElementById("ig-embed-script")) return;
    const s = document.createElement("script");
    s.id  = "ig-embed-script";
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reels-label", {
        y: 14, opacity: 0, duration: 0.4, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });
      gsap.from(".reels-h", {
        y: 35, opacity: 0, duration: 0.5, ease: "power4.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });
      gsap.from(".reel-card", {
        x: 50, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: trackRef.current, start: "top 100%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-28 z-20 overflow-hidden">

      {/* Header */}
      <div className="px-10 md:px-20 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="reels-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-4 font-medium flex items-center gap-2">
            <InstagramIcon size={12} />
            Instagram · @trending__minds
          </p>
          <h2 className="reels-h font-black tracking-tighter text-white leading-none section-clamp">
            Our Latest<br /><span className="ghost">Content.</span>
          </h2>
        </div>
        <a
          href="https://www.instagram.com/trending__minds/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/50 text-[11px] font-medium uppercase tracking-widest rounded-full hover:border-[#00ff87]/50 hover:text-[#00ff87] transition-all duration-300"
        >
          <InstagramIcon size={13} />
          Follow @trending__minds
        </a>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-5 px-10 md:px-20 overflow-x-auto pb-6 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {LOCAL_VIDEOS.map((video) => (
          <div key={video.id} style={{ scrollSnapAlign: "start" }}>
            <LocalVideoCard video={video} />
          </div>
        ))}

        {/* See all card */}
        <a
          href="https://www.instagram.com/trending__minds/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-[320px] aspect-[9/16] rounded-2xl border border-white/8 hover:border-[#00ff87]/30 bg-[#0d0d0d] flex flex-col items-center justify-center gap-5 transition-all duration-500 group"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="w-16 h-16 rounded-full border border-white/12 group-hover:border-[#00ff87]/50 flex items-center justify-center transition-colors duration-300">
            <InstagramIcon size={26} className="text-white/25 group-hover:text-[#00ff87] transition-colors duration-300" />
          </div>
          <div className="text-center">
            <p className="text-white/40 text-sm font-semibold group-hover:text-white/70 transition-colors duration-300 mb-1">See all reels</p>
            <p className="text-white/20 text-[10px] tracking-widest uppercase">@trending__minds</p>
          </div>
        </a>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-[#080808] to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-[#080808] to-transparent z-10" />
    </section>
  );
}
