"use client"

import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import {
  ExternalLink,
  Code2,
  ImageIcon,
  Briefcase,
  Mail,
  MapPin,
  Play,
  Camera,
  Cpu,
  PenLine,
  Lock,
  Bike,
  Heart,
  ArrowDown,
  ArrowUpRight,
} from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { RainingBackground, ScrambledName } from "@/components/ui/modern-animated-hero-section"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { CardWithPaths } from "@/components/ui/card-with-paths"
import { NeuralNetIcon, ApertureIcon, WritingIcon, ArchitectureIcon } from "@/components/ui/animated-card-icons"
import { PortraitGallery } from "@/components/portrait-gallery"
import { ScrollShowcase } from "@/components/scroll-showcase"
import { CinematicBreak } from "@/components/cinematic-break"
import { ReelStrip } from "@/components/reel-strip"

// ── data ──────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    year: "2025",
    title: "AI Knowledge Platform",
    category: "Product · AI",
    description:
      "Led the ground-up rebuild of a knowledge management platform for 10,000+ customer service agents. Defined product vision, ran user research, and delivered an AI-embedded system that reduced average handling time by 9% within 3 months.",
    tags: ["Product Strategy", "User Research", "AI", "Pegasystems", "Cross-functional"],
    stats: [
      { label: "Agents served", value: "10,000+" },
      { label: "AHT reduction", value: "9%" },
      { label: "Team size", value: "15" },
    ],
    icon: Cpu,
    color: "from-violet-500/20 to-indigo-500/10",
    accent: "#7c3aed",
    link: null,
  },
  {
    id: 2,
    year: "2025",
    title: "Dog Ears — Substack",
    category: "Writing · Content",
    description:
      "A newsletter on strategic thinking, AI, and personal growth. Writing about the ideas that stick — the ones worth folding over the corner of the page. AI tools, productivity systems, content creation, and lessons from building and failing.",
    tags: ["AI", "Productivity", "Substack", "Systems Thinking"],
    stats: [],
    icon: PenLine,
    color: "from-amber-500/20 to-orange-500/10",
    accent: "#f59e0b",
    link: "https://raghavgajavelli.substack.com/",
  },
  {
    id: 3,
    year: "2024",
    title: "Photography & Art",
    category: "Creative · Visual",
    description:
      "Portraits that reveal character. Travel that captures feeling. Currently planning The Portrait Experience — photographing 10 entrepreneurs across the Netherlands for an exhibition where they meet as strangers connected through portraits.",
    tags: ["Portraits", "Travel", "Vermeer", "Film Photography", "Exhibition"],
    stats: [],
    icon: Camera,
    color: "from-rose-500/20 to-pink-500/10",
    accent: "#f43f5e",
    link: "https://hashtagraghav.com/",
  },
  {
    id: 4,
    year: "2009",
    title: "Visual Cryptography",
    category: "Engineering · Security",
    description:
      "Reviving a college cryptography project because good ideas deserve a second life. Splits a number into two meaningless images — overlay them and the secret appears. Rebuilt with a modern cross-platform GUI using seven-segment display patterns.",
    tags: ["Java", "Cryptography", "Open Source", "Side Project"],
    stats: [],
    icon: Lock,
    color: "from-emerald-500/20 to-teal-500/10",
    accent: "#10b981",
    link: "https://github.com/RaghavGajavelli/segment-visual-cryptography",
  },
  {
    id: 5,
    year: "2018",
    title: "Life in Amsterdam",
    category: "Personal · Story",
    description:
      "Born in Southern India. Amsterdam became home in 2018. Now in Hoofddorp with a wife, two kids, and a dog brought from India. Made a video helping travellers bring pets when moving abroad.",
    tags: ["Amsterdam", "Family", "Immigration", "India"],
    stats: [],
    icon: Heart,
    color: "from-blue-500/20 to-sky-500/10",
    accent: "#3b82f6",
    link: null,
  },
  {
    id: 6,
    year: "2026",
    title: "Motorcycling Europe",
    category: "Adventure · Travel",
    description:
      "Motorcycling is how I move through the world. Less footprint, more connection. Criss-crossed South India on two wheels. Life brought me to the Netherlands before I could go north — 2026 is the year I get back on the bike and ride through Europe.",
    tags: ["Motorcycling", "South India", "Europe", "Adventure"],
    stats: [],
    icon: Bike,
    color: "from-orange-500/20 to-yellow-500/10",
    accent: "#f97316",
    link: null,
  },
]

const skills = [
  "Product Strategy & Roadmaps",
  "AI Prototyping & Automation",
  "Portrait Photography",
  "Visual Storytelling",
  "Creative Copywriting",
  "Content Creation",
  "Figma · Notion · Jira",
  "Adobe Lightroom · Photoshop",
  "n8n · Lovable · Gamma",
]

