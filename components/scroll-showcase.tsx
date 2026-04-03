"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Cpu, Camera, PenLine, Lock, Bike, Heart, ArrowUpRight } from "lucide-react";

const highlights = [
  {
    icon: Cpu,
    title: "AI Knowledge Platform",
    meta: "10,000+ agents · 9% AHT reduction",
    accent: "#7c3aed",
    bg: "from-violet-500/10 to-transparent",
  },
  {
    icon: Camera,
    title: "Portrait Experience",
    meta: "10 entrepreneurs · Netherlands",
    accent: "#f43f5e",
    bg: "from-rose-500/10 to-transparent",
  },
  {
    icon: PenLine,
    title: "Dog Ears — Substack",
    meta: "AI · Systems · Growth",
    accent: "#f59e0b",
    bg: "from-amber-500/10 to-transparent",
  },
  {
    icon: Lock,
    title: "Visual Cryptography",
    meta: "Open source · Java · 2009 → Now",
    accent: "#10b981",
    bg: "from-emerald-500/10 to-transparent",
  },
  {
    icon: Heart,
    title: "Life in Amsterdam",
    meta: "Family · India · NL · 2018 →",
    accent: "#3b82f6",
    bg: "from-blue-500/10 to-transparent",
  },
  {
    icon: Bike,
    title: "Motorcycling Europe",
    meta: "South India → Europe · 2026",
    accent: "#f97316",
    bg: "from-orange-500/10 to-transparent",
  },
];

/* ── inner card content ── */
function ShowcaseContent() {
  return (
    <div className="h-full w-full flex flex-col md:flex-row overflow-hidden">

      {/* Left — portrait */}
      <div className="relative hidden md:block w-[280px] shrink-0">
        <Image
          src="/portraits/portrait-593.jpg"
          alt="Raghav Gajavelli"
          fill
          className="object-cover object-top grayscale"
          sizes="280px"
        />
        {/* dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />

        {/* name stamp */}
        <div className="absolute bottom-6 left-5 z-10 flex flex-col gap-1">
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">Portfolio</span>
          <span className="text-sm font-semibold text-white/80">Raghav Gajavelli</span>
          <span className="font-mono text-[9px] text-white/25 tracking-widest">52.3080° N · 4.6868° E</span>
        </div>
      </div>

      {/* Right — projects grid */}
      <div className="flex-1 p-5 md:p-7 flex flex-col gap-4 overflow-hidden">
        {/* top bar */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/30 tracking-widest uppercase">Work · 2009 — 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 flex-1 min-h-0">
          {highlights.map(({ icon: Icon, title, meta, accent, bg }) => (
            <div
              key={title}
              className={`relative group rounded-xl border border-white/[0.06] bg-gradient-to-br ${bg} p-4 flex flex-col justify-between hover:border-white/[0.14] transition-colors duration-300 overflow-hidden`}
            >
              {/* icon */}
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg mb-3"
                style={{ backgroundColor: `${accent}18`, border: `1px solid ${accent}28` }}
              >
                <Icon className="h-4 w-4" style={{ color: accent }} />
              </div>

              <div>
                <p className="text-xs font-medium text-white/70 leading-snug mb-0.5">{title}</p>
                <p className="text-[10px] text-white/25 leading-snug">{meta}</p>
              </div>

              {/* hover arrow */}
              <ArrowUpRight
                className="absolute top-3 right-3 h-3.5 w-3.5 text-white/0 group-hover:text-white/30 transition-colors duration-200"
              />
            </div>
          ))}
        </div>

        {/* bottom stat bar */}
        <div className="shrink-0 flex items-center gap-6 pt-3 border-t border-white/[0.05]">
          {[
            { n: "6", label: "Projects" },
            { n: "10K+", label: "Agents" },
            { n: "7+", label: "Years" },
            { n: "2", label: "Continents" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-amber-400/80">{s.n}</span>
              <span className="text-[10px] text-white/25">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── exported section ── */
export function ScrollShowcase() {
  return (
    <div className="bg-[#080808] overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-4 mb-4">
            <span className="text-xs tracking-[0.3em] text-amber-400/60 uppercase">
              The Work
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white/90 leading-tight">
              Product. Photography.
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Everything in between.
              </span>
            </h2>
            <p className="text-sm text-white/30 max-w-md">
              Six projects across AI, visual art, engineering, and life — each one a different
              lens on the same curiosity.
            </p>
          </div>
        }
      >
        <ShowcaseContent />
      </ContainerScroll>
    </div>
  );
}
