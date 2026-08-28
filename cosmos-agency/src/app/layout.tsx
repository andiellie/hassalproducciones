import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { LanguageProvider } from "@/lib/language";
import { ThemeProvider } from "@/lib/theme";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmos Agency",
  description: "Producción audiovisual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${archivo.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full min-w-0 flex-col overflow-x-hidden text-white">
        <ThemeProvider>
          <LanguageProvider>
            <Preloader />
            <div id="theme-filter-wrapper" className="relative z-10 flex min-h-full min-w-0 flex-1 flex-col bg-[#000000]">
              <Navbar />
              <main className="min-w-0 flex-1">{children}</main>
              <Footer />
            </div>
            <div id="cta-portal-root" className="relative z-[60]" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
