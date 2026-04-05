import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Cake({ onNext }) {
  const [candles, setCandles] = useState([
    { id: 1, lit: true, left: "20%" },
    { id: 2, lit: true, left: "35%" },
    { id: 3, lit: true, left: "50%" },
    { id: 4, lit: true, left: "65%" },
    { id: 5, lit: true, left: "80%" },
  ]);
  const [isWished, setIsWished] = useState(false);

  const blowCandle = (id) => {
    setCandles(prev => prev.map(c => c.id === id ? { ...c, lit: false } : c));
  };

  useEffect(() => {
    if (candles.every(c => !c.lit) && !isWished) {
      setIsWished(true);
      setTimeout(() => onNext(), 5000); // Longer pause for the "Wish" moment
    }
  }, [candles, isWished, onNext]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-transparent relative overflow-hidden">
      {/* 1. Dynamic Instructional Text */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-20 text-center px-6 z-20"
      >
        <h1 className="text-pink-200 text-sm tracking-[0.4em] uppercase mb-2">
          {isWished ? "The Stars are Listening" : "A Moment for You"}
        </h1>
        <p className="text-white/60 font-serif italic">
          {isWished ? "Close your eyes and make a wish..." : "Tap each flame to blow it out"}
        </p>
      </motion.div>

      {/* 2. The Interactive Cake */}
      <div className="relative mt-20">
        {/* Candle Glow (Diminishes as candles go out) */}
        <div 
          className="absolute inset-0 rounded-full blur-[100px] transition-all duration-1000"
          style={{ 
            background: `radial-gradient(circle, rgba(255,183,77,0.3) 0%, transparent 70%)`,
            opacity: candles.filter(c => c.lit).length / 5 
          }}
        />

        {/* 3D-ish Cake Body */}
        <div className="relative w-64 h-40">
          {/* Top Layer */}
          <div className="absolute bottom-0 w-full h-32 bg-pink-100 rounded-t-lg shadow-inner" />
          <div className="absolute top-8 w-full h-8 bg-pink-200 rounded-full flex justify-around items-center px-4">
             {/* Frosting Details */}
             {[...Array(6)].map((_, i) => (
               <div key={i} className="w-4 h-4 bg-white rounded-full -mt-2 shadow-sm" />
             ))}
          </div>
          
          {/* Candles */}
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
                
                {/* Flame */}
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
                    /* Smoke Particle */
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
        {/* Cake Stand */}
        <div className="w-72 h-4 bg-white/20 backdrop-blur-md rounded-full mt-[-2px] mx-auto shadow-xl" />
      </div>

      {/* 3. Post-Blow Magical Glow */}
      <AnimatePresence>
        {isWished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Line */}
      <div className="absolute bottom-10 w-32 h-[1px] bg-white/10 overflow-hidden">
        <motion.div 
          className="h-full bg-pink-400"
          initial={{ width: 0 }}
          animate={{ width: `${(candles.filter(c => !c.lit).length / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default Cake;