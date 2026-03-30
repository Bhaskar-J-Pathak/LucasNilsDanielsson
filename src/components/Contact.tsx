'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const LINE_VARIANTS = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: (delay: number) => ({
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

const SOCIALS = [
  { label: 'Instagram', handle: '@lucke0803', href: 'https://instagram.com/lucke0803' },
  { label: 'TikTok',    handle: '@lucke0803', href: 'https://tiktok.com/@lucke0803'  },
  { label: 'Email',     handle: 'hello@lucasdanielsson.se', href: 'mailto:ldanielsson70@gmail.com' },
]

function SocialRow({ label, handle, href, delay, inView }: {
  label: string; handle: string; href: string; delay: number; inView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         'flex',
        justifyContent:  'space-between',
        alignItems:      'center',
        padding:         '20px 0',
        borderBottom:    '1px solid rgba(245,243,238,0.08)',
        textDecoration:  'none',
        cursor:          'pointer',
      }}
    >
      <span
        style={{
          fontFamily:    'var(--font-geist)',
          fontSize:      '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'rgba(245,243,238,0.3)',
          transition:    'color 0.2s ease',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily:    'var(--font-eb-garamond)',
          fontStyle:     'italic',
          fontSize:      'clamp(18px, 2vw, 26px)',
          color:         hovered ? '#f5f3ee' : 'rgba(245,243,238,0.55)',
          transition:    'color 0.25s ease',
          letterSpacing: '-0.01em',
        }}
      >
        {handle}
        <span
          style={{
            display:    'inline-block',
            marginLeft: '10px',
            opacity:    hovered ? 1 : 0,
            transform:  hovered ? 'translateX(0)' : 'translateX(-6px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            fontSize:   '0.85em',
          }}
        >
          ↗
        </span>
      </span>
    </motion.a>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px 0px' });

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0d0d0d',
        padding: `clamp(80px, 14vw, 160px) clamp(24px, 6vw, 80px) clamp(100px, 16vh, 180px)`,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display:       'block',
            fontFamily:    'var(--font-geist), system-ui, sans-serif',
            fontSize:      '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            color:         'rgba(245, 243, 238, 0.35)',
            marginBottom:  'clamp(24px, 3.5vw, 48px)',
          }}
        >
          Get in touch
        </motion.span>

        <div style={{ marginBottom: 'clamp(48px, 7vw, 88px)', overflow: 'hidden' }}>
          <motion.div
            custom={0.15}
            variants={LINE_VARIANTS}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontFamily:    'var(--font-eb-garamond), Georgia, serif',
              fontStyle:     'italic',
              fontSize:      'clamp(52px, 8.5vw, 100px)',
              fontWeight:    400,
              lineHeight:    1.0,
              letterSpacing: '-0.03em',
              color:         '#f5f3ee',
            }}
          >
            Let&rsquo;s make
          </motion.div>
          <motion.div
            custom={0.3}
            variants={LINE_VARIANTS}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontFamily:    'var(--font-eb-garamond), Georgia, serif',
              fontStyle:     'italic',
              fontSize:      'clamp(52px, 8.5vw, 100px)',
              fontWeight:    400,
              lineHeight:    1.0,
              letterSpacing: '-0.03em',
              color:         '#f5f3ee',
            }}
          >
            something impossible.
          </motion.div>
        </div>

        {/* Social links */}
        <div style={{ borderTop: '1px solid rgba(245,243,238,0.08)' }}>
          {SOCIALS.map((s, i) => (
            <SocialRow
              key={s.label}
              {...s}
              delay={0.4 + i * 0.1}
              inView={inView}
            />
          ))}
        </div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            marginTop:      'clamp(32px, 5vw, 56px)',
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-geist), system-ui, sans-serif',
              fontSize:      '12px',
              letterSpacing: '0.1em',
              color:         'rgba(245, 243, 238, 0.35)',
            }}
          >
            Stockholm, Sweden
          </span>
          <button
            onClick={handleScrollTop}
            style={{
              fontFamily:    'var(--font-geist), system-ui, sans-serif',
              fontSize:      '12px',
              letterSpacing: '0.1em',
              color:         'rgba(245, 243, 238, 0.35)',
              background:    'none',
              border:        'none',
              padding:       '0',
              cursor:        'pointer',
              transition:    'color 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#f5f3ee' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245, 243, 238, 0.35)' }}
          >
            ↑ back to top
          </button>
        </motion.div>

      </div>
    </section>
  );
}
