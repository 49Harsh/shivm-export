export const STATS = [
  { value: 85, suffix: '+', label: 'Countries Served', icon: '🌍' },
  { value: 2400, suffix: '+', label: 'Products Exported', icon: '📦' },
  { value: 1200, suffix: '+', label: 'Happy Clients', icon: '🤝' },
  { value: 15000, suffix: '+', label: 'Successful Shipments', icon: '🚢' },
];

export const CATEGORIES = [
  { name: 'Agriculture Products', count: 320, emoji: '🌾', desc: 'Premium grains, pulses & agri commodities', color: 'from-green-800 to-green-600' },
  { name: 'Food Products', count: 180, emoji: '🍱', desc: 'Packaged foods, snacks & beverages', color: 'from-orange-800 to-orange-600' },
  { name: 'Spices & Herbs', count: 250, emoji: '🌶️', desc: 'Authentic Indian spices & blends', color: 'from-red-900 to-red-700' },
  { name: 'Textiles', count: 410, emoji: '🧵', desc: 'Fabrics, garments & home textiles', color: 'from-purple-900 to-purple-700' },
  { name: 'Handicrafts', count: 290, emoji: '🏺', desc: 'Artisan crafts & handmade goods', color: 'from-amber-800 to-amber-600' },
  { name: 'Industrial Goods', count: 150, emoji: '⚙️', desc: 'Engineering goods & machinery parts', color: 'from-slate-700 to-slate-500' },
  { name: 'Home Decor', count: 340, emoji: '🏡', desc: 'Furniture, décor & lifestyle items', color: 'from-teal-800 to-teal-600' },
  { name: 'Custom Solutions', count: 0, emoji: '✨', desc: 'Tailored export packages for your needs', color: 'from-navy-700 to-navy-500' },
];

export const PRODUCTS = [
  { name: 'Premium Basmati Rice', moq: '10 MT', countries: ['UAE', 'UK', 'USA'], priceRange: '$450–$620/MT', rating: 4.9, reviews: 284, category: 'Agriculture' },
  { name: 'Organic Turmeric Powder', moq: '500 KG', countries: ['Germany', 'France', 'Canada'], priceRange: '$2.8–$4.2/KG', rating: 4.8, reviews: 156, category: 'Spices' },
  { name: 'Hand-Block Printed Fabric', moq: '500 MTR', countries: ['Italy', 'Japan', 'Australia'], priceRange: '$3.5–$6/MTR', rating: 4.7, reviews: 98, category: 'Textiles' },
  { name: 'Brass Handicraft Figurines', moq: '200 PCS', countries: ['USA', 'Netherlands', 'Sweden'], priceRange: '$8–$25/PCS', rating: 4.9, reviews: 212, category: 'Handicrafts' },
  { name: 'Cold-Pressed Mustard Oil', moq: '1000 LTR', countries: ['Bangladesh', 'Nepal', 'UK'], priceRange: '$1.2–$1.8/LTR', rating: 4.6, reviews: 76, category: 'Food' },
  { name: 'Jute Carry Bags', moq: '5000 PCS', countries: ['EU', 'USA', 'Canada'], priceRange: '$0.45–$1.2/PCS', rating: 4.8, reviews: 321, category: 'Handicrafts' },
];

