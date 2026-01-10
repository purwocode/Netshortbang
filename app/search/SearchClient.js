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
    <div className="pt-28 pb-12 px-6 bg-black text-white">
      {/* EMPTY STATE */}
      {defaultQuery && results.length === 0 && (
        <p className="text-sm text-white/60">
          Tidak ada hasil untuk <span className="text-white">"{defaultQuery}"</span>
        </p>
      )}

      {/* RESULT GRID */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map(item => (
          <div
            key={item.id}
            onClick={() => router.push(`/play/${item.id}`)}
            className="group cursor-pointer"
          >
            {/* COVER */}
            <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-neutral-900">
              <img
                src={item.cover}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover
                  group-hover:scale-105 transition duration-300"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/60 opacity-0
                group-hover:opacity-100 transition" />

              {/* HEAT */}
              {item.formatHeatScore && (
                <div className="absolute top-2 left-2 text-[10px]
                  bg-black/70 px-2 py-0.5 rounded text-orange-400">
                  🔥 {item.formatHeatScore}
                </div>
              )}
            </div>

            {/* TITLE */}
            <h3
              className="mt-2 text-sm font-medium line-clamp-2"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />

            {/* STAR / VIP */}
            {item.starMessage && (
              <p className="text-xs text-white/60 mt-0.5">
                {item.starMessage}
              </p>
            )}

            {/* TAGS */}
            {item.tags && item.tags.length > 0 && (
              <p className="text-xs text-white/40 mt-0.5 line-clamp-1">
                {item.tags.join(", ")}
              </p>
            )}

            {/* DESCRIPTION */}
            {item.description && (
              <p className="text-xs text-white/50 mt-1 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
