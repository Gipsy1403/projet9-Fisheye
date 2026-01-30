
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { DM_Sans } from "next/font/google";
import "./globals.css";

config.autoAddCss = false;

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Fisheye",
  description: "Site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
