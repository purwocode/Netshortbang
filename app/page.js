import Link from "next/link";

async function getHome() {
  const res = await fetch(
    "https://apiku-bucin-campuran.vercel.app/api/home",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Gagal memuat data HOME");
  }

  return res.json();
}

export default async function HomePage() {
  const { sections } = await getHome();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {sections.map((section) => (
        <section key={section.id} className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            {section.title}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {section.items.map((item) => (
              <Link
                key={item.id}
                href={`/play/${item.id}`}
                className="bg-white rounded-xl overflow-hidden shadow hover:scale-[1.02] transition"
              >
                <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                  <img
                    src={item.cover}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-2">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {item.title}
                  </h3>

                  {item.playCount && (
                    <p className="text-xs text-orange-500 mt-1">
                      🔥 {item.playCount}
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
