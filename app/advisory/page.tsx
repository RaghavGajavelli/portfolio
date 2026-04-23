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

const challenges = [
  {
    n: "01",
    title: "Getting Users To Come Back",
    body: "Most digital products get first-time adoption. Very few earn the second interaction. The gap between a one-time user and a loyal one is not marketing. It is product design and timing.",
    insight: "I know what closes this gap.",
  },
  {
    n: "02",
    title: "Standing Out In A Crowded Market",
    body: "Every competitor is saying the same things. The organisations that win say something different and mean it at every touchpoint of the product.",
    insight: "I know how to find that difference.",
  },
  {
    n: "03",
    title: "Using AI Without Wasting Money",
    body: "Every organisation is being sold AI solutions right now. Most are expensive, slow to implement, and solve the wrong problem. Knowing which ones actually move the needle requires deep pattern recognition.",
    insight: "I have that pattern recognition.",
  },
  {
    n: "04",
    title: "Building Products That Earn Trust",
    body: "In any service business, trust is the product. The platform needs to make people feel safe before they commit, during the experience, and after it ends. Most products miss at least two of those three moments.",
    insight: "I know exactly where those moments are.",
  },
]

const arrangement = [
  {
    title: "Weekly Strategy Session",
    body: "One focused session per week. Max 60 minutes. Prepared with specific input every time. No filler.",
  },
  {
    title: "Direct Access",
    body: "Quick questions, gut checks, and fast honest feedback between sessions when it matters.",
  },
  {
    title: "Quarterly Review",
    body: "One in-depth strategic review every quarter. Direction, priorities, and honest assessment of what is and is not working.",
  },
  {
    title: "Advisory Only",
    body: "Strategy and direction is my responsibility. Execution stays entirely with your team. No overlap, no confusion.",
  },
]

export default function AdvisoryPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-amber-400/30 selection:text-amber-200">

      {/* Raining background — very subtle */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.18]">
        <RainingBackground />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-24">

        {/* Back link */}
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
              <div className="h-px w-8 bg-amber-400/40" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-400/60">
                Advisory
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] tracking-tight text-white">
              Digital transformation<br />
              <span className="text-white/30">and AI strategy</span><br />
              that actually works.
            </h1>

            <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              I work with a small number of organisations as a strategic advisor. Not as a consultant with a deck. As someone who has built and shipped at scale and will always tell you the truth.
            </p>
          </motion.div>

          {/* ── INTENTION QUOTE ── */}
          <motion.div variants={fadeUp} className="border border-white/[0.08] bg-white/[0.02] rounded-sm p-8 sm:p-10">
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 mb-5">The intention</div>
            <blockquote className="font-serif text-lg sm:text-xl text-white/80 leading-relaxed italic">
              "I want to help you build something great. Not as an employee. As someone who genuinely cares about your success and will always tell you the truth. You can build this without me. But the difference between a product that survives and one that scales is usually one or two right ideas at the start. That is exactly where I add value."
            </blockquote>
          </motion.div>

          {/* ── STATS ── */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-px bg-white/[0.06]">
            {[
              { n: "18", label: "Years building\ndigital products" },
              { n: "2", label: "Sided marketplace\nglobal scale" },
              { n: "AI", label: "Strategy & growth\nimplementation" },
            ].map(({ n, label }) => (
              <div key={n} className="bg-[#080808] px-6 py-8 flex flex-col gap-3">
                <span className="font-serif text-4xl sm:text-5xl text-white leading-none">{n}</span>
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/35 whitespace-pre-line leading-relaxed">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── WHY ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">01</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">Why this is different</span>
            </div>

            <div className="flex flex-col gap-5">
              {[
                "Most digital transformations fail not because of technology. They fail because the people advising had never actually shipped a product at scale. I have. 18 years across enterprise systems, two-sided marketplaces, and AI products used by tens of thousands of people.",
                "Most advisors have seen one side of the problem. I have lived inside the mechanics of both supply and demand simultaneously, understanding where they break, where they grow, and what makes users stay.",
                "AI is no longer optional for any competitive business. It is the difference between a product that feels generic and one that feels like it knows you. I know where AI creates real value and where it is expensive noise. That distinction alone saves months of wasted investment.",
                "I bring no agenda, no internal politics, no fear of telling you something uncomfortable. That is rarer than any technical skill.",
              ].map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-amber-400/50 mt-1 flex-shrink-0">→</span>
                  <p className="text-white/55 leading-relaxed text-sm sm:text-base">{line}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── CHALLENGES ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">02</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">Where I change outcomes</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
              The problems I am built to solve.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06]">
              {challenges.map((c) => (
                <div key={c.n} className="bg-[#080808] p-6 flex flex-col gap-4">
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber-400/50">
                    Challenge {c.n}
                  </div>
                  <h3 className="text-white font-medium text-base leading-snug">{c.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed flex-1">{c.body}</p>
                  <div className="flex items-center gap-2 border-t border-white/[0.06] pt-4">
                    <span className="text-amber-400/60 text-xs">→</span>
                    <span className="text-white/60 text-sm font-medium">{c.insight}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── ARRANGEMENT ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">03</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">How this works</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
              The arrangement.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06]">
              {arrangement.map((a) => (
                <div key={a.title} className="bg-[#080808] p-6 flex flex-col gap-3">
                  <h3 className="text-white font-medium text-base">{a.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{a.body}</p>
                </div>
              ))}
            </div>

            <div className="border-l-2 border-amber-400/30 pl-6 py-2">
              <p className="text-white/45 text-sm leading-relaxed italic font-serif">
                My commitment is to deliver clear, honest, actionable thinking at every session. What your team does with that thinking is their responsibility. Results depend on execution, which sits entirely with your organisation.
              </p>
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <p className="text-white/40 text-sm">
              I work with a small number of organisations at a time. If you think there is a fit, reach out directly.
            </p>
            <a
              href="mailto:raghavgajavelli@gmail.com"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-amber-400/70 hover:text-amber-400 border border-amber-400/20 hover:border-amber-400/50 px-5 py-3 rounded-full transition-all duration-200 self-start hover:bg-amber-400/5"
            >
              Get in touch →
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
