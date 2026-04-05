import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { useEffect } from "react"

function FinalPage() {
  useEffect(() => {
    const duration = 5 * 1000
    const end = Date.now() + duration
    const frame = () => {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 } })
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 } })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* This container slides UP to make room for the stars */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -150 }} // Moves up by 150 pixels
        transition={{ delay: 4, duration: 3, ease: "easeInOut" }}
        className="text-center z-10 px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl text-pink-400 mb-6 font-serif"
        >
          Happy Birthday Bhavika 🎉💖
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-lg max-w-md text-pink-100/90"
        >
          You make my life brighter, my heart happier, and my world more beautiful.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-xl text-pink-300 italic"
        >
          Forever Yours, Priyank 💖
        </motion.h2>
      </motion.div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/40 text-xl"
            initial={{ y: "110vh", x: `${Math.random() * 100}vw` }}
            animate={{ y: "-10vh" }}
            transition={{ duration: 8, repeat: Infinity, delay: Math.random() * 5 }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FinalPage