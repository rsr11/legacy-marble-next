'use client';

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Logo from './Logo'
import Link from 'next/link'

// ── replace with your actual Logo import ──────────────────────────────────────
// const Logo = () => (
//   <span className="font-nippo text-white text-xl tracking-widest select-none">LOGO</span>
// )

const NAV_ITEMS = [{name:'Products', link: '/products/diya'},
                   {name:'About Us', link: '/about-us'},
                  //  {name:'Company', link: '/company'},
                   {name:'Contact Us', link: '/contact-us'}]

// ─── Glass pill style (shared) ────────────────────────────────────────────────
const glassPill = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const overlayRef      = useRef(null)
  const linksRef        = useRef([])
  const tlRef           = useRef(null)

  // ── Animate overlay in/out ──────────────────────────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current
    const links   = linksRef.current

    // Kill any running tween before starting a new one
    if (tlRef.current) tlRef.current.kill()

    if (open) {
      // Make it visible first, then animate
      gsap.set(overlay, { display: 'flex', clipPath: 'inset(0 0 100% 0)' })
      gsap.set(links,   { y: 24, opacity: 0 })

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
          duration: 0.25,
          ease: 'power2.in',
        })
        .to(overlay, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.45,
          ease: 'power4.inOut',
        }, '-=0.1')
    }
  }, [open])

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── NAV BAR ─────────────────────────────────────────────────────────── */}
      <nav
        className="relative flex font-nippo w-full justify-between items-center py-5 px-5 md:px-12 lg:px-20 bg-third text-white z-50"
        style={{
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <Logo />

        {/* Desktop links */}
        <ul
          className="hidden md:flex font-light gap-6 lg:gap-10 list-none rounded-full px-6 py-3"
          style={glassPill}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              href={item.link}
              key={item.name}
              className="list-none transition-colors duration-200 cursor-pointer text-sm tracking-wide select-none"
              style={{ color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              {item.name}
            </Link>
          ))}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="md:hidden flex flex-col justify-center items-end gap-[5px] w-9 h-9 z-[60] bg-transparent border-none cursor-pointer p-1 relative"
        >
          {/* Three bars → morph to X */}
          <span
            className="block h-[1.5px] bg-white rounded-sm origin-center transition-all duration-300"
            style={{
              width: '24px',
              transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block h-[1.5px] bg-white rounded-sm transition-all duration-300"
            style={{
              width: '24px',
              opacity: open ? 0 : 1,
              transform: open ? 'scaleX(0)' : 'none',
            }}
          />
          <span
            className="block h-[1.5px] bg-white rounded-sm origin-center transition-all duration-300"
            style={{
              width: open ? '24px' : '16px',
              transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* ── MOBILE FULLSCREEN OVERLAY ────────────────────────────────────────── */}
      {/*
          Rendered in DOM always (gsap needs the ref),
          but display:none by default (gsap sets display:flex on open).
      */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex-col items-center justify-center gap-2 md:hidden"
        style={{
          display: 'none',       // gsap will flip this to flex
          background: 'rgba(8,8,12,0.96)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          clipPath: 'inset(0 0 100% 0)',  // gsap animates this
        }}
      >
        {/* Decorative gold line at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.8), transparent)' }}
        />

        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item.name}
            href={item.link}  
            ref={el => linksRef.current[i] = el}
            onClick={() => setOpen(false)}
            className="font-nippo text-4xl sm:text-5xl font-light tracking-widest text-white/70 hover:text-white py-4 px-8 w-full text-center border-b border-white/[0.06] transition-colors duration-200 cursor-pointer bg-transparent"
            style={{ letterSpacing: '0.15em' }}
          >
            {item.name}
          </Link>
        ))}

        {/* Small index numbers on side for style */}
        <div className="absolute left-6 bottom-10 flex flex-col gap-1">
          {NAV_ITEMS.map((_, i) => (
            <span key={i} className="text-[10px] text-white/15 font-nippo tracking-widest">
              0{i + 1}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
