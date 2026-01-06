"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function Player({ episodes }) {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);

  const current = episodes[index];
  const src = current?.playVoucher;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // RESET
    video.pause();
    video.removeAttribute("src");
    video.load();

    // HLS (.m3u8)
    if (src.includes(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });

        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });

        return () => hls.destroy();
      }
    }

    // MP4 fallback
    video.src = src;
    video.play().catch(() => {});
  }, [index, src]);

  return (
    <div>
      {/* VIDEO */}
      <div className="aspect-video bg-black rounded overflow-hidden mb-4">
        <video
          ref={videoRef}
          controls
          playsInline
          className="w-full h-full"
        />
      </div>

      {/* CONTROLS */}
      <div className="flex justify-between mb-3">
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          ⬅ Prev
        </button>

        <span>
          Episode {index + 1} / {episodes.length}
        </span>

        <button
          onClick={() => setIndex(i => Math.min(episodes.length - 1, i + 1))}
          disabled={index === episodes.length - 1}
        >
          Next ➡
        </button>
      </div>

      {/* EPISODE LIST */}
      <div className="flex flex-wrap gap-2">
        {episodes.map((ep, i) => (
          <button
            key={ep.episodeNo ?? i}
            onClick={() => setIndex(i)}
            className={`px-2 py-1 text-xs border rounded
              ${i === index ? "bg-black text-white" : ""}
            `}
          >
            Ep {ep.episodeNo ?? i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
