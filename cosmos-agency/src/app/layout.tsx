import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalaxyBackdrop from "@/components/ui/GalaxyBackdrop";
import Preloader from "@/components/ui/Preloader";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmos Agency",
  description: "Diseño, producción audiovisual y experiencias digitales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-hidden bg-[#000000] text-white">
        <Preloader />
        <div className="relative z-10 flex min-h-full min-w-0 flex-1 flex-col">
          <GalaxyBackdrop />
          <Navbar />
          <main className="min-w-0 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
