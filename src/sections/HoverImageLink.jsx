'use client';

import React, { useCallback, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import NextLink from "next/link";
import Image from "next/image";

export const HoverImageLinks = () => {
  const links = [
    {
      heading: "Inlay Work",
      subheading: "Learn what we do here",
      link:"inlay-work",
      img: "/images/inlay-work.jpg",
    },
    {
      heading: "Carving Work",
      subheading: "We work with great people",
      link:"carving-work",
      img: "/images/carving-work.jpg",
    },
    {
      heading: "Pedestal Washbasin",
      subheading: "Our work speaks for itself",
      link:"pedestal-basin",
      img: "/images/basel.jpg",
    },
    {
      heading: "Mini Items",
      subheading: "We want cool people",
      link:"mini-items",
      img: "/images/mini-craft.jpg",
    },
    {
      heading: "Wash-Vessal",
      subheading: "Incase you're bored",
      link:"wash-basin",
      img: "/images/washbasin.jpg",
    },
  ];

  return (
    <section className="bg-neutral-950 p-14 md:p-20">

    <h1 className="text-white text-6xl font-bold pb-20 font-Bevellier">Other Crafts</h1>

      <div className="mx-auto max-w-5xl">
        {links.map((item, i) => (
          <Link key={i} {...item} />
        ))}
      </div>
    </section>
  );
};

const Link = ({ heading, subheading, img, link }) => {
  const rowRef   = useRef(null);
  const imgRef   = useRef(null);
  const arrowRef = useRef(null);

  const xTo = useRef(null);
  const yTo = useRef(null);

  const initQuickTo = useCallback(() => {
    if (!xTo.current) {
      xTo.current = gsap.quickTo(imgRef.current, "left", { duration: 0.3, ease: "power3" });
      yTo.current = gsap.quickTo(imgRef.current, "top",  { duration: 0.3, ease: "power3" });
    }
  }, []);

  const handleMouseMove = (e) => {
    initQuickTo();
    const rect = rowRef.current.getBoundingClientRect();
    xTo.current(e.clientX - rect.left);
    yTo.current(e.clientY - rect.top);
  };

  const handleEnter = () => {
    initQuickTo();
    gsap.to(imgRef.current,   { scale: 1, rotate: 8,  opacity: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(arrowRef.current, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current,   { scale: 0, rotate: -8, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(arrowRef.current, { x: 40, opacity: 0, duration: 0.25 });
  };

 return (
    <NextLink
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      href={`/products/${link}`}
      className="group relative font-Bevellier flex items-center justify-between gap-3 border-b-2 border-neutral-700 hover:border-neutral-50 transition-colors py-4 sm:py-6 md:py-8 px-2 sm:px-4"
    >
      {/* Text */}
      <div className="min-w-0">
        <h2 className="font-bold text-neutral-500 group-hover:text-white transition-colors text-xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight truncate">
          {heading}
        </h2>
        <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors mt-1 text-xs sm:text-sm md:text-base">
          {subheading}
        </p>
      </div>

      {/* Floating image */}
      <Image
        ref={imgRef}
        src={img}
        height={80}
        width={120}
        alt=""
        className="pointer-events-none absolute z-10 rounded-lg object-cover hidden md:block w-32 h-20 md:w-52 md:h-36 lg:w-64 lg:h-44"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0) rotate(-8deg)",
          opacity: 0,
          willChange: "transform, opacity, top, left",
        }}
      />

      {/* Mobile thumbnail */}
      <img
        src={img}
        alt={heading}
        className="block md:hidden flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover"
      />

      {/* Arrow (desktop animated) */}
      <div
        ref={arrowRef}
        className="relative z-10 flex-shrink-0 opacity-0 translate-x-10 md:block hidden"
      >
        <FiArrowRight className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
      </div>

      {/* Arrow mobile */}
      <FiArrowRight className="text-white text-xl flex-shrink-0 md:hidden" />
    </NextLink>
  );
};





  
