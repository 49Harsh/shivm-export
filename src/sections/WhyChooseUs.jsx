import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FEATURES } from '../data';

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about-us" className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-4">
              Why ShivM Export?
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              The <span className="gradient-text-gold">Smarter Choice</span>
              {' '}for Global Wholesale
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              With 10+ years of export experience, we've refined every step of the international trade process. Our clients trust us for consistency, compliance, and competitive pricing.
            </p>

            {/* Achievement highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '10+', label: 'Years of Excellence' },
                { val: '98%', label: 'On-time Delivery' },
                { val: '85+', label: 'Countries Reached' },
                { val: '₹500Cr+', label: 'Exports Handled' },
              ].map(item => (
                <div key={item.label} className="glass rounded-2xl p-4">
                  <div className="font-display font-bold text-2xl text-gold-400 mb-1">{item.val}</div>
                  <div className="text-white/50 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="glass rounded-2xl p-5 group hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 cursor-default"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{feat.icon}</div>
                <h3 className="font-semibold text-white text-base mb-2">{feat.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
