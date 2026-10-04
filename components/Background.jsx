"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 bg-[#080808]">
      {/* Radial gradient accent */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(255,107,26,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
