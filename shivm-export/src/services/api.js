const BASE_URL = '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('admin_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { headers, ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const loginAdmin = (body) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(body) });

export const getProfile = () => request('/auth/profile');

// ── Products ──────────────────────────────────────────────────────────────────
export const getFeaturedProducts = () => request('/products/featured');
export const getProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/products${qs ? `?${qs}` : ''}`);
};

// ── Categories ────────────────────────────────────────────────────────────────
export const getCategories = () => request('/categories');

// ── Banners ───────────────────────────────────────────────────────────────────
export const getBanners = () => request('/banners');

// ── Inquiries ─────────────────────────────────────────────────────────────────
export const submitInquiry = (body) =>
  request('/inquiries', { method: 'POST', body: JSON.stringify(body) });

// ── Admin — Categories ────────────────────────────────────────────────────────
export const createCategory = (formData) =>
  request('/categories', { method: 'POST', headers: {}, body: formData });
export const updateCategory = (id, formData) =>
  request(`/categories/${id}`, { method: 'PUT', headers: {}, body: formData });
export const deleteCategory = (id) =>
  request(`/categories/${id}`, { method: 'DELETE' });

// ── Admin — Products ──────────────────────────────────────────────────────────
export const getAdminProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/products/admin/all${qs ? `?${qs}` : ''}`);
};
export const createProduct = (formData) =>
  request('/products', { method: 'POST', headers: {}, body: formData });
export const updateProduct = (id, formData) =>
  request(`/products/${id}`, { method: 'PUT', headers: {}, body: formData });
export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: 'DELETE' });

// ── Admin — Banners ───────────────────────────────────────────────────────────
export const getBannersAdmin = () => request('/banners?all=true');
export const createBanner = (formData) =>
  request('/banners', { method: 'POST', headers: {}, body: formData });
export const deleteBanner = (id) =>
  request(`/banners/${id}`, { method: 'DELETE' });

// ── Admin — Inquiries ─────────────────────────────────────────────────────────
export const getInquiries = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/inquiries${qs ? `?${qs}` : ''}`);
};
export const updateInquiryStatus = (id, status) =>
  request(`/inquiries/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
