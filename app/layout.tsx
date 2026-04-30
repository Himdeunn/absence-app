import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "InkWell — Kinetic Minimalism Attendance System",
    template: "%s | InkWell"
  },
  description: "InkWell is a high-end, kinetic minimalist attendance platform featuring selfie verification, geolocation, and real-time analytics. Designed for the modern professional.",
  keywords: ["Attendance System", "InkWell", "Kinetic Minimalism", "HR Software", "Selfie Attendance", "Geolocation Tracking", "Professional HR Tools", "Modern Attendance"],
  authors: [{ name: "InkWell Team", url: "https://inkwell.app" }],
  creator: "InkWell",
  publisher: "InkWell Corp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://inkwell.himdeunn.my.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "InkWell — Kinetic Minimalism Attendance",
    description: "The future of attendance management. Accurate. Professional. Minimalist.",
    url: "https://inkwell.himdeunn.my.id",
    siteName: "InkWell",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "InkWell Brand Identity",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InkWell — Kinetic Minimalism Attendance",
    description: "One touch for your professionalism. The most advanced attendance system.",
    images: ["/logo.jpg"],
    creator: "@inkwell",
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
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <SessionProvider>
          <LanguageProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  "name": "InkWell",
                  "operatingSystem": "Web",
                  "applicationCategory": "BusinessApplication",
                  "description": "Kinetic Minimalism Attendance System with Selfie and Geolocation verification.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                })
              }}
            />
            {children}
            <Toaster position="top-center" richColors closeButton />
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
