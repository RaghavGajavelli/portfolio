"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Volume2, VolumeX } from "lucide-react"

interface ReelCardProps {
  src: string
  label: string
  sublabel: string
  delay?: number
}

function ReelCard({ src, label, sublabel, delay = 0 }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const inView = useInView(cardRef, { once: false, margin: "-10%" })

  // Autoplay when in view
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView) {
      v.play().catch(() => {})
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }, [inView])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ scale: 1.02 }}
      className="relative flex-1 min-w-0 max-w-[320px] mx-auto md:mx-0"
    >
      {/* Phone-style frame */}
      <div className="relative rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-black shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        style={{ aspectRatio: "9/16" }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px",
          }}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* Play state indicator (top-right) */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Play className="h-5 w-5 text-white ml-1" />
            </div>
          </div>
        )}

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white/90 transition-colors z-10"
        >
          {muted
            ? <VolumeX className="h-3.5 w-3.5" />
            : <Volume2 className="h-3.5 w-3.5" />
          }
        </button>

        {/* REC dot */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-[9px] text-white/40 tracking-widest">REC</span>
        </div>

        {/* Bottom label inside video */}
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <p className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-1">{sublabel}</p>
          <p className="text-sm font-medium text-white/80">{label}</p>
        </div>
      </div>

      {/* Reflection glow beneath */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-2xl bg-amber-400/5 rounded-full" />
    </motion.div>
  )
}

export function ReelStrip() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: "-10%" })

  return (
    <section className="relative bg-[#080808] overflow-hidden py-24 px-6">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-amber-500/[0.03] blur-[100px]" />

      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          ref={headRef}
          className="mb-14 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.3em] text-amber-400/60 uppercase">Behind the lens</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 tracking-tight">
            The reels
          </h2>
          <p className="text-sm text-white/30 max-w-sm leading-relaxed">
            Shot in Amsterdam. Edited for feeling, not perfection.
          </p>
        </motion.div>

        {/* Two portrait reels + landscape Amsterdam */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] gap-6 items-start">
          <ReelCard
            src="/video/intro-portrait-1.mp4"
            label="Urban Portrait"
            sublabel="Amsterdam · 2024"
            delay={0}
          />
          <ReelCard
            src="/video/intro-portrait-2.mp4"
            label="Brand Reel"
            sublabel="Raghav Gajavelli"
            delay={0.12}
          />

          {/* Amsterdam landscape video — wider slot */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-col gap-4 self-center"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              style={{ aspectRatio: "16/9" }}
            >
              <AmsterdamVideoCard />
            </div>

            {/* Caption below */}
            <div className="flex flex-col gap-1 px-1">
              <p className="font-mono text-[9px] text-white/25 tracking-widest uppercase">Life in Amsterdam · 2018 →</p>
              <p className="text-sm text-white/60">Home. Family. Two kids. One dog from India.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AmsterdamVideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: "-10%" })
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView])

  return (
    <div ref={ref} className="relative w-full h-full">
      <video
        ref={videoRef}
        src="/video/amsterdam.mp4"
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Mute */}
      <button
        onClick={() => {
          const v = videoRef.current
          if (!v) return
          v.muted = !v.muted
          setMuted(v.muted)
        }}
        className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white/80 transition-colors z-10"
      >
        {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
      </button>

      {/* Bottom text */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">Hoofddorp, Netherlands</span>
      </div>
    </div>
  )
}
