'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ARTWORKS = [
  { id: 1, image: '/images/AC.svg' },
  { id: 2, image: '/images/AD.svg' },
  { id: 3, image: '/images/4D.svg' },
  { id: 4, image: '/images/AH.svg' },
  { id: 5, image: '/images/AS.svg' },
  { id: 6, image: '/images/KC.svg' },
  { id: 7, image: '/images/KH.svg' },
  { id: 8, image: '/images/KD.svg' },
  { id: 9, image: '/images/KS.svg' },
]

const CARD_COUNT = ARTWORKS.length
const RADIUS = 260

export default function Hero() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const tweenRef    = useRef<gsap.core.Tween | null>(null)
  const sectionRef  = useRef<HTMLElement>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    // Set initial tilt — GSAP owns all transforms from here
    gsap.set(carousel, { rotateX: -8 })

    // Continuous Y rotation
    tweenRef.current = gsap.to(carousel, {
      rotateY: '+=360',
      duration: 16,
      repeat: -1,
      ease: 'none',
    })

    const section = sectionRef.current
    if (!section) return

    const slow = () =>
      gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.8, ease: 'power2.out' })
    const fast = () =>
      gsap.to(tweenRef.current, { timeScale: 1, duration: 1.2, ease: 'power2.inOut' })

    section.addEventListener('mouseenter', slow)
    section.addEventListener('mouseleave', fast)

    return () => {
      tweenRef.current?.kill()
      section.removeEventListener('mouseenter', slow)
      section.removeEventListener('mouseleave', fast)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#0d0d0d',
        overflow: 'hidden',
      }}
    >
      {/* Film grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.045,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* LUCAS — top-left, bleeds off right edge */}
      <div
        style={{
          position: 'absolute',
          top: '3%',
          left: '-0.5vw',
          fontFamily: 'var(--font-eb-garamond)',
          fontSize: 'clamp(80px, 26vw, 400px)',
          fontWeight: 400,
          color: '#f5f3ee',
          letterSpacing: '-0.03em',
          lineHeight: 0.85,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          zIndex: 1,
        }}
      >
        LUCAS
      </div>

      {/* 3D Carousel — dead center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          perspective: '1200px',
          perspectiveOrigin: '0 0',
          zIndex: 5,
        }}
      >
        <div
          ref={carouselRef}
          style={{
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
          }}
        >
          {ARTWORKS.map((artwork, i) => {
            const angle = (i / CARD_COUNT) * 360
            return (
              <div
                key={artwork.id}
                style={{
                  position: 'absolute',
                  width: '155px',
                  height: '230px',
                  top: '-115px',
                  left: '-77px',
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  borderRadius: '3px',
                  overflow: 'hidden',
                  border: '1px solid rgba(245, 243, 238, 0.1)',
                  background: '#141414',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.6)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artwork.image}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* DANIELSSON — bottom-right, bleeds off left edge */}
      <div
        style={{
          position: 'absolute',
          bottom: '3%',
          right: '-0.5vw',
          fontFamily: 'var(--font-eb-garamond)',
          fontSize: 'clamp(50px, 16vw, 240px)',
          fontWeight: 400,
          color: '#f5f3ee',
          letterSpacing: '-0.03em',
          lineHeight: 0.85,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          zIndex: 1,
        }}
      >
        DANIELSSON
      </div>

      {/* Bottom-left: location */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5%',
          left: '3vw',
          fontFamily: 'var(--font-geist)',
          fontSize: '10px',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgba(245, 243, 238, 0.3)',
          whiteSpace: 'nowrap',
          zIndex: 6,
        }}
      >
      Borlänge — SE
      </div>

      {/* Bottom-right: scroll cue */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5%',
          right: '3vw',
          fontFamily: 'var(--font-geist)',
          fontSize: '10px',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgba(245, 243, 238, 0.3)',
          whiteSpace: 'nowrap',
          zIndex: 6,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '28px',
            height: '1px',
            background: 'rgba(245, 243, 238, 0.3)',
          }}
        />
        Scroll
      </div>
    </section>
  )
}
