import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiTag, FiPackage, FiMail, FiLogOut, FiTrash2, FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import {
  getCategories, getAdminProducts, getInquiries,
  deleteCategory, deleteProduct, updateInquiryStatus,
  createCategory, createProduct,
} from '../services/api';

// ── Reusable stat card ────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <div className={`bg-navy-800/60 border border-white/10 rounded-2xl p-5 flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}>{icon}</div>
      <div>
        <div className="text-white/40 text-xs font-semibold uppercase tracking-wide">{label}</div>
        <div className="text-white text-2xl font-bold">{value ?? '—'}</div>
      </div>
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    contacted: 'bg-blue-500/20 text-blue-400',
    closed: 'bg-emerald-500/20 text-emerald-400',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${map[status] || ''}`}>
      {status}
    </span>
  );
}

// ── Categories Tab ────────────────────────────────────────────────────────────
function CategoriesTab() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', image: null });
  const [adding, setAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    getCategories().then(r => setCats(r.data?.categories || [])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    const fd = new FormData();
    fd.append('name', form.name);
    if (form.image) fd.append('image', form.image);
    try {
      await createCategory(fd);
      setForm({ name: '', image: null });
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.message);
    } finally { setAdding(false); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    await deleteCategory(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-bold text-xl">Categories ({cats.length})</h2>
        <button onClick={() => setShowForm(s => !s)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-all">
          <FiPlus size={15} /> Add Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-navy-800/60 border border-white/10 rounded-2xl p-5 mb-6 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-48">
            <label className="text-white/50 text-xs mb-1 block">Category Name</label>
            <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Girls Dresses"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-emerald-500/60" />
          </div>
          <div className="flex-1 min-w-48">
            <label className="text-white/50 text-xs mb-1 block">Image (optional)</label>
            <input type="file" accept="image/*" onChange={e => setForm(p => ({ ...p, image: e.target.files[0] }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white/60 text-sm outline-none" />
          </div>
          <button type="submit" disabled={adding}
            className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold disabled:opacity-60">
            {adding ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={() => setShowForm(false)}
            className="px-5 py-2.5 bg-white/5 text-white/60 rounded-xl text-sm">Cancel</button>
        </form>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map(cat => (
            <div key={cat._id} className="bg-navy-800/60 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 hover:border-white/20 transition-all">
              {cat.image?.url
                ? <img src={cat.image.url} alt={cat.name} className="w-full h-24 object-cover rounded-xl" />
                : <div className="w-full h-24 rounded-xl bg-white/5 flex items-center justify-center text-3xl">🏷️</div>
              }
              <div className="text-white font-semibold text-sm truncate">{cat.name}</div>
              <button onClick={() => handleDelete(cat._id, cat.name)}
                className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs transition-colors">
                <FiTrash2 size={12} /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Products Tab ──────────────────────────────────────────────────────────────
function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', categoryId: '', price: '', stock: '', heroImage: null });

  const load = () => {
    setLoading(true);
    getAdminProducts({ limit: 50 }).then(r => setProducts(r.data?.products || [])).finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
    getCategories().then(r => setCats(r.data?.categories || []));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v && k !== 'heroImage') fd.append(k, v); });
    if (form.heroImage) fd.append('heroImage', form.heroImage);
    try {
      await createProduct(fd);
      setShowForm(false);
      setForm({ title: '', description: '', categoryId: '', price: '', stock: '', heroImage: null });
      load();
    } catch (err) { alert(err.message); }
    finally { setAdding(false); }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await deleteProduct(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-bold text-xl">Products ({products.length})</h2>
        <button onClick={() => setShowForm(s => !s)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-all">
          <FiPlus size={15} /> Add Product
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-navy-800/60 border border-white/10 rounded-2xl p-5 mb-6 grid sm:grid-cols-2 gap-4">
          {[
            { key: 'title', label: 'Title', type: 'text', required: true },
            { key: 'price', label: 'Price ($)', type: 'number', required: true },
            { key: 'stock', label: 'Stock (units)', type: 'number', required: true },
          ].map(f => (
            <div key={f.key}>
              <label className="text-white/50 text-xs mb-1 block">{f.label}</label>
              <input type={f.type} required={f.required} value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-emerald-500/60" />
            </div>
          ))}
          <div>
            <label className="text-white/50 text-xs mb-1 block">Category</label>
            <select required value={form.categoryId} onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))}
              className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-emerald-500/60">
              <option value="">Select Category</option>
              {cats.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-white/50 text-xs mb-1 block">Description</label>
            <textarea required rows={3} value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-emerald-500/60 resize-none" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1 block">Hero Image</label>
            <input type="file" accept="image/*" onChange={e => setForm(p => ({ ...p, heroImage: e.target.files[0] }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white/60 text-sm outline-none" />
          </div>
          <div className="flex gap-3 items-end">
            <button type="submit" disabled={adding}
              className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold disabled:opacity-60">
              {adding ? 'Saving...' : 'Save Product'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2.5 bg-white/5 text-white/60 rounded-xl text-sm">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs uppercase tracking-wide border-b border-white/10">
                <th className="text-left py-3 pr-4">Product</th>
                <th className="text-left py-3 pr-4">Category</th>
                <th className="text-left py-3 pr-4">Price</th>
                <th className="text-left py-3 pr-4">Stock</th>
                <th className="text-left py-3 pr-4">Status</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p._id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4 text-white font-medium">{p.title}</td>
                  <td className="py-3 pr-4 text-white/50">{p.categoryId?.name || '—'}</td>
                  <td className="py-3 pr-4 text-emerald-400">${p.price}</td>
                  <td className="py-3 pr-4 text-white/70">{p.stock}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${p.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button onClick={() => handleDelete(p._id, p.title)} className="text-red-400 hover:text-red-300 transition-colors">
                      <FiTrash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p className="text-white/30 text-center py-10">No products yet</p>}
        </div>
      )}
    </div>
  );
}

// ── Inquiries Tab ─────────────────────────────────────────────────────────────
function InquiriesTab() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const load = () => {
    setLoading(true);
    getInquiries(filter ? { status: filter } : {})
      .then(r => setInquiries(r.data?.inquiries || []))
      .finally(() => setLoading(false));
  };
  useEffect(load, [filter]);

  const handleStatus = async (id, status) => {
    await updateInquiryStatus(id, status);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-white font-bold text-xl">Inquiries ({inquiries.length})</h2>
        <div className="flex gap-2">
          {['', 'pending', 'contacted', 'closed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === s ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
              {s || 'All'}
            </button>
          ))}
          <button onClick={load} className="p-1.5 text-white/40 hover:text-white transition-colors"><FiRefreshCw size={14} /></button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : inquiries.length === 0 ? (
        <p className="text-white/30 text-center py-16">No inquiries found</p>
      ) : (
        <div className="space-y-3">
          {inquiries.map(inq => (
            <div key={inq._id} className="bg-navy-800/60 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-white font-semibold">{inq.customerName}</div>
                  <div className="text-white/40 text-xs mt-0.5">{inq.phone} {inq.email && `· ${inq.email}`}</div>
                  {inq.message && <div className="text-white/60 text-sm mt-2 max-w-xl">{inq.message}</div>}
                  <div className="text-white/30 text-xs mt-2">{new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={inq.status} />
                  {inq.status === 'pending' && (
                    <button onClick={() => handleStatus(inq._id, 'contacted')}
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-semibold hover:bg-blue-500/30 transition-all">
                      Mark Contacted
                    </button>
                  )}
                  {inq.status === 'contacted' && (
                    <button onClick={() => handleStatus(inq._id, 'closed')}
                      className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold hover:bg-emerald-500/30 transition-all">
                      Mark Closed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState({});

  useEffect(() => {
    Promise.all([
      getCategories(),
      getAdminProducts({ limit: 1 }),
      getInquiries({ limit: 1 }),
    ]).then(([cats, prods, inqs]) => {
      setStats({
        categories: (cats.data?.categories || []).length,
        products: prods.data?.pagination?.total || 0,
        inquiries: inqs.data?.pagination?.total || 0,
      });
    }).catch(() => {});
  }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FiGrid size={16} /> },
    { id: 'categories', label: 'Categories', icon: <FiTag size={16} /> },
    { id: 'products', label: 'Products', icon: <FiPackage size={16} /> },
    { id: 'inquiries', label: 'Inquiries', icon: <FiMail size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-56 bg-navy-900/80 backdrop-blur-sm border-r border-white/10 flex flex-col z-50">
        <div className="p-5 border-b border-white/10">
          <div className="font-display font-bold text-lg text-white">ShivM</div>
          <div className="text-white/40 text-xs">Admin Panel</div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t.id ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-white/60 text-xs mb-1 truncate">{user?.name}</div>
          <div className="text-white/30 text-xs mb-3 truncate">{user?.email}</div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-all">
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-56 p-8 min-h-screen">
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-white/40 text-sm mb-8">Here's what's happening with your store.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              <StatCard icon="🏷️" label="Categories" value={stats.categories} color="bg-purple-500/10 text-purple-400" />
              <StatCard icon="📦" label="Products" value={stats.products} color="bg-emerald-500/10 text-emerald-400" />
              <StatCard icon="📩" label="Total Inquiries" value={stats.inquiries} color="bg-blue-500/10 text-blue-400" />
            </div>
            <div className="bg-navy-800/60 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                {[['Categories', 'categories'], ['Products', 'products'], ['Inquiries', 'inquiries']].map(([label, id]) => (
                  <button key={id} onClick={() => setTab(id)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 text-white/60 rounded-xl text-sm font-medium border border-white/10 hover:border-emerald-500/30 transition-all">
                    Manage {label} →
                  </button>
                ))}
                <a href="/" target="_blank"
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 rounded-xl text-sm font-medium border border-white/10 transition-all">
                  View Website ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
        {tab === 'categories' && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><CategoriesTab /></motion.div>}
        {tab === 'products' && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><ProductsTab /></motion.div>}
        {tab === 'inquiries' && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><InquiriesTab /></motion.div>}
      </div>
    </div>
  );
}
