'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORKS = [
  { src: '/images/Television.png',  caption: 'Stage' },
  { src: 'https://images.pexels.com/photos/26525217/pexels-photo-26525217.jpeg',  caption: 'Close-Up Magic'},
  { src: '/images/video_3.mov',  caption: 'Evening Show'  },
  { src: '/images/image5.png',  caption: 'Evening Show' },
  { src: '/images/Magic-Show.jpeg',  caption: 'Wedding Party' },
  { src: '/images/video_5.mov',  caption: 'Tiktok' },
  { src: '/images/Close-Up.jpeg',  caption: 'Close Up'  },
  { src: '/images/Professional-Show.jpg', caption: 'Event Stage'  },
]

// Each image: fixed width, height, vertical offset from track centre, subtle rotation
const LAYOUT = [
  { w: 280, h: 380, y: -60,  rot: -1.5 },
  { w: 400, h: 260, y: 100,  rot:  0.8 },
  { w: 240, h: 340, y: -110, rot: -0.6 },
  { w: 360, h: 240, y:  80,  rot:  1.2 },
  { w: 300, h: 420, y: -50,  rot: -1.1 },
  { w: 260, h: 460, y: 110,  rot:  0.5 },
  { w: 260, h: 360, y: -90,  rot: -0.9 },
  { w: 380, h: 240, y:  70,  rot:  1.4 },
  { w: 220, h: 320, y: -120, rot: -0.4 },
  { w: 420, h: 260, y:  90,  rot:  0.7 },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const wordRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    const word    = wordRef.current
    if (!section || !track || !word) return

    const ctx = gsap.context(() => {
      const vw     = window.innerWidth
      // End when last image's right edge sits ~10vw from viewport right
      const totalX = -(track.scrollWidth - vw * 0.8)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start:   'top top',
          end:     'bottom bottom',
          scrub:   1.8,
        },
      })

      // Images move at full speed
      tl.to(track, { x: totalX, ease: 'none' }, 0)
      // Word barely drifts — creates depth against fast-moving images
      tl.to(word,  { x: totalX * 0.12, ease: 'none' }, 0)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position:   'relative',
        height:     '500vh',
        background: '#0d0d0d',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top:      0,
          height:   '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Section label */}
        <div
          style={{
            position:   'absolute',
            top:        'clamp(32px, 5vh, 56px)',
            left:       'clamp(40px, 7vw, 120px)',
            zIndex:     10,
            display:    'flex',
            alignItems: 'center',
            gap:        '16px',
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-geist)',
              fontSize:      '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(245,243,238,0.35)',
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
            10
          </span>
        </div>

        {/* Parallax word — nearly stationary, images rush past it */}
        <div
          ref={wordRef}
          style={{
            position:      'absolute',
            top:           '50%',
            left:          '50%',
            transform:     'translate(-50%, -50%)',
            zIndex:        0,
            pointerEvents: 'none',
            userSelect:    'none',
            whiteSpace:    'nowrap',
          }}
        >
          <span
            style={{
              fontFamily:       'var(--font-eb-garamond)',
              fontSize:         'clamp(100px, 18vw, 260px)',
              fontWeight:       400,
              fontStyle:        'italic',
              color:            'transparent',
              WebkitTextStroke: '1px rgba(245,243,238,0.09)',
              letterSpacing:    '-0.04em',
              lineHeight:       1,
            }}
          >
            Wonder
          </span>
        </div>

        {/* Horizontal image track */}
        <div
          ref={trackRef}
          style={{
            position:   'absolute',
            top:        '50%',
            left:       '10vw',
            transform:  'translateY(-50%)',
            display:    'flex',
            alignItems: 'center',
            gap:        'clamp(32px, 4vw, 64px)',
            zIndex:     1,
            willChange: 'transform',
          }}
        >
          {WORKS.map((work, i) => {
            const l = LAYOUT[i]
            return (
              <div
                key={i}
                style={{
                  flex:      '0 0 auto',
                  width:     l.w,
                  transform: `translateY(${l.y}px) rotate(${l.rot}deg)`,
                }}
              >
                {/* Media */}
                <div
                  style={{
                    width:        '100%',
                    height:       l.h,
                    overflow:     'hidden',
                    marginBottom: '14px',
                  }}
                >
                  {/\.(mov|mp4|webm)$/i.test(work.src) ? (
                    <video
                      src={work.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width:     '100%',
                        height:    '100%',
                        objectFit: 'cover',
                        display:   'block',
                      }}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={work.src}
                      alt={work.caption}
                      style={{
                        width:     '100%',
                        height:    '100%',
                        objectFit: 'cover',
                        display:   'block',
                      }}
                    />
                  )}
                </div>

                {/* Caption */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span
                    style={{
                      fontFamily:    'var(--font-eb-garamond)',
                      fontSize:      'clamp(14px, 1.1vw, 18px)',
                      fontStyle:     'italic',
                      color:         'rgba(245,243,238,0.7)',
                      letterSpacing: '-0.01em',
                      display:       'block',
                    }}
                  >
                    {work.caption}
                  </span>
                  <span
                    style={{
                      fontFamily:    'var(--font-geist)',
                      fontSize:      '10px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color:         'rgba(245,243,238,0.28)',
                      display:       'block',
                    }}
                  >
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
