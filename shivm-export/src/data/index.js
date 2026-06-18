export const STATS = [
  { value: 85, suffix: '+', label: 'Countries Served', icon: '🌍' },
  { value: 800, suffix: '+', label: 'Clothing Styles', icon: '👗' },
  { value: 1200, suffix: '+', label: 'Happy Clients', icon: '🤝' },
  { value: 15000, suffix: '+', label: 'Successful Shipments', icon: '🚢' },
];

export const CATEGORIES = [
  { name: 'Girls Dresses', count: 180, emoji: '👗', desc: 'Casual & daily wear frocks for ages 2–14', color: 'from-pink-800 to-pink-600' },
  { name: 'Girls Tops', count: 150, emoji: '👚', desc: 'T-shirts, tops & blouses for girls', color: 'from-purple-900 to-purple-700' },
  { name: 'Ethnic Wear', count: 220, emoji: '🪷', desc: 'Kurtis, lehenga cholis & salwar sets', color: 'from-red-900 to-red-700' },
  { name: 'Party Wear', count: 95, emoji: '✨', desc: 'Designer frocks & festive occasion wear', color: 'from-amber-800 to-amber-600' },
  { name: 'Leggings & Bottoms', count: 120, emoji: '👖', desc: 'Leggings, jeggings, palazzos & skirts', color: 'from-teal-800 to-teal-600' },
  { name: 'Nightwear', count: 80, emoji: '🌙', desc: 'Comfortable night suits & pajama sets', color: 'from-indigo-800 to-indigo-600' },
  { name: 'School Uniforms', count: 60, emoji: '🎒', desc: 'School dresses, shirts & uniform sets', color: 'from-slate-700 to-slate-500' },
  { name: 'Custom Solutions', count: 0, emoji: '✂️', desc: 'Private label & OEM manufacturing for your brand', color: 'from-navy-700 to-navy-500' },
];

export const PRODUCTS = [
  { name: 'Cotton Printed Frocks (Ages 2–8)', moq: '100 PCS', countries: ['UAE', 'UK', 'USA'], priceRange: '$3.5–$8/PCS', rating: 4.9, reviews: 284, category: 'Girls Dresses' },
  { name: 'Designer Party Frock Collection', moq: '50 PCS', countries: ['Germany', 'France', 'Canada'], priceRange: '$12–$28/PCS', rating: 4.8, reviews: 156, category: 'Party Wear' },
  { name: 'Girls Ethnic Kurti Set (3-Piece)', moq: '80 PCS', countries: ['UAE', 'Australia', 'UK'], priceRange: '$8–$18/SET', rating: 4.9, reviews: 212, category: 'Ethnic Wear' },
  { name: 'Cotton Round Neck T-Shirts', moq: '200 PCS', countries: ['USA', 'Netherlands', 'Japan'], priceRange: '$2.5–$5/PCS', rating: 4.7, reviews: 98, category: 'Girls Tops' },
  { name: 'Stretchable Leggings (Assorted Colors)', moq: '300 PCS', countries: ['EU', 'USA', 'Canada'], priceRange: '$1.8–$4/PCS', rating: 4.8, reviews: 321, category: 'Leggings & Bottoms' },
  { name: 'Girls Palazzo & Top Set', moq: '60 PCS', countries: ['Bangladesh', 'Nepal', 'UK'], priceRange: '$6–$14/SET', rating: 4.6, reviews: 76, category: 'Ethnic Wear' },
];

