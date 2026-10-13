import { proxyToArtistSite } from "../../../remote";

export async function POST(request: Request) {
  return proxyToArtistSite(request, "/api/internal/team/corrections", "POST");
}
