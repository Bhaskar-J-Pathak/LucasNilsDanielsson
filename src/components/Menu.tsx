'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const NAV_ITEMS = [
  { label: 'Home',     href: '#' },
  { label: 'Work',     href: '#work' },
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
]

const SOCIALS = [
  { label: 'Instagram',  href: 'https://instagram.com/lucke0803' },
  { label: 'Twitter / X',href: '#' },
  { label: 'Tiktok',   href: 'https://tiktok.com/lucke0803' },
]

export default function Menu() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [hovered,  setHovered]  = useState<number | null>(null)
  const [isLight,  setIsLight]  = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')

  // Switch button theme when the light section scrolls into the button area
  useEffect(() => {
    const onScroll = () => {
      // The Sentence section's right edge reaches the top of the viewport at ~100vh scroll.
      // Switch slightly before that so the button never sits awkwardly on a mixed background.
      setIsLight(window.scrollY > window.innerHeight * 0.88)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const overlayRef = useRef<HTMLDivElement>(null)
  const itemsRef   = useRef<(HTMLLIElement | null)[]>([])
  const rightRef   = useRef<HTMLDivElement>(null)
  const tlRef      = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    gsap.set(overlay, { display: 'none' })

    const tl = gsap.timeline({ paused: true })

    tl.set(overlay, { display: 'flex' })
    tl.fromTo(
      overlay,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.85, ease: 'power4.inOut' }
    )
    tl.fromTo(
      itemsRef.current.filter(Boolean),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
      '-=0.5'
    )
    tl.fromTo(
      rightRef.current,
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '<0.05'
    )

    tlRef.current = tl
    return () => { tl.kill() }
  }, [])

  useEffect(() => {
    if (!tlRef.current) return
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      tlRef.current.play()
    } else {
      document.body.style.overflow = ''
      tlRef.current.reverse()
    }
  }, [isOpen])

  return (
    <>
      {/* ── Circular trigger ─────────────────────────── */}
      <button
        onClick={() => setIsOpen(v => !v)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        style={{
          position:        'fixed',
          top:             '24px',
          right:           '3vw',
          zIndex:          110,
          width:           '52px',
          height:          '52px',
          borderRadius:    '50%',
          background:      isLight
            ? 'rgba(13,13,13,0.07)'
            : 'rgba(245,243,238,0.06)',
          border:          isLight
            ? '1px solid rgba(13,13,13,0.15)'
            : '1px solid rgba(245,243,238,0.14)',
          backdropFilter:  'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          cursor:          'none',
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'center',
          justifyContent:  'center',
          gap:             '6px',
          padding:         0,
          transition:      'background 0.4s ease, border-color 0.4s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background  = isLight
            ? 'rgba(13,13,13,0.14)' : 'rgba(245,243,238,0.12)'
          e.currentTarget.style.borderColor = isLight
            ? 'rgba(13,13,13,0.3)'  : 'rgba(245,243,238,0.28)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background  = isLight
            ? 'rgba(13,13,13,0.07)' : 'rgba(245,243,238,0.06)'
          e.currentTarget.style.borderColor = isLight
            ? 'rgba(13,13,13,0.15)' : 'rgba(245,243,238,0.14)'
        }}
      >
        <span
          style={{
            display:         'block',
            width:           '18px',
            height:          '1px',
            background:      isLight ? '#0d0d0d' : '#f5f3ee',
            transition:      'transform 0.35s cubic-bezier(0.77,0,0.175,1), background 0.4s ease',
            transformOrigin: 'center',
            transform:       isOpen ? 'translateY(3.5px) rotate(45deg)' : 'none',
          }}
        />
        <span
          style={{
            display:         'block',
            width:           '18px',
            height:          '1px',
            background:      isLight ? '#0d0d0d' : '#f5f3ee',
            transition:      'transform 0.35s cubic-bezier(0.77,0,0.175,1), background 0.4s ease',
            transformOrigin: 'center',
            transform:       isOpen ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* ── Full-screen overlay ──────────────────────── */}
      <div
        ref={overlayRef}
        style={{
          position:      'fixed',
          inset:         0,
          background:    '#0d0d0d',
          zIndex:        100,
          display:       'none',
          flexDirection: 'column',
          overflow:      'hidden',
        }}
      >
        {/* Two-column body — full height */}
        <div
          style={{
            display:    'flex',
            height:     '100%',
            padding:    '0',
          }}
        >
          {/* ── Left — nav links ─────────────────────── */}
          <div
            style={{
              flex:           isMobile ? '1 1 100%' : '1 1 58%',
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'center',
              paddingLeft:    'clamp(40px, 6vw, 100px)',
              paddingRight:   isMobile ? 'clamp(40px, 6vw, 100px)' : '4vw',
              paddingTop:     '80px',
              paddingBottom:  '60px',
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {NAV_ITEMS.map((item, i) => (
                <li
                  key={item.label}
                  ref={el => { itemsRef.current[i] = el }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ lineHeight: 1, marginBottom: '0.08em' }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            '0.25em',
                      textDecoration: 'none',
                      cursor:         'none',
                    }}
                  >
                    {/* Bullet — visible on hover */}
                    <span
                      style={{
                        fontFamily:    'var(--font-eb-garamond)',
                        fontSize:      'clamp(52px, 7.5vw, 104px)',
                        color:         '#f5f3ee',
                        lineHeight:    1,
                        opacity:       hovered === i ? 1 : 0,
                        transition:    'opacity 0.2s ease',
                        userSelect:    'none',
                        pointerEvents: 'none',
                      }}
                    >
                      •
                    </span>

                    <span
                      style={{
                        fontFamily:    'var(--font-eb-garamond)',
                        fontSize:      'clamp(52px, 7.5vw, 104px)',
                        fontWeight:    400,
                        color:         '#f5f3ee',
                        letterSpacing: '-0.025em',
                        lineHeight:    1,
                        opacity:       hovered !== null && hovered !== i ? 0.25 : 1,
                        transition:    'opacity 0.2s ease',
                      }}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right — socials + portrait ───────────── */}
          <div
            ref={rightRef}
            style={{
              flex:           '1 1 42%',
              display:        isMobile ? 'none' : 'flex',
              flexDirection:  'column',
              padding:        'clamp(40px, 6vh, 80px) clamp(32px, 5vw, 80px) clamp(40px, 6vh, 80px) 0',
              borderLeft:     '1px solid rgba(245,243,238,0.07)',
            }}
          >
            {/* Social section */}
            <div style={{ marginBottom: '3vh' }}>
              <p
                style={{
                  fontFamily:    'var(--font-geist)',
                  fontSize:      '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color:         'rgba(245,243,238,0.35)',
                  margin:        '0 0 16px 0',
                }}
              >
                Social
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SOCIALS.map(s => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      style={{
                        fontFamily:    'var(--font-geist)',
                        fontSize:      '12px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color:         'rgba(245,243,238,0.5)',
                        textDecoration:'none',
                        cursor:        'none',
                        transition:    'color 0.2s ease',
                        display:       'inline-block',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#f5f3ee')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,243,238,0.5)')}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portrait — fills remaining height */}
            <div
              style={{
                flex:         1,
                overflow:     'hidden',
                borderRadius: '3px',
                border:       '1px solid rgba(245,243,238,0.07)',
                minHeight:    0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/portrait99/800/1000"
                alt="Lucas Danielsson"
                style={{
                  width:      '100%',
                  height:     '100%',
                  objectFit:  'cover',
                  display:    'block',
                  filter:     'grayscale(20%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Film grain */}
        <div
          style={{
            position:        'absolute',
            inset:           0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize:  '200px 200px',
            opacity:         0.03,
            pointerEvents:   'none',
          }}
        />
      </div>
    </>
  )
}
