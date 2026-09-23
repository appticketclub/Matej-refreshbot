import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RefreshBot",
  description: "Ticket reselling P&L tracker",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        {children}
      </body>
    </html>
  );
}
