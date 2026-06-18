import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { COUNTRIES } from '../data';

export default function GlobalPresence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full border border-emerald-500/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -left-1/2 w-3/4 h-3/4 rounded-full border border-gold-500/5"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Reach
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Global <span className="gradient-text">Presence</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            We've shipped to 85+ countries across 6 continents. Our logistics network ensures your goods arrive safely and on time.
          </p>
        </motion.div>

        {/* Region stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { region: 'Middle East', countries: 18, shipments: '2,400+', color: 'from-amber-600/20 to-amber-800/20', border: 'border-amber-500/20' },
            { region: 'Europe', countries: 28, shipments: '3,800+', color: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/20' },
            { region: 'North America', countries: 3, shipments: '2,100+', color: 'from-emerald-600/20 to-emerald-800/20', border: 'border-emerald-500/20' },
            { region: 'Asia Pacific', countries: 22, shipments: '4,200+', color: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/20' },
          ].map((region, i) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${region.color} border ${region.border} rounded-2xl p-5 text-center`}
            >
              <div className="font-display font-bold text-2xl text-white mb-1">{region.shipments}</div>
              <div className="text-white/70 text-sm font-semibold mb-1">{region.region}</div>
              <div className="text-white/40 text-xs">{region.countries} countries</div>
            </motion.div>
          ))}
        </div>

        {/* Country cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {COUNTRIES.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="glass rounded-2xl p-4 text-center group hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 cursor-default"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{country.flag}</div>
              <div className="font-semibold text-white text-xs leading-tight mb-1">{country.name}</div>
              <div className="text-emerald-400 text-[10px] font-mono">{country.exports}</div>
            </motion.div>
          ))}
        </div>

        {/* World visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-semibold">
              Active export operations across 85+ countries
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
