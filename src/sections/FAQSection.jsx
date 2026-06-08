import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { FAQS } from '../data';

function FAQItem({ faq, index, isOpen, onToggle, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className={`bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border transition-all duration-300 ${
        isOpen ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/5' : 'border-gray-100 dark:border-white/5'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-6 text-left group"
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
          isOpen ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/50 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:text-emerald-500'
        }`}>
          {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
        </div>
        <span className={`font-semibold text-base leading-snug transition-colors ${
          isOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-navy-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
        }`}>
          {faq.q}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-6 pl-18">
              <div className="pl-12 text-gray-500 dark:text-white/60 text-sm leading-relaxed">
                {faq.a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="section-padding bg-gray-50 dark:bg-navy-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">
            FAQ
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 dark:text-white mb-5">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg">
            Everything international buyers need to know before placing an order.
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              inView={inView}
            />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center bg-white dark:bg-navy-800 rounded-3xl p-8 border border-gray-100 dark:border-white/5"
        >
          <div className="text-4xl mb-4">💬</div>
          <h3 className="font-display font-bold text-xl text-navy-900 dark:text-white mb-2">Still have questions?</h3>
          <p className="text-gray-500 dark:text-white/50 text-sm mb-6">Our export team is available 24/7 to answer your queries.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all"
            >
              Contact Us
            </motion.button>
            <a
              href="https://wa.me/919999999999"
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
              <span>💬</span> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
