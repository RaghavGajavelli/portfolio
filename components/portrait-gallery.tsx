"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"

/* ── tiny helpers ── */
function MetaTag({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="inline-block rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] tracking-widest text-white/40 backdrop-blur-sm uppercase"
    >
      {children}
    </motion.span>
  )
}

function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)",
        backgroundSize: "100% 3px",
      }}
    />
  )
}

function GrainLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }}
    />
  )
}

/* ── curtain reveal ── */
function PortraitReveal({
  src,
  alt,
  className,
  delay = 0,
}: {
  src: string
  alt: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Curtain that lifts */}
      <motion.div
        className="absolute inset-0 z-30 bg-[#080808] origin-bottom"
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Image */}
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.12 }}
        animate={inView ? { scale: 1 } : { scale: 1.12 }}
        transition={{ duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </motion.div>
      <ScanlineOverlay />
      <GrainLayer />
    </div>
  )
}

/* ── floating annotation ── */
function FloatingAnnotation({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-5%" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={`absolute z-40 ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* ── main export ── */
export function PortraitGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax offsets
  const y1 = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"])

  const textRef = useRef<HTMLDivElement>(null)
  const textInView = useInView(textRef, { once: true, margin: "-15%" })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] py-24 px-6"
    >
      {/* Ambient amber glow — bottom left */}
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-500/[0.04] blur-[100px]" />

      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.p
          ref={textRef}
          initial={{ opacity: 0, y: 12 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-xs tracking-[0.3em] text-amber-400/60 uppercase"
        >
          The Human Behind the Work
        </motion.p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-4">

          {/* ── Portrait A: B&W contemplative ── */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <motion.div style={{ y: y1 }} className="relative h-[520px] md:h-[640px]">
              <PortraitReveal
                src="/portraits/portrait-593.jpg"
                alt="Raghav Gajavelli — contemplative portrait"
                className="h-full w-full rounded-2xl"
                delay={0.1}
              />

              {/* Amber edge glow on hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 hover:opacity-100"
                style={{ boxShadow: "inset 0 0 60px rgba(245,158,11,0.08), 0 0 40px rgba(245,158,11,0.06)" }}
              />

              {/* Annotation — coordinates */}
              <FloatingAnnotation className="bottom-6 left-6" delay={1.0}>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-white/30 tracking-widest">52.3080° N · 4.6868° E</span>
                  <span className="font-mono text-[9px] text-amber-400/50 tracking-widest">HOOFDDORP · NL</span>
                </div>
              </FloatingAnnotation>

              {/* Annotation — top right tag */}
              <FloatingAnnotation className="top-5 right-5" delay={1.2}>
                <div className="rounded-sm border border-white/[0.08] bg-black/60 px-2.5 py-1.5 backdrop-blur-md">
                  <span className="font-mono text-[9px] text-white/30 block tracking-widest">PORTRAIT</span>
                  <span className="font-mono text-[9px] text-white/20 block tracking-widest">© RAGHAV GAJAVELLI</span>
                </div>
              </FloatingAnnotation>
            </motion.div>

            {/* Caption block */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-2 px-1"
            >
              <p className="text-sm text-white/60 leading-relaxed">
                Senior PM by day. The thinking never stops — it just changes medium.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <MetaTag delay={0.5}>Product Strategy</MetaTag>
                <MetaTag delay={0.6}>AI Systems</MetaTag>
              </div>
            </motion.div>
          </div>

          {/* ── Right column: text block + portrait B ── */}
          <div className="md:col-span-7 flex flex-col gap-4">

            {/* Pull quote */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 flex flex-col gap-6"
            >
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/70">
                &ldquo;I believe great products should feel{" "}
                <span className="text-amber-400/80">effortless</span> — and the
                process of building them should be just as{" "}
                <span className="text-amber-400/80">rewarding</span>.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-xs text-white/25 tracking-widest uppercase">Raghav Gajavelli</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/[0.05]">
                {[
                  { n: "10K+", label: "Agents impacted" },
                  { n: "9%", label: "AHT reduction" },
                  { n: "7+", label: "Years building" },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col gap-0.5"
                  >
                    <span className="text-2xl font-bold text-amber-400/80">{s.n}</span>
                    <span className="text-xs text-white/25">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Portrait B — color, direct stare */}
            <motion.div style={{ y: y2 }} className="relative h-[380px] md:h-[460px]">
              <PortraitReveal
                src="/portraits/portrait-689.jpg"
                alt="Raghav Gajavelli — direct portrait"
                className="h-full w-full rounded-2xl"
                delay={0.3}
              />

              {/* Role badge */}
              <FloatingAnnotation className="top-5 left-5" delay={1.3}>
                <div className="flex flex-col gap-1.5">
                  <span className="inline-block rounded-full bg-amber-400/10 border border-amber-400/20 px-3 py-1 text-[10px] font-medium text-amber-400/80 tracking-widest uppercase backdrop-blur-sm">
                    Amsterdam · 2018 →
                  </span>
                </div>
              </FloatingAnnotation>

              {/* Bottom overlay with descriptors */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 1.4 }}
                className="absolute bottom-0 left-0 right-0 z-40 rounded-b-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-5"
              >
                <p className="text-xs text-white/30 mb-2 tracking-widest uppercase">Also known as</p>
                <div className="flex flex-wrap gap-2">
                  {["Photographer", "Motorcyclist", "Writer", "Builder"].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 1.5 + i * 0.08 }}
                      className="text-xs text-white/50 border border-white/[0.1] rounded-full px-3 py-1"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Vertical text — right edge */}
              <FloatingAnnotation className="top-1/2 right-4 -translate-y-1/2" delay={1.5}>
                <span
                  className="font-mono text-[9px] text-white/15 tracking-[0.4em] uppercase"
                  style={{ writingMode: "vertical-rl" }}
                >
                  Southern India · Amsterdam
                </span>
              </FloatingAnnotation>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
