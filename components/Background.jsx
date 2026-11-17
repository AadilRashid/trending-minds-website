"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#080a09]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 54% at 76% 24%, rgba(0,255,135,.105) 0%, rgba(0,255,135,.025) 42%, transparent 74%), radial-gradient(ellipse 50% 70% at 0% 88%, rgba(0,255,135,.035), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "linear-gradient(to bottom, black, transparent 88%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#080a09]/70" />
    </div>
  );
}
