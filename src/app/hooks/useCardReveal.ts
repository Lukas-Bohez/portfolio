'use client';
import { useEffect } from 'react';

export function useCardReveal() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealCard = (card: HTMLElement, delayMs: number) => {
      card.style.transition = `transform 0.16s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, opacity 0.14s ease-out ${delayMs}ms`;
      card.style.opacity = '1';
      card.style.transform = 'translateY(0px)';
    };

    if (prefersReducedMotion) {
      cards.forEach((card) => {
        card.style.opacity = '1';
        card.style.transform = 'none';
      });
      return;
    }

    // Keep reveals quick and minimal to avoid the "loading" feeling while scrolling.
    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(6px)';
      card.style.transition = 'none';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          const revealOrder = Number(card.dataset.revealOrder || '0');
          const staggerDelay = Math.min(Math.max(revealOrder, 0) * 10, 30);

          if (entry.isIntersecting) {
            revealCard(card, staggerDelay);
            observer.unobserve(card);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '18% 0px 18% 0px',
      }
    );

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const isNearViewport = rect.top < window.innerHeight * 1.05 && rect.bottom > 0;
      if (isNearViewport) {
        revealCard(card, 0);
        return;
      }
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);
}
