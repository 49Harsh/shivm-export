import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CATEGORIES } from '../data';

export default function CategoriesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="categories" className="section-padding bg-gray-50 dark:bg-navy-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">
            What We Export
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 dark:text-white mb-5">
            Product <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg max-w-2xl mx-auto">
            From agriculture to handicrafts — we export a wide range of premium Indian products to 85+ countries worldwide.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90 group-hover:opacity-100 transition-all duration-500`} />

              {/* Pattern overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />

              {/* Content */}
              <div className="relative z-10 p-6 min-h-[180px] flex flex-col justify-between">
                <div>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">{cat.emoji}</div>
                  <h3 className="font-display font-bold text-xl text-white mb-2 leading-tight">{cat.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{cat.desc}</p>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  {cat.count > 0 && (
                    <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-medium">
                      {cat.count}+ Products
                    </span>
                  )}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="ml-auto flex items-center gap-1.5 text-white font-semibold text-sm group-hover:text-gold-400 transition-colors"
                  >
                    Explore <span>→</span>
                  </motion.button>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 40px rgba(16,185,129,0.2)' }} />
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-navy-900 dark:bg-white/10 text-white font-bold rounded-2xl border border-navy-700 dark:border-white/20 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300"
          >
            View All Categories →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
