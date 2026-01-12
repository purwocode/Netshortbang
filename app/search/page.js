import SearchClient from "./SearchClient";

// 🔹 Server-side search API
async function searchAPI(query) {
  if (!query) return [];

  const res = await fetch(
    `https://sialan-five.vercel.app/api/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();
  const items = data?.results ?? [];

  return items.map(item => ({
    id: item.id,
    source: item.source,
    title: item.title || "",
    cover: item.cover || "",
    shortPlayId: item.id,
    formatHeatScore: item.heat || null,
    starMessage: item.vip ? "VIP" : "",
    description: item.description || "",
    tags: item.tags || [],
  }));
}

// ✅ FIXED SERVER COMPONENT
export default async function SearchPage(props) {
  const searchParams = await props.searchParams; // 🔑 WAJIB
  const q = searchParams?.q ?? "";

  const results = q ? await searchAPI(q) : [];

  return <SearchClient defaultQuery={q} results={results} />;
}
