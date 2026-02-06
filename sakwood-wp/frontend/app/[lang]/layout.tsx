import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/ui/SkipLink";
import { getMenu } from "@/lib/services/menuService";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";
import { CartProvider } from "@/lib/context/CartContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { CompareProvider } from "@/lib/context/CompareContext";
import { ChatProvider } from "@/lib/context/ChatContext";
import { OrganizationStructuredData } from "@/components/seo/OrganizationStructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { ChatButtons } from "@/components/chat";
import { PromotionalPopup } from "@/components/ui/PromotionalPopup";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakwood.com";
  const isThai = lang === 'th';

  return {
    title: {
      default: isThai
        ? "Sakwood - ผู้จำหน่ายไม้คุณภาพสูงในประเทศไทย"
        : "Sakwood - Premium Wood Products Supplier in Thailand",
      template: "%s | Sakwood"
    },
    description: isThai
      ? "พันธมิตรที่เชื่อถือได้ของประเทศไทยในด้านไม้สนโครงสร้าง เพลย์วูดทางเรือ และไม้วิศวกรรม ผลิตภัณฑ์ไม้คุณภาพสำหรับการก่อสร้าง ขายส่ง และการใช้งานอุตสาหกรรม พร้อมบริการจัดส่งภายในวันในกรุงเทพฯ"
      : "Thailand's trusted supplier of structural pine, marine plywood, and engineering timber. Quality wood products for construction, wholesale, and industrial use with same-day delivery in Bangkok.",
    keywords: isThai ? [
      "ผู้จำหน่ายไม้ไทย",
      "ไม้สนโครงสร้างไทย",
      "เพลย์วูดทางเรือกรุงเทพฯ",
      "เพลย์วูดขายส่ง",
      "ไม้วิศวกรรม",
      "ไม้ก่อสร้าง",
      "ไม้อุตสาหกรรม",
      "ผลิตภัณฑ์ไม้",
      "Sakwood",
      "บริการจัดส่งไม้กรุงเทพฯ"
    ] : [
      "wood supplier Thailand",
      "structural pine Thailand",
      "marine plywood Bangkok",
      "wholesale plywood",
      "engineering timber",
      "construction wood",
      "industrial timber",
      "wood products",
      "Sakwood",
      "wood delivery Bangkok"
    ],
    authors: [{ name: "Sakwood" }],
    creator: "Sakwood",
    publisher: "Sakwood",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'th': `${siteUrl}/th`,
        'en': `${siteUrl}/en`,
        'x-default': `${siteUrl}/th`
      },
    },
    openGraph: {
      type: "website",
      locale: isThai ? "th_TH" : "en_US",
      alternateLocale: ['th_TH', 'en_US'],
      url: `${siteUrl}/${lang}`,
      title: isThai
        ? "Sakwood - ผู้จำหน่ายไม้คุณภาพสูงในประเทศไทย"
        : "Sakwood - Premium Wood Products Supplier in Thailand",
      description: isThai
        ? "พันธมิตรที่เชื่อถือได้ของประเทศไทยในด้านไม้สนโครงสร้าง เพลย์วูดทางเรือ และไม้วิศวกรรม ผลิตภัณฑ์ไม้คุณภาพ พร้อมบริการจัดส่งภายในวันในกรุงเทพฯ"
        : "Thailand's trusted supplier of structural pine, marine plywood, and engineering timber. Quality wood products with same-day delivery in Bangkok.",
      siteName: "Sakwood",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isThai ? "Sakwood - ผลิตภัณฑ์ไม้คุณภาพสูง" : "Sakwood - Premium Wood Products"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: isThai
        ? "Sakwood - ผู้จำหน่ายไม้คุณภาพสูงในประเทศไทย"
        : "Sakwood - Premium Wood Products Supplier in Thailand",
      description: isThai
        ? "พันธมิตรที่เชื่อถือได้ของประเทศไทยในด้านไม้สนโครงสร้าง เพลย์วูดทางเรือ และไม้วิศวกรรม ผลิตภัณฑ์ไม้คุณภาพ พร้อมบริการจัดส่งภายในวันในกรุงเทพฯ"
        : "Thailand's trusted supplier of structural pine, marine plywood, and engineering timber. Quality wood products with same-day delivery in Bangkok.",
      images: [`${siteUrl}/og-image.jpg`],
      creator: "@sakwood"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakwood.com";

  // Fetch primary menu from WordPress based on current language and dictionary
  const menuItems = await getMenu(lang);
  const dictionary = await getDictionary(lang as Locale);

  return (
    <>
      <GoogleAnalytics />
      <OrganizationStructuredData siteUrl={siteUrl} />
      <SkipLink />
      <AuthProvider>
        <CartProvider>
          <CompareProvider>
            <ChatProvider>
              <Header menuItems={menuItems} lang={lang as Locale} dictionary={dictionary} />
              <main id="main-content" className="bg-transparent">{children}</main>
              <Footer lang={lang as Locale} />
              <ChatButtons dictionary={dictionary} />
              <PromotionalPopup />
            </ChatProvider>
          </CompareProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
