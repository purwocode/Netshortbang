export async function GET(req) {
  // 🔥 MATIKAN SSL VERIFY (server only)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("No subtitle url", { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      return new Response("Failed to fetch subtitle", {
        status: res.status,
      });
    }

    const text = await res.text();

    return new Response(text, {
      headers: {
        "Content-Type": "text/vtt; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(
      "Subtitle fetch error: " + err.message,
      { status: 500 }
    );
  }
}
