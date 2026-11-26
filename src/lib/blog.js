const BASE = import.meta.env.VITE_BLOG_API || "https://api.gascpns.id/api/v1/blog";

export const LANDING = "https://gascpns.id";
export const APP = "https://app.gascpns.id";
export const utm = (medium) => `utm_source=blog&utm_medium=${medium}&utm_campaign=cpns2027`;

export async function listArticles(page = 1) {
  const res = await fetch(`${BASE}?page=${page}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const data = json?.data || {};
  return {
    items: data.data || [],
    page: data.current_page || 1,
    lastPage: data.last_page || 1,
  };
}

// Resolves to null when the slug does not exist (API answers 404).
export async function getArticle(slug) {
  const res = await fetch(`${BASE}/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json?.blog ? { ...json.blog, readTime: json.readTime ?? json.blog.readTime } : null;
}

export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export function excerpt(html, words = 32) {
  const text = (html || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const parts = text.split(" ");
  return parts.length > words ? `${parts.slice(0, words).join(" ")}...` : text;
}

export function setMeta(title, description) {
  document.title = title;
  const tag = document.querySelector('meta[name="description"]');
  if (tag && description) tag.setAttribute("content", description);
}
