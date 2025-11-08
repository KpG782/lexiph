import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";

// Manrope - Body font
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Outfit - Display/Heading font
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LexiPH - Philippine Legal Compliance Assistant",
  description: "Your AI-powered Philippine legal compliance assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
