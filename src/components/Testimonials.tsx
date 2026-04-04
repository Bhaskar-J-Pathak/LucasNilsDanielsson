'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TestimonialItem {
  quote: string;
  name: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: 'He made 200 engineers stop talking. That never happens.',
    name: 'Anna Lindqvist',
  },
  {
    quote:
      "The only performer we've ever asked back three years running. The guests never see it coming — even the second time.",
    name: 'Marcus Strand',
  },
  {
    quote:
      "Our entire audience gave a standing ovation. In fifteen years of producing shows, I've never seen that from a magic act.",
    name: 'Sofia Berg',
  },
];

function TestimonialRow({
  item,
  delay,
}: {
  item: TestimonialItem;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      <div
        style={{
          height: '1px',
          background: 'rgba(245, 243, 238, 0.12)',
        }}
      />
      <div
        style={{
          padding: 'clamp(32px, 5vw, 56px) 0',
          maxWidth: '820px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-eb-garamond), Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(22px, 3.2vw, 36px)',
            fontWeight: 400,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            color: '#f5f3ee',
            margin: '0 0 clamp(16px, 2vw, 24px) 0',
          }}
        >
          &ldquo;{item.quote}&rdquo;
        </p>
        <div
          style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.08em',
            color: 'rgba(245, 243, 238, 0.45)',
          }}
        >
          <span style={{ color: 'rgba(245, 243, 238, 0.7)' }}>{item.name}</span>
          <span
            style={{
              margin: '0 8px',
              color: 'rgba(245, 243, 238, 0.2)',
            }}
          >
            /
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px 0px' });

  return (
    <section
      style={{
        background: '#0d0d0d',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 'clamp(40px, 6vw, 72px)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(245, 243, 238, 0.4)',
            }}
          >
            What they say
          </span>
          <span
            style={{
              fontFamily: 'var(--font-eb-garamond), Georgia, serif',
              fontStyle: 'italic',
              fontSize: '15px',
              color: 'rgba(245, 243, 238, 0.2)',
            }}
          >
            3 testimonials
          </span>
        </motion.div>

        {TESTIMONIALS.map((item, i) => (
          <TestimonialRow key={item.name} item={item} delay={i * 0.12} />
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
