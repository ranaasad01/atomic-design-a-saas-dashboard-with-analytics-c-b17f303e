import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: {
    default: "DaticsAI — E-commerce & Sales Intelligence",
    template: "%s | DaticsAI",
  },
  description:
    "Your real-time e-commerce intelligence hub. Monitor revenue, orders, and customer growth — all in one place.",
  openGraph: {
    title: "DaticsAI — E-commerce & Sales Intelligence",
    description:
      "Your real-time e-commerce intelligence hub. Monitor revenue, orders, and customer growth — all in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased min-h-screen">
        <LocaleProvider>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <LanguageToggle />
          </Providers>
        </LocaleProvider>
      </body>
    </html>
  );
}