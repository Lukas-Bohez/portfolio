'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdFormat = 'auto' | 'fluid' | 'autorelaxed';
type AdLayout = 'in-article' | '';

type AdUnitProps = {
  slot: string;
  format?: AdFormat;
  layout?: AdLayout;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
};

export default function AdUnit({
  slot,
  format = 'auto',
  layout = '',
  className = '',
  style = {},
  label = 'Advertisement',
}: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.warn('[AdUnit] AdSense push failed:', error);
    }
  }, []);

  const isInArticle = layout === 'in-article';

  return (
    <div
      className={`ad-unit-wrapper ${className}`}
      aria-label={label}
      role="complementary"
      style={{ minHeight: isInArticle ? '250px' : '90px', ...style }}
    >
      <p className="ad-label">{label}</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: isInArticle ? 'center' : undefined }}
        data-ad-client="ca-pub-8418485814964449"
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(format === 'auto' ? { 'data-full-width-responsive': 'true' } : {})}
      />
    </div>
  );
}
