'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroTransition({ children }: { children: React.ReactNode }) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { yPercent: 100 },
        {
          yPercent: -22,          // overshoot enough so the diagonal clears the viewport top
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start:   'top top',
            end:     '+=85%',     // transition lasts 85vh of scroll
            scrub:   1.5,
            pin:     true,
            pinSpacing: true,
          },
        }
      )
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        height:   '100vh',
        position: 'relative',
        overflow: 'hidden',       // hides the panel while it's below the viewport
      }}
    >
      {children}

      {/* Rising diagonal panel */}
      <div
        ref={panelRef}
        style={{
          position:  'absolute',
          inset:     0,
          background:'#f5f3ee',
          clipPath:  'polygon(0 10vw, 100% 0, 100% 100%, 0 100%)',
          zIndex:    20,
        }}
      />
    </div>
  )
}
