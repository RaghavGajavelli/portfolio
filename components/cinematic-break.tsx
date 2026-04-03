"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

export function CinematicBreak() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: false, margin: "-20%" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  // Play/pause tied to visibility
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [inView])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "85vh" }}
    >
      {/* Video with parallax scale */}
      <motion.div style={{ scale }} className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src="/video/intro-landscape.mp4"
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
      </motion.div>

      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[8%] bg-black z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black z-10 pointer-events-none" />

      {/* Film grain */}
      <div
        className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Dark vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />

      {/* Fade in/out with scroll */}
      <motion.div style={{ opacity }} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        {/* Top label */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-white/20" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">Amsterdam · 52.3080° N</span>
          <div className="h-px w-12 bg-white/20" />
        </motion.div>

        {/* Main quote */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-2xl md:text-4xl font-light text-white/80 max-w-2xl leading-relaxed px-8"
        >
          Less footprint.{" "}
          <span className="italic text-white/50">More connection.</span>
        </motion.p>

        {/* Bottom — film timecode style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-[12%] left-6 font-mono text-[9px] text-white/20 tracking-widest"
        >
          RG · 2024 · AMSTERDAM
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-[12%] right-6 font-mono text-[9px] text-white/20 tracking-widest"
        >
          00:00:00:00 → 00:00:17:00
        </motion.div>
      </motion.div>

      {/* Seamless fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent z-30 pointer-events-none" />
    </section>
  )
}
