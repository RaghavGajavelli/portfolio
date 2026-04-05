"use client";

import { motion } from "framer-motion";

// ── Brand palette — max 3 colours, gradients for 3D depth ──
// Amber #f59e0b | Violet #818cf8 | Silver #94a3b8

interface IconProps {
  gradientId: string;   // unique per card to avoid SVG id collisions
  from: string;
  to: string;
  size?: number;
}

// ── AI Product — neural network nodes + pulsing edges ──
export function NeuralNetIcon({ gradientId, from, to, size = 52 }: IconProps) {
  const nodes = [
    { x: 12, y: 10 }, { x: 12, y: 30 }, { x: 12, y: 50 },
    { x: 36, y: 20 }, { x: 36, y: 40 },
    { x: 60, y: 30 },
  ];
  const edges = [
    [0, 3], [0, 4], [1, 3], [1, 4], [2, 3], [2, 4],
    [3, 5], [4, 5],
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 72 60" fill="none">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={`url(#${gradientId})`}
          strokeWidth={1.2}
          filter={`url(#${gradientId}-glow)`}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.5, delay: i * 0.28, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r={3.5}
          fill={`url(#${gradientId})`}
          filter={`url(#${gradientId}-glow)`}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.25, 1] }}
          transition={{ duration: 2.2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
    </svg>
  );
}

// Precompute aperture blade paths at module level — avoids SSR/client float mismatch
const APERTURE_BLADES = Array.from({ length: 6 }, (_, i) => {
  const angle = (i * 60 * Math.PI) / 180;
  const r = (n: number) => Math.round(n * 1000) / 1000; // round to 3dp
  const x1 = r(30 + 8 * Math.cos(angle));
  const y1 = r(30 + 8 * Math.sin(angle));
  const x2 = r(30 + 22 * Math.cos(angle + 0.9));
  const y2 = r(30 + 22 * Math.sin(angle + 0.9));
  const x3 = r(30 + 22 * Math.cos(angle - 0.3));
  const y3 = r(30 + 22 * Math.sin(angle - 0.3));
  return { d: `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} Z` };
});

// ── Photography — aperture blades rotating ──
export function ApertureIcon({ gradientId, from, to, size = 52 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.circle
        cx={30} cy={30} r={26}
        stroke={`url(#${gradientId})`}
        strokeWidth={0.7}
        strokeOpacity={0.25}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "30px 30px" }}
      />
      <motion.g
        animate={{ rotate: [0, 18, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "30px 30px" }}
        filter={`url(#${gradientId}-glow)`}
      >
        {APERTURE_BLADES.map((blade, i) => (
          <motion.path
            key={i}
            d={blade.d}
            fill={`url(#${gradientId})`}
            initial={{ fillOpacity: 0.45 }}
            animate={{ fillOpacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 3, delay: i * 0.45, repeat: Infinity }}
          />
        ))}
      </motion.g>
      <motion.circle
        cx={30} cy={30} r={4.5}
        fill={`url(#${gradientId})`}
        filter={`url(#${gradientId}-glow)`}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "30px 30px" }}
      />
    </svg>
  );
}

// ── Writing / Enough is Enough — broadcast signal: concentric rings pulse outward from centre ──
// Concept: publishing = sending a signal outward. "Enough is Enough" reaches people.
export function WritingIcon({ gradientId, from, to, size = 52 }: IconProps) {
  const rings = [8, 16, 24, 32];

  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Pulsing concentric rings */}
      {rings.map((r, i) => (
        <motion.circle
          key={r}
          cx={30} cy={30} r={r}
          stroke={`url(#${gradientId})`}
          strokeWidth={1.2}
          fill="none"
          filter={`url(#${gradientId}-glow)`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0.6, 1, 1.1],
          }}
          transition={{
            duration: 3,
            delay: i * 0.65,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{ transformOrigin: "30px 30px" }}
        />
      ))}

      {/* Centre dot — the source */}
      <motion.circle
        cx={30} cy={30} r={4}
        fill={`url(#${gradientId})`}
        filter={`url(#${gradientId}-glow)`}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "30px 30px" }}
      />
    </svg>
  );
}

// ── Architecture — stacked layers + upward flow ──
export function ArchitectureIcon({ gradientId, from, to, size = 52 }: IconProps) {
  const layers = [42, 28, 14];

  return (
    <svg width={size} height={size} viewBox="0 0 60 56" fill="none">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${gradientId}-dot-glow`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {layers.map((y, i) => (
        <motion.rect
          key={y}
          x={8} y={y} width={44} height={10} rx={2}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={1.2}
          filter={`url(#${gradientId}-glow)`}
          initial={{ opacity: 0.45 }}
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 2.2, delay: i * 0.55, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {[20, 36].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          r={2.5}
          fill={`url(#${gradientId})`}
          filter={`url(#${gradientId}-dot-glow)`}
          animate={{ cy: [46, 10], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, delay: i * 1.25, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
