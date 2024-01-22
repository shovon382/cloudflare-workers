addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Fetch the visitor's IP and country using Cloudflare's 'cf' headers
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || request.headers.get("remote-addr") || request.headers.get("cf-ray") || "Unknown";
  const country = request.headers.get("cf-ipcountry") || "Unknown";

  // Create a JSON response with the visitor's IP and country
  const jsonResponse = {
    ip,
    country,
  };

  // Convert the JSON response to a string
  const jsonString = JSON.stringify(jsonResponse);

  // Set cache headers
  const cacheHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "max-age=3600",
  };

  // Return the JSON response
  return new Response(jsonString, {
    headers: cacheHeaders,
  });
}
