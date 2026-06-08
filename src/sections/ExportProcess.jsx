import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { PROCESS_STEPS } from '../data';

export default function ExportProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="export-process" className="section-padding bg-gray-50 dark:bg-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Simple & Transparent
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 dark:text-white mb-5">
            Our Export <span className="gradient-text">Process</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg max-w-2xl mx-auto">
            From inquiry to delivery — a seamless 8-step export journey designed for your peace of mind.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop: alternating timeline */}
          <div className="hidden md:block">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/30 to-transparent transform -translate-x-1/2" />

            <div className="space-y-12">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className="flex-1">
                    <div className={`bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 hover:shadow-emerald-500/5 transition-all duration-300 group ${i % 2 === 0 ? 'ml-auto mr-8' : 'mr-auto ml-8'} max-w-sm`}>
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-emerald-500 font-bold">{step.num}</span>
                        <h3 className="font-display font-bold text-lg text-navy-900 dark:text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: i * 0.12 + 0.3, type: 'spring', stiffness: 200 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white font-bold font-display text-sm"
                    >
                      {i + 1}
                    </motion.div>
                  </div>

                  {/* Empty side */}
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical list */}
          <div className="md:hidden space-y-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 bg-white dark:bg-navy-800 rounded-2xl p-5 border border-gray-100 dark:border-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5 shadow-lg shadow-emerald-500/30">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="font-semibold text-navy-900 dark:text-white text-base">{step.title}</h3>
                  </div>
                  <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
