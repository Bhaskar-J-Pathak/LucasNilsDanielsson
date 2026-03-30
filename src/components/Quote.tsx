'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function Quote() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section
      ref={ref}
      style={{
        background:    '#0d0d0d',
        width:         '100vw',
        paddingTop:    'clamp(120px, 18vh, 240px)',
        paddingBottom: 'clamp(120px, 18vh, 240px)',
        paddingLeft:   'clamp(40px, 7vw, 120px)',
        paddingRight:  'clamp(40px, 7vw, 120px)',
        overflow:      'hidden',
      }}
    >
      {/* Quote line */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          initial={{ y: '110%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 1.1, ease }}
          style={{
            fontFamily:    'var(--font-eb-garamond)',
            fontSize:      'clamp(38px, 5.4vw, 84px)',
            fontWeight:    400,
            fontStyle:     'italic',
            color:         '#f5f3ee',
            letterSpacing: '-0.025em',
            lineHeight:    1.08,
            margin:        0,
            maxWidth:      '22ch',
          }}
        >
          Wonder is the one thing no one has ever found a way to fake.
        </motion.h2>
      </div>

      {/* Attribution */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.55 }}
        style={{
          display:       'block',
          fontFamily:    'var(--font-geist)',
          fontSize:      '10px',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color:         'rgba(245,243,238,0.28)',
          marginTop:     'clamp(28px, 4vh, 52px)',
        }}
      >
        — Lucas Danielsson
      </motion.span>
    </section>
  )
}
