"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function Player({ episodes }) {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const current = episodes[index];
  const src = current?.videos?.[0]?.url;
  const subtitles = current?.subtitle || [];

  const handleEnded = () => {
    setIndex(i => (i < episodes.length - 1 ? i + 1 : i));
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // cleanup HLS lama
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    video.pause();
    video.removeAttribute("src");
    video.load();

    if (src.includes(".m3u8") && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
    } else {
      video.src = src;
    }

    video.play().catch(() => {});
  }, [index, src]);

  return (
    <div className="w-full">
      {/* VIDEO */}
      <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-4">
        <video
          ref={videoRef}
          controls
          playsInline
          className="w-full h-full"
          onEnded={handleEnded}
        >
          {subtitles.map((sub, i) => (
            <track
              key={i}
              kind="subtitles"
              src={`/api/subtitle?url=${encodeURIComponent(sub.url)}`}
              srcLang={sub.lang?.split("_")[0] || "id"}
              label={sub.lang || "Subtitle"}
              default={i === 0}
            />
          ))}
        </video>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between mb-5 text-sm">
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          className="px-4 py-2 rounded bg-white/10 text-white
                     hover:bg-white/20 disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="text-white/70">
          Episode {index + 1} / {episodes.length}
        </span>

        <button
          onClick={() =>
            setIndex(i => Math.min(episodes.length - 1, i + 1))
          }
          disabled={index === episodes.length - 1}
          className="px-4 py-2 rounded bg-white/10 text-white
                     hover:bg-white/20 disabled:opacity-40"
        >
          Next ➡
        </button>
      </div>

      {/* EPISODE LIST */}
      <div className="flex flex-wrap gap-2">
        {episodes.map((ep, i) => (
          <button
            key={ep.id ?? i}
            onClick={() => setIndex(i)}
            className={`px-3 py-1.5 text-xs rounded-full border transition
              ${
                i === index
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-white/70 hover:bg-white/10"
              }`}
          >
            Ep {ep.episode ?? i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
