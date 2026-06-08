import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-2xl bg-navy-900 border border-white/20 text-white flex items-center justify-center shadow-xl hover:border-emerald-500 hover:text-emerald-400 transition-all"
          >
            <FiArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/919999999999?text=Hello%2C%20I'm%20interested%20in%20wholesale%20export%20from%20ShivM%20Export."
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        animate={{ boxShadow: ['0 0 0 0 rgba(34,197,94,0.4)', '0 0 0 12px rgba(34,197,94,0)', '0 0 0 0 rgba(34,197,94,0)'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-xl shadow-green-500/30"
      >
        <FaWhatsapp size={26} />
      </motion.a>
    </div>
  );
}
