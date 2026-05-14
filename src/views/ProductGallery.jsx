'use client';

import { useRef, useCallback, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { useParams, useRouter } from 'next/navigation'
import gsap from 'gsap'
import ImageNoise from '../components/ImageNoice'
import Footer from '../components/Footer'
import Image from 'next/image';

const ALL_PRODUCTS = {
  diya: {
    name: 'Diya', number: '01', color: '#7F2020',
    tag: 'Lighting · Marble', price: '₹ 499 onwards',
    keyfeatures: ['Premium Quality Marble','Traditional Handcrafted Design','Ideal for Pooja & Festivals','Long-Lasting & Durable','Perfect for Gifting'],
    description: 'Our marble diya is a perfect blend of tradition and craftsmanship. Carefully carved from high-quality marble, it enhances the beauty of your pooja room and festive decorations. Its elegant design and smooth finish make it ideal for daily rituals, Diwali celebrations, and gifting purposes.',
    heroImg: '/images/diya/diya.jpeg',
    col1: ['/images/diya/diya-2.jpeg', '/images/diya/diya-4.jpg', '/images/diya/diya-6.jpg'],
    col2: ['/images/diya/diya-3.jpg',  '/images/diya/diya-5.jpg', '/images/diya/diya-7.jpg'],
  },
  fountain: {
    name: 'Fountain', number: '02', color: '#093C5D',
    tag: 'Water Feature · Marble', price: '₹ 8,999 onwards',
    keyfeatures: ['100% Natural Marble Stone','Hand-Carved by Expert Artisans','Weather-Resistant & Durable','Ideal for Garden, Villa & Hotel','Custom Sizes & Designs Available'],
    description: 'Transform your garden, patio, or indoor space with our exquisite marble fountain, meticulously handcrafted from premium-quality natural stone. Designed by skilled artisans, each piece reflects intricate detailing and superior craftsmanship that creates a calming ambiance.',
    heroImg: '/images/fountain-cover.jpeg',
    col1: ['/images/fountain/fountain-1.jpg', '/images/fountain/fountain-2.jpg', '/images/fountain/fountain-3.jpg'],
    col2: ['/images/fountain/fountain-4.jpg', '/images/fountain/fountain-5.jpg', '/images/fountain/fountain-6.jpg'],
  },
  temple: {
    name: 'Home Temple', number: '03', color: '#4B4038',
    tag: 'Devotional · Marble', price: '₹ 159 onwards',
    keyfeatures: ['Premium White Marble','Traditional Handcrafted Design','Ideal for Home & Pooja Room','Durable & Easy Maintenance','Custom Sizes Available'],
    description: 'Crafted as a sacred centrepiece for the home, each marble mandir is hand-sculpted with intricate pillars, arched entrances, and devotional motifs. A lifelong heirloom of faith and craftsmanship.',
    heroImg: '/images/mini-temple-cover.jpeg',
    col1: ['/images/temple/temple-1.jpg', '/images/temple/temple-2.jpg', '/images/temple/temple-3.jpg'],
    col2: ['/images/temple/temple-4.jpg', '/images/temple/temple-5.jpg', '/images/temple/temple-6.jpg'],
  },
  'flower-pot': {
    name: 'Flower Pot', number: '04', color: '#1F6F5F',
    tag: 'Garden · Marble', price: '₹ 1,299 onwards',
    keyfeatures: ['Durable Natural Marble','Elegant Handcrafted Design','Suitable for Indoor & Outdoor Use','Weather-Resistant','Available in Multiple Sizes'],
    description: 'Our marble flower pots combine durability with luxury aesthetics. Handcrafted from natural stone, these planters provide a sturdy and stylish base for your plants. Their elegant finish complements gardens, balconies, and interiors alike.',
    heroImg: '/images/pot-cover.jpeg',
    col1: ['/images/flower-pot/flower-pot-1.jpg', '/images/flower-pot/flower-pot-2.jpg', '/images/flower-pot/flower-pot-3.jpg'],
    col2: ['/images/flower-pot/flower-pot-4.jpg', '/images/flower-pot/flower-pot-5.jpg', '/images/flower-pot/flower-pot-6.jpg'],
  },
  'wash-basin': {
    name: 'Wash Basin', number: '05', color: '#4A5568',
    tag: 'Utility · Marble', price: '₹ 5,499 onwards',
    keyfeatures: ['Single Block Natural Marble','Unique Texture & Finish','Easy to Clean & Maintain','Ideal for Luxury Bathrooms & Hotels','Custom Designs Available'],
    description: 'Crafted from a single block of natural marble, our designer wash basins redefine luxury. Each piece showcases unique patterns, ensuring no two basins are alike — ideal for modern and traditional interiors, hotels, and villas.',
    heroImg: '/images/wash-basin/wash-basin-1.jpg',
    col1: ['/images/wash-basin/wash-basin-1.jpg', '/images/wash-basin/wash-basin-2.jpg', '/images/wash-basin/wash-basin-3.jpg'],
    col2: ['/images/wash-basin/wash-basin-4.jpg', '/images/wash-basin/wash-basin-5.jpg', '/images/wash-basin/wash-basin-6.jpg'],
  },
  'inlay-work': {
    name: 'Inlay Work', number: '06', color: '#1E104E',
    tag: 'Home Decor · Marble', price: '₹ 2,199 onwards',
    keyfeatures: ['Authentic Pietra Dura Technique','Intricate Stone Inlay Designs','Premium Marble Base','Ideal for Luxury Interiors','Custom Designs Available'],
    description: 'Inspired by the historic Pietra Dura art of the Taj Mahal, our marble inlay work represents the finest craftsmanship. Skilled artisans embed semi-precious stones into marble to create stunning floral and geometric patterns.',
    heroImg: '/images/inlay-work/inlay-work-1.jpg',
    col1: ['/images/inlay-work/inlay-work-1.jpg', '/images/inlay-work/inlay-work-2.jpg', '/images/inlay-work/inlay-work-3.jpg'],
    col2: ['/images/inlay-work/inlay-work-7.jpg', '/images/inlay-work/inlay-work-5.jpg', '/images/inlay-work/inlay-work-6.jpg'],
  },
  'carving-work': {
    name: 'Carving Work', number: '07', color: '#C4622D',
    tag: 'Home Decor · Marble', price: '₹ 1,899 onwards',
    keyfeatures: ['Intricate Hand-Carved Designs','Premium Natural Marble','Ideal for Interior & Architectural Use','Durable & Long-Lasting','Custom Work Available'],
    description: 'Our marble carving work showcases the timeless art of transforming natural stone into breathtaking designs. From detailed sculptures to decorative panels, each piece is handcrafted with precision and passion.',
    heroImg: '/images/craving-work/craving-work-1.jpg',
    col1: ['/images/craving-work/craving-work-1.jpg', '/images/craving-work/craving-work-2.jpg', '/images/craving-work/craving-work-3.jpg'],
    col2: ['/images/craving-work/craving-work-4.jpg', '/images/craving-work/craving-work-5.jpg', '/images/craving-work/craving-work-6.jpg'],
  },
  'marble-slate': {
    name: 'Marble Slate', number: '08', color: '#6984A9',
    tag: 'Slate · Marble', price: '₹ 999 onwards',
    keyfeatures: ['Premium Marble Finish','Smooth Polished Surface','Ideal for Gifting & Décor','Durable & Scratch-Resistant','Custom Engraving Available'],
    description: 'Flat-cut marble slabs polished to a smooth finish, ideal for serving boards, tabletops, wall cladding, and signage. The natural grain of each stone means no two pieces are alike.',
    heroImg: '/images/marble-slate/marble-slate-1.jpg',
    col1: ['/images/marble-slate/marble-slate-1.jpg', '/images/marble-slate/marble-slate-2.jpg', '/images/marble-slate/marble-slate-3.jpg'],
    col2: ['/images/marble-slate/marble-slate-4.jpg', '/images/marble-slate/marble-slate-5.jpg', '/images/marble-slate/marble-slate-6.jpg'],
  },
  'mini-items': {
    name: 'Mini Items', number: '09', color: '#2A7A7A',
    tag: 'Collectibles · Marble', price: '₹ 299 onwards',
    keyfeatures: ['Individually Hand-Polished','Premium Marble Quality','Perfect for Gifting','Wide Variety of Designs','Compact & Elegant'],
    description: 'A curated collection of small marble objects — coasters, incense holders, candle stands, photo frames, and paperweights. Each piece is individually hand-polished, making them perfect as standalone accents or thoughtful gifts.',
    heroImg: '/images/mini-items/mini-items-1.jpg',
    col1: ['/images/mini-items/mini-items-1.jpg', '/images/mini-items/mini-items-2.jpg', '/images/mini-items/mini-items-3.jpg'],
    col2: ['/images/mini-items/mini-items-4.jpg', '/images/mini-items/mini-items-5.jpg', '/images/mini-items/mini-items-6.jpg'],
  },
  'pedestal-basin':{
    name: 'Pedestal Basin', number: '10', color: '#1F6F5F',
    tag: 'Bathroom · Marble', price: '₹ 1,299 onwards',
    keyfeatures: ['Stylish Design','Premium Marble Quality','Easy to Clean','Durable & Long-Lasting','Custom Size Available'],
    description: 'Elevate your bathroom with our elegant marble pedestal basins. These beautifully crafted pieces combine functionality with aesthetic appeal, making them a perfect addition to any modern bathroom.',
    heroImg: '/images/p-basin/p-basin-6.jpg',
    col1: ['/images/p-basin/p-basin-1.jpg', '/images/p-basin/p-basin-2.jpg', '/images/p-basin/p-basin-3.jpg'],
    col2: ['/images/p-basin/p-basin-4.jpg', '/images/p-basin/p-basin-5.jpg', '/images/p-basin/p-basin-6.jpg'], 
  }
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ src, onClose }) => {
  useGSAP(() => {
    // Prevent background scroll while open
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-colors duration-200 cursor-pointer z-10"
      >
        <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>

      {/* Keyboard hint */}
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase text-white/25 select-none">
        Press Esc or click outside to close
      </span>

      {/* Image */}
      <Image
        src={src}
        alt="Full view"
        width={800}
        height={800}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[88vw] max-h-[88vh] object-contain rounded-sm shadow-2xl"
        style={{ animation: 'lbFadeIn 0.28s cubic-bezier(0.25,0.46,0.45,0.94) both' }}
      />

      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// ─── Infinite scroll column — pauses on hover, click opens lightbox ───────────
const ScrollColumn = ({ images, direction = 1, onImageClick }) => {
  const wrapRef  = useRef(null)
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

  const tripled = [...images, ...images, ...images]

  useGSAP(() => {
    const track = trackRef.current
    const setH  = track.scrollHeight / 3

    // Kill any stale tween from a previous render / product change
    if (tweenRef.current) tweenRef.current.kill()

    if (direction > 0) {
      tweenRef.current = gsap.to(track, {
        y: -setH, duration: 16, ease: 'none', repeat: -1,
        onRepeat: () => gsap.set(track, { y: 0 }),
      })
    } else {
      gsap.set(track, { y: -setH })
      tweenRef.current = gsap.to(track, {
        y: 0, duration: 16, ease: 'none', repeat: -1,
        onRepeat: () => gsap.set(track, { y: -setH }),
      })
    }

    const wrap = wrapRef.current
    const pause  = () => tweenRef.current?.pause()
    const resume = () => tweenRef.current?.resume()

    wrap.addEventListener('mouseenter', pause)
    wrap.addEventListener('mouseleave', resume)
    // Touch: pause on press, resume on lift
    wrap.addEventListener('touchstart', pause,  { passive: true })
    wrap.addEventListener('touchend',   resume, { passive: true })
    wrap.addEventListener('touchcancel',resume, { passive: true })

    return () => {
      wrap.removeEventListener('mouseenter', pause)
      wrap.removeEventListener('mouseleave', resume)
      wrap.removeEventListener('touchstart', pause)
      wrap.removeEventListener('touchend',   resume)
      wrap.removeEventListener('touchcancel',resume)
    }
  })

  return (
    <div ref={wrapRef} className="overflow-hidden h-full">
      <div ref={trackRef} className="flex flex-col gap-1.5 will-change-transform">
        {tripled.map((src, i) => (
          <div
            key={i}
            className="relative group flex-shrink-0 cursor-zoom-in"
            onClick={() => onImageClick(src)}
          >
            <Image
              src={src} alt="" width={200} height={300}
              className="w-full aspect-[3/4] object-cover rounded-sm block transition-[filter,transform] duration-300 group-hover:brightness-60 group-hover:scale-[1.03]"
            />
            {/* Zoom icon shown on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="6.5" cy="6.5" r="4" />
                  <path d="M11 11l3 3M6.5 4.5v4M4.5 6.5h4" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Suggestion card ──────────────────────────────────────────────────────────
const SuggCard = ({ product, isActive, onNavigate }) => (
  <div
    onClick={() => onNavigate(product.slug)}
    className={`relative group cursor-pointer overflow-hidden rounded-sm transition-transform duration-300 hover:-translate-y-1 ${isActive ? 'ring-2' : ''}`}
    style={isActive ? { outline: `2px solid ${product.color}` } : {}}
  >
    {isActive && (
      <div className="absolute top-0 inset-x-0 h-[2px] z-10"
        style={{ background: product.color }} />
    )}
    <div className="overflow-hidden">
      <ImageNoise grainOpacity={5} src={product.heroImg} alt={product.name}
        className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
    <div className="absolute bottom-10 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-250"
      style={{ background: product.color }}>
      <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </div>
    <div className="px-2.5 py-2 border-t border-white/5"
      style={{ background: isActive ? `${product.color}18` : '#161616' }}>
      <p className="text-xs font-medium leading-tight truncate"
        style={{ color: isActive ? product.color : '#fff' }}>{product.name}</p>
      <p className="text-[9px] uppercase tracking-widest text-white/30 mt-0.5">
        {product.tag.split('·')[0].trim()}
      </p>
    </div>
  </div>
)

// ─── Main ─────────────────────────────────────────────────────────────────────
const ProductGallery = () => {
  const { id }   = useParams()
  const router = useRouter()
  const pageRef  = useRef(null)
  const topRef   = useRef(null)
  const botRef   = useRef(null)

  // Lightbox state
  const [lightboxSrc, setLightboxSrc] = useState(null)

  const product     = ALL_PRODUCTS[id] ?? ALL_PRODUCTS['diya']
  const suggestions = Object.entries(ALL_PRODUCTS).map(([slug, d]) => ({ slug, ...d }))

  const handleNavigate = useCallback((slug) => {
    if (slug === id) return
    router.push(`/products/${slug}`)
  }, [id, router])

  useGSAP(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    gsap.set(topRef.current, { y: '0%' })
    gsap.set(botRef.current, { y: '0%' })
    gsap.timeline({ delay: 0.05 })
      .to(topRef.current,     { y: '-100%', duration: 0.85, ease: 'power3.inOut' }, 0)
      .to(botRef.current,     { y: '100%',  duration: 0.85, ease: 'power3.inOut' }, 0)
      .from('.anim-heroimg',  { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.4)
      .from('.anim-info',     { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, 0.48)
      .from('.anim-features', { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 }, 0.55)
      .from('.anim-cta',      { y: 14, opacity: 0, duration: 0.4, ease: 'power3.out' }, 0.72)
      .from('.anim-suggcard', { y: 30, opacity: 0, stagger: 0.06, duration: 0.45, ease: 'power2.out' }, 0.55)
  }, { scope: pageRef })

  return (
    <>
    <div key={id} ref={pageRef} className="bg-[#0e0e0e] text-white min-h-screen relative">

      {/* ── Lightbox ── */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {/* ── Transition panels ── */}
      <div ref={topRef} className="fixed inset-x-0 top-0 h-1/2 z-[100] bg-[#0e0e0e] pointer-events-none"
        style={{ transform: 'translateY(-100%)' }} />
      <div ref={botRef} className="fixed inset-x-0 bottom-0 h-1/2 z-[100] bg-[#0e0e0e] pointer-events-none"
        style={{ transform: 'translateY(100%)' }} />

      {/* ── Back button ── */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white text-[10px] tracking-widest uppercase px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer"
      >
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13L5 8l5-5" />
        </svg>
        Back
      </button>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section
        className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] min-h-screen"
        style={{ background: product.color }}
      >
        {/* Col 1: Large hero image */}
        <div className="anim-heroimg relative overflow-hidden h-[100vw] md:h-screen flex items-end">
          <ImageNoise
            src={product.heroImg}
            grainOpacity={5}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="relative z-10 font-secondary font-bold text-white/20 text-[80px] leading-none select-none px-6 pb-4">
            {product.number}
          </span> */}
        </div>

        {/* Col 2: Product info */}
        <div className="anim-info flex flex-col justify-between px-8 sm:px-10 py-16 md:py-5 min-h-[60vh] md:min-h-screen">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3">
              {product.tag} · Handmade
            </p>
            <h1 className="font-Bevellier font-bold text-white leading-[0.92] text-5xl sm:text-6xl lg:text-7xl mb-6">
              {product.name}
            </h1>
            <p className="text-sm text-white/60 leading-relaxed font-secondary max-w-sm">
              {product.description}
            </p>
          </div>

          <div className="my-8 border border-white/10 bg-white/10 rounded-sm px-5 py-4 max-w-sm">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white mb-4">
              Key Features
            </p>
            <ul className="flex flex-col gap-2.5">
              {product.keyfeatures.filter(f => f).map((f, i) => (
                <li key={i} className="anim-features flex items-start gap-3 text-sm text-white/70 font-secondary">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-black/30" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="anim-cta">
         <div className="flex flex-col mb-5 gap-2">
  <p className="font-secondary font-bold text-white text-3xl">{product.price}</p>
  <span className="inline-flex items-center gap-1.5 w-fit
                   bg-white/8 border border-white/15 rounded-full
                   px-3 py-1">
    <svg className="w-2.5 h-2.5 opacity-50" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/>
    </svg>
    <span className="text-[10px] uppercase tracking-widest text-white/45">
      Based on size & design
    </span>
  </span>
</div>
            <button
              onClick={() => router.push('/contact-us')}
              className="group flex items-center gap-3 cursor-pointer bg-[#0e0e0e] text-white px-7 py-4 rounded-sm text-xs tracking-widest uppercase font-medium hover:gap-5 transition-all duration-300"
            >
              Contact Us
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Col 3: Infinite scroll gallery — hover pauses, click opens lightbox */}
        <div className="grid grid-cols-2 gap-1.5 p-1.5 h-[70vw] md:h-screen overflow-hidden bg-[#0e0e0e]">
          <ScrollColumn
            key={`c1-${id}`}
            images={product.col1}
            direction={1}
            onImageClick={setLightboxSrc}
          />
          <ScrollColumn
            key={`c2-${id}`}
            images={product.col2}
            direction={-1}
            onImageClick={setLightboxSrc}
          />
        </div>
      </section>

      {/* ── Suggestions ── */}
      <section className="px-6 sm:px-10 lg:px-16 py-14">
        <div className="flex items-end justify-between mb-8 gap-4">
          <h2 className="font-secondary font-bold text-white text-2xl sm:text-3xl leading-tight">
            Explore our{' '}
            <span style={{ color: product.color }}>crafts</span>
          </h2>
          {/* <button */}
            {/* // onClick={() => navigate('/')}
          //   className="text-[10px] uppercase tracking-widest text-white/35 cursor-pointer // border-b border-white/15 hover:text-white hover:border-white // pb-0.5 transition-all duration-200 whitespace-nowrap"
          // >
          //   View all → */}
          {/* // </button> */}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {suggestions.map(p => (
            <div key={p.slug} className="anim-suggcard">
              <SuggCard product={p} isActive={p.slug === id} onNavigate={handleNavigate} />
            </div>
          ))}
        </div>
      </section>
    </div>
      <Footer/>
    </>
  )
}

export default ProductGallery
