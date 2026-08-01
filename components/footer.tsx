"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FOOTER_LABELS: Record<
  string,
  { Home: string; Projects: string; About: string; Stats: string; Contact: string; Rights: string }
> = {
  en: {
    Home: "Home",
    Projects: "Projects",
    About: "About",
    Stats: "Stats",
    Contact: "Contact",
    Rights: "All rights reserved.",
  },
  tr: {
    Home: "Ana Sayfa",
    Projects: "Projeler",
    About: "Hakkımda",
    Stats: "İstatistikler",
    Contact: "İletişim",
    Rights: "Tüm hakları saklıdır.",
  },
  es: {
    Home: "Inicio",
    Projects: "Proyectos",
    About: "Sobre mí",
    Stats: "Estadísticas",
    Contact: "Contacto",
    Rights: "Todos los derechos reservados.",
  },
  de: {
    Home: "Startseite",
    Projects: "Projekte",
    About: "Über mich",
    Stats: "Statistiken",
    Contact: "Kontakt",
    Rights: "Alle Rechte vorbehalten.",
  },
  fr: {
    Home: "Accueil",
    Projects: "Projets",
    About: "À propos",
    Stats: "Statistiques",
    Contact: "Contact",
    Rights: "Tous droits réservés.",
  },
  it: {
    Home: "Home",
    Projects: "Progetti",
    About: "Chi sono",
    Stats: "Statistiche",
    Contact: "Contatti",
    Rights: "Tutti i diritti riservati.",
  },
  ja: {
    Home: "ホーム",
    Projects: "プロジェクト",
    About: "私について",
    Stats: "統計",
    Contact: "お問い合わせ",
    Rights: "All rights reserved.",
  },
  zh: {
    Home: "首页",
    Projects: "项目",
    About: "关于我",
    Stats: "统计数据",
    Contact: "联系方式",
    Rights: "保留所有权利。",
  },
};

export function Footer() {
  const pathname = usePathname();
  const supportedLocales = ["en", "tr", "es", "de", "fr", "it", "ja", "zh"];
  const currentLocale =
    supportedLocales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)) || "en";

  const labels = FOOTER_LABELS[currentLocale] || FOOTER_LABELS.en;

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-8 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded border border-zinc-200 dark:border-zinc-800">
            <Image
              src="/logo.jpeg"
              alt="awaiden logo"
              width={20}
              height={20}
              className="h-full w-full object-cover"
            />
          </div>
          <span>
            &copy; {new Date().getFullYear()} awaiden. {labels.Rights}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-400">
          <Link href={`/${currentLocale}`} className="hover:underline">
            {labels.Home}
          </Link>
          <Link href={`/${currentLocale}/projects`} className="hover:underline">
            {labels.Projects}
          </Link>
          <Link href={`/${currentLocale}/about`} className="hover:underline">
            {labels.About}
          </Link>
          <Link href={`/${currentLocale}/stats`} className="hover:underline">
            {labels.Stats}
          </Link>
          <Link href={`/${currentLocale}/contact`} className="hover:underline">
            {labels.Contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
