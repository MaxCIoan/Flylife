export function json(statusCode, data) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    },
    body: JSON.stringify(data)
  };
}

export async function readJson(event) {
  if (!event.body) return {};
  return JSON.parse(event.body);
}

export function cleanDisplayName(value) {
  const name = String(value || "Guest")
    .replace(/[^\w \-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 32);
  return name || "Guest";
}
