import SearchClient from "./SearchClient";

// 🔹 Server-side search API
async function searchAPI(query) {
  if (!query) return [];

  const res = await fetch(
    `https://apiku-bucin-campuran.vercel.app/api/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();
  const items = data?.results ?? [];

  // 🔹 Sesuaikan agar seragam untuk SearchClient
  return items.map(item => ({
    id: item.id,
    source: item.source, // netshort / dramabox
    title: item.title || "",
    cover: item.cover || "",
    shortPlayId: item.id, // navigasi ke /play/[id]
    formatHeatScore: item.heat || null,
    starMessage: item.vip ? "VIP" : "",
    description: item.description || "",
    tags: item.tags || [],
  }));
}

// 🔹 Server component wajib return JSX
export default async function SearchPage(props) {
  // ✅ HARUS await searchParams
  const searchParams = await props.searchParams;
  const q = searchParams?.q ?? "";
  const results = q ? await searchAPI(q) : [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <SearchClient defaultQuery={q} results={results} />
    </main>
  );
}
