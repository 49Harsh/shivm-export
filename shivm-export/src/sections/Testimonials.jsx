import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const navigate = (newDir) => {
    setDir(newDir);
    setActive(prev => (prev + newDir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[active];
  const colors = ['bg-emerald-500', 'bg-blue-600', 'bg-gold-500', 'bg-purple-600'];

  return (
    <section className="section-padding bg-gray-50 dark:bg-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Client Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 dark:text-white mb-5">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>

        {/* Main testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-navy-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 dark:opacity-10"
              style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />

            {/* Quote mark */}
            <div className="font-display text-8xl text-emerald-500/20 leading-none mb-4 select-none">"</div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <FiStar key={i} size={20} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>

                {/* Review text */}
                <p className="font-display text-xl md:text-2xl text-gray-700 dark:text-white/90 leading-relaxed italic mb-8">
                  "{current.review}"
                </p>

                {/* Client info */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${colors[active]} flex items-center justify-center font-bold text-white text-lg shadow-lg`}>
                    {current.initials}
                  </div>
                  <div>
                    <div className="font-bold text-navy-900 dark:text-white text-lg">{current.name}</div>
                    <div className="text-gray-500 dark:text-white/50 text-sm">{current.role} · {current.company}</div>
                    <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">{current.country}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 dark:hover:border-emerald-500 transition-all"
            >
              <FiChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-3 bg-emerald-500' : 'w-3 h-3 bg-gray-300 dark:bg-white/20'}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 dark:hover:border-emerald-500 transition-all"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Client logos row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-6 items-center"
        >
          <span className="text-gray-400 dark:text-white/30 text-sm font-medium">Trusted by buyers from:</span>
          {['🇺🇸 USA', '🇩🇪 Germany', '🇦🇪 UAE', '🇬🇧 UK', '🇦🇺 Australia', '🇯🇵 Japan', '🇨🇦 Canada'].map(c => (
            <span key={c} className="text-gray-600 dark:text-white/50 text-sm font-semibold px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
              {c}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
