'use client';



import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const canvasRef = useRef(null);
  const ruleTopRef = useRef(null);
  const ruleBotRef = useRef(null);
  const taglineRef = useRef(null);
  const brandRef = useRef(null);
  const brandSubRef = useRef(null);
  const progressRef = useRef(null);

  const [pct, setPct] = useState(0);
  const pctRef = useRef(0);

  /* ── film grain canvas ── */
  useGSAP(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawNoise = () => {
      const w = canvas.width,
        h = canvas.height;
      const img = ctx.createImageData(w, h);
      const data = img.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = data[i + 1] = data[i + 2] = v;
        data[i + 3] = 255;
      }

      ctx.putImageData(img, 0, 0);
      animId = requestAnimationFrame(drawNoise);
    };

    resize();
    window.addEventListener("resize", resize);
    drawNoise();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── GSAP entrance ── */
  useGSAP(() => {
    const isMobile = window.innerWidth < 640;

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: isMobile ? 0.6 : 1,
      },
    });

    gsap.set([ruleTopRef.current, ruleBotRef.current], {
      width: 0,
      opacity: 0,
    });

    gsap.set(
      [taglineRef.current, brandSubRef.current, progressRef.current],
      { opacity: 0, y: 10 }
    );

    gsap.set(brandRef.current, { opacity: 0, y: 22 });

    tl.to(
      [ruleTopRef.current, ruleBotRef.current],
      {
        width: "clamp(60px, 10vw, 110px)",
        opacity: 0.7,
      },
      0.3
    )
      .to(taglineRef.current, { opacity: 1, y: 0 }, 0.6)
      .to(brandRef.current, { opacity: 1, y: 0 }, 0.5)
      .to(brandSubRef.current, { opacity: 1, y: 0 }, 0.8)
      .to(progressRef.current, { opacity: 1, y: 0 }, 0.9);
  }, []);

  /* ── exit ── */
  const exitLoader = () => {
    gsap.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        loaderRef.current.style.display = "none";
        onComplete?.();
      },
    });
  };

  /* ── progress ── */
  useGSAP(() => {
    const interval = setInterval(() => {
      const current = pctRef.current;
      const step =
        current < 70 ? 1.4 : current < 90 ? 0.7 : 0.3;

      const next = Math.min(
        current + step + Math.random() * 0.8,
        100
      );

      pctRef.current = next;
      setPct(next);

      if (next >= 100) {
        clearInterval(interval);
        setTimeout(exitLoader, 500);
      }
    }, 42);

    return () => clearInterval(interval);
  }, []);

  const displayPct = String(Math.floor(pct)).padStart(3, "0");

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden px-4"
      style={{ backgroundColor: "#0f0e0d" }}
    >
      {/* grain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.05 }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.72)_100%)] pointer-events-none" />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center max-w-[90vw] text-center">

        {/* top line */}
        <div
          ref={ruleTopRef}
          className="mb-4 sm:mb-6 h-[0.5px] bg-[#c9a96e]"
        />

        {/* tagline */}
        <p
          ref={taglineRef}
          className="mb-3 sm:mb-4 uppercase tracking-[0.2em] sm:tracking-[0.38em] text-text"
          style={{
            fontSize: "clamp(12px, 2.5vw, 22px)",
          }}
        >
          Est. Makrana · Since 1994
        </p>

        {/* brand */}
        <h1
          ref={brandRef}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10"
          style={{
            fontSize: "clamp(32px, 6vw, 102px)",
            color: "#f0ebe3",
            letterSpacing: "0.04em",
          }}
        >
          <img
            src="./images/legacy-marble-logo.png"
            className="h-10 sm:h-14 md:h-20 object-contain"
            alt=""
          />
          <span>LEGACY MARBLE</span>
        </h1>

        {/* sub */}
        <p
          ref={brandSubRef}
          className="mt-2 sm:mt-3 uppercase tracking-[0.3em] sm:tracking-[0.56em] text-text"
          style={{
            fontSize: "clamp(12px, 2.5vw, 22px)",
          }}
        >
          Natural Stone & Surfaces
        </p>

        {/* bottom line */}
        <div
          ref={ruleBotRef}
          className="mt-4 sm:mt-6 h-[0.5px] bg-[#c9a96e]"
        />
      </div>

      {/* progress */}
      <div
        ref={progressRef}
        className="absolute bottom-6 sm:bottom-10 md:bottom-12 flex flex-col items-end px-4"
        style={{ width: "clamp(140px, 60vw, 240px)" }}
      >
        <div className="w-full h-[0.5px] bg-[rgba(201,169,110,0.22)] overflow-hidden">
          <div
            className="h-full bg-[#c9a96e]"
            style={{
              width: `${pct}%`,
              transition: "width 0.05s linear",
            }}
          />
        </div>

        <p className="mt-2 text-[10px] tracking-[0.3em] text-[rgba(201,169,110,0.55)]">
          {displayPct}
        </p>
      </div>
    </div>
  );
}