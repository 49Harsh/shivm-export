import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TRUST_ITEMS } from '../data';

export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-16 bg-navy-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group text-center p-5 rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 cursor-default"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
              <div className="text-white/40 text-xs leading-relaxed hidden md:block">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
