'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      setProgress(pct);
      setVisible(scrollY > 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="back-to-top"
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      className="back-to-top"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.96)',
      }}
    >
      <svg className="back-to-top__ring" viewBox="0 0 36 36" aria-hidden="true" focusable="false">
        <circle className="back-to-top__ring-base" cx="18" cy="18" r="16" />
        <circle
          className="back-to-top__ring-progress"
          cx="18"
          cy="18"
          r="16"
          strokeDasharray="100"
          strokeDashoffset={100 - progress * 100}
          style={{ transition: 'stroke-dashoffset 0.18s linear' }}
        />
      </svg>
      <svg className="back-to-top__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      </svg>
    </button>
  );
}
