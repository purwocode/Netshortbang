"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3">

        {/* TOP BAR */}
        <div className="flex items-center gap-4">
          {/* LOGO */}
          <Link href="/" className="font-bold text-xl text-orange-600">
            BUCIN
          </Link>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSubmit}
            className="hidden sm:flex flex-1 max-w-md items-center gap-2"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search drama, title..."
              className="w-full px-4 py-2 rounded-full border
                focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-orange-500
                text-white hover:bg-orange-600"
            >
              🔍
            </button>
          </form>

          {/* HOME BUTTON */}
          <Link
            href="/"
            className="ml-auto text-sm font-medium px-4 py-2
              rounded-full border hover:bg-orange-50"
          >
            Home
          </Link>
        </div>

        {/* MOBILE SEARCH (INI YANG KAMU BUTUHKAN) */}
        <form
          onSubmit={handleSubmit}
          className="flex sm:hidden items-center gap-2"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search drama..."
            className="flex-1 px-4 py-2 rounded-full border
              focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-orange-500
              text-white"
          >
            🔍
          </button>
        </form>
      </div>
    </header>
  );
}
