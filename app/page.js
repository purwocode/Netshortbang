import Link from "next/link";

async function getHome() {
  const res = await fetch(
    "https://sialan-five.vercel.app/api/home",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Gagal memuat data HOME");
  }

  return res.json();
}
export default async function HomePage() {
  const { sections } = await getHome();

  return (
    <main className="pt-28 pb-12 bg-black text-white">
      {sections.map(section => (
        <section key={section.id} className="mb-12">
          {/* TITLE */}
          <h2 className="px-6 text-lg md:text-xl font-semibold mb-3">
            {section.title}
          </h2>

          {/* GRID */}
          <div className="px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {section.items.map(item => (
              <Link
                key={item.id}
                href={`/play/${item.id}`}
                className="group relative rounded-md overflow-hidden bg-neutral-900"
              >
                <div className="aspect-[3/4]">
                  <img
                    src={item.cover}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-xs font-medium line-clamp-2">
                    {item.title}
                  </h3>

                  {item.playCount && (
                    <p className="text-[10px] text-orange-400 mt-1">
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

