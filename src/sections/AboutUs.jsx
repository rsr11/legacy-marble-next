'use client';

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImageNoise from '../components/ImageNoice'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

gsap.registerPlugin(ScrollTrigger)

const WordSplit = ({ text, className = '' }) => (
  <span className={className} aria-label={text}>
    {text.split(' ').map((w, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className="anim-word inline-block">{w}&nbsp;</span>
      </span>
    ))}
  </span>
)

const AboutUs = () => {
  const pageRef    = useRef(null)

  useGSAP(() => {
    // Stagger in the hero words on load
    gsap.from('.anim-word', {
      y: 60,
      opacity: 0,
      stagger: 0.05,
      duration: 0.9,
      ease: 'power4.out',
      delay: 0.15,
    })

    // Scroll reveals
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
        },
      })
    })
  }, { scope: pageRef })

  return (
    <div ref={pageRef} className="bg-third font-nippo text-text overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ════════════════════════════════════════════════════════════════
          Layout:
            mobile  → stacked (label top, text below)
            desktop → side-by-side (1/4 | 3/4)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="min-h-[90vh] flex flex-col md:flex-row">

        {/* Left — label + decorative rule */}
        <div className="md:w-1/4 lg:w-[22%] flex flex-col justify-between px-6 sm:px-10 pt-10 pb-8 md:py-16 md:pl-12 md:pr-6 border-b md:border-b-0 md:border-r border-white/[0.07]">
          <div>
            {/* Section label */}
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/30 mb-3">
              — Who We Are
            </p>
            <h1 className="text-3xl sm:text-4xl font-light text-white leading-tight">
              About Us
            </h1>
          </div>

          {/* Decorative index */}
          <div className="hidden md:flex flex-col gap-1 mt-auto">
            {['01', '02', '03'].map(n => (
              <span key={n} className="text-[10px] text-white/10 tracking-widest">{n}</span>
            ))}
          </div>
        </div>

        {/* Right — main hero copy */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-12 md:py-20">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.55] tracking-[0.03em] text-white/85 mb-8 md:mb-12">
            <WordSplit text="We are from Makrana, the beauty city in Rajasthan." />
          </p>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.55] tracking-[0.03em] text-white/55">
            <WordSplit text="Also known as the Marble City of India — worldwide famous for craftsmanship." />
          </p>

          {/* Decorative horizontal rule */}
          <div className="mt-12 md:mt-16 flex items-center gap-4">
            <div className="h-[1px] w-16 bg-white/15" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/25">
              Makrana · Rajasthan · India
            </span>
          </div>
        </div>
      </section>


  {/* ══ ORIGIN STRIP — full-width text ticker ═══════════════════════════════ */}
      <div className="reveal bg-black border-t border-white/[0.07] py-10 mt-10 overflow-hidden py-5">
        <div className="flex whitespace-nowrap" 
          style={{ animation: 'ticker 18s linear infinite' }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i}
              className="text-[11px] tracking-[0.4em] uppercase text-text mx-12 flex-shrink-0">
              Makrana · Marble City of India · Since 2023 · Handcrafted with Love ·&nbsp;
            </span>
          ))}
        </div>
        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>


      {/* ══ TAJ MAHAL LINE ══════════════════════════════════════════════════════ */}
      <div className="reveal border-t border-white/[0.07] px-6 sm:px-10 md:px-16 lg:px-20 py-12 md:py-20">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-[1.7] tracking-[0.02em] text-white/70 max-w-4xl">
          We use that marble that once used to build the{' '}
          <span className="text-white italic">Taj Mahal</span>
          {' '}— for your home, your royalty, and your legacy.
        </p>
      </div>

      {/* ══ IMAGE + QUOTE STRIP ══════════════════════════════════════════════════
          mobile  → stacked (image top, quote below)
          tablet+ → image left, quote right, side by side
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="reveal py-10 border-t border-white/[0.07] flex flex-col sm:flex-row items-stretch gap-0">
        {/* Image */}
        <div className="w-full sm:w-[40%] md:w-[38%] lg:w-[35%] aspect-[4/3] sm:aspect-auto overflow-hidden flex-shrink-0">
          <ImageNoise
            src="./images/about-us.png"
            grainOpacity={5}
            alt="About us"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quote */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-12 sm:py-0 border-t sm:border-t-0 sm:border-l border-white/[0.07]">
          <span className="text-5xl sm:text-6xl text-white/10 font-light leading-none mb-4 select-none">
            &ldquo;
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-light leading-[1.7] text-white/75 tracking-wide">
            Since 2023, we are working in this field, with more than{' '}
            <span className="text-white font-normal">400+ happy customers.</span>
          </p>

          {/* Stats row */}
          <div className="mt-10 md:mt-14 grid grid-cols-3 gap-4 sm:gap-6 md:gap-10 border-t border-white/[0.07] pt-8">
            {[
              { num: '400+', label: 'Happy Customers' },
              { num: '2+',   label: 'Years of Work'   },
              { num: '100%', label: 'Natural Marble'  },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
                  {num}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/30">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      <Footer />
    </div>
  )
}

export default AboutUs