export const FEATURES = [
  { icon: '💰', title: 'Competitive Pricing', desc: 'Direct factory prices with bulk discount structures for international buyers.' },
  { icon: '🔍', title: 'Quality Control', desc: 'Rigorous 3-stage quality inspection: pre-production, in-production & pre-shipment.' },
  { icon: '✈️', title: 'Global Logistics', desc: 'Partnerships with top freight forwarders & shipping lines for 85+ countries.' },
  { icon: '📋', title: 'Fast Documentation', desc: 'Export license, GST invoices, phytosanitary & all certifications handled in-house.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'LC, TT, PayPal, and all major B2B payment methods accepted.' },
  { icon: '🤝', title: 'Dedicated Team', desc: 'Personal export manager assigned to every client from inquiry to delivery.' },
];

export const PROCESS_STEPS = [
  { num: '01', title: 'Product Selection', desc: 'Browse our catalog or share your specific product requirements.', icon: '🔎' },
  { num: '02', title: 'Quotation', desc: 'Receive detailed pricing, MOQ, and timeline within 24 hours.', icon: '📄' },
  { num: '03', title: 'Order Confirmation', desc: 'Finalize terms, pricing and advance payment to lock your order.', icon: '✅' },
  { num: '04', title: 'Sourcing', desc: 'We source from certified factories & verify product authenticity.', icon: '🏭' },
  { num: '05', title: 'Quality Inspection', desc: 'Third-party inspection and our in-house QC team checks every batch.', icon: '🔬' },
  { num: '06', title: 'Packaging', desc: 'Export-grade packaging with your brand label if required.', icon: '📦' },
  { num: '07', title: 'Shipping', desc: 'Booking with best freight forwarder and full shipment tracking.', icon: '🚢' },
  { num: '08', title: 'Delivery', desc: 'Door-to-port delivery with all customs clearance documents.', icon: '🎯' },
];

export const COUNTRIES = [
  { name: 'United States', flag: '🇺🇸', exports: '320+ shipments', category: 'North America' },
  { name: 'United Kingdom', flag: '🇬🇧', exports: '280+ shipments', category: 'Europe' },
  { name: 'Germany', flag: '🇩🇪', exports: '195+ shipments', category: 'Europe' },
  { name: 'UAE', flag: '🇦🇪', exports: '540+ shipments', category: 'Middle East' },
  { name: 'Australia', flag: '🇦🇺', exports: '210+ shipments', category: 'Oceania' },
  { name: 'Canada', flag: '🇨🇦', exports: '175+ shipments', category: 'North America' },
  { name: 'Japan', flag: '🇯🇵', exports: '145+ shipments', category: 'Asia Pacific' },
  { name: 'Netherlands', flag: '🇳🇱', exports: '130+ shipments', category: 'Europe' },
];

export const TESTIMONIALS = [
  { name: 'James Crawford', company: 'Crawford Imports LLC', country: 'USA 🇺🇸', review: 'ShivM Export has been our primary sourcing partner for 3 years. Their quality consistency and documentation efficiency is unmatched. Our go-to for Indian textiles and spices.', rating: 5, initials: 'JC', role: 'CEO' },
  { name: 'Sophie Müller', company: 'EuroTrade GmbH', country: 'Germany 🇩🇪', review: 'Outstanding professionalism. From sample approval to final delivery, every step was transparent. The quality inspection reports gave us full confidence.', rating: 5, initials: 'SM', role: 'Procurement Director' },
  { name: 'Ahmed Al-Rashidi', company: 'Gulf Wholesale Group', country: 'UAE 🇦🇪', review: 'We source basmati rice and spices exclusively through ShivM Export. Pricing is always competitive and shipments arrive on time. Highly recommend!', rating: 5, initials: 'AA', role: 'Head of Procurement' },
  { name: 'Yuki Tanaka', company: 'Tokyo Artisan Co.', country: 'Japan 🇯🇵', review: 'The handicraft collection is extraordinary. ShivM helped us connect with skilled artisans and ensured quality met Japanese market standards. Exceptional!', rating: 5, initials: 'YT', role: 'Product Manager' },
];

export const FAQS = [
  { q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ varies by product category. Spices start from 100 KG, grains from 1 MT, textiles from 200 meters, and handicrafts from 50 pieces. We can discuss custom MOQs for new clients.' },
  { q: 'What payment methods do you accept?', a: 'We accept Letter of Credit (LC), Telegraphic Transfer (TT), 30/60/90 day payment terms for established clients, PayPal for samples, and all major B2B payment methods.' },
  { q: 'How long does it take to process and ship an order?', a: 'Standard orders take 7–15 business days for production/sourcing, followed by 3–5 days for packaging and documentation. Shipping time depends on destination: 10–25 days via sea, 3–7 days via air.' },
  { q: 'Do you provide product samples before bulk orders?', a: 'Yes, sample orders are available for most products. Sample cost is typically charged at retail price and deducted from your first bulk order invoice.' },
  { q: 'What certifications do your products carry?', a: 'Our products carry FSSAI, ISO 9001:2015, APEDA, Spice Board certification, organic certificates (where applicable), phytosanitary certificates, and all required export documentation.' },
  { q: 'Do you offer private labeling or custom packaging?', a: 'Yes! We offer OEM/white-label services including custom brand packaging, labeling in your language, barcodes, and compliance with destination country standards.' },
  { q: 'Can you handle all export documentation?', a: 'Absolutely. We manage all documentation including commercial invoice, packing list, bill of lading, certificate of origin, phytosanitary certificate, fumigation certificate, and customs declarations.' },
];

export const TRUST_ITEMS = [
  { icon: '🏆', title: 'Export Certified', desc: 'APEDA & Spice Board registered exporter with 10+ years of export excellence.' },
  { icon: '🛡️', title: 'Quality Assured', desc: 'ISO 9001:2015 certified with 3-stage quality inspection protocol.' },
  { icon: '🌐', title: 'Global Shipping', desc: 'Partnerships with Maersk, MSC, and top freight forwarders worldwide.' },
  { icon: '🔐', title: 'Secure Transactions', desc: 'All transactions protected with bank-grade security and standard trade terms.' },
  { icon: '⚡', title: 'Fast Fulfillment', desc: 'Express processing available. Most orders dispatched within 10 business days.' },
  { icon: '📞', title: '24/7 Support', desc: 'Dedicated account managers available round the clock via WhatsApp & email.' },
];
