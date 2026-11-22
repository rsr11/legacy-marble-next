"use client";

import React, { useRef, useState } from "react";
import Logo from "../components/Logo.jsx";
import MobileNav from "../components/MobileNav.jsx";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Play,
  Gem,
  Landmark,
  ShieldCheck,
  Menu,
  ChevronDown,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

const features = [
  {
    icon: Gem,
    title: "Premium Quality",
    subtitle: "Timeless Durability",
  },
  {
    icon: Landmark,
    title: "Royal Craftsmanship",
    subtitle: "Made with Precision",
  },
  {
    icon: ShieldCheck,
    title: "Custom Designs",
    subtitle: "Your Vision, Our Craft",
  },
];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".hero-nav", {
        y: -20,
        autoAlpha: 0,
        duration: 0.7,
      })
        .from(
          ".hero-eyebrow",
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".hero-title-line",
          {
            y: 35,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.75,
          },
          "-=0.2"
        )
        .from(
          ".hero-description",
          {
            y: 18,
            autoAlpha: 0,
            duration: 0.55,
          },
          "-=0.35"
        )
        .from(
          ".hero-actions",
          {
            y: 18,
            autoAlpha: 0,
            duration: 0.55,
          },
          "-=0.35"
        )
        .from(
          ".hero-feature",
          {
            y: 15,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.45,
          },
          "-=0.25"
        )
        .from(
          ".hero-scroll",
          {
            autoAlpha: 0,
            y: 12,
            duration: 0.45,
          },
          "-=0.2"
        );
    },
    { scope: heroRef }
  );

  return (
    <div className='h-screen  bg-thrd overflow-hidden top-0 isolate w-full'>
    
      {/* <video 
        src="https://res.cloudinary.com/dkfyjxlwf/video/upload/v1778050262/bg-4_qjnacw.mp4" 
        autoPlay loop muted 
        className='w-full object-cover z-0 h-full absolute' 
      /> */}

        <img 
        src="images/bgg.png" 
        // autoPlay loop muted 
        className='w-full object-cover  z-0 h-full absolute' 
      />

      {/* temple image */}
      <div
        className="
          pointer-events-none absolute
          bottom-[7%] right-[2%] z-[5]
          hidden h-[74%] w-[50%]
          max-w-[920px] lg:block
        "
      >
        <Image
          src="/images/temple-cutout.webp"
          alt="3D Marble Temple"
          fill
          priority
          sizes="100%"
          className="object-contain object-bottom drop-shadow-[0_15px_80px_rgba(217,164,65,0.18)]"
        />
      </div>

      {/* main hero content */}
      <div className="relative z-20 flex flex-1 items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-[620px] pt-6 md:pt-0">
          <div className="hero-eyebrow mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-[#D9A441]" />
            <p className="font-nippo text-[11px] uppercase tracking-[0.35em] text-[#F1C878]">
              Timeless Elegance
            </p>
          </div>

          <h1 className="font-serif leading-[0.94] tracking-[-0.04em] text-[clamp(3rem,5vw,5.45rem)]">
            <span className="hero-title-line block text-white">
              Custom Marble
            </span>
            <span className="hero-title-line block text-[#E7B859]">
              Creations
            </span>
            <span className="hero-title-line mt-3 block text-[0.58em] font-light italic tracking-normal text-white">
              with a royal touch.
            </span>
          </h1>

          <p className="hero-description mt-8 max-w-[520px] font-nippo text-sm leading-8 text-white/82 md:text-[15px]">
            Exquisite marble craftsmanship that blends timeless tradition,
            artistic precision, and royal elegance.
          </p>

          <div className="hero-actions mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/products/diya"
              className="group inline-flex items-center gap-4 rounded-full bg-[#E7B859] px-7 py-4 font-nippo text-sm font-semibold text-[#17110D] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F1C878]"
            >
              Explore Products
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/about-us"
              className="inline-flex items-center gap-3 rounded-full border border-[#D9A441]/70 bg-white/8 px-6 py-3.5 font-nippo text-sm text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/12 hover:border-[#F1C878]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9A441]/70 text-[#F1C878]">
                <Play size={16} fill="currentColor" />
              </span>
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* bottom feature row */}
      <div className="relative z-20 px-6 pb-8 md:px-12 lg:px-20 lg:pb-10">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="hero-feature flex items-center gap-3"
              >
                <Icon
                  size={30}
                  strokeWidth={1.7}
                  className="shrink-0 text-[#E7B859]"
                />
                <div>
                  <h3 className="font-nippo text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 font-nippo text-xs text-white/65">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* scroll button */}
      <div className="hero-scroll absolute bottom-8 right-8 z-20 hidden lg:flex">
        <button className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D9A441]/45 bg-white/5 text-[#F1C878] backdrop-blur-lg">
          <ChevronDown size={22} />
        </button>
      </div>
    </section>
  );
}