'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const blobRef  = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let mx = -200, my = -200
    let bx = -200, by = -200
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mx}px,${my}px)`

      if (blobRef.current) {
        bx = lerp(bx, mx, 0.1)
        by = lerp(by, my, 0.1)
        blobRef.current.style.transform = `translate(${bx}px,${by}px)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {/* Gooey SVG filter */}
      <svg style={{ position: 'fixed', width: 0, height: 0 }}>
        <defs>
          <filter id="goo-cursor">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Cursor layer — gooey filter + difference blend = auto-inverts on any bg */}
      <div
        style={{
          position:       'fixed',
          inset:          0,
          pointerEvents:  'none',
          zIndex:         9999,
          filter:         'url(#goo-cursor)',
          mixBlendMode:   'difference',
        }}
      >
        {/* Small dot — exact position */}
        <div
          ref={dotRef}
          style={{
            position:     'absolute',
            top:          '-5px',
            left:         '-5px',
            width:        '10px',
            height:       '10px',
            borderRadius: '50%',
            background:   '#ffffff',
          }}
        />
        {/* Larger blob — lagging */}
        <div
          ref={blobRef}
          style={{
            position:     'absolute',
            top:          '-20px',
            left:         '-20px',
            width:        '40px',
            height:       '40px',
            borderRadius: '50%',
            background:   '#ffffff',
          }}
        />
      </div>
    </>
  )
}
