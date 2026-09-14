import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/ui/MotionProvider";
import "@/styles/tailwind.css";
import "@/styles/globals.scss";
import "@/styles/sections.scss";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sirat-counselling.famous-myna-4321.chatgpt.site"),
  title: {
    default: "Sirat — Amina Fathima, Counselling Psychologist",
    template: "%s | Sirat",
  },
  description:
    "Confidential, client-centered counselling for emotional wellbeing, relationships, life transitions and workplace mental health. M.Sc. Counselling Psychology.",
  keywords: [
    "counselling psychologist",
    "counselling",
    "therapy",
    "mental health",
    "anxiety",
    "relationships",
    "workplace mental health",
    "EAP",
    "counselling psychology",
  ],
  authors: [{ name: "Amina Fathima" }],
  openGraph: {
    title: "Sirat — Amina Fathima, Counselling Psychologist",
    description:
      "A safe space to understand, process and move forward. Confidential counselling for individuals, couples and organizations.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
