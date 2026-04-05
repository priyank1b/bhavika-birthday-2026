import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

function LoveMeter({ onNext }) {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentReason, setCurrentReason] = useState("Click to analyze our bond...");

  const reasons = [
    "Analyzing our late-night talks...",
    "Measuring your beautiful smile...",
    "Calculating the warmth of your hugs...",
    "Scanning 1.2 million inside jokes...",
    "Result: Beyond system limits...",
    "Almost there..."
  ];

  const startMeter = () => {
    if (started) return;
    setStarted(true);
    let value = 0;

    const interval = setInterval(() => {
      if (value < 50) value += Math.random() * 6; 
      else if (value < 85) value += Math.random() * 2;
      else if (value < 99) value += 0.1; // Pure suspense
      else {
        value = 100;
        clearInterval(interval);
        setFinished(true);
      }
      
      // Update the reason text based on progress
      const index = Math.min(Math.floor((value / 100) * reasons.length), reasons.length - 1);
      setCurrentReason(reasons[index]);
      
      setProgress(value);
    }, 100);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 overflow-hidden">
      
      {/* Background Glow Effect - Intensifies as progress increases */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(2,6,23,1) 70%)`,
          opacity: progress / 100 
        }}
      />

      <motion.div
        animate={{ scale: started ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="mb-8 z-10"
      >
        <Heart 
          size={64} 
          fill={progress > 0 ? "#f472b6" : "none"} 
          className="text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" 
        />
      </motion.div>

      <h1 className="text-2xl font-light text-pink-200 mb-10 tracking-widest uppercase z-10">
        {finished ? "Calculation Complete" : "Love Resonance"}
      </h1>

      {/* Elegant Progress Bar */}
      <div className="relative w-[80vw] max-w-md h-3 bg-gray-900/50 rounded-full overflow-hidden border border-pink-500/20 z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <p className="mt-6 text-pink-300/80 font-light italic z-10">
        {currentReason}
      </p>

      {!started && (
        <motion.button
          onClick={startMeter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-10 py-3 border border-pink-400 text-pink-400 rounded-full hover:bg-pink-400 hover:text-white transition-all duration-300 z-10"
        >
          Begin Analysis 💖
        </motion.button>
      )}

      {/* ROMANTIC FINALE OVERLAY */}
      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#020617] via-pink-950/40 to-[#020617] backdrop-blur-sm"
          >
            {/* Floating Hearts Animation */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100vh", x: Math.random() * 100 - 50, opacity: 0 }}
                animate={{ y: "-10vh", opacity: [0, 1, 0] }}
                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: i * 0.3 }}
                className="absolute text-pink-400/30 text-2xl"
              >
                ❤️
              </motion.div>
            ))}

            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl font-serif text-white text-center drop-shadow-[0_0_20px_rgba(244,114,182,0.8)]"
            >
              Infinite Love
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 flex flex-col items-center"
            >
              <div className="w-24 h-[1px] bg-pink-400 mb-6" />
              <p className="text-pink-200 text-lg tracking-[0.2em] font-light">
                BEYOND MEASURE
              </p>
              
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.1 }}
                className="mt-16 px-12 py-4 bg-pink-500 text-white rounded-full shadow-lg shadow-pink-500/50 font-bold tracking-widest"
              >
                CONTINUE THE JOURNEY 💖
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoveMeter;