import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "./scss/home.scss";
import "./scss/header.scss";
import "./scss/collection.scss";
import "./scss/category.scss";
import "./scss/single.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import ThemeRegistry from "./ThemeRegistry";
import { CartWishlistProvider } from "@/context/CartWishlistContext";

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
          <CartWishlistProvider>
            <Header />
            {children}
            <Footer />
          </CartWishlistProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
