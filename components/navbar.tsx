"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageDropdown } from "@/components/language-dropdown";
import { Menu, X, ArrowRight, FolderGit2, AtSign } from "lucide-react";
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerBackdrop,
  DrawerViewport,
  DrawerPopup,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";

const NAV_LABELS: Record<string, { Home: string; Projects: string; About: string; Stats: string; Contact: string }> = {
  en: { Home: "Home", Projects: "Projects", About: "About", Stats: "Stats", Contact: "Contact" },
  tr: { Home: "Ana Sayfa", Projects: "Projeler", About: "Hakkımda", Stats: "İstatistikler", Contact: "İletişim" },
  es: { Home: "Inicio", Projects: "Proyectos", About: "Sobre mí", Stats: "Estadísticas", Contact: "Contacto" },
  de: { Home: "Startseite", Projects: "Projekte", About: "Über mich", Stats: "Statistiken", Contact: "Kontakt" },
  fr: { Home: "Accueil", Projects: "Projets", About: "À propos", Stats: "Statistiques", Contact: "Contact" },
  it: { Home: "Home", Projects: "Progetti", About: "Chi sono", Stats: "Statistiche", Contact: "Contatti" },
  ja: { Home: "ホーム", Projects: "プロジェクト", About: "私について", Stats: "統計", Contact: "お問い合わせ" },
  zh: { Home: "首页", Projects: "项目", About: "关于我", Stats: "统计数据", Contact: "联系方式" },
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const supportedLocales = ["en", "tr", "es", "de", "fr", "it", "ja", "zh"];
  const currentLocale =
    supportedLocales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)) || "en";

  const labels = NAV_LABELS[currentLocale] || NAV_LABELS.en;

  const navLinks = [
    { name: labels.Home, href: `/${currentLocale}` },
    { name: labels.Projects, href: `/${currentLocale}/projects` },
    { name: labels.About, href: `/${currentLocale}/about` },
    { name: labels.Stats, href: `/${currentLocale}/stats` },
    { name: labels.Contact, href: `/${currentLocale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${currentLocale}`} className="flex items-center gap-2">
          <div className="relative h-7 w-7 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0">
            <Image
              src="/logo.jpeg"
              alt="awaiden logo"
              width={28}
              height={28}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <span className="font-semibold tracking-tight text-sm text-zinc-900 dark:text-zinc-100">
            awaiden
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== `/${currentLocale}` && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "text-zinc-900 dark:text-zinc-100 bg-zinc-200/60 dark:bg-zinc-800/60 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Language Dropdown, Theme Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          <LanguageDropdown />
          <ThemeToggle />

          {/* Mobile Drawer Sidebar Trigger */}
          <div className="md:hidden">
            <DrawerRoot open={open} onOpenChange={setOpen} side="left">
              <DrawerTrigger
                render={
                  <button
                    type="button"
                    className="h-8 w-8 p-0 bg-transparent hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-md flex items-center justify-center"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu className="h-4 w-4" />
              </DrawerTrigger>

              <DrawerPortal>
                <DrawerBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50" />
                <DrawerViewport side="left" className="fixed inset-0 z-50 pointer-events-none">
                  <DrawerPopup
                    side="left"
                    className="pointer-events-auto fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 z-50 flex flex-col justify-between shadow-2xl"
                  >
                    <div className="space-y-6">
                      {/* Drawer Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative h-7 w-7 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0">
                            <Image
                              src="/logo.jpeg"
                              alt="awaiden logo"
                              width={28}
                              height={28}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <DrawerTitle className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                            awaiden
                          </DrawerTitle>
                        </div>

                        <DrawerClose
                          render={
                            <button
                              type="button"
                              className="h-8 w-8 p-0 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                              aria-label="Close navigation menu"
                            />
                          }
                        >
                          <X className="h-4 w-4" />
                        </DrawerClose>
                      </div>

                      {/* Navigation Items */}
                      <nav className="flex flex-col space-y-1 pt-2">
                        {navLinks.map((link) => {
                          const isActive = pathname === link.href;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setOpen(false)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 font-semibold"
                                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                              }`}
                            >
                              <span>{link.name}</span>
                              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                            </Link>
                          );
                        })}
                      </nav>
                    </div>

                    {/* Drawer Footer */}
                    <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 space-y-3">
                      <div className="text-xs text-zinc-400 font-medium">Connect</div>
                      <div className="flex items-center gap-3">
                        <a
                          href="https://github.com/awaiden"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                          title="GitHub"
                        >
                          <FolderGit2 className="h-4 w-4" />
                        </a>
                        <a
                          href="https://x.com/_awaiden"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                          title="X (Twitter)"
                        >
                          <AtSign className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </DrawerPopup>
                </DrawerViewport>
              </DrawerPortal>
            </DrawerRoot>
          </div>
        </div>
      </div>
    </header>
  );
}
