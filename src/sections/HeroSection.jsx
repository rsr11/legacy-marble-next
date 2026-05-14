'use client';



import React, { useState } from 'react'
import Logo from '../components/Logo.jsx'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import MobileNav from '../components/MobileNav.jsx';

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  
  gsap.registerPlugin(SplitText); 
 
  useGSAP(()=>{
   
  })


  return (
    <div className='h-screen  bg-thrd overflow-hidden top-0 isolate w-full'>
    
      <video 
        src="https://res.cloudinary.com/dkfyjxlwf/video/upload/v1778050262/bg-4_qjnacw.mp4" 
        autoPlay loop muted 
        className='w-full object-cover z-0 h-full absolute' 
      />

  <div className='absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none' />

      {/* NAV */}
<nav className='relative flex bg-thid font-nippo w-full justify-between items-center py-5 md:my-8 lg:my-0 px-5 md:px-12 lg:px-20 text-white z-10'>


    <Logo />

  {/* Desktop links — glass pill */}
  <ul 
    id='navlinks' 
    className='hidden md:flex font-light cursor-pointer gap-6 lg:gap-10 text-base lg:text-lg backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3'
  >
    <li className='list-none hover:text-black transition-colors'><Link href={'/products/diya'}>Products </Link> </li>
    <li className='list-none hover:text-black transition-colors'><Link href={"/about-us"}>About Us </Link> </li>
    {/* <li className='list-none hover:text-black transition-colors'><Link>Company </Link> </li> */}
    <li className='list-none hover:text-black transition-colors'><Link href="/contact-us">Contact Us </Link> </li>
  </ul>

  {/* Hamburger — mobile only */}
  <button 
    className='md:hidden flex flex-col gap-[5px] z-50' 
    onClick={() => setMenuOpen(true)}
  >
    <span className='w-6 h-[1.5px] bg-white block' />
    <span className='w-6 h-[1.5px] bg-white block' />
    <span className='w-4 h-[1.5px] bg-white block' />
  </button>
</nav>
      {/* ── MOBILE MENU DRAWER ── */}
      {/* Backdrop */}
     <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Bottom content */}
      <div className='absolute bottom-8 z-10 md:bottom-10 w-full px-5 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-end font-nippo gap-4'>
        <p className='text-white text-2xl md:text-3xl lg:text-5xl w-full md:w-1/2 leading-tight'>
          Custom Marble product <br className='hidden md:block' /> with royal touch
        </p>
        <p className='text-white text-lg md:text-base text-left md:text-right w-full md:w-1/2 font-semibold opacity-80'>
          Every crafts have a soul of royalty and legacy
        </p>
      </div>

    </div>
  )
}

export default HeroSection
