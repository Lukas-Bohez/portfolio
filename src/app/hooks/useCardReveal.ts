"use client"
import { useEffect } from "react"

export function useCardReveal() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-reveal]")
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      cards.forEach((card) => {
        card.style.opacity = "1"
        card.style.transform = "none"
      })
      return
    }

    // Keep reveals responsive so cards are visible almost immediately when entering view.
    cards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(10px) scale(0.995)"
      card.style.transition = "none"
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement
          const revealOrder = Number(card.dataset.revealOrder || "0")
          const staggerDelay = Math.min(Math.max(revealOrder, 0) * 24, 120)

          if (entry.isIntersecting) {
            // Reveal once to avoid repeated animation churn while scrolling.
            card.style.transition =
              `transform 0.28s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}ms, opacity 0.22s ease ${staggerDelay}ms`
            card.style.opacity = "1"
            card.style.transform = "translateY(0px) scale(1)"
            observer.unobserve(card)
          }
        })
      },
      {
        threshold: 0.02,
        rootMargin: "0px 0px 12% 0px"
      }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])
}
