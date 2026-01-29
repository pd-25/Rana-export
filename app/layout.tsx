import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "./scss/home.scss";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Rana Export | Trading House",
  description: "Explore mindfulness through sacred sound",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeRegistry>
          <Header />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
