import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import popSound from "./assets/pop.mp3"

const words = [
  "Every", "Moment", "With", "You", "Feels", "Special",
  "Happy", "Birthday", "My", "Love", "Bhavika", "❤️"
]

function Balloons({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0)
  const [poppedIndices, setPoppedIndices] = useState(new Set())
  const audioRef = useRef(new Audio(popSound))

  // Fix: Use viewport percentages (vw) to ensure balloons spread across any screen size
  const balloonData = useRef(
    words.map(() => ({
      left: Math.random() * 80 + 10, // Keeps balloons between 10% and 90% of screen width
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
      color: ["#f472b6", "#fb7185", "#f43f5e", "#ec4899"][Math.floor(Math.random() * 4)]
    }))
  )

  const popBalloon = (index) => {
    if (poppedIndices.has(index)) return // Fix: Prevents repeating words if same balloon is clicked

    audioRef.current.currentTime = 0
    audioRef.current.play()

    setPoppedIndices(prev => new Set(prev).add(index))
    setPoppedCount(prev => prev + 1)

    // Check if all balloons are popped
    if (poppedCount + 1 === words.length) {
      setTimeout(() => onNext(), 3000)
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
      
      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-10 text-xl md:text-2xl text-pink-400 font-light tracking-widest z-20 text-center px-4"
      >
        POP THE FLOATING WISHES
      </motion.h1>

      {/* Balloons Container */}
      <div className="absolute inset-0 z-10">
        <AnimatePresence>
          {words.map((_, i) => (
            !poppedIndices.has(i) && (
              <motion.div
                key={i}
                onClick={() => popBalloon(i)}
                className="absolute cursor-pointer select-none pointer-events-auto"
                initial={{ y: "110vh", x: `${balloonData.current[i].left}vw` }}
                animate={{ 
                  y: "-20vh", // Floats all the way to the top
                  x: [`${balloonData.current[i].left}vw`, `${balloonData.current[i].left + 3}vw`, `${balloonData.current[i].left}vw`]
                }}
                transition={{
                  y: { duration: 12, repeat: Infinity, ease: "linear", delay: balloonData.current[i].delay },
                  x: { duration: balloonData.current[i].duration, repeat: Infinity, ease: "easeInOut" }
                }}
                exit={{ scale: 0, opacity: 0 }}
              >
                {/* Visual Balloon Shape */}
                <div 
                  className="w-12 h-16 md:w-16 md:h-20 rounded-full relative shadow-lg"
                  style={{ backgroundColor: balloonData.current[i].color }}
                >
                  <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px]" style={{ borderBottomColor: balloonData.current[i].color }} />
                  <div className="absolute top-4 left-3 w-3 h-5 bg-white/20 rounded-full rotate-[30deg]" />
                </div>
                {/* String */}
                <div className="w-[1px] h-24 bg-white/20 mx-auto" />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Fix: Centered Message Display */}
      <div className="z-20 flex flex-wrap justify-center items-center gap-2 md:gap-4 px-8 text-center max-w-3xl">
        <AnimatePresence>
          {words.slice(0, poppedCount).map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              className={`text-2xl md:text-5xl font-serif font-bold drop-shadow-lg ${
                word === "❤️" ? "text-red-500" : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-10 text-pink-300/40 text-xs font-mono uppercase tracking-[0.3em]">
        {poppedCount} / {words.length} collected
      </div>
    </div>
  )
}

export default Balloons