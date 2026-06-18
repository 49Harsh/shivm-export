import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../data';

function AnimatedCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>{count.toLocaleString()}{suffix}</span>
  );
}

// Animated world map dots pattern
function WorldMapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Animated orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)' }}
      />

      {/* SVG World map outline */}
      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full opacity-10"
        fill="none"
      >
        {/* Simplified continent shapes */}
        {/* North America */}
        <path d="M 120 120 L 200 100 L 280 130 L 300 180 L 260 220 L 220 250 L 180 240 L 140 200 Z" stroke="#10B981" strokeWidth="1" fill="rgba(16,185,129,0.05)" />
        {/* South America */}
        <path d="M 190 280 L 250 270 L 280 310 L 270 380 L 230 420 L 190 400 L 170 350 Z" stroke="#10B981" strokeWidth="1" fill="rgba(16,185,129,0.05)" />
        {/* Europe */}
        <path d="M 490 100 L 580 90 L 610 130 L 580 160 L 530 170 L 490 150 Z" stroke="#10B981" strokeWidth="1" fill="rgba(16,185,129,0.05)" />
        {/* Africa */}
        <path d="M 490 200 L 570 190 L 610 250 L 600 360 L 540 400 L 490 380 L 460 300 Z" stroke="#10B981" strokeWidth="1" fill="rgba(16,185,129,0.05)" />
        {/* Asia */}
        <path d="M 620 80 L 900 70 L 960 130 L 940 200 L 860 230 L 750 220 L 660 180 L 620 130 Z" stroke="#10B981" strokeWidth="1" fill="rgba(16,185,129,0.05)" />
        {/* India highlight */}
        <motion.path
          d="M 720 185 L 770 180 L 790 230 L 760 280 L 730 270 L 710 230 Z"
          stroke="#F59E0B"
          strokeWidth="2"
          fill="rgba(245,158,11,0.15)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Australia */}
        <path d="M 850 300 L 970 290 L 1000 360 L 950 410 L 860 400 L 820 350 Z" stroke="#10B981" strokeWidth="1" fill="rgba(16,185,129,0.05)" />
        {/* Shipping routes */}
        <motion.path
          d="M 750 230 Q 850 250 950 200 Q 1050 150 1100 170"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="6 4"
          fill="none"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M 730 240 Q 620 300 500 280 Q 380 260 300 240"
          stroke="#F59E0B"
          strokeWidth="1"
          strokeDasharray="6 4"
          fill="none"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
        <motion.path
          d="M 750 220 Q 700 150 620 130 Q 560 110 520 120"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="6 4"
          fill="none"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 2 }}
        />
      </svg>

      {/* Floating trade indicators */}
      {[
        { x: '80%', y: '35%', label: 'USA' },
        { x: '52%', y: '25%', label: 'EU' },
        { x: '72%', y: '60%', label: 'AU' },
        { x: '65%', y: '42%', label: 'UAE' },
      ].map((dot) => (
        <motion.div
          key={dot.label}
          className="absolute"
          style={{ left: dot.x, top: dot.y }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
        >
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <div className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
            <span className="absolute -top-5 -left-2 text-[10px] text-emerald-400/70 font-mono whitespace-nowrap">{dot.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen bg-navy-900 flex items-center overflow-hidden">
      <WorldMapBackground />

      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-transparent to-navy-900/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-32 md:py-40 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-semibold tracking-wide">Trusted B2B Export Partner Since 2014</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Premium{' '}
            <span className="gradient-text">Girls' Clothing</span>
            {' '}Wholesale{' '}
            <span className="text-gold-500">Export</span>
            {' '}Worldwide
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/60 font-light mb-12 max-w-2xl leading-relaxed"
          >
            Trusted Wholesale Partner for Girls' Clothing — Dresses, Ethnic Wear, Tops, Party Wear & More.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(16,185,129,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('categories')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Products</span>
              <span>→</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 border-2 border-white/25 hover:border-gold-500 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:bg-gold-500/10 flex items-center justify-center gap-2"
            >
              <span>Request Quote</span>
              <span className="text-gold-400">✦</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="glass rounded-2xl p-4 md:p-5 text-center group hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold font-display text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={statsVisible} />
                </div>
                <div className="text-xs text-white/50 font-medium tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating certification badges */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {['ISO\n9001:2015', 'OEKO-TEX\nCertified', 'GOTS\nOrganic', 'Export\nRegistered'].map((cert, i) => (
            <motion.div
              key={cert}
              className="glass rounded-xl p-3 text-center w-24"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            >
              <div className="text-emerald-400 font-bold text-xs leading-tight whitespace-pre-line">{cert}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-emerald-400" />
        </div>
      </motion.div>
    </section>
  );
}
