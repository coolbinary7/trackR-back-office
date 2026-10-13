import { proxyToArtistSite } from "../../../remote";

export async function GET(request: Request) {
  return proxyToArtistSite(request, "/api/internal/team/releases", "GET");
}
