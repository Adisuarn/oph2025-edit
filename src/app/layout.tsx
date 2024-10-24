import "@/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "oph2025-edit",
  description: "Edit your OPH2025 profile",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-Thai">{children}</body>
    </html>
  );
}
