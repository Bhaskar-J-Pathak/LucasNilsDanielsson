'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ServiceItem {
  index: string;
  title: string;
  description: string;
  detail: string;
}

const SERVICES: ServiceItem[] = [
  {
    index: '01',
    title: 'Corporate Events',
    description:
      'Keynotes, product launches, galas, and conference closers. Magic that changes the tone of a room — and stays in the post-event survey.',
    detail: 'Available worldwide · Up to 5,000 guests',
  },
  {
    index: '02',
    title: 'Private Parties',
    description:
      'Intimate close-up magic for birthdays, anniversaries, and exclusive gatherings. The kind that leaves no room to look away.',
    detail: '10–200 guests · 60–90 min sets',
  },
  {
    index: '03',
    title: 'Stage Shows',
    description:
      'Full evening productions for theatres, festivals, and special events. Grand illusions built around a narrative arc.',
    detail: 'Up to 2,000 seats · 60–120 min',
  },
  {
    index: '04',
    title: 'Television & Media',
    description:
      'Broadcast-ready performances designed for the camera. Credits include SVT, TV4, and select international productions.',
    detail: 'Studio or live · All formats welcome',
  },
];

function ServiceRow({
  service,
  delay,
}: {
  service: ServiceItem;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      <div
        style={{
          height: '1px',
          background: 'rgba(245, 243, 238, 0.12)',
        }}
      />
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '4rem 1fr 2rem',
          gap: '0 clamp(16px, 2.5vw, 32px)',
          alignItems: 'flex-start',
          padding: 'clamp(24px, 4vw, 40px) 0',
          cursor: 'default',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.12em',
            color: 'rgba(245, 243, 238, 0.35)',
            paddingTop: '8px',
          }}
        >
          {service.index}
        </span>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-eb-garamond), Georgia, serif',
              fontSize: 'clamp(28px, 4.5vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: hovered ? '#f5f3ee' : 'rgba(245, 243, 238, 0.75)',
              transition: 'color 0.3s ease',
            }}
          >
            {service.title}
          </div>

          <div
            style={{
              overflow: 'hidden',
              maxHeight: hovered ? '120px' : '0px',
              transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-geist), system-ui, sans-serif',
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                lineHeight: 1.65,
                color: 'rgba(245, 243, 238, 0.6)',
                margin: '12px 0 0 0',
                maxWidth: '560px',
              }}
            >
              {service.description}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-geist), system-ui, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(245, 243, 238, 0.35)',
                margin: '8px 0 0 0',
              }}
            >
              {service.detail}
            </p>
          </div>
        </div>

        <div
          style={{
            paddingTop: '8px',
            transform: hovered ? 'translateX(10px)' : 'translateX(0px)',
            transition: 'transform 0.3s ease',
            color: 'rgba(245, 243, 238, 0.5)',
            fontSize: 'clamp(16px, 2vw, 22px)',
            lineHeight: 1,
          }}
        >
          →
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      style={{
        background: '#0d0d0d',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.index} service={service} delay={i * 0.1} />
        ))}
        <div
          style={{
            height: '1px',
            background: 'rgba(245, 243, 238, 0.12)',
          }}
        />
      </div>
    </section>
  );
}
