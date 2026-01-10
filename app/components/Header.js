"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const isSearch = pathname.startsWith("/search");

  function handleSubmit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (open) setOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all
        ${scrolled
          ? "bg-black/90 backdrop-blur border-b border-white/10"
          : "bg-gradient-to-b from-black/70 to-transparent"}
      `}
    >
      {/* TOP BAR */}
      <div className="flex items-center h-16 px-6">
        {/* LOGO */}
        <Link
          href="/"
          className="font-extrabold text-xl tracking-wide text-red-600"
        >
          BUCIN
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2 ml-6">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition
              ${isHome
                ? "bg-red-600 text-white shadow shadow-red-600/30"
                : "text-white/80 hover:bg-white/10"}
            `}
          >
            Home
          </Link>

          
        </div>

        {/* DESKTOP SEARCH */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center gap-2 max-w-xs flex-1 ml-4"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="w-full bg-white/10 text-sm text-white px-4 py-2
              rounded-full placeholder-white/60
              focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </form>

        {/* HAMBURGER */}
      <button
  onClick={() => setOpen(!open)}
  className="ml-auto md:hidden text-2xl text-white/90
    hover:text-white active:scale-95 transition"
  aria-label="Menu"
>
  ☰
</button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`text-sm font-medium
                ${isHome ? "text-red-500" : "text-white/80"}
              `}
            >
              Home
            </Link>


            {/* MOBILE SEARCH */}
            <form onSubmit={handleSubmit} className="pt-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white/10 text-sm text-white px-4 py-2
                  rounded-full placeholder-white/60
                  focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
