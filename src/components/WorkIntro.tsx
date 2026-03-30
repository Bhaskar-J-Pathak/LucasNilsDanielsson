'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WorkIntro() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const diagonalPx = window.innerWidth * 0.1

    const ctx = gsap.context(() => {
      // Opposite diagonal to Sentence — leans the other way for variety
      gsap.set(el, {
        clipPath: `polygon(0 0px, 100% ${diagonalPx}px, 100% 100%, 0 100%)`,
      })
      gsap.to(el, {
        clipPath: 'polygon(0 0px, 100% 0px, 100% 100%, 0 100%)',
        ease:     'none',
        scrollTrigger: {
          trigger: el,
          start:   'top bottom',
          end:     'top top',
          scrub:   true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        marginTop:      '-100vh',
        position:       'relative',
        zIndex:         2,
        clipPath:       'polygon(0 0px, 100% 10vw, 100% 100%, 0 100%)',
        width:          '100vw',
        minHeight:      '100vh',
        background:     '#0d0d0d',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'flex-end',
        paddingTop:     'clamp(140px, calc(10vw + 10vh), 260px)',
        paddingBottom:  'clamp(80px, 12vh, 160px)',
        paddingLeft:    'clamp(40px, 7vw, 120px)',
        paddingRight:   'clamp(40px, 7vw, 120px)',
        overflow:       'hidden',
        boxSizing:      'border-box',
      }}
    >
      {/* Top label row */}
      <div
        style={{
          position:       'absolute',
          top:            'clamp(32px, 5vh, 56px)',
          left:           'clamp(40px, 7vw, 120px)',
          right:          'clamp(40px, 7vw, 120px)',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-geist)',
            fontSize:      '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.3)',
          }}
        >
          Selected Work
        </span>
        <span
          style={{
            fontFamily:    'var(--font-geist)',
            fontSize:      '10px',
            letterSpacing: '0.18em',
            color:         'rgba(245,243,238,0.18)',
          }}
        >
          10 pieces
        </span>
      </div>

      {/* Main heading */}
      <div style={{ overflow: 'hidden' }}>
        <h2
          style={{
            fontFamily:    'var(--font-eb-garamond)',
            fontSize:      'clamp(52px, 8vw, 120px)',
            fontWeight:    400,
            fontStyle:     'italic',
            color:         '#f5f3ee',
            letterSpacing: '-0.03em',
            lineHeight:    0.95,
            margin:        0,
          }}
        >
          The Work
        </h2>
      </div>

      {/* Bottom rule + year range */}
      <div
        style={{
          borderTop:  '1px solid rgba(245,243,238,0.1)',
          marginTop:  'clamp(40px, 6vh, 80px)',
          paddingTop: '20px',
          display:    'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-geist)',
            fontSize:      '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.2)',
          }}
        >
          2019 — 2024
        </span>
        <span
          style={{
            fontFamily:    'var(--font-geist)',
            fontSize:      '10px',
            letterSpacing: '0.18em',
            color:         'rgba(245,243,238,0.15)',
          }}
        >
          ↓ scroll
        </span>
      </div>
    </section>
  )
}
