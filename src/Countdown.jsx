import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function Countdown({ onNext }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set target date: April 27, 2026, 00:00:00
    const targetDate = new Date("April 18, 2026 18:43:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        clearInterval(timer)
        onNext() // Automatically move to the next page when time is up
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [onNext])

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl text-pink-400 font-serif mb-8"
      >
        Something Special is Coming 💖
      </motion.h1>

      <div className="flex gap-4 md:gap-8">
        {Object.entries(timeLeft).map(([label, value]) => (
          <motion.div key={label} className="flex flex-col items-center">
            <motion.span
              key={value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold text-white"
            >
              {value}
            </motion.span>
            <span className="text-xs md:text-sm uppercase tracking-widest text-pink-200 mt-2">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Countdown