const testimonials = [
  {
    name: "Manon van Willenswaard",
    role: "Process Manager",
    company: "ING",
    linkedin: "https://www.linkedin.com/in/manonvanwillenswaard/",
    quote:
      "Raghav is a highly knowledgeable and experienced Lead System Architect. He can build the bridge between Business and IT, is easy to work with, and does not hesitate to give his opinion to improve the work. I experienced Raghav as a dedicated and self-motivated individual who takes up responsibilities and never fears a challenge.",
    initials: "MV",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Maria Guider",
    role: "Product Manager",
    company: "Pegasystems",
    linkedin: "https://www.linkedin.com/in/maria-guider-1599214/",
    quote:
      "I have had the pleasure of working with Raghava for 3+ years and am happy to recommend him. He has extensive technical expertise and works well within a team as both a leader and as a member. He has a very courteous and professional demeanor and manages his work most efficiently.",
    initials: "MG",
    color: "from-violet-400 to-purple-500",
  },
]

const socials = [
  { icon: Mail, label: "Email", href: "mailto:raghavgajavelli@gmail.com" },
  { icon: Briefcase, label: "LinkedIn", href: "https://www.linkedin.com/in/raghav-gajavelli/" },
  { icon: ImageIcon, label: "Instagram", href: "https://www.instagram.com/raghavgajavelli/" },
  { icon: Play, label: "YouTube", href: "https://www.youtube.com/@RaghavGajavelli" },
  { icon: Code2, label: "GitHub", href: "https://github.com/RaghavGajavelli" },
]

// ── animation variants ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] as [number, number, number, number] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ── components ────────────────────────────────────────────────────────────────

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }}
    />
  )
}

