/**
 * Vercel API proxy — forwards all /api/* requests to the Cloudflare Worker backend.
 * Set the BACKEND_URL environment variable in your Vercel project settings.
 * Example: https://your-worker.workers.dev
 */

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    res.status(500).json({ error: "BACKEND_URL environment variable is not set" });
    return;
  }

  const targetUrl = `${backendUrl}${req.url}`;

  // Collect request body
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks);

  // Forward headers, excluding hop-by-hop headers
  const excludeHeaders = new Set(["host", "connection", "transfer-encoding", "upgrade"]);
  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (!excludeHeaders.has(key.toLowerCase()) && value) {
      headers[key] = value;
    }
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: body.length > 0 ? body : undefined,
    });

    // Forward response headers
    const excludeResponseHeaders = new Set(["transfer-encoding", "connection"]);
    for (const [key, value] of response.headers.entries()) {
      if (!excludeResponseHeaders.has(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    }

    res.status(response.status).send(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(502).json({ error: "Bad gateway" });
  }
}
