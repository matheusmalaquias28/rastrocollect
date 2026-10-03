import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import MotionProvider from "@/components/motion/MotionProvider";
import Cursor from "@/components/motion/Cursor";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rastro Collect | O universo TCG em um novo formato de varejo",
  description: site.description,
  openGraph: {
    title: "Rastro Collect",
    description: site.description,
    locale: "pt_BR",
    type: "website",
    siteName: "Rastro Collect",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rastro Collect",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Roda antes da pintura: habilita estados iniciais das animações
const bootScript = `(function(){document.documentElement.classList.add('js');if('scrollRestoration' in history)history.scrollRestoration='manual';})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
