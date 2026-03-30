'use client'

const ROW_1 = ['30+ Shows', '10 Years', '4 Countries', '2.4M Viewers', 'Magic Castle', '30+ Shows', '10 Years', '4 Countries', '2.4M Viewers', 'Magic Castle']
const ROW_2 = ['Corporate Events', 'Private Parties', 'Stage Shows', 'Television', 'Weddings', 'Corporate Events', 'Private Parties', 'Stage Shows', 'Television', 'Weddings']

const SEP = '·'

function Row({
  items,
  direction,
  duration,
}: {
  items: string[]
  direction: 'left' | 'right'
  duration: number
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        overflow:   'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          display:   'inline-flex',
          alignItems: 'center',
          gap:        '0',
          animation: `marquee-${direction} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily:    i % 2 === 0 ? 'var(--font-eb-garamond)' : 'var(--font-geist)',
              fontSize:      i % 2 === 0 ? 'clamp(32px, 4vw, 60px)' : 'clamp(32px, 4vw, 60px)',
              fontStyle:     i % 2 === 0 ? 'italic' : 'normal',
              fontWeight:    400,
              color:         'rgba(245,243,238,0.75)',
              letterSpacing: i % 2 === 0 ? '-0.02em' : '0.04em',
              textTransform: i % 2 === 0 ? 'none' : 'uppercase',
              paddingLeft:   'clamp(24px, 3vw, 48px)',
              paddingRight:  'clamp(4px, 0.5vw, 8px)',
              lineHeight:    1,
            }}
          >
            {item}
            <span
              style={{
                fontFamily:  'var(--font-geist)',
                fontStyle:   'normal',
                fontSize:    '0.5em',
                color:       'rgba(245,243,238,0.2)',
                marginLeft:  'clamp(24px, 3vw, 48px)',
                letterSpacing: '0',
                textTransform: 'none',
                verticalAlign: 'middle',
              }}
            >
              {SEP}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section
      style={{
        background:    '#0d0d0d',
        width:         '100vw',
        paddingTop:    'clamp(48px, 7vh, 96px)',
        paddingBottom: 'clamp(48px, 7vh, 96px)',
        overflow:      'hidden',
        display:       'flex',
        flexDirection: 'column',
        gap:           'clamp(12px, 2vh, 24px)',
        borderTop:     '1px solid rgba(245,243,238,0.08)',
      }}
    >
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <Row items={ROW_1} direction="left"  duration={28} />
      <Row items={ROW_2} direction="right" duration={22} />
    </section>
  )
}
