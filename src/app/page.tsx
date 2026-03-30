import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Cursor from "@/components/Cursor";
import Sentence from "@/components/Sentence";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import Timeline from "@/components/Timeline";
import WorkIntro from "@/components/WorkIntro";
import Work from "@/components/Work";
import Quote from "@/components/Quote";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer, { FOOTER_HEIGHT } from "@/components/Footer";

const ZOOM_IMAGES = [
  { src: 'https://images.pexels.com/photos/32942066/pexels-photo-32942066.jpeg', alt: 'Stockholm', type: 'image' as const },
  { src: 'https://images.pexels.com/photos/29106961/pexels-photo-29106961.jpeg', alt: 'Stockholm waterfront' },
  { src: 'https://images.pexels.com/photos/987640/pexels-photo-987640.jpeg', alt: 'Stockholm old town'   },
  { src: 'https://images.pexels.com/photos/35618422/pexels-photo-35618422.jpeg', alt: 'Stockholm winter'      },
  { src: 'https://images.pexels.com/photos/12454586/pexels-photo-12454586.jpeg',  alt: 'Stockholm light'       },
  { src: 'https://images.pexels.com/photos/35534440/pexels-photo-35534440.jpeg', alt: 'Stockholm rooftops'    },
  { src: 'https://images.pexels.com/photos/3071473/pexels-photo-3071473.jpeg',  alt: 'Stockholm street'      },
]

export default function Home() {
  return (
    <>
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Cursor />
        <Menu />

        <div style={{ height: '200vh' }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
            <Hero />
          </div>
        </div>

        <Sentence />

        <div style={{ background: '#f5f3ee' }}>
          <ZoomParallax images={ZOOM_IMAGES} />
        </div>

        <Timeline />
        <WorkIntro />
        <Work />
        <Quote />
        <Marquee />
        <Services />
        <Testimonials />
        <Contact />
        <div style={{ height: FOOTER_HEIGHT }} />
      </main>
      <Footer />
    </>
  );
}
