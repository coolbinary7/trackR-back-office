import { proxyToArtistSite } from "../../../remote";

export async function GET(request: Request) {
  return proxyToArtistSite(request, "/api/internal/team/members", "GET");
}

export async function POST(request: Request) {
  return proxyToArtistSite(request, "/api/internal/team/members", "POST");
}

export async function PATCH(request: Request) {
  return proxyToArtistSite(request, "/api/internal/team/members", "PATCH");
}
