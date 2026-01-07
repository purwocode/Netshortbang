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
  // ✅ unwrap params jika Promise
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) notFound();

  const data = await getDetail(id);

  if (!data?.episodes?.length) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        {data.title || "Video Player"}
      </h1>

      <Player episodes={data.episodes} />
    </main>
  );
}
