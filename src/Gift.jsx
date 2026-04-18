import { motion } from "framer-motion";

function Gift({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6">
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl mb-8 drop-shadow-[0_0_15px_rgba(244,114,182,0.4)]"
      >
        🎁
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-serif mb-2"
      >
        Distance: 0.0 km
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-pink-300 italic mb-12"
      >
        "Look inside your drower... your gift is waiting."
      </motion.p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-12"
      />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={onNext}
        className="text-white/40 text-[10px] tracking-[0.5em] uppercase hover:text-white transition-colors"
      >
        Continue to the Stars
      </motion.button>
    </div>
  );
}

export default Gift;
