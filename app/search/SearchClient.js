"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchClient({ defaultQuery, results }) {
  const router = useRouter();
  const [q, setQ] = useState(defaultQuery);

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      {/* FORM SEARCH */}
      <form onSubmit={submit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Cari drama / short..."
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Cari
        </button>
      </form>

      {/* EMPTY STATE */}
      {defaultQuery && results.length === 0 && (
        <p className="text-gray-500">Tidak ada hasil</p>
      )}

      {/* RESULT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map(item => (
          <div
            key={item.id}
            onClick={() => router.push(`/play/${item.id}`)}
            className="cursor-pointer"
          >
            {/* COVER */}
            <img
              src={item.cover}
              alt={item.title}
              className="aspect-[3/4] object-cover rounded mb-2"
            />

            {/* TITLE (support HTML dari API) */}
            <h3
              className="text-sm font-semibold line-clamp-2"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />

            {/* HEAT / SCORE */}
            {item.formatHeatScore && (
              <p className="text-xs text-orange-500">🔥 {item.formatHeatScore}</p>
            )}

            {/* VIP / STAR MESSAGE */}
            {item.starMessage && (
              <p className="text-xs text-gray-500">{item.starMessage}</p>
            )}

            {/* TAGS */}
            {item.tags && item.tags.length > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {item.tags.join(", ")}
              </p>
            )}

            {/* DESCRIPTION */}
            {item.description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
