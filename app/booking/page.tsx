"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { RainingBackground } from "@/components/ui/modern-animated-hero-section"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const responsibilities = [
  {
    area: "Product Strategy & Vision",
    body: "Defined the product vision and long-term roadmap for the new Knowledge Management platform. Aligned leadership and stakeholders on priorities, scope, and success metrics across a global organisation.",
  },
  {
    area: "Discovery & User Research",
    body: "Ran user research with frontline agents worldwide to understand pain points, workflows, and knowledge gaps. Translated insights into product requirements and prioritised features by impact.",
  },
  {
    area: "Delivery & Execution",
    body: "Wrote detailed specs, managed the backlog, and led sprint planning. Worked hands-on with design and engineering to shape UX and technical implementation. Led a cross-functional team of 15 across product, design, engineering, and operations.",
  },
  {
    area: "Vendor Partnership",
    body: "Managed external partnership with Pegasystems. Went beyond coordination — actively shaped their product roadmap by providing improvement suggestions for features required at Booking.com's scale.",
  },
]

const objectives = [
  "Reduce Average Handling Time by improving how agents access knowledge",
  "Improve Customer Satisfaction through faster, more accurate resolutions",
  "Ship a new AI-embedded Knowledge Management system built for enterprise scale — 10,000+ agents",
  "Create a foundation for future AI capabilities: journey recommendations, smart suggestions, and expansion to other verticals",
]

const outcomes = [
  {
    n: "9%",
    label: "Reduction in\nHandling Time",
    sub: "Within 3 months of go-live",
  },
  {
    n: "10K+",
    label: "Agents on\nthe platform",
    sub: "Global deployment",
  },
  {
    n: "Live",
    label: "Platform still\nscaling",
    sub: "Expanding to new capabilities",
  },
]

function BookingLogo() {
  return (
    <svg viewBox="0 0 300 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
      <text
        x="0" y="36"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="38"
        fontWeight="800"
        fill="white"
      >Booking</text>
      <text
        x="162" y="36"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="38"
        fontWeight="800"
        fill="#70b8ff"
      >.com</text>
    </svg>
  )
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-violet-400/30 selection:text-violet-200">

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.18]">
        <RainingBackground />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-24">

        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-white/30 hover:text-white/60 transition-colors duration-200"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </Link>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-20">

          {/* ── HEADER ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-violet-400/40" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-violet-400/60">
                AI Products · Booking.com
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] tracking-tight text-white">
              Knowledge at scale<br />
              <span className="text-white/30">for 10,000+ agents</span><br />
              powered by AI.
            </h1>

            <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Booking.com's Customer Service organisation supports over 10,000 agents worldwide. The existing knowledge management system was fragmented — agents struggled to find accurate information quickly, leading to longer handling times and inconsistent customer experiences. I was brought in to lead a ground-up rebuild.
            </p>
          </motion.div>

          {/* ── PROBLEM QUOTE ── */}
          <motion.div variants={fadeUp} className="border border-white/[0.08] bg-white/[0.02] rounded-sm p-8 sm:p-10">
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 mb-5">The problem</div>
            <blockquote className="font-serif text-lg sm:text-xl text-white/80 leading-relaxed italic">
              "Every second of uncertainty in a customer service interaction has a cost — in time, in satisfaction, in trust. The platform needed to be rebuilt from the ground up with AI at its core."
            </blockquote>
          </motion.div>

          {/* ── OUTCOMES ── */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-px bg-white/[0.06]">
            {outcomes.map(({ n, label, sub }) => (
              <div key={n} className="bg-[#080808] px-6 py-8 flex flex-col gap-3">
                <span className="font-serif text-4xl sm:text-5xl text-white leading-none">{n}</span>
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/35 whitespace-pre-line leading-relaxed">{label}</span>
                <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/20 leading-relaxed">{sub}</span>
              </div>
            ))}
          </motion.div>

          {/* ── OBJECTIVES ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">01</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">Objectives</span>
            </div>

            <div className="flex flex-col gap-5">
              {objectives.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-violet-400/50 mt-1 flex-shrink-0">→</span>
                  <p className="text-white/55 leading-relaxed text-sm sm:text-base">{line}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RESPONSIBILITIES ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">02</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">My role</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
              End-to-end ownership.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06]">
              {responsibilities.map((r) => (
                <div key={r.area} className="bg-[#080808] p-6 flex flex-col gap-3">
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-violet-400/60">
                    {r.area}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── WHAT CAME NEXT ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">03</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">What comes next</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
              A foundation, not a finish line.
            </h2>

            <div className="flex flex-col gap-5">
              {[
                "Knowledge recommendations — surfacing relevant articles before the agent even searches.",
                "Smart agent journey suggestions — guiding agents through complex cases step by step.",
                "Expansion to other verticals within the organisation — the same platform, broader reach.",
              ].map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-violet-400/50 mt-1 flex-shrink-0">→</span>
                  <p className="text-white/55 leading-relaxed text-sm sm:text-base">{line}</p>
                </div>
              ))}
            </div>

            <div className="border-l-2 border-violet-400/30 pl-6 py-2">
              <p className="text-white/45 text-sm leading-relaxed italic font-serif">
                Positive agent feedback confirmed improved confidence in finding accurate information. The platform is still live, still scaling, and expanding to new capabilities — that is the measure of real product work.
              </p>
            </div>
          </motion.div>

          {/* ── BUILT AT — BOOKING.COM LOGO LINK ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4 items-start">
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25">Built at</p>
            <a
              href="https://www.booking.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 border border-white/[0.08] hover:border-violet-400/30 bg-white/[0.02] hover:bg-violet-400/5 px-6 py-5 rounded-sm transition-all duration-300"
              aria-label="Visit Booking.com"
            >
              <BookingLogo />
              <span className="text-white/20 group-hover:text-violet-400/60 transition-colors duration-300 text-sm">↗</span>
            </a>
          </motion.div>

          {/* ── FOOTER ── */}
          <motion.div variants={fadeUp} className="flex items-center justify-between border-t border-white/[0.06] pt-8">
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">
              Raghav Gajavelli · Amsterdam
            </div>
            <Link
              href="/"
              className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20 hover:text-white/50 transition-colors"
            >
              raghavgajavelli.com
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </main>
  )
}