export const FEATURES = [
  { icon: '💰', title: 'Competitive Pricing', desc: 'Direct factory prices with bulk discount structures for international buyers.' },
  { icon: '🔍', title: 'Quality Control', desc: 'Rigorous 3-stage quality inspection: pre-production, in-production & pre-shipment.' },
  { icon: '✈️', title: 'Global Logistics', desc: 'Partnerships with top freight forwarders & shipping lines for 85+ countries.' },
  { icon: '📋', title: 'Fast Documentation', desc: 'Export invoices, certificates of origin, packing lists & all apparel export docs handled in-house.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'LC, TT, PayPal, and all major B2B payment methods accepted.' },
  { icon: '🤝', title: 'Dedicated Team', desc: 'Personal export manager assigned to every client from inquiry to delivery.' },
];

export const PROCESS_STEPS = [
  { num: '01', title: 'Style Selection', desc: 'Browse our catalog or share your design requirements and size charts.', icon: '🔎' },
  { num: '02', title: 'Quotation', desc: 'Receive detailed pricing, MOQ, and timeline within 24 hours.', icon: '📄' },
  { num: '03', title: 'Order Confirmation', desc: 'Finalize terms, pricing and advance payment to lock your order.', icon: '✅' },
  { num: '04', title: 'Manufacturing', desc: 'We produce at certified garment factories with fabric quality checks.', icon: '🏭' },
  { num: '05', title: 'Quality Inspection', desc: 'Third-party inspection and our in-house QC team checks every batch.', icon: '🔬' },
  { num: '06', title: 'Packaging', desc: 'Export-grade packaging with your brand label and size tags if required.', icon: '📦' },
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
  { name: 'James Crawford', company: 'Crawford Imports LLC', country: 'USA 🇺🇸', review: 'ShivM Export has been our primary sourcing partner for girls\' clothing for 3 years. Fabric quality, sizing consistency, and documentation efficiency is unmatched. Our go-to for Indian kids\' wear.', rating: 5, initials: 'JC', role: 'CEO' },
  { name: 'Sophie Müller', company: 'EuroTrade GmbH', country: 'Germany 🇩🇪', review: 'Outstanding professionalism. From sample approval to final delivery, every step was transparent. The quality inspection reports gave us full confidence in every shipment.', rating: 5, initials: 'SM', role: 'Procurement Director' },
  { name: 'Ahmed Al-Rashidi', company: 'Gulf Wholesale Group', country: 'UAE 🇦🇪', review: 'We source girls\' ethnic wear and party frocks exclusively through ShivM Export. Pricing is always competitive and shipments arrive on time. Highly recommend!', rating: 5, initials: 'AA', role: 'Head of Procurement' },
  { name: 'Yuki Tanaka', company: 'Tokyo Kids Fashion Co.', country: 'Japan 🇯🇵', review: 'The girls\' clothing collection is beautiful. ShivM helped us with custom sizing and ensured quality met Japanese market standards. Exceptional service!', rating: 5, initials: 'YT', role: 'Product Manager' },
];

export const FAQS = [
  { q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ varies by style. Dresses and tops start from 50–100 pieces per design, ethnic sets from 60 pieces, and leggings from 200 pieces. We can discuss custom MOQs for new clients.' },
  { q: 'What payment methods do you accept?', a: 'We accept Letter of Credit (LC), Telegraphic Transfer (TT), 30/60/90 day payment terms for established clients, PayPal for samples, and all major B2B payment methods.' },
  { q: 'How long does it take to process and ship an order?', a: 'Standard orders take 15–25 business days for manufacturing, followed by 3–5 days for packaging and documentation. Shipping time depends on destination: 10–25 days via sea, 3–7 days via air.' },
  { q: 'Do you provide product samples before bulk orders?', a: 'Yes, sample orders are available for most styles. Sample cost is typically charged at retail price and deducted from your first bulk order invoice.' },
  { q: 'What certifications do your products carry?', a: 'Our garments carry ISO 9001:2015, OEKO-TEX Standard 100 (where applicable), GOTS organic cotton certification, and all required export documentation for apparel.' },
  { q: 'Do you offer private labeling or custom packaging?', a: 'Yes! We offer OEM/white-label services including custom brand tags, hang tags, poly bags, barcodes, and compliance with destination country standards.' },
  { q: 'Can you handle all export documentation?', a: 'Absolutely. We manage all documentation including commercial invoice, packing list, bill of lading, certificate of origin, and customs declarations.' },
];

export const TRUST_ITEMS = [
  { icon: '🏆', title: 'Export Certified', desc: 'Registered apparel exporter with 10+ years of girls\' clothing export excellence.' },
  { icon: '🛡️', title: 'Quality Assured', desc: 'ISO 9001:2015 certified with 3-stage quality inspection protocol.' },
  { icon: '🌐', title: 'Global Shipping', desc: 'Partnerships with Maersk, MSC, and top freight forwarders worldwide.' },
  { icon: '🔐', title: 'Secure Transactions', desc: 'All transactions protected with bank-grade security and standard trade terms.' },
  { icon: '⚡', title: 'Fast Fulfillment', desc: 'Express processing available. Most orders dispatched within 15 business days.' },
  { icon: '📞', title: '24/7 Support', desc: 'Dedicated account managers available round the clock via WhatsApp & email.' },
];
