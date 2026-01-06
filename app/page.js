import Link from "next/link";

async function getTheaters() {
  const res = await fetch(
    "https://netshort.sansekai.my.id/api/netshort/theaters",
    {
      headers: {
        "Accept-Language": "en-US,en;q=0.9",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil theaters");
  }

  return res.json();
}

export default async function HomePage() {
  const groups = await getTheaters();

  // 🔍 DETEKSI DUPLICATE shortPlayId (GLOBAL)
  const seen = new Set();

  const cleanedGroups = groups.map((group) => {
    const uniqueContent = [];

    for (const item of group.contentInfos) {
      if (seen.has(item.shortPlayId)) continue;
      seen.add(item.shortPlayId);
      uniqueContent.push(item);
    }

    return {
      ...group,
      contentInfos: uniqueContent,
    };
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {cleanedGroups.map((group) => (
        <section key={group.groupId} className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            {group.contentName}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {group.contentInfos.map((item) => (
              <Link
                key={item.shortPlayId}
                href={`/play/${item.shortPlayId}`}
                className="bg-white rounded-xl overflow-hidden shadow hover:scale-[1.02] transition"
              >
                <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                  <img
                    src={item.shortPlayCover}
                    alt={item.shortPlayName}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-2">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {item.shortPlayName}
                  </h3>

                  {item.heatScoreShow && (
                    <p className="text-xs text-orange-500 mt-1">
                      🔥 {item.heatScoreShow}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
