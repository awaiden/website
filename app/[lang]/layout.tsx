import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "@/app/globals.css";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = "https://awaiden.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `awaiden - ${dict.hero.title}`,
      template: `%s | awaiden`,
    },
    description: dict.hero.role,
    keywords: [
      "awaiden",
      "developer",
      "full-stack",
      "open-source",
      "adn-ui",
      "react",
      "nextjs",
      "typescript",
      "web development",
    ],
    authors: [{ name: "awaiden", url: "https://github.com/awaiden" }],
    creator: "awaiden",
    icons: {
      icon: "/logo.jpeg",
      shortcut: "/logo.jpeg",
      apple: "/logo.jpeg",
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        tr: "/tr",
        es: "/es",
        de: "/de",
        fr: "/fr",
        it: "/it",
        ja: "/ja",
        zh: "/zh",
      },
    },
    openGraph: {
      title: `awaiden - ${dict.hero.title}`,
      description: dict.hero.role,
      url: `/${lang}`,
      siteName: "awaiden",
      locale: lang,
      type: "website",
      images: [
        {
          url: "/logo.jpeg",
          width: 500,
          height: 500,
          alt: "awaiden logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `awaiden - ${dict.hero.title}`,
      description: dict.hero.role,
      creator: "@_awaiden",
      images: ["/logo.jpeg"],
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
  };
}

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "tr" },
    { lang: "es" },
    { lang: "de" },
    { lang: "fr" },
    { lang: "it" },
    { lang: "ja" },
    { lang: "zh" },
  ];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
