import { motion } from "framer-motion";

function Distance({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mb-8"
      >
        <div className="relative">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-pink-500 rounded-full blur-xl"
          />
          <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20 text-4xl">
            📍
          </div>
        </div>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-serif italic mb-4"
      >
        "The stars said we were miles apart..."
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-pink-200 tracking-widest uppercase text-xs mb-10"
      >
        But they didn't count on how fast I'd run to you.
      </motion.p>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="px-8 py-3 bg-white/10 border border-white/20 rounded-full text-sm tracking-[0.3em] uppercase hover:bg-white/20 transition-all"
      >
        Check Distance
      </motion.button>
    </div>
  );
}

export default Distance;