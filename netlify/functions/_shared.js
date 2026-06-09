export function json(statusCode, data) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
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
