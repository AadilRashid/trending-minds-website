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
          <span
            key={i}
            className={`shrink-0 px-5 text-[11px] font-medium tracking-[0.25em] uppercase whitespace-nowrap ${
              item === "·" ? "text-[#00ff87]/40" : "text-white/20"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
