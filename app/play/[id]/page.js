import { notFound } from "next/navigation";
import Player from "./Player";

async function getDetail(id) {
  const res = await fetch(
    `https://apiku-bucin-campuran.vercel.app/api/episode?id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Fetch gagal");
  return res.json();
}

export default async function PlayPage({ params }) {
  // ✅ unwrap params (Next.js terbaru)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) notFound();

  const data = await getDetail(id);

  if (!data?.episodes?.length) {
    notFound();
  }

  return (
    <main className="pt-28 pb-12 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* TITLE */}
        <h1 className="text-lg md:text-xl font-semibold mb-4 line-clamp-2">
          {data.title || "Video Player"}
        </h1>

        {/* PLAYER */}
        <Player episodes={data.episodes} />
      </div>
    </main>
  );
}
