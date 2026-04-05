import { useState } from "react"
import { motion } from "framer-motion"

function StayWithMe({ onNext }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const moveNo = () => {
    // Calculate a safe range based on the window size to keep the button visible
    // We subtract a margin (100px) so it doesn't touch the very edges
    const safeWidth = (window.innerWidth / 2) - 100
    const safeHeight = (window.innerHeight / 2) - 100

    const x = (Math.random() - 0.5) * (safeWidth * 2)
    const y = (Math.random() - 0.5) * (safeHeight * 2)

    setPosition({ x, y })
  }

  return (
    // Removed 'overflow-hidden' from the parent div so the button doesn't get clipped
    <div className="h-screen w-full flex flex-col items-center justify-center text-center relative bg-transparent px-4">
      
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl text-pink-400 mb-12 font-serif z-10 pointer-events-none"
      >
        Bhavika ❤️ <br /> Will you always stay with me?
      </motion.h1>

      <div className="flex gap-12 relative items-center justify-center min-h-[100px]">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-pink-500 text-white rounded-full shadow-lg z-20 font-bold hover:scale-110 transition-transform"
        >
          Yes 💖
        </button>

        <motion.button
          onMouseEnter={moveNo}
          onClick={moveNo}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          // z-50 ensures the button stays above the stars and other elements
          className="px-8 py-3 bg-gray-600 text-white rounded-full shadow-lg font-bold absolute z-50 whitespace-nowrap"
        >
          No 😜
        </motion.button>
      </div>
    </div>
  )
}

export default StayWithMe