import { motion } from "framer-motion";

function Stars({ currentPage }) {
  const isFinalPage = currentPage === 7;

  // Star coordinates for Virgo (unchanged)
  const virgoStars = [
    { x: 15, y: 65 }, { x: 22, y: 55 }, { x: 30, y: 58 },
    { x: 25, y: 70 }, { x: 35, y: 78 }, { x: 42, y: 72 },
    { x: 30, y: 88 }, { x: 40, y: 92 }, { x: 48, y: 88 }
  ];

  // NEW Star coordinates for Sagittarius (The Archer / Teapot shape)
  const sagittariusStars = [
    { x: 70, y: 50 }, { x: 80, y: 48 }, { x: 85, y: 55 }, // Handle
    { x: 75, y: 65 }, { x: 88, y: 70 }, { x: 82, y: 85 }, // Body/Base
    { x: 65, y: 78 }, { x: 58, y: 62 },                   // Spout
    { x: 72, y: 40 }                                      // Top of lid
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#020617]">
      {/* Background Ambient Stars */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
        />
      ))}

      {/* Main Star Points */}
      {virgoStars.concat(sagittariusStars).map((pos, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full z-10"
          style={{
            boxShadow: i < virgoStars.length ? "0 0 8px #7dd3fc" : "0 0 8px #f472b6",
          }}
          initial={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}
          animate={{ 
            left: isFinalPage ? `${pos.x}vw` : undefined, 
            top: isFinalPage ? `${pos.y}vh` : undefined 
          }}
          transition={{ delay: 4, duration: 6, ease: "easeInOut" }}
        />
      ))}

      {/* Glowing Constellation Lines */}
      {isFinalPage && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="neonGlow">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Virgo Path */}
          <motion.path
            d="M 15 65 L 22 55 L 30 58 M 22 55 L 25 70 L 35 78 L 42 72 M 25 70 L 30 88 L 40 92 L 48 88"
            fill="none" stroke="#7dd3fc" strokeWidth="0.15" filter="url(#neonGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 10, duration: 3 }}
          />

          {/* NEW Sagittarius Path (Teapot Asterism) */}
          <motion.path
            d="M 70 50 L 80 48 L 85 55 L 88 70 L 82 85 L 75 65 L 70 50 M 75 65 L 65 78 L 58 62 L 70 50 M 80 48 L 72 40 L 70 50"
            fill="none" stroke="#f472b6" strokeWidth="0.15" filter="url(#neonGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 10, duration: 3 }}
          />

          {/* Connection Line between the two */}
          <motion.path
            d="M 42 72 Q 50 65 58 62"
            fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="1,1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ delay: 14, duration: 3 }}
          />
        </svg>
      )}

      {/* Sign Labels */}
      {isFinalPage && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 16 }}
            className="absolute left-[18vw] top-[94vh] text-[#7dd3fc] text-[9px] tracking-[0.6em] font-serif uppercase"
          >
            Virgo
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 16 }}
            className="absolute left-[70vw] top-[94vh] text-[#f472b6] text-[9px] tracking-[0.4em] font-serif uppercase"
          >
            Sagittarius
          </motion.div>
        </>
      )}
    </div>
  );
}

export default Stars;