"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";

// Deterministic durations — no Math.random() to avoid SSR/client hydration mismatch
const PATH_DURATIONS = [22,25,20,27,23,26,21,24,28,22,25,20,27,23,26,21,24,28,22,25,20,27,23,26,21,24,28,22,25,20,27,23,26,21,24,28];

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-white"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: PATH_DURATIONS[path.id],
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

interface CardWithPathsProps {
  eyebrow: string;
  title: string;
  stat: string;
  description: string;
  icon: React.ElementType;           // lucide icon (kept for type compat, not rendered)
  animatedIcon: React.ReactNode;     // custom animated SVG icon
  accent: string;
  onViewClick?: () => void;
}

export function CardWithPaths({
  eyebrow,
  title,
  stat,
  description,
  animatedIcon,
  accent,
  onViewClick,
}: CardWithPathsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col h-full bg-[#111111] overflow-hidden cursor-pointer"
    >
      {/* BackgroundPaths — 40% opacity on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${spotPos.x}px ${spotPos.y}px, ${accent}18, transparent 70%)`,
        }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl z-0 transition-opacity duration-500"
        style={{ background: accent, opacity: isHovered ? 0.15 : 0.06 }}
      />

      {/* ── IDLE STATE ── */}
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-20 flex flex-col justify-between h-full p-4 sm:p-5 md:p-6"
          >
            {/* Top: eyebrow + title */}
            <div className="flex flex-col gap-2">
              {/* Eyebrow: accent colour, legible size */}
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: accent }}
              >
                {eyebrow}
              </span>
              {/* Title: full white, clear size */}
              <p className="text-white text-sm sm:text-base font-semibold leading-snug">
                {title}
              </p>
            </div>

            {/* Centre: animated icon */}
            <div className="flex items-center justify-center flex-1 py-3">
              {animatedIcon}
            </div>

            {/* Bottom: stat — mono, readable */}
            <div className="flex items-center gap-2">
              <div className="h-px w-5" style={{ background: accent + "60" }} />
              <span
                className="font-mono text-[10px] tracking-[0.2em] text-white/50"
              >
                {stat}
              </span>
            </div>
          </motion.div>

        ) : (
          /* ── HOVER STATE ── */
          <motion.div
            key="hover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-20 flex flex-col justify-between h-full p-4 sm:p-5 md:p-6"
          >
            {/* Top: eyebrow + title */}
            <div className="flex flex-col gap-2">
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: accent }}
              >
                {eyebrow}
              </span>
              <p className="text-white text-sm sm:text-base font-semibold leading-snug">
                {title}
              </p>
            </div>

            {/* Middle: description — readable, not too dim */}
            <p className="font-mono text-[11px] sm:text-xs leading-relaxed tracking-wide text-white/65">
              {description}
            </p>

            {/* View button — hidden until V3 project pages are built */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
