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
  
      {/* EMPTY STATE */}
      {defaultQuery && results.length === 0 && (
        <p className="text-gray-500">Tidak ada hasil</p>
      )}

      {/* RESULT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map(item => (
          <div
            key={item.shortPlayId}
            onClick={() => router.push(`/play/${item.shortPlayId}`)}
            className="cursor-pointer"
          >
            <img
              src={item.shortPlayCover}
              alt={item.shortPlayName}
              className="aspect-[3/4] object-cover rounded mb-2"
            />

            {/* API mengandung <em> → HARUS RENDER HTML */}
            <h3
              className="text-sm font-semibold line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: item.shortPlayName,
              }}
            />

            {item.formatHeatScore && (
              <p className="text-xs text-orange-500">
                🔥 {item.formatHeatScore}
              </p>
            )}

            {item.starMessage && (
              <p className="text-xs text-gray-500">
                {item.starMessage}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
