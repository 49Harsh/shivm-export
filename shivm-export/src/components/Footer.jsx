import { motion } from 'framer-motion';
import { FiGlobe, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

import { CATEGORIES as DATA_CATEGORIES } from '../data';

const QUICK_LINKS = ['About Us', 'Products', 'Categories', 'Export Process', 'Contact', 'Get Quote'];
const CATEGORIES = DATA_CATEGORIES.filter(c => c.count > 0).map(c => c.name);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <FiGlobe className="text-white text-xl" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white tracking-tight">
                  ShivM<span className="text-emerald-400"> Export</span>
                </span>
                <div className="text-[9px] text-emerald-400/60 tracking-widest uppercase font-mono -mt-0.5">
                  Wholesale · B2B
                </div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              India's trusted B2B wholesale exporter of girls' clothing. Connecting global buyers with premium Indian garments since 2014.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['ISO 9001', 'OEKO-TEX', 'GOTS', 'Export Registered'].map(cert => (
                <span key={cert} className="text-xs bg-white/5 border border-white/10 text-emerald-400 px-2.5 py-1 rounded-lg font-mono">
                  {cert}
                </span>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <FaLinkedin size={16} />, color: 'hover:bg-blue-600' },
                { icon: <FaTwitter size={16} />, color: 'hover:bg-sky-500' },
                { icon: <FaInstagram size={16} />, color: 'hover:bg-pink-600' },
                { icon: <FaYoutube size={16} />, color: 'hover:bg-red-600' },
                { icon: <FaWhatsapp size={16} />, color: 'hover:bg-green-500' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white ${social.color} hover:border-transparent transition-all duration-200`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(link => (
                <li key={link}>
                  <a href="#" className="flex items-center gap-2 text-white/40 hover:text-emerald-400 text-sm transition-colors group">
                    <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">Export Categories</h4>
            <ul className="space-y-3">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <a href="#" className="flex items-center gap-2 text-white/40 hover:text-emerald-400 text-sm transition-colors group">
                    <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">Contact Info</h4>
            <div className="space-y-3 mb-8">
              {[
                { icon: <FiMail size={14} />, text: 'exports@shivm.com' },
                { icon: <FiPhone size={14} />, text: '+91 99999 99999' },
                { icon: <FiMapPin size={14} />, text: 'New Delhi, India 110001' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-white/40 text-sm">
                  <span className="text-emerald-400/70 mt-0.5 flex-shrink-0">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-3">Export Newsletter</h4>
              <p className="text-white/30 text-xs mb-3">Get weekly updates on new products & export opportunities.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/30 text-sm outline-none focus:border-emerald-500/50 transition-all"
                />
                <button className="px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-all flex-shrink-0">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-4 md:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {year} ShivM Export Pvt. Ltd. All rights reserved. | Registered Export Company, India
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Trade', 'Shipping Policy', 'Sitemap'].map(link => (
              <a key={link} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
