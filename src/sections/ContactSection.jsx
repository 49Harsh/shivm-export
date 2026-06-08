import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', country: '', product: '', quantity: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">Get In Touch</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Start Your <span className="gradient-text">Export Journey</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Ready to source premium Indian products? Fill the form below and our export team will respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: <FiMail size={20} />, label: 'Email', value: 'exports@shivm.com', sub: 'Reply within 24 hours' },
              { icon: <FiPhone size={20} />, label: 'Phone / WhatsApp', value: '+91 99999 99999', sub: 'Mon–Sat, 9am – 8pm IST' },
              { icon: <FiMapPin size={20} />, label: 'Office', value: 'ShivM Export Pvt Ltd', sub: 'New Delhi, India – 110001' },
              { icon: <FiClock size={20} />, label: 'Business Hours', value: 'Mon–Sat: 9:00 AM – 8:00 PM', sub: 'IST (GMT +5:30)' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass rounded-2xl p-5 flex gap-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-0.5">{item.label}</div>
                  <div className="text-white font-semibold text-sm">{item.value}</div>
                  <div className="text-white/40 text-xs mt-0.5">{item.sub}</div>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl overflow-hidden h-40 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <div className="text-white/40 text-sm">New Delhi, India</div>
                <div className="text-white/30 text-xs mt-1">Export Hub · Central India</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Quote form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8">
              {!submitted ? (
                <>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">Request a Quote</h3>
                  <p className="text-white/50 text-sm mb-8">Fill in your requirements and we'll get back with pricing and availability.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: 'name', placeholder: 'Your Full Name', type: 'text' },
                        { name: 'company', placeholder: 'Company Name', type: 'text' },
                        { name: 'email', placeholder: 'Business Email', type: 'email' },
                        { name: 'country', placeholder: 'Country / Region', type: 'text' },
                      ].map(field => (
                        <input
                          key={field.name}
                          type={field.type}
                          required
                          placeholder={field.placeholder}
                          value={form[field.name]}
                          onChange={e => setForm(p => ({ ...p, [field.name]: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all"
                        />
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <select
                        value={form.product}
                        onChange={e => setForm(p => ({ ...p, product: e.target.value }))}
                        required
                        className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
                        style={{ background: '#1e2d4a' }}
                      >
                        <option value="">Select Product Category</option>
                        {['Agriculture', 'Food Products', 'Spices & Herbs', 'Textiles', 'Handicrafts', 'Industrial Goods', 'Home Decor', 'Custom'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Approximate Quantity"
                        value={form.quantity}
                        onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all"
                      />
                    </div>

                    <textarea
                      rows={4}
                      placeholder="Describe your requirements in detail — product specifications, packaging needs, target market, etc."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all resize-none"
                    />

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(16,185,129,0.25)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <FiSend size={18} />
                      Send Quote Request
                    </motion.button>

                    <p className="text-white/30 text-xs text-center">
                      🔒 Your information is secure. We respond within 24 business hours.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-6">🎉</div>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">Request Sent Successfully!</h3>
                  <p className="text-white/60 text-base mb-8">
                    Thank you for reaching out. Our export team will review your requirements and respond within 24 business hours.
                  </p>
                  <div className="space-y-3 text-sm text-white/50 mb-8">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-emerald-400">✓</span> Inquiry received and logged
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-emerald-400">✓</span> Assigned to an export specialist
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gold-400">⏰</span> Expected response: within 24 hours
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 border border-white/20 text-white rounded-xl text-sm hover:border-emerald-500 transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
