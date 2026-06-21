const corsHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type"
};

export function json(statusCode, data) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(data)
  };
}

export function jsonResponse(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders
  });
}

export function emptyResponse(status = 204) {
  return new Response(null, {
    status,
    headers: corsHeaders
  });
}

export async function readJson(event) {
  if (!event.body) return {};
  return JSON.parse(event.body);
}

export async function readRequestJson(request) {
  const text = await request.text();
  return text ? JSON.parse(text) : {};
}

export function cleanDisplayName(value) {
  const name = String(value || "Guest")
    .replace(/[^\w \-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 32);
  return name || "Guest";
}

export function isGuestDisplayName(value) {
  const name = cleanDisplayName(value).toLowerCase();
  return !name || name === "guest" || name === "player" || name === "anonymous";
}

export function cleanPlayerId(value) {
  const id = String(value || "")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 80);
  return id || crypto.randomUUID();
}

export function cleanRankPoints(value) {
  return Math.max(0, Math.min(1000000000, Math.round(Number(value) || 0)));
}

export function logMetric(fn, msg, data = {}) {
  console.log(JSON.stringify({
    level: "info",
    fn,
    msg,
    at: new Date().toISOString(),
    ...data
  }));
}

export function logError(fn, msg, error, data = {}) {
  console.error(JSON.stringify({
    level: "error",
    fn,
    msg,
    at: new Date().toISOString(),
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    ...data
  }));
}
