import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-navy-900 flex flex-col items-center justify-center"
    >
      {/* Animated globe logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40 mb-6"
      >
        <span className="text-4xl">🌐</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-8"
      >
        <div className="font-display font-bold text-3xl text-white mb-1">
          ShivM<span className="text-emerald-400"> Export</span>
        </div>
        <div className="text-white/40 text-sm font-mono tracking-widest uppercase">Premium Wholesale · Global Trade</div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        className="h-0.5 bg-emerald-500 rounded-full"
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-white/30 text-xs"
      >
        Connecting global buyers...
      </motion.div>
    </motion.div>
  );
}
