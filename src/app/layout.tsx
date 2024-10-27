import "@/styles/globals.css";

import { type Metadata } from "next";
import { CookiesProvider } from 'next-client-cookies/server'

export const metadata: Metadata = {
  title: "oph2025-edit",
  description: "Editting your OPH2025 information",
  icons: [{ rel: "icon", url: "/public/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <CookiesProvider>
        <html lang="en">
         <body className="font-Thai">{children}</body>
        </html>
      </CookiesProvider>
  );
}
