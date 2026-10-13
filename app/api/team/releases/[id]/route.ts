import { proxyToArtistSite } from "../../../../remote";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^\d+$/.test(id)) return Response.json({ error: "Référence invalide." }, { status: 400 });
  return proxyToArtistSite(request, `/api/internal/team/releases/${id}`, "GET");
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^\d+$/.test(id)) return Response.json({ error: "Référence invalide." }, { status: 400 });
  return proxyToArtistSite(request, `/api/internal/team/releases/${id}`, "PATCH");
}
