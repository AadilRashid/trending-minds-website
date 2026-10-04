import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Trending Minds — Social Media & Digital Media Agency",
    template: "%s — Trending Minds",
  },
  description:
    "Trending Minds is a full-service social media and digital media agency crafting scroll-stopping content, brand strategies, and cinematic campaigns that grow your audience and drive results.",
  keywords: [
    "Trending Minds", "Social Media Agency", "Digital Media Company", "Content Creation",
    "Brand Strategy", "Social Media Marketing", "Video Production",
    "Influencer Marketing", "Paid Ads", "Creative Agency", "trendingminds.video",
  ],
  metadataBase: new URL("https://trendingminds.video"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <div className="bottom-blur" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
