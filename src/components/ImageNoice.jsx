'use client';

/**
 * ImageNoise — wraps an image and adds a precise noise overlay.
 *
 * Specs applied:
 *   Size    : 1        → baseFrequency 0.65
 *   Density : 100%     → full coverage repeat
 *   Color   : #000000  → black grain
 *   Opacity : 25%      → rgba(0,0,0,0.25)
 *
 * Usage:
 *   <ImageNoise src="/marble.jpg" alt="Marble slab" className="w-full h-96" />
 *
 *   // override opacity if needed
 *   <ImageNoise src="/stone.jpg" alt="Stone" grainOpacity={0.15} />
 */

export default function ImageNoise({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  grainOpacity = 0.25,   // 25%
  children,
}) {
  const noiseSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`;

  return (
    <div className={`relative cursor-pointer overflow-hidden ${className}`}>

      {/* image */}
      {src && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover block ${imgClassName}`}
        />
      )}

      {/* slot for div / other content instead of img */}
      {children}

      {/* noise overlay — black, 25% opacity, full coverage */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
          backgroundImage: noiseSvg,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",     /* size: 1 */
          opacity: grainOpacity,             /* 25% */
          mixBlendMode: "multiply",          /* black grain blends naturally */
        }}
      />
    </div>
  );
}