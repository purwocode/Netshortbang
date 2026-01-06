// app/search/page.js
import SearchClient from "./SearchClient";

async function searchNetShort(query) {
  if (!query) return [];

  const res = await fetch(
    `https://netshort.sansekai.my.id/api/netshort/search?query=${encodeURIComponent(
      query
    )}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data?.searchCodeSearchResult ?? [];
}

export default async function SearchPage(props) {
  // ✅ WAJIB DI-AWAIT
  const searchParams = await props.searchParams;

  const q = searchParams?.q ?? "";
  const results = q ? await searchNetShort(q) : [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">

      <SearchClient defaultQuery={q} results={results} />
    </main>
  );
}
