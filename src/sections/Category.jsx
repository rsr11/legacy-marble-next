'use client';

import { useRef } from 'react'
import ImageNoise from '../components/ImageNoice'
// import { useNavigate } from 'next/navigation'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger, SplitText)

const ALL_IMAGES = [
  { src: '/images/fountain-cover.jpeg',    alt: 'Fountain',    category: 'Fountain', link:"fountain"    },
  { src: '/images/mini-temple-cover.jpeg', alt: 'Mini Temple', category: 'Mini Temple', link:"temple" },
  { src: '/images/pot-cover.jpeg',         alt: 'Flower Pot',  category: 'Flower Pots', link:"flower-pot" },
  { src: '/images/wash-vessal.jpg',   alt: 'Pedestal Vessal',  category: 'Pedestal Vessal', link:"pedestal-basin"},
  { src: '/images/wash-basin/wash-basin-1.jpg',      alt: 'Wash Basin',      category: 'Wash Basin', link:"wash-basin" },
  { src: '/images/diya/diya.jpeg',         alt: 'Diya',        category: 'Wash Vassal', link:"diya" },
]

const FILTERS = [
  // { label: 'All',          route: '/category/all'          }
  { label: 'Fountain',     route: '/products/fountain'    },
  { label: 'Wash Basin',  route: '/products/wash-basin'  },
  { label: 'Home temples',  route: '/products/temple'  },
  { label: 'Flower Pots',  route: '/products/flower-pot'  },
]

export default function Category() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const section = sectionRef.current
    const split   = SplitText.create('#cat-heading', { type: 'lines' })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 80%', once: true },
    })

    tl.from(split.lines, {
      y: 60, autoAlpha: 0, stagger: 0.18, duration: 0.9, ease: 'power3.out',
    })
    tl.from('.cat-nav', {
      y: 24, autoAlpha: 0, duration: 0.5, ease: 'power2.out',
    }, '-=0.4')
    tl.from('.cat-card', {
      y: 50, autoAlpha: 0, stagger: { each: 0.08, from: 'start' },
      duration: 0.65, ease: 'power2.out',
    }, '-=0.3')

  }, { scope: sectionRef, dependencies: [] })

  return (
    <section
      ref={sectionRef}
      className="bg-third relative text-white overflow-hidden pt-16 md:pt-20 lg:pt-24 pb-16"
    >
      <h1
        id="cat-heading"
        className="w-[88%] md:w-[62%] lg:w-[45%] mx-auto text-center font-nippo text-2xl md:text-3xl lg:text-4xl uppercase text-fourth leading-tight md:leading-[1.3] font-bold"
      >
        We Know you wanna <br /> see our products and service. Here it is.
      </h1>

      {/* ── Nav — now redirects instead of filtering ─────────────────── */}
      <div className="cat-nav w-[92%] sm:w-[80%] md:w-[60%] lg:w-[42%] flex justify-center mx-auto mt-6">
        <ImageNoise grainOpacity={2} className="w-fit bg-text">
          <ul className="flex h-12 md:h-14 w-fit gap-1 sm:gap-2 rounded-sm bg-fourth justify-between sm:justify-center items-center text-xs sm:text-sm md:text-base overflow-x-auto px-2 sm:px-4">
            {FILTERS.map((item) => (
              <Link
                href={item.route}
                key={item.label}
                className="font-semibold cursor-pointer whitespace-nowrap px-2 sm:px-3 py-1 rounded-sm transition-all duration-200 hover:text-third/60 text-third"
              >
                {item.label}
              </Link>
            ))}
          </ul>
        </ImageNoise>
      </div>

      {/* ── Image grid — always shows all images ─────────────────────── */}
      <div
        className="mt-10 px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4"
      >
        {ALL_IMAGES.map((img, i) => (
          <Link
            href={`/products/${img.link}`}
            key={img.src + i}
            className="cat-card relative group overflow-hidden rounded-sm cursor-pointer"
          >
            <ImageNoise
              grainOpacity={5}
              src={img.src}
              alt={img.alt}
              className="w-full h-[180px] sm:h-[210px] md:h-[240px] lg:h-[260px] xl:h-[280px] object-cover transition-transform duration-500 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-6">
              <p className="text-white text-xs sm:text-sm font-nippo tracking-wide">{img.alt}</p>
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white -rotate-45"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth="2" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
