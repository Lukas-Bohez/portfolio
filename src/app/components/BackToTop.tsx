
"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setProgress(percent);
      setVisible(percent > 0.12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 18;
  const offset = circumference * (1 - progress);

  return (
    <button
      aria-label="Back to top"
      onClick={handleClick}
      style={{
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
        transition: "opacity 0.3s, transform 0.3s",
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 50,
        background: "var(--bg-2)",
        border: "none",
        borderRadius: "50%",
        width: 56,
        height: 56,
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="var(--line)"
          strokeWidth="4"
        />
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
        <polyline
          points="22,13 22,27"
          stroke="var(--accent)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <polyline
          points="17,18 22,13 27,18"
          stroke="var(--accent)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
