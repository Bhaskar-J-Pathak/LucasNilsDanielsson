'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const FOOTER_HEIGHT = '100vh'

const BLOB_LAYERS = [
  { scaleX: [1, 1.06, 1], y: [-18, 18, -18], rotate: [-1.8,  1.8, -1.8], dur: 10,  del: 0,   opacity: 0.55 },
  { scaleX: [1, 1.04, 1], y: [-10, 22, -10], rotate: [ 1.2, -1.2,  1.2], dur: 8.5, del: 2.5, opacity: 0.35 },
  { scaleX: [1, 1.03, 1], y: [-6,  12,  -6], rotate: [-0.8,  0.8, -0.8], dur: 7,   del: 4.5, opacity: 0.22 },
]

const NAV_LINKS = ['Close-Up Magic', 'Stage Shows', 'Corporate', 'Television', 'About']

// Three portrait cards spread like a hand of cards
const CARDS = [
  { src: 'https://picsum.photos/seed/ld-perf1/340/480', alt: 'Performance I',  rotate: -11, x: 0,   y: 20,  z: 1 },
  { src: 'https://picsum.photos/seed/ld-perf3/340/480', alt: 'Performance II', rotate:  -1, x: 82,  y: 5,   z: 2 },
  { src: 'https://picsum.photos/seed/ld-perf6/340/480', alt: 'Portrait',       rotate:  9,  x: 160, y: -10, z: 3 },
]

function Card({ data, mobile }: { data: typeof CARDS[0]; mobile: boolean }) {
  const [hovered, setHovered] = useState(false)
  const w = mobile ? 116 : 164
  const h = mobile ? 164 : 232
  // Scale card x positions proportionally on mobile
  const x = mobile ? Math.round(data.x * 0.72) : data.x
  const y = mobile ? Math.round(data.y * 0.72) : data.y
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y:      hovered ? y - 16 : y,
        rotate: hovered ? data.rotate * 0.5 : data.rotate,
        scale:  hovered ? 1.04 : 1,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{
        position:     'absolute',
        left:         x,
        bottom:       0,
        zIndex:       hovered ? 10 : data.z,
        width:        w,
        height:       h,
        borderRadius: 8,
        overflow:     'hidden',
        boxShadow:    hovered
          ? '0 28px 52px rgba(13,13,13,0.22), 0 8px 18px rgba(13,13,13,0.13)'
          : '0 10px 28px rgba(13,13,13,0.16), 0 2px 6px rgba(13,13,13,0.08)',
        cursor:       'default',
        flexShrink:   0,
      }}
    >
      <img
        src={data.src}
        alt={data.alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.div>
  )
}

function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily:    'var(--font-geist)',
        fontSize:      '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color:         hovered ? 'rgba(13,13,13,0.65)' : 'rgba(13,13,13,0.32)',
        cursor:        'pointer',
        transition:    'color 0.2s ease',
      }}
    >
      {label}
    </span>
  )
}

function SocialLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'block',
        fontFamily:     'var(--font-geist)',
        fontSize:       '11px',
        letterSpacing:  '0.1em',
        textTransform:  'uppercase',
        color:          hovered ? 'rgba(13,13,13,0.88)' : 'rgba(13,13,13,0.52)',
        textDecoration: 'none',
        transition:     'color 0.2s ease',
        lineHeight:     1.9,
      }}
    >
      {label}
    </a>
  )
}

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return (
    <footer
      style={{
        position:   'fixed',
        bottom:     0,
        left:       0,
        right:      0,
        zIndex:     0,
        height:     '100vh',
        background: '#f5f3ee',
        overflow:   'hidden',
        boxSizing:  'border-box',
      }}
    >
      {/* ── Blob ─────────────────────────────────────────────── */}
      <div
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          right:         0,
          height:        '88%',
          pointerEvents: 'none',
          zIndex:        0,
          overflow:      'hidden',
        }}
      >
        {BLOB_LAYERS.map((layer, i) => (
          <motion.div
            key={i}
            animate={{ scaleX: layer.scaleX, y: layer.y, rotate: layer.rotate }}
            transition={{ duration: layer.dur, repeat: Infinity, ease: 'easeInOut', delay: layer.del }}
            style={{
              position:        'absolute',
              top:             '-8%',
              left:            '-20%',
              right:           '-20%',
              height:          '100%',
              transformOrigin: '50% 0%',
              background:      `radial-gradient(ellipse 100% 92% at 50% 0%,
                                  rgba(145,124,198,${layer.opacity}) 0%,
                                  rgba(155,134,208,${layer.opacity * 0.55}) 35%,
                                  rgba(165,144,216,${layer.opacity * 0.18}) 60%,
                                  transparent 76%)`,
              filter:          'blur(36px)',
            }}
          />
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div
        style={{
          position:      'relative',
          zIndex:        1,
          height:        '100%',
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'flex-end',
          paddingBottom: 'clamp(36px, 5vh, 60px)',
          paddingLeft:   'clamp(40px, 6vw, 80px)',
          paddingRight:  'clamp(40px, 6vw, 80px)',
        }}
      >
        {/* Main row */}
        <div
          style={{
            display:        'flex',
            flexDirection:  isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'flex-start' : 'space-between',
            alignItems:     isMobile ? 'flex-start' : 'flex-end',
            gap:            isMobile ? 'clamp(28px, 5vh, 44px)' : '0',
            paddingBottom:  'clamp(32px, 5vh, 56px)',
          }}
        >
          {/* Left — socials / meta stacked above the name */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Socials + meta */}
            <div style={{ marginBottom: 'clamp(32px, 5vh, 56px)' }}>
              <SocialLink label="Instagram"              href="https://instagram.com/lucke0803" />
              <SocialLink label="Tiktok"               href="https://tiktok.com/lucke0803"  />
              <SocialLink label="hello@lucasdanielsson.se" href="mailto:ldanielsson70@gmail.com" />
              <div
                style={{
                  marginTop:     'clamp(14px, 2vh, 22px)',
                  display:       'flex',
                  gap:           '6px',
                  alignItems:    'center',
                }}
              >
                <span
                  style={{
                    fontFamily:    'var(--font-geist)',
                    fontSize:      '10px',
                    letterSpacing: '0.08em',
                    color:         'rgba(13,13,13,0.35)',
                  }}
                >
                  Borlänge, Sweden
                </span>
                <span style={{ color: 'rgba(13,13,13,0.2)', fontSize: '10px' }}>·</span>
                <span
                  style={{
                    fontFamily:    'var(--font-geist)',
                    fontSize:      '10px',
                    letterSpacing: '0.08em',
                    color:         'rgba(13,13,13,0.35)',
                  }}
                >
                  &copy; 2025
                </span>
              </div>
            </div>

            {/* Name */}
            <div>
              <div
                style={{
                  fontFamily:    'var(--font-eb-garamond)',
                  fontWeight:    400,
                  fontSize:      'clamp(58px, 9vw, 124px)',
                  lineHeight:    0.88,
                  letterSpacing: '-0.04em',
                  color:         '#0d0d0d',
                }}
              >
                LUCAS
              </div>
              <div
                style={{
                  fontFamily:    'var(--font-eb-garamond)',
                  fontWeight:    400,
                  fontSize:      'clamp(58px, 9vw, 124px)',
                  lineHeight:    0.88,
                  letterSpacing: '-0.04em',
                  color:         '#0d0d0d',
                }}
              >
                DANIELSSON
              </div>
              <div
                style={{
                  marginTop:  'clamp(16px, 2.5vh, 32px)',
                  display:    'flex',
                  gap:        '10px',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily:    'var(--font-geist)',
                    fontSize:      '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         'rgba(13,13,13,0.38)',
                    lineHeight:    1,
                  }}
                >
                  Illusionist
                </span>
                <span style={{ color: 'rgba(13,13,13,0.2)', fontSize: '11px' }}>·</span>
                <span
                  style={{
                    fontFamily:    'var(--font-geist)',
                    fontSize:      '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         'rgba(13,13,13,0.38)',
                    lineHeight:    1,
                  }}
                >
                  Borlänge
                </span>
              </div>
            </div>
          </div>

          {/* Right — spread cards */}
          <div
            style={{
              position:   'relative',
              width:      isMobile ? 240 : 328,
              height:     isMobile ? 192 : 252,
              flexShrink: 0,
            }}
          >
            {CARDS.map((card) => (
              <Card key={card.alt} data={card} mobile={isMobile} />
            ))}
          </div>
        </div>

        {/* Bottom — rule + nav */}
        <div>
          <div
            style={{
              height:       '1px',
              background:   'rgba(13,13,13,0.1)',
              marginBottom: 'clamp(16px, 2vh, 28px)',
            }}
          />
          <div style={{ display: 'flex', gap: 'clamp(20px, 3vw, 40px)', flexWrap: 'wrap' }}>
            {NAV_LINKS.map(link => <NavLink key={link} label={link} />)}
          </div>
        </div>
      </div>
    </footer>
  )
}
