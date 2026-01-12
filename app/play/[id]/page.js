import { notFound } from "next/navigation";
import Player from "./Player";

async function getDetail(id) {
  // ✅ pakai relative URL → otomatis local / production
  const res = await fetch(`https://sialan-five.vercel.app/api/episode?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fetch gagal");
  return res.json();
}

export default async function PlayPage({ params }) {
  const { id } = await params;
  if (!id) notFound();

  const data = await getDetail(id);
  if (!data?.episodes?.length) notFound();

  return (
    <main className="pt-28 pb-12 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-lg md:text-xl font-semibold mb-4 line-clamp-2">
          {data.title || "Video Player"}
        </h1>

        {/* Player yang akan handle proxy stream */}
        <Player episodes={data.episodes} />
      </div>
    </main>
  );
}
