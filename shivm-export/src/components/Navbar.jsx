import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiSearch, FiGlobe } from 'react-icons/fi';

const NAV_LINKS = ['Home', 'Products', 'Categories', 'About Us', 'Export Process', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy-900/95 backdrop-blur-xl shadow-2xl shadow-black/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <FiGlobe className="text-white text-xl" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                ShivM<span className="text-emerald-400"> Export</span>
              </span>
              <div className="text-[9px] text-emerald-400/70 tracking-widest uppercase font-mono -mt-0.5">
                Wholesale · B2B
              </div>
            </div>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link}
                onClick={() => scrollTo(link)}
                whileHover={{ y: -1 }}
                className="px-3.5 py-2 text-sm font-medium text-white/80 hover:text-white hover:text-emerald-400 rounded-lg transition-all duration-200 relative group"
              >
                {link}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-emerald-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <FiSearch size={16} />
            </button>
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <button
              onClick={() => scrollTo('Contact')}
              className="px-4 py-2 text-sm font-semibold text-white border border-white/25 rounded-xl hover:border-white/50 transition-all"
            >
              Login
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('Contact')}
              className="px-5 py-2 text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              Get Quote →
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white"
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 right-4 z-40 bg-navy-900/98 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link)}
                className="block w-full text-left px-4 py-3 text-white/80 hover:text-emerald-400 hover:bg-white/5 rounded-xl transition-all text-sm font-medium"
              >
                {link}
              </motion.button>
            ))}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => scrollTo('Contact')}
                className="flex-1 py-2.5 text-sm font-semibold text-white border border-white/20 rounded-xl"
              >
                Login
              </button>
              <button
                onClick={() => scrollTo('Contact')}
                className="flex-1 py-2.5 text-sm font-bold bg-emerald-500 text-white rounded-xl"
              >
                Get Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-60 bg-navy-900/80 backdrop-blur-sm flex items-start justify-center pt-32 px-4"
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl bg-navy-800 rounded-2xl border border-white/10 p-2 shadow-2xl"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <FiSearch className="text-white/40 text-xl flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products, categories, or countries..."
                  className="flex-1 bg-transparent text-white placeholder-white/40 text-lg outline-none"
                />
                <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>
              <div className="px-4 py-2 border-t border-white/5">
                <p className="text-xs text-white/30 mb-2">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Girls Frocks', 'Party Wear', 'Ethnic Kurti', 'Leggings', 'Girls Tops'].map(t => (
                    <span key={t} className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg cursor-pointer hover:bg-emerald-500/20 hover:text-emerald-400 transition-all">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
