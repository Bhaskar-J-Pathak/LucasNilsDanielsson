'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    year: '2017',
    title: 'The First Trick',
    description:
      'Discovered my passion for sleight of hand with a simple deck of cards. Started practicing basic card manipulations and coin tricks, spending countless hours perfecting the fundamentals.',
  },
  {
    year: '2018',
    title: 'First Booking',
    description:
      'Began performing at local cafes and small gatherings in Stockholm. Developed my stage presence and learned to read audiences, refining my repertoire based on crowd reactions. Also performed on an International Cruise',
  },
  {
    year: '2020',
    title: 'Advanced Techniques',
    description:
      'Mastered advanced card flourishes and coin manipulations. Started incorporating mentalism and psychological techniques into my performances, creating more immersive experiences',
  },
  {
    year: '2023',
    title: 'Five Hundred',
    description:
      'Gained recognition in the Swedish magic community. Started performing at corporate events and private parties, establishing my reputation as a skilled close-up magician.',
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef   = useRef<HTMLDivElement>(null)
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([])
  const isMobile   = useMediaQuery('(max-width: 639px)')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro paragraph
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: introRef.current, start: 'top 82%' },
        }
      )

      // Pin Timeline when its bottom hits the viewport bottom —
      // user has seen all content. WorkIntro then rises over it.
      ScrollTrigger.create({
        trigger:    sectionRef.current,
        start:      'bottom bottom',
        end:        `+=${window.innerHeight}`,
        pin:        true,
        pinSpacing: true,
      })

      // Each milestone row
      rowRefs.current.filter(Boolean).forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background:   '#f5f3ee',
        width:        '100vw',
        paddingTop:   'clamp(120px, 18vh, 240px)',
        paddingBottom:'clamp(120px, 20vh, 280px)',
        paddingLeft:  'clamp(40px, 7vw, 120px)',
        paddingRight: 'clamp(40px, 7vw, 120px)',
        overflow:     'hidden',
      }}
    >
      {/* Intro paragraph */}
      <div
        ref={introRef}
        style={{
          maxWidth:     '52ch',
          marginBottom: 'clamp(80px, 16vh, 200px)',
        }}
      >
        <p
          style={{
            fontFamily:    'var(--font-eb-garamond)',
            fontSize:      'clamp(22px, 2.6vw, 38px)',
            fontWeight:    400,
            color:         '#0d0d0d',
            lineHeight:    1.45,
            margin:        0,
            letterSpacing: '-0.01em',
          }}
        >
          I grew up in Borlänge, where the winters are long enough to leave time
          for wonder. Magic found me at twelve. I haven&apos;t looked back since.
        </p>
      </div>

      {/* Timeline rows */}
      <div>
        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            ref={el => { rowRefs.current[i] = el }}
            style={{ borderTop: '1px solid rgba(13,13,13,0.12)' }}
          >
            <div
              style={{
                display:       'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems:    'flex-start',
                gap:           isMobile ? '12px' : 'clamp(24px, 5vw, 80px)',
                paddingTop:    'clamp(28px, 4.5vh, 64px)',
                paddingBottom: 'clamp(28px, 4.5vh, 64px)',
              }}
            >
              {/* Year */}
              <div style={{ flex: '0 0 auto', minWidth: isMobile ? 'auto' : 'clamp(90px, 12vw, 180px)' }}>
                <span
                  style={{
                    fontFamily:    'var(--font-eb-garamond)',
                    fontSize:      isMobile ? '52px' : 'clamp(56px, 8vw, 112px)',
                    fontWeight:    400,
                    color:         '#0d0d0d',
                    lineHeight:    0.9,
                    letterSpacing: '-0.03em',
                    display:       'block',
                  }}
                >
                  {m.year}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  flex:          1,
                  paddingTop:    isMobile ? '0' : 'clamp(6px, 1vh, 14px)',
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           '10px',
                }}
              >
                <span
                  style={{
                    fontFamily:    'var(--font-geist)',
                    fontSize:      '10px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color:         'rgba(13,13,13,0.4)',
                    display:       'block',
                  }}
                >
                  {m.title}
                </span>
                <p
                  style={{
                    fontFamily:    'var(--font-geist)',
                    fontSize:      'clamp(13px, 1.1vw, 16px)',
                    color:         'rgba(13,13,13,0.6)',
                    lineHeight:    1.7,
                    margin:        0,
                    maxWidth:      '52ch',
                    letterSpacing: '0.01em',
                  }}
                >
                  {m.description}
                </p>
              </div>

              {/* Index — hidden on mobile */}
              {!isMobile && (
                <div
                  style={{
                    flex:       '0 0 auto',
                    paddingTop: 'clamp(6px, 1vh, 14px)',
                    alignSelf:  'flex-start',
                  }}
                >
                  <span
                    style={{
                      fontFamily:    'var(--font-geist)',
                      fontSize:      '10px',
                      letterSpacing: '0.18em',
                      color:         'rgba(13,13,13,0.25)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Closing rule */}
        <div style={{ borderTop: '1px solid rgba(13,13,13,0.12)' }} />
      </div>
    </section>
  )
}
