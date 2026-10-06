"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Expand } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Replace src values with your actual photo paths ─────────────────────────
// Drop your images into /public/photos/ and update the src fields below.
// span: "tall" = 2 rows, "wide" = 2 cols, "normal" = 1×1
const PHOTOS = [
  { id: "p1", src: null, alt: "Campaign shoot — brand launch",    span: "tall"   },
  { id: "p2", src: null, alt: "Product photography — hero shot",  span: "normal" },
  { id: "p3", src: null, alt: "Behind the scenes — studio day",   span: "normal" },
  { id: "p4", src: null, alt: "Lifestyle editorial",              span: "wide"   },
  { id: "p5", src: null, alt: "Event coverage — brand activation",span: "tall"   },
  { id: "p6", src: null, alt: "Portrait series",                  span: "normal" },
  { id: "p7", src: null, alt: "Content day — social assets",      span: "normal" },
];

const spanClass = {
  tall:   "row-span-2",
  wide:   "col-span-2",
  normal: "",
};

function PhotoCard({ photo }) {
  return (
    <div
      className={`photo-card group relative overflow-hidden rounded-xl border border-white/10 hover:border-white/25 transition-all duration-500 ${spanClass[photo.span]}`}
      style={{ minHeight: photo.span === "wide" ? "260px" : "320px" }}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      ) : (
        <div className="absolute inset-0 bg-[#111]">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,107,26,0.06) 0%, transparent 65%)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Camera size={22} strokeWidth={1} className="text-white/20" />
            <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase text-center px-6 leading-relaxed">{photo.alt}</p>
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />

      {/* Expand icon on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Expand size={13} strokeWidth={1.5} className="text-white" />
        </div>
      </div>

      {/* Caption on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
        <p className="text-white text-xs font-medium">{photo.alt}</p>
      </div>
    </div>
  );
}

export default function Photography() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".photo-label", { y: 14, opacity: 0, duration: 0.4, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
      gsap.from(".photo-h", { y: 35, opacity: 0, duration: 0.5, ease: "power4.out", delay: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
      gsap.from(".photo-card", { y: 30, opacity: 0, stagger: 0.07, duration: 0.6, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-32 px-10 md:px-20 z-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p className="photo-label text-[10px] text-[#00ff87] tracking-[0.5em] uppercase mb-4 font-medium flex items-center gap-2">
            <Camera size={12} strokeWidth={2} />
            Visual Portfolio
          </p>
          <h2 className="photo-h font-black tracking-tighter text-white leading-none section-clamp">
            Photography<br /><span className="ghost">&amp; Visuals.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-white/35 font-light leading-relaxed">
          High-end photography and visual content crafted for campaigns, editorials, and brand storytelling.
        </p>
      </div>

      {/* Masonry grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[260px]">
        {PHOTOS.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 flex justify-center">
        <a
          href="https://instagram.com/trending__minds"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white/50 text-[11px] font-medium uppercase tracking-widest rounded-full hover:border-[#00ff87]/50 hover:text-[#00ff87] transition-all duration-300"
        >
          <Camera size={13} strokeWidth={1.5} />
          View Full Gallery
        </a>
      </div>
    </section>
  );
}
