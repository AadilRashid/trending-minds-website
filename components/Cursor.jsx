"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const [isTouch, setIsTouch] = useState(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

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

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [isTouch]);

  if (isTouch !== false) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed", top: 0, left: 0,
        width: 38, height: 38, borderRadius: "50%",
        background: "#fff", mixBlendMode: "difference",
        pointerEvents: "none", zIndex: 99999, willChange: "transform",
      }}
    />
  );
}
