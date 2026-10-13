import type { Metadata } from "next";
import "./globals.css";
import "./backoffice.css";
import "./access.css";

export const metadata: Metadata = {
  title: "trackR — Back-office équipe",
  description: "Espace interne de suivi des mises en ligne trackR.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
