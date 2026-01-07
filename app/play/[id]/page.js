import { notFound } from "next/navigation";
import Player from "./Player";

async function getDetail(shortPlayId) {
  const res = await fetch(
    `https://netshort.sansekai.my.id/api/netshort/allepisode?shortPlayId=${shortPlayId}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Fetch gagal");
  return res.json();
}

export default async function PlayPage({ params }) {
  const { id: shortPlayId } = await params;

  if (!shortPlayId) notFound();

  const data = await getDetail(shortPlayId);

  if (!data?.shortPlayEpisodeInfos?.length) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        {data.shortPlayName}
      </h1>

      <Player episodes={data.shortPlayEpisodeInfos} />
    </main>
  );
}
