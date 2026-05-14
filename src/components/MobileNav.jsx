'use client';

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Products',   to: '/products/diya' },
  { label: 'About Us',  to: '/about-us'       },
  { label: 'Contact Us',to: '/contact-us'     },
]

export default function MobileNav({ menuOpen, setMenuOpen }) {
  const overlayRef = useRef(null)
  const linksRef   = useRef([])
  const tlRef      = useRef(null)

  // ── GSAP open / close ──────────────────────────────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current
    const links   = linksRef.current.filter(Boolean)

    if (tlRef.current) tlRef.current.kill()

    if (menuOpen) {
      gsap.set(overlay, { display: 'flex', clipPath: 'inset(0 0 100% 0)' })
      gsap.set(links,   { y: 28, opacity: 0 })

      tlRef.current = gsap.timeline()
        .to(overlay, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.55,
          ease: 'power4.inOut',
        })
        .to(links, {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
          ease: 'power3.out',
        }, '-=0.2')
    } else {
      tlRef.current = gsap.timeline({
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      })
        .to(links, {
          y: -16,
          opacity: 0,
          stagger: 0.04,
          duration: 0.22,
          ease: 'power2.in',
        })
        .to(overlay, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.45,
          ease: 'power4.inOut',
        }, '-=0.1')
    }
  }, [menuOpen])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <div
      ref={overlayRef}
      className="md:hidden fixed inset-0 z-40 flex-col items-center justify-center gap-2"
      style={{
        display: 'none',
        background: 'rgba(8,8,12,0.97)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        clipPath: 'inset(0 0 100% 0)',
      }}
    >
      {/* Gold accent line at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.8), transparent)',
        }}
      />

      {/* Close button */}
      <button
        onClick={() => setMenuOpen(false)}
        aria-label="Close menu"
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors duration-200 cursor-pointer"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8"
          strokeLinecap="round" className="w-4 h-4">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>

      {/* Links */}
      <ul className="flex flex-col items-center w-full list-none p-0 m-0">
        {NAV_LINKS.map(({ label, to }, i) => (
          <li
            key={label}
            ref={el => linksRef.current[i] = el}
            className="w-full text-center border-b border-white/[0.06]"
          >
            <Link
              href={to}
              onClick={() => setMenuOpen(false)}
              className="block font-nippo text-4xl sm:text-5xl font-light tracking-[0.15em] text-white/70 hover:text-white py-5 px-8 transition-colors duration-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Decorative index numbers */}
      <div className="absolute left-6 bottom-10 flex flex-col gap-1.5">
        {NAV_LINKS.map((_, i) => (
          <span key={i} className="text-[10px] text-white/15 font-nippo tracking-widest">
            0{i + 1}
          </span>
        ))}
      </div>
    </div>
  )
}
