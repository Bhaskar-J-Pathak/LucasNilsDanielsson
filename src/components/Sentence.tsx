'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function Sentence() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const diagonalPx = window.innerWidth * 0.1

    const ctx = gsap.context(() => {
      gsap.set(el, {
        clipPath: `polygon(0 ${diagonalPx}px, 100% 0px, 100% 100%, 0 100%)`,
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
        clipPath:       'polygon(0 10vw, 100% 0, 100% 100%, 0 100%)',
        width:          '100vw',
        minHeight:      '100vh',
        background:     '#f5f3ee',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        paddingTop:     'clamp(120px, calc(10vw + 8vh), 220px)',
        paddingBottom:  'clamp(80px, 12vh, 160px)',
        paddingLeft:    'clamp(40px, 7vw, 120px)',
        paddingRight:   'clamp(40px, 7vw, 120px)',
        overflow:       'hidden',
      }}
    >
      {/* Magic sentence */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          initial={{ y: '110%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 1, ease }}
          style={{
            fontFamily:    'var(--font-eb-garamond)',
            fontSize:      'clamp(38px, 5.8vw, 90px)',
            fontWeight:    400,
            fontStyle:     'italic',
            color:         '#0d0d0d',
            letterSpacing: '-0.025em',
            lineHeight:    1.08,
            margin:        0,
            maxWidth:      '22ch',
          }}
        >
          Between what you see and what you believe — that&apos;s where I work.
        </motion.h2>
      </div>

      {/* Location — bridges to the Stockholm bento below */}
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.5 }}
        style={{
          display:       'block',
          fontFamily:    'var(--font-geist)',
          fontSize:      '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color:         'rgba(13,13,13,0.35)',
          marginTop:     'clamp(32px, 5vh, 64px)',
        }}
      >
        
      Borlänge, Sweden
      </motion.span>
    </section>
  )
}
