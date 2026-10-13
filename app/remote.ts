import { env } from "cloudflare:workers";
import { getChatGPTUser } from "./chatgpt-auth";

function toHex(data: ArrayBuffer) {
  return Array.from(new Uint8Array(data), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function proxyToArtistSite(request: Request, path: string, method = request.method): Promise<Response> {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Authentification requise." }, { status: 401 });
  const config = env as typeof env & { VMA_ARTIST_SITE_ORIGIN?: string; VMA_ARTIST_SITE_TOKEN?: string; VMA_BACKOFFICE_SECRET?: string };
  const origin = config.VMA_ARTIST_SITE_ORIGIN;
  const dispatchToken = config.VMA_ARTIST_SITE_TOKEN;
  const secret = config.VMA_BACKOFFICE_SECRET;
  if (!origin || !dispatchToken || !secret) return Response.json({ error: "Connexion au backend principal non configurée." }, { status: 503 });
  let target: URL;
  try {
    target = new URL(path + new URL(request.url).search, origin);
    if (target.protocol !== "https:" || target.origin !== new URL(origin).origin) throw new Error("Invalid origin");
  } catch {
    return Response.json({ error: "Destination backend invalide." }, { status: 500 });
  }
  const email = user.email.trim().toLowerCase();
  const timestamp = String(Date.now());
  const body = ["GET", "HEAD"].includes(method.toUpperCase()) ? undefined : await request.arrayBuffer();
  const bodyHash = toHex(await crypto.subtle.digest("SHA-256", body || new ArrayBuffer(0)));
  const requestPath = target.pathname + target.search;
  const canonical = `${email}\n${timestamp}\n${method.toUpperCase()}\n${requestPath}\n${bodyHash}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = toHex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(canonical)));
  const headers = new Headers({
    "OAI-Sites-Authorization": `Bearer ${dispatchToken}`,
    "x-vma-actor-email": email,
    "x-vma-actor-time": timestamp,
    "x-vma-actor-signature": signature,
  });
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  let response: Response;
  try {
    response = await fetch(target, { method, headers, body, redirect: "manual" });
  } catch {
    return Response.json({ error: "Le backend de la plateforme est momentanément inaccessible." }, { status: 502 });
  }
  const outHeaders = new Headers();
  for (const name of ["content-type", "content-disposition", "cache-control", "x-content-type-options"]) {
    const value = response.headers.get(name);
    if (value) outHeaders.set(name, value);
  }
  outHeaders.set("cache-control", "private, no-store");
  return new Response(response.body, { status: response.status, headers: outHeaders });
}
