import { requireChatGPTUser } from "./chatgpt-auth";
import TeamDashboard from "./team-dashboard";
import { proxyToArtistSite } from "./remote";

export const dynamic = "force-dynamic";

export default async function Home() {
  await requireChatGPTUser("/");
  const access = await proxyToArtistSite(new Request("https://local/api/team/releases"), "/api/internal/team/releases", "GET");
  if (access.status === 403) return <main className="access-denied"><img src="/trackr-logo.png" alt="trackR"/><h1>Accès réservé à l’équipe</h1><p>Votre compte n’est pas autorisé à consulter ce back-office. Demandez à un administrateur de vous ajouter à l’équipe puis de partager ce Site avec votre compte.</p><a href="/signout-with-chatgpt?return_to=%2F">Se déconnecter</a></main>;
  if (!access.ok) return <main className="access-denied"><img src="/trackr-logo.png" alt="trackR"/><h1>Back-office indisponible</h1><p>La liaison sécurisée au portail artiste n’est pas prête. Les données n’ont pas été chargées.</p></main>;
  return <TeamDashboard />;
}