// ── page ──────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null)
  const rainLayerRef = useRef<HTMLDivElement>(null)
  const robotLayerRef = useRef<HTMLDivElement>(null)
  const nameLayerRef = useRef<HTMLDivElement>(null)

  // Parallax tilt for mobile — gyroscope moves each layer at a different depth speed
  useEffect(() => {
    if (typeof window === "undefined" || !("ontouchstart" in window)) return
    let curX = 0, curY = 0, tgtX = 0, tgtY = 0, raf: number

    const onOrientation = (e: DeviceOrientationEvent) => {
      tgtX = Math.max(-1, Math.min(1, (e.gamma ?? 0) / 25))
      tgtY = Math.max(-1, Math.min(1, ((e.beta ?? 45) - 45) / 25))
    }

    const tick = () => {
      curX += (tgtX - curX) * 0.07
      curY += (tgtY - curY) * 0.07
      if (rainLayerRef.current)
        rainLayerRef.current.style.transform = `translate(${curX * 5}px, ${curY * 3}px)`
      if (robotLayerRef.current)
        robotLayerRef.current.style.transform = `translate(${curX * 18}px, ${curY * 12}px)`
      if (nameLayerRef.current)
        nameLayerRef.current.style.transform = `translate(${curX * 3}px, ${curY * 2}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("deviceorientation", onOrientation, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("deviceorientation", onOrientation)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-amber-400/30 selection:text-amber-200">
      <GrainOverlay />

      {/* ── HERO — sticky so robot stays visible as work section rises over it ── */}
      {/* NOTE: overflow-hidden cannot be on the sticky element itself — breaks sticky in all browsers */}
      {/* Clipping is handled by the inner overflow-hidden wrapper div instead */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen bg-[#080808] sticky top-0 z-0"
      >
        {/* Clip wrapper — keeps raining letters + robot inside hero bounds */}
        <div className="absolute inset-0 overflow-hidden">

        {/* Layer 0 — raining letters */}
        <div ref={rainLayerRef} className="absolute inset-0" style={{ willChange: "transform" }}>
          <RainingBackground />
        </div>

        {/* Layer 1 — Spline robot, right half */}
        {/* Static wrapper shifts robot up on mobile; tilt ref sits inside so transforms don't conflict */}
        <div className="absolute inset-0 z-10 -translate-y-[10%] sm:translate-y-0">
          <div ref={robotLayerRef} className="w-full h-full" style={{ willChange: "transform" }}>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Fade robot left edge so it blends with letters */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#080808] via-[#080808]/50 to-transparent" />
        {/* Bottom fade — tall so raining letters dissolve gradually */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-80 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent pointer-events-none" />

        {/* Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        </div>{/* ── end clip wrapper ── */}

        {/* Layer 3 — scrambled name, bottom-left */}
        <div
          ref={nameLayerRef}
          className="absolute bottom-32 left-4 sm:bottom-14 sm:left-8 md:bottom-20 md:left-16 lg:left-24 z-30"
          style={{ willChange: "transform" }}
        >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex flex-col gap-3 sm:gap-4"
        >
          {/* eyebrow */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-px w-5 sm:w-8 bg-amber-400/40" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.35em] text-amber-400/50 uppercase">
              Tech × Creativity × Human Story
            </span>
          </div>

          {/* Scrambled name — large */}
          <div className="text-[1.9rem] sm:text-4xl md:text-6xl lg:text-7xl leading-none">
            <ScrambledName />
          </div>

          {/* Mobile-only: compact social icons below name */}
          <div className="flex items-center gap-2 sm:hidden mt-1">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.18] text-white/45 active:text-amber-400/80 transition-all duration-200"
              >
                <Icon className="h-3 w-3" />
              </a>
            ))}
          </div>

          {/* Scroll cue — hidden on mobile */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-4 sm:mt-6 text-white/20 hidden sm:block"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
        </div>

        {/* ── Contact — bottom-right, tablet/desktop only ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="hidden sm:flex absolute bottom-8 sm:bottom-10 right-6 sm:right-8 md:right-16 lg:right-24 z-30 flex-col items-center gap-4 sm:gap-5"
        >
          {/* Button with ambient amber glow behind it */}
          <div className="relative h-[56px] sm:h-[64px] w-[180px] sm:w-[200px]">
            {/* Glow bloom — sits behind the button */}
            <div
              className="absolute inset-0 rounded-full blur-xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.22) 0%, transparent 70%)" }}
            />
            <LiquidButton
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-white"
              onClick={() => { window.location.href = "mailto:raghavgajavelli@gmail.com" }}
            >
              Get in Touch
            </LiquidButton>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/[0.18] text-white/45 hover:text-amber-400/80 hover:border-amber-400/30 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)] transition-all duration-300 hover:scale-110"
              >
                <Icon className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SCROLL SHOWCASE — z-10 rises over sticky hero ── */}
      <section className="relative z-10 bg-[#080808]">
        {/* Raining background — clipped inside its own overflow-hidden wrapper */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35">
          <RainingBackground />
        </div>
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center gap-3 pb-3 sm:pb-5 px-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-6 sm:w-8 bg-amber-400/40" />
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] text-amber-400/50 uppercase">
                  The Work
                </span>
                <div className="h-px w-6 sm:w-8 bg-amber-400/40" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-[1.15] tracking-tight text-center">
                Systems. Stories.{" "}
                <span className="text-white/25">Built to last.</span>
              </h2>
            </div>
          }
        >
          {/* ── Card interior — 2×2 work grid ── */}
          <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-px bg-white/[0.04]">
            {/* Brand palette — amber #f59e0b | violet #818cf8 | silver #94a3b8 */}
            {[
              {
                eyebrow: "AI Products",
                title: "Booking.com",
                stat: "10,000+ agents",
                description: "Design AI Products at Booking.com — 10,000+ agents, real outcomes. Enterprise scale, human design.",
                icon: Cpu,
                accent: "#818cf8",
                href: "https://www.booking.com",
                animatedIcon: <NeuralNetIcon gradientId="nn" from="#818cf8" to="#94a3b8" size={60} />,
              },
              {
                eyebrow: "Advisory",
                title: "Digital Transformation",
                stat: "AI Strategy · Product Design",
                description: "Helping organisations navigate AI and digital transformation. 18 years of marketplace and systems experience. Clear thinking, no agenda.",
                icon: Briefcase,
                accent: "#f59e0b",
                href: "/advisory",
                animatedIcon: <ApertureIcon gradientId="ap2" from="#f59e0b" to="#94a3b8" size={60} />,
              },
              {
                eyebrow: "Writing",
                title: "Enough is Enough",
                stat: "Substack newsletter",
                description: "AI, systems, and clarity for people done waiting. One system per week. No fluff. Real tools from a Product Thinker who has shipped at scale.",
                icon: PenLine,
                accent: "#94a3b8",
                href: "https://raghavgajavelli.substack.com/",
                animatedIcon: <WritingIcon gradientId="wr" from="#f59e0b" to="#818cf8" size={60} />,
              },
              {
                eyebrow: "Architecture",
                title: "System Design",
                stat: "17+ years",
                description: "17 years designing complex systems across enterprise. Bridge between business and engineering. Built to last, not to impress.",
                icon: Briefcase,
                accent: "#818cf8",
                href: "https://www.linkedin.com/in/raghav-gajavelli/",
                animatedIcon: <ArchitectureIcon gradientId="ar" from="#94a3b8" to="#f59e0b" size={60} />,
              },
            ].map((item) => (
              <CardWithPaths
                key={item.title}
                {...item}
                onViewClick={() => {}}
              />
            ))}
          </div>
        </ContainerScroll>
      </section>
    </main>
  )
}
