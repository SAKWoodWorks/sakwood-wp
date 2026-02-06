import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sarabun',
});

export const metadata: Metadata = {
  title: "SAK WoodWorks - Premium Wood Products",
  description: "Premium wood products supplier in Thailand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${sarabun.variable} scroll-smooth`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
