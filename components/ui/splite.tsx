'use client'

import { Suspense, lazy, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineWithFade({ scene, className }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Placeholder — subtle amber pulse while loading, fades out when robot arrives */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="placeholder"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-32 h-32 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot — fades in once Spline signals it's ready */}
      <motion.div
        className={className}
        style={{ width: "100%", height: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Spline
          scene={scene}
          className={className}
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
    </>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className="relative w-full h-full">
      <Suspense fallback={null}>
        <SplineWithFade scene={scene} className={className} />
      </Suspense>
    </div>
  )
}
