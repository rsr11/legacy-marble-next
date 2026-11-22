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
    <section
  ref={heroRef}
  className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#120D0A] text-white"
>
      {/* Luxury dark background */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/dark-marble.webp')",
        }}
      />

      {/* base dark overlay */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#0D0907]/55" />

      {/* left readability gradient */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-r from-[#0D0907]/95 via-[#0D0907]/72 to-transparent" />

      {/* subtle bottom fade */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      {/* top-right navbar */}
      <nav className="hero-nav relative z-30 flex w-full items-center justify-between px-5 py-4 sm:px-8 sm:py-6 lg:px-12 xl:px-20">
      {/* <nav className="hero-nav relative z-30 flex w-full items-center justify-between px-6 py-6 md:px-12 lg:px-20"> */}
        <Logo />

        <ul className="ml-auto hidden items-center gap-8 rounded-full border border-white/15 bg-black/15 px-8 py-3 font-nippo text-sm text-white/95 backdrop-blur-xl md:flex lg:text-base">
          <li>
            <Link
              href="/products/diya"
              className="border-b border-[#D9A441] pb-1 text-[#F1C878] transition-colors"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className="transition-colors hover:text-[#F1C878]"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="transition-colors hover:text-[#F1C878]"
            >
              Journal
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className="transition-colors hover:text-[#F1C878]"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-lg md:hidden"
        >
          <Menu size={22} />
        </button>
      </nav>

      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* temple glow behind image */}
      <div
        className="pointer-events-none absolute right-[3%] top-[18%] z-[1] hidden h-[52%] w-[36%] rounded-full bg-[#D9A441]/18 blur-[120px] lg:block"
      />

      {/* decorative thin arc */}
      <div
        className="pointer-events-none absolute right-[6%] top-[8%] z-[2] hidden h-[78%] w-[50%] rounded-[50%] border border-[#D9A441]/35 lg:block"
      />

      {/* temple image */}
      <div
        className="pointer-events-none absolute bottom-[7%] right-[2%] z-[5] hidden h-[74%] w-[50%] max-w-[920px] lg:block"
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
      <div className="relative z-20 grid flex-1 items-center gap-8 px-5 pb-8 pt-8 sm:gap-10 sm:px-8 sm:pt-10 lg:grid-cols-2 lg:gap-6 lg:px-12 lg:py-10 xl:px-20">
  <div className="relative z-10 mx-auto w-full max-w-[620px] text-center lg:mx-0 lg:text-left">
    <div className="hero-eyebrow mb-5 flex items-center justify-center gap-3 lg:justify-start">
      <span aria-hidden="true" className="h-px w-8 bg-[#D9A441] sm:w-10" />
      <p className="font-nippo text-[10px] uppercase tracking-[0.3em] text-[#F1C878] sm:text-[11px]">
        Timeless Elegance
      </p>
    </div>

    <h1 className="font-serif text-[clamp(2.375rem,6.4vw,5.45rem)] leading-[0.98] tracking-[-0.04em] lg:text-[clamp(2.75rem,4.8vw,5.45rem)]">
      <span className="hero-title-line block text-white">Custom Marble</span>
      <span className="hero-title-line block text-[#E7B859]">Creations</span>
      <span className="hero-title-line mt-3 block text-[0.58em] font-light italic tracking-normal text-white">
        with a royal touch.
      </span>
    </h1>

    <p className="hero-description mx-auto mt-5 max-w-[520px] font-nippo text-sm leading-relaxed text-white/80 sm:mt-7 sm:text-[15px] lg:mx-0">
      Exquisite marble craftsmanship that blends timeless tradition,
      artistic precision, and royal elegance.
    </p>

    <div className="hero-actions mx-auto mt-6 flex w-full max-w-xs flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:mx-0 lg:justify-start">
      <Link
        href="/products/diya"
        className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#E7B859] px-5 py-3 font-nippo text-sm font-semibold text-[#17110D] transition-colors hover:bg-[#F1C878] sm:px-7"
      >
        Explore Products
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>

      <Link
        href="/about-us"
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#D9A441]/70 bg-white/10 px-5 py-2 font-nippo text-sm text-white backdrop-blur-xl transition-colors hover:border-[#F1C878] hover:bg-white/15 sm:px-6"
      >
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9A441]/70 text-[#F1C878]"
        >
          <Play size={14} fill="currentColor" />
        </span>
        Our Story
      </Link>
    </div>
  </div>

  <div className="relative isolate mx-auto h-[clamp(12rem,64vw,27rem)] w-full max-w-xl lg:h-[clamp(21rem,52svh,39rem)] lg:max-w-none">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[15%] inset-y-[12%] rounded-full bg-[#D9A441]/20 blur-[55px] lg:blur-[100px]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[8%] bottom-[7%] top-[2%] rounded-[50%] border border-[#D9A441]/30"
    />
    <Image
      src="/images/temple-cutout.webp"
      alt="Carved marble temple"
      fill
      priority
      sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 576px, 50vw"
      className="object-contain object-bottom drop-shadow-[0_15px_50px_rgba(217,164,65,0.2)]"
    />
  </div>
</div>

      {/* bottom feature row */}
     <div className="relative z-20 px-5 pb-8 sm:px-8 lg:px-12 lg:pb-10 lg:pr-28 xl:px-20 xl:pr-28">
  <div className="mx-auto grid w-fit grid-cols-1 gap-x-8 gap-y-5 min-[540px]:grid-cols-2 md:grid-cols-3 lg:mx-0">
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
