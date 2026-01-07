import Player from "./Player"; // karena satu folder
import { notFound } from "next/navigation";

export default async function PlayPage({ params }) {
  // ✅ akses langsung params.id
  const id = params?.id;

  if (!id) return notFound();

  const res = await fetch(
    `https://apiku-bucin-campuran.vercel.app/api/episode?id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const data = await res.json();

  // ✅ pastikan episodes selalu array
  const episodes = Array.isArray(data?.episodes) ? data.episodes : [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <Player episodes={episodes} />
    </main>
  );
}
