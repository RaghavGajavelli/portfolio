"use client"

import { useState, useEffect, useCallback, useRef } from "react"

// ── Text scramble engine ──────────────────────────────────────────────────────

class TextScramble {
  el: HTMLElement
  chars: string
  queue: Array<{ from: string; to: string; start: number; end: number; char?: string }>
  frame: number
  frameRequest: number
  resolve: (v: void | PromiseLike<void>) => void

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = "!<>-_\\/[]{}—=+*^?#@~"
    this.queue = []
    this.frame = 0
    this.frameRequest = 0
    this.resolve = () => {}
    this.update = this.update.bind(this)
  }

  setText(newText: string) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => (this.resolve = resolve))
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""
      const to = newText[i] || ""
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ""
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)]
          this.queue[i].char = char
        }
        output += `<span class="scramble-dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
}

// ── Scrambled name display ────────────────────────────────────────────────────

const PHRASES = [
  "RAGHAV GAJAVELLI",
  "PRODUCT × SYSTEMS",
  "PHOTOGRAPHY × STORY",
  "AMSTERDAM · NL",
  "DESIGN THINKING",
  "RAGHAV GAJAVELLI",
]

export function ScrambledName() {
  const elRef = useRef<HTMLDivElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (elRef.current && !scramblerRef.current) {
      scramblerRef.current = new TextScramble(elRef.current)
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted || !scramblerRef.current) return
    let counter = 0
    let cancelled = false

    const next = () => {
      if (cancelled || !scramblerRef.current) return
      scramblerRef.current.setText(PHRASES[counter]).then(() => {
        if (!cancelled) setTimeout(next, counter === 0 ? 3000 : 1800)
      })
      counter = (counter + 1) % PHRASES.length
    }
    next()
    return () => { cancelled = true }
  }, [mounted])

  return (
    <div
      ref={elRef}
      className="font-mono font-black tracking-[0.08em] text-white/90 select-none leading-none"
      style={{ fontFamily: "monospace" }}
    >
      RAGHAV GAJAVELLI
    </div>
  )
}

// ── Raining characters background ────────────────────────────────────────────

interface Char {
  char: string
  x: number
  y: number
  speed: number
  size: number
  opacity: number
}

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?RAGHAV"

function randomChar() {
  return POOL[Math.floor(Math.random() * POOL.length)]
}

export function RainingBackground() {
  const [chars, setChars] = useState<Char[]>([])
  const [hot, setHot] = useState<Set<number>>(new Set())

  const init = useCallback((): Char[] =>
    Array.from({ length: 220 }, () => ({
      char: randomChar(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.06 + Math.random() * 0.18,
      size: 0.7 + Math.random() * 0.9,
      opacity: 0.03 + Math.random() * 0.09,
    })),
  [])

  useEffect(() => { setChars(init()) }, [init])

  // Flicker a handful of chars amber
  useEffect(() => {
    if (chars.length === 0) return
    const id = setInterval(() => {
      const next = new Set<number>()
      const count = 2 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        next.add(Math.floor(Math.random() * chars.length))
      }
      setHot(next)
    }, 60)
    return () => clearInterval(id)
  }, [chars.length])

  // Fall animation
  useEffect(() => {
    if (chars.length === 0) return
    let raf: number
    const tick = () => {
      setChars(prev =>
        prev.map(c => {
          const ny = c.y + c.speed
          if (ny > 105) {
            return { ...c, y: -5, x: Math.random() * 100, char: randomChar() }
          }
          return { ...c, y: ny }
        })
      )
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [chars.length])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {chars.map((c, i) => {
        const isHot = hot.has(i)
        return (
          <span
            key={i}
            className="absolute font-mono leading-none select-none"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              fontSize: `${c.size}rem`,
              color: isHot ? "#f59e0b" : "#ffffff",
              opacity: isHot ? 0.7 : c.opacity,
              textShadow: isHot
                ? "0 0 8px rgba(245,158,11,0.8), 0 0 20px rgba(245,158,11,0.3)"
                : "none",
              transform: "translate(-50%, -50%)",
              transition: "color 0.08s, opacity 0.08s, text-shadow 0.08s",
              willChange: "top",
            }}
          >
            {c.char}
          </span>
        )
      })}
      {/* Global dud style for scrambler */}
      <style>{`.scramble-dud { color: #f59e0b; opacity: 0.75; }`}</style>
    </div>
  )
}
