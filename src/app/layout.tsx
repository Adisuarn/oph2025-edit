import "@/styles/globals.css";

import Secret from "@/components/Secret";
import { CookiesProvider } from 'next-client-cookies/server'
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "oph2025-edit",
  description: "Edit your OPH2025 information",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CookiesProvider>
      <html lang="en">
        <body className="font-Thai">
          {children}
          <Secret />
        </body>
      </html>
    </CookiesProvider>
  );
}
