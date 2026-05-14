'use client';

import React, { useState, useRef } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Observer, ScrollTrigger);

const teamData = [
  {
    name: "Moh. Adnan",
    description:
      "Creative designer with a strong eye for detail, crafting visually stunning marble products that blend tradition with modern aesthetics.",
    img: "images/team-3.jpeg",
  },
  {
    name: "Sahil",
    description:
      "Operations expert ensuring smooth production workflows and maintaining top-notch quality across all marble creations.",
    img: "images/team-2.jpg",
  },
  {
    name: "Rahim Mansuri  ",
    description:
      "Marketing strategist focused on building brand identity and connecting customers with elegant marble craftsmanship.",
    img: "images/team-1.jpg",
  },
];

const OurTeam = () => {
  const [index, setIndex] = useState(0);

  const imgRef          = useRef(null);
  const nameRef         = useRef(null);
  const descRef         = useRef(null);
  const currentIndexRef = useRef(0);
  const isAnimating     = useRef(false);

  const changeSlide = (dir) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let newIndex = currentIndexRef.current + dir;
    if (newIndex < 0) newIndex = teamData.length - 1;
    if (newIndex >= teamData.length) newIndex = 0;

    const tl = gsap.timeline();

    // ── OUT ──────────────────────────────────────────
    tl.to(imgRef.current, {
      y: dir > 0 ? "-100%" : "100%",
      duration: 0.55,
      ease: "power3.inOut",
    }, 0);

    tl.to(nameRef.current, {
      y: dir > 0 ? -24 : 24,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
    }, 0);

    tl.to(descRef.current, {
      y: dir > 0 ? -16 : 16,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      delay: 0.04,
    }, 0);

    // ── SWAP ─────────────────────────────────────────
    tl.call(() => {
      flushSync(() => setIndex(newIndex));
      currentIndexRef.current = newIndex;
      gsap.set(imgRef.current, { y: dir > 0 ? "100%" : "-100%" });
    });

    // ── IN ───────────────────────────────────────────
    tl.to(imgRef.current, {
      y: "0%",
      duration: 0.55,
      ease: "power3.inOut",
    });

    tl.fromTo(
      nameRef.current,
      { y: dir > 0 ? 24 : -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.32, ease: "power3.out" },
      "-=0.38"
    );

    tl.fromTo(
      descRef.current,
      { y: dir > 0 ? 16 : -16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.32,
        ease: "power3.out",
        onComplete: () => { isAnimating.current = false; },
      },
      "-=0.28"
    );
  };

 useGSAP(() => {
  const section = document.querySelector("#team-section");
  const steps = teamData.length - 1; // = 2 scroll bands for 3 slides
  let lastTriggeredIndex = 0;

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: `+=${steps * 100}vh`,   // ← KEY FIX: (3-1)*100vh = 2 viewport-lengths
    pin: true,
    onUpdate(self) {
      // Map progress 0→1 into slide indices 0→2
      const targetIndex = Math.min(
        Math.floor(self.progress * steps + 0.15), // 0.15 bias = fires slightly early
        teamData.length - 1
      );

      if (targetIndex !== lastTriggeredIndex) {
        const dir = targetIndex > lastTriggeredIndex ? 1 : -1;
        lastTriggeredIndex = targetIndex;
        changeSlide(dir);
      }
    },
  });
}, []);

  return (
    <section
      id="team-section"
      className="bg-third min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden px-4 py-10 sm:py-12"
    >
      {/* ── Heading ───────────────────────────────── */}
      <h1 className="text-white font-Bevellier text-center mb-6 sm:mb-8 lg:mb-10 text-3xl sm:text-5xl lg:text-7xl tracking-widest">
        OUR TEAM
      </h1>

      {/* ── Content ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 w-full max-w-5xl">

        {/*
          IMAGE — order-1 on mobile (image above text feels natural on small screens)
                  order-2 on desktop (image on the right side)
          The overflow-hidden wrapper is the "rectangle" — image slides within this
          box so it never bleeds outside it during animation.
        */}
        <div className="order-1 md:order-2 md:w-1/2 flex justify-center md:justify-end">
          <div
            className="overflow-hidden rounded-xl shadow-2xl"
            style={{
              width:  "clamp(200px, 60vw, 300px)",
              height: "clamp(220px, 68vw, 420px)",
            }}
          >
            <img
              ref={imgRef}
              src={teamData[index].img}
              alt={teamData[index].name}
              className="w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>

        {/*
          TEXT — order-2 on mobile (below image), order-1 on desktop (left side)
          Each text node is wrapped in overflow-hidden so the y-translate
          animation clips cleanly like a shutter reveal.
        */}
        <div className="order-2 md:order-1 md:w-1/2 font-nippo text-center md:text-left">

          <div className="overflow-hidden">
            <h2
              ref={nameRef}
              className="text-white mb-2 sm:mb-3 text-xl sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {teamData[index].name}
            </h2>
          </div>

          <div className="overflow-hidden">
            <p
              ref={descRef}
              className="text-white opacity-75 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-sm mx-auto md:mx-0"
            >
              {teamData[index].description}
            </p>
          </div>

          {/* ── Dot indicators + arrow buttons ──────
              Gives mobile users a tap-based fallback besides swiping.       */}
          <div className="flex items-center justify-center md:justify-start gap-4 mt-5 sm:mt-7">

            <button
              onClick={() => changeSlide(-1)}
              aria-label="Previous member"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-colors duration-200 active:scale-95"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M7 3L3 7M7 3l4 4"
                  stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {teamData.map((_, i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all duration-300 ${i === index ? "w-5 sm:w-6 h-[5px] bg-white" : "w-[5px] h-[5px] bg-white/35" }`}
                />
              ))}
            </div>

            <button
              onClick={() => changeSlide(1)}
              aria-label="Next member"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-colors duration-200 active:scale-95"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 3v8M7 11l-4-4M7 11l4-4"
                  stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default OurTeam;