import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Cake({ onNext }) {
  // Define 4 candles, matching your current illustration
  const [candles, setCandles] = useState([
    { id: 1, lit: true, left: "20%" },
    { id: 2, lit: true, left: "40%" },
    { id: 3, lit: true, left: "60%" },
    { id: 4, lit: true, left: "80%" },
  ]);
  const [isWished, setIsWished] = useState(false);

  // Function to blow out a candle and update the state
  const blowCandle = (id) => {
    setCandles(prev => prev.map(c => c.id === id ? { ...c, lit: false } : c));
  };

  // Check if all candles are blown out. If so, move to the next page
  useEffect(() => {
    if (candles.every(c => !c.lit) && !isWished) {
      setIsWished(true);
      // Wait a moment for the 'Wish' moment before moving to the surprise pages
      setTimeout(() => onNext(), 4000); 
    }
  }, [candles, isWished, onNext]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-transparent relative overflow-hidden">
      {/* 1. Dynamic Instructional Text (Aligned and styled) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-6 z-20 mb-16"
      >
        <h1 className="text-pink-200 text-sm tracking-[0.4em] uppercase mb-2">
          {isWished ? "A Magical Moment" : "The Wishing Cake"}
        </h1>
        <p className="text-white/60 font-serif italic">
          {isWished ? "Close your eyes and make a wish..." : "Tap each flame to blow it out"}
        </p>
      </motion.div>

      {/* 2. Redesigned Vector Cake (Centered Stack) */}
      <div className="relative">
        {/* Reacting Candle Glow (Diminishes as candles go out) */}
        <div 
          className="absolute inset-0 rounded-full blur-[100px] transition-all duration-1000"
          style={{ 
            background: `radial-gradient(circle, rgba(255,183,77,0.3) 0%, transparent 70%)`,
            opacity: candles.filter(c => c.lit).length / 4 
          }}
        />

        {/* The New Layered Cake Body */}
        <div className="relative w-64 h-32">
          {/* Main Cake Layer */}
          <div className="absolute bottom-0 w-full h-24 bg-pink-100 rounded-t-xl shadow-inner border border-pink-200" />
          
          {/* Top Frosting Detail */}
          <div className="absolute top-8 w-full h-8 bg-pink-200 rounded-full flex justify-around items-center px-4">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="w-4 h-4 bg-white rounded-full -mt-2 shadow-md border border-pink-100" />
             ))}
          </div>
          
          {/* Interactive Candles (Properly aligned with correct spacing) */}
          <div className="absolute top-[-30px] left-0 right-0 h-20">
            {candles.map((candle) => (
              <div 
                key={candle.id} 
                className="absolute bottom-0 w-3 h-16 cursor-pointer"
                style={{ left: candle.left }}
                onClick={() => blowCandle(candle.id)}
              >
                {/* Candle Stick */}
                <div className="w-full h-full bg-gradient-to-t from-pink-400 to-pink-300 rounded-full shadow-md" />
                
                {/* Flame with Glow and Sparkle */}
                <AnimatePresence>
                  {candle.lit ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [1, 1.1, 1], 
                        rotate: [0, 5, -5, 0],
                        opacity: 1 
                      }}
                      exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-5 h-8 bg-orange-400 rounded-full shadow-[0_0_20px_#fb923c] origin-bottom"
                    />
                  ) : (
                    /* Smoke Particle on click */
                    <motion.div
                      initial={{ opacity: 0.8, y: 0 }}
                      animate={{ opacity: 0, y: -50, x: 10 }}
                      className="absolute top-[-10px] left-1/2 text-gray-300 text-xs"
                    >
                      ☁️
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Cake Stand (Proper Alignment and Shadow) */}
        <div className="w-72 h-4 bg-white/20 backdrop-blur-md rounded-full mt-[-2px] mx-auto shadow-xl" />
      </div>

      {/* 3. Magical Glow effect on wish */}
      <AnimatePresence>
        {isWished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cake;