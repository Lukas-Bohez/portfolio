"use client"
import { useEffect } from "react"

export function useCardReveal() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-reveal]")

    // Set initial state — cards start offscreen-right, tilted, invisible
    cards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateX(80px) rotate(4deg) scale(0.97)"
      card.style.transition = "none"
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement

          if (entry.isIntersecting) {
            // Entering viewport — float in from right, straighten up
            card.style.transition =
              "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease"
            card.style.opacity = "1"
            card.style.transform = "translateX(0px) rotate(0deg) scale(1)"
          } else {
            // Leaving viewport — check if leaving from top or bottom
            const rect = card.getBoundingClientRect()
            const leavingFromTop = rect.top < 0

            if (leavingFromTop) {
              // Float away to the right and up, tilting slightly
              card.style.transition =
                "transform 0.4s cubic-bezier(0.4, 0, 1, 1), opacity 0.35s ease"
              card.style.opacity = "0"
              card.style.transform = "translateX(60px) rotate(-3deg) scale(0.96)"
            } else {
              // Reset to enter-from-right state for when user scrolls back down
              card.style.transition = "none"
              card.style.opacity = "0"
              card.style.transform = "translateX(80px) rotate(4deg) scale(0.97)"
            }
          }
        })
      },
      {
        threshold: 0.12,        // triggers when 12% of card is visible
        rootMargin: "0px 0px 0px 0px"  // no margin — fires exactly at viewport edge
      }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])
}
