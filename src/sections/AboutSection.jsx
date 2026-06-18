import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const VALUES = [
  { icon: '🎯', title: 'Mission', desc: 'To make Indian wholesale products accessible to global buyers through transparent, reliable, and efficient export services.' },
  { icon: '🌟', title: 'Vision', desc: 'To be recognized as India\'s most trusted B2B export platform, empowering buyers and sellers across 150+ countries by 2030.' },
  { icon: '💎', title: 'Values', desc: 'Integrity in every transaction. Quality without compromise. Speed with care. Relationships built on trust and mutual growth.' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-white dark:bg-navy-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 dark:text-white mb-5">
            About <span className="gradient-text">ShivM Export</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-3xl font-bold text-navy-900 dark:text-white mb-6 leading-tight">
              10+ Years of Building <br />
              <span className="gradient-text">Global Trade Bridges</span>
            </h3>
            <p className="text-gray-500 dark:text-white/60 text-base leading-relaxed mb-6">
              Founded in 2014, ShivM Export began as a small spice trading company in Delhi. Over a decade, we've grown into a full-spectrum export company handling agricultural produce, textiles, handicrafts, industrial goods, and more.
            </p>
            <p className="text-gray-500 dark:text-white/60 text-base leading-relaxed mb-8">
              Today, we serve 1,200+ international buyers across 85+ countries, managing every aspect of the export process — from product sourcing and quality inspection to customs documentation and last-mile delivery.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🏆', label: 'Best Exporter Award 2022, FIEO' },
                { icon: '⭐', label: 'Verified Supplier — IndiaMART' },
                { icon: '🔰', label: 'APEDA Star Export House' },
                { icon: '🌐', label: 'Alibaba Gold Supplier Since 2018' },
              ].map(ach => (
                <div key={ach.label} className="flex items-start gap-3 bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5">
                  <span className="text-xl flex-shrink-0">{ach.icon}</span>
                  <span className="text-gray-700 dark:text-white/70 text-sm font-medium leading-snug">{ach.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Mission/Vision/Values */}
          <div className="space-y-5">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
                className="bg-gray-50 dark:bg-navy-800 rounded-2xl p-6 border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{val.icon}</div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-navy-900 dark:text-white mb-2">{val.title}</h4>
                    <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
