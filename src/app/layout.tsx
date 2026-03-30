import type { Metadata } from 'next'
import { EB_Garamond, Geist } from 'next/font/google'
import './globals.css'

const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lucasdanielsson.se'),

  title: {
    default: 'Lucas Danielsson – Illusionist & Trollkonstnär | Stockholm',
    template: '%s | Lucas Danielsson',
  },
  description:
    'Lucas Danielsson är en av Sveriges ledande illusionister och trollkonstnärer baserad i Stockholm. Professionell scenshow, close-up magi, företagsevent och TV-uppträdanden. Boka nu.',
  keywords: [
    'illusionist Stockholm',
    'trollkonstnär Sverige',
    'magiker företagsevent Stockholm',
    'scenmagi Sverige',
    'close-up magi Stockholm',
    'Lucas Danielsson illusionist',
    'trolleri bröllop',
    'magiker boka Stockholm',
    'professionell illusionist Sverige',
    'trollkonstnär scenshow',
    'entertainment Stockholm',
    'magiker konferens',
    'SVT illusionist',
  ],
  authors: [{ name: 'Lucas Danielsson', url: 'https://lucasdanielsson.se' }],
  creator: 'Lucas Danielsson',

  alternates: {
    canonical: '/',
    languages: {
      'sv-SE': '/',
      'en': '/',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://lucasdanielsson.se',
    title: 'Lucas Danielsson – Illusionist & Trollkonstnär | Stockholm',
    description:
      'Professionell illusionist baserad i Stockholm. Scenshow, close-up magi, företagsevent och television. Boka Lucas Danielsson för ditt event.',
    siteName: 'Lucas Danielsson',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lucas Danielsson – Illusionist & Trollkonstnär baserad i Stockholm',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Lucas Danielsson – Illusionist & Trollkonstnär',
    description:
      'Professionell illusionist baserad i Stockholm. Boka för scenshow, close-up magi och företagsevent.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lucas Danielsson',
  jobTitle: 'Illusionist',
  description:
    'Professionell illusionist och trollkonstnär baserad i Stockholm, Sverige. Specialiserad på scenshow, close-up magi, företagsevent och TV-uppträdanden.',
  url: 'https://lucasdanielsson.se',
  email: 'hello@lucasdanielsson.se',
  sameAs: [
    'https://instagram.com/lucasdanielsson',
    'https://linkedin.com/in/lucasdanielsson',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Stockholm',
    addressRegion: 'Stockholms län',
    addressCountry: 'SE',
  },
  knowsLanguage: ['sv', 'en'],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Illusionist',
    occupationLocation: {
      '@type': 'City',
      name: 'Stockholm',
    },
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Företagsevent',
      description:
        'Professionell magi för företagsevent, produktlanseringar, keynotes och galor. Tillgänglig världen över, upp till 5 000 gäster.',
    },
    {
      '@type': 'Offer',
      name: 'Scenshow',
      description:
        'Fullängdsshow med storskaliga illusioner för teatrar och evenemang. Upp till 2 000 platser, 60–120 min.',
    },
    {
      '@type': 'Offer',
      name: 'Close-Up Magi',
      description:
        'Intim close-up magi för privata fester, bröllop och exklusiva sammankomster. 10–200 gäster.',
    },
    {
      '@type': 'Offer',
      name: 'Television & Media',
      description:
        'TV-redo uppträdanden för SVT, TV4 och internationella produktioner. Studio eller live.',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body className={`${ebGaramond.variable} ${geist.variable}`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
