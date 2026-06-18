const BASE_URL = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

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
