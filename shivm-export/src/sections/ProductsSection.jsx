import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FiHeart, FiStar, FiPackage, FiTag } from 'react-icons/fi';
import { PRODUCTS as STATIC_PRODUCTS } from '../data';
import { getFeaturedProducts, getProducts } from '../services/api';

function ProductCard({ product, index, inView }) {
  const [wishlisted, setWishlisted] = useState(false);
  const isFromAPI = !!product._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Product image */}
      <div className="relative h-48 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
        {isFromAPI && product.heroImage?.url ? (
          <img
            src={product.heroImage.url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl opacity-70 group-hover:scale-110 transition-transform duration-500">👗</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(w => !w)}
          className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white/20"
        >
          <FiHeart
            size={16}
            className={wishlisted ? 'fill-red-400 text-red-400' : 'text-white'}
          />
        </button>

        {/* Category tag */}
        {(product.categoryName || product.category) && (
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-emerald-500/90 text-white text-xs font-semibold rounded-lg">
            {product.categoryName || product.category}
          </div>
        )}

        {/* Featured badge */}
        {product.isFeatured && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-gold-500/90 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
            <FiStar size={10} className="fill-white" /> Featured
          </div>
        )}

        {/* Static product rating */}
        {!isFromAPI && product.rating && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={10} className={i < Math.floor(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-white/30'} />
              ))}
            </div>
            <span className="text-white text-xs font-medium">{product.rating} ({product.reviews})</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
          {product.title || product.name}
        </h3>

        <div className="space-y-2 mb-5">
          {/* API product: price */}
          {isFromAPI && (
            <div className="flex items-center gap-2 text-sm">
              <FiTag size={14} className="text-emerald-500 flex-shrink-0" />
              <span className="text-gray-500 dark:text-white/50">Price:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                ${product.price}
                {product.wholesalePrice && (
                  <span className="text-emerald-500 ml-1 text-xs">(Wholesale: ${product.wholesalePrice})</span>
                )}
              </span>
            </div>
          )}
          {/* Static product: MOQ + countries */}
          {!isFromAPI && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <FiPackage size={14} className="text-emerald-500 flex-shrink-0" />
                <span className="text-gray-500 dark:text-white/50">MOQ:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{product.moq}</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-white/50 truncate">
                Ships to: <span className="text-gray-700 dark:text-white/70">{product.countries?.join(', ')}</span>
              </div>
            </>
          )}
          {/* API product: stock */}
          {isFromAPI && product.stock !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <FiPackage size={14} className="text-emerald-500 flex-shrink-0" />
              <span className="text-gray-500 dark:text-white/50">In Stock:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{product.stock} units</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
          <div>
            <div className="text-xs text-gray-400 dark:text-white/40 mb-0.5">Price Range</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
              {isFromAPI ? `$${product.price}` : product.priceRange}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-4 py-2.5 bg-navy-900 dark:bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all duration-300"
          >
            Get Quote
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [products, setProducts] = useState(null); // null = loading
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    // Try featured products first, then all products as fallback
    getFeaturedProducts()
      .then((res) => {
        const list = res.data?.products || res.data || [];
        if (list.length > 0) {
          setProducts(list);
          // Extract unique category names from populated data
          const cats = ['All', ...new Set(list.map(p => p.categoryId?.name).filter(Boolean))];
          if (cats.length > 1) setCategories(cats);
        } else {
          return getProducts({ limit: 12, sort: 'newest' });
        }
      })
      .then((res) => {
        if (!res) return; // already handled above
        const list = res.data?.products || res.data || [];
        setProducts(list.length > 0 ? list : []);
        const cats = ['All', ...new Set(list.map(p => p.categoryId?.name).filter(Boolean))];
        if (cats.length > 1) setCategories(cats);
      })
      .catch(() => setProducts([]));
  }, []);

  // Use static products as fallback if API empty
  const apiProducts = products && products.length > 0 ? products : null;
  const useStaticFallback = products !== null && products.length === 0;
  const displayProducts = apiProducts || (useStaticFallback ? STATIC_PRODUCTS : null);

  const filtered =
    !displayProducts
      ? null
      : filter === 'All'
      ? displayProducts
      : displayProducts.filter(p => (p.categoryId?.name || p.category) === filter);

  // Build filter tabs
  const filterCategories =
    apiProducts && categories.length > 1
      ? categories
      : ['All', ...new Set(STATIC_PRODUCTS.map(p => p.category))];

  return (
    <section id="products" className="section-padding bg-white dark:bg-navy-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Offerings
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 dark:text-white mb-5">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg max-w-2xl mx-auto">
            Premium wholesale girls' clothing ready for bulk export. All styles available with custom branding and MOQ flexibility.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {filterCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Loading skeleton */}
        {filtered === null && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse h-[380px]" />
            ))}
          </div>
        )}

        {/* Products grid */}
        {filtered && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product._id || product.name} product={product} index={i} inView={inView} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
          >
            Request Full Product Catalog →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
