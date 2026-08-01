"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import {
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuGroup,
  MenuGroupLabel,
} from "@/components/ui/menu";

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export function LanguageDropdown() {
  const pathname = usePathname();

  const currentLocaleCode =
    LANGUAGES.find(
      (l) => pathname === `/${l.code}` || pathname.startsWith(`/${l.code}/`)
    )?.code || "en";

  const currentLang =
    LANGUAGES.find((l) => l.code === currentLocaleCode) || LANGUAGES[0];

  const getLocalePath = (targetLocale: string) => {
    if (pathname === `/${currentLocaleCode}`) {
      return `/${targetLocale}`;
    }
    return pathname.replace(
      new RegExp(`^/${currentLocaleCode}(/|$)`),
      `/${targetLocale}$1`
    );
  };

  return (
    <MenuRoot>
      <MenuTrigger
        render={
          <button
            type="button"
            className="h-8 px-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            aria-label="Select Language"
          />
        }
      >
        <Globe className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
        <span className="text-xs">{currentLang.flag}</span>
        <span className="uppercase font-semibold text-[11px]">
          {currentLang.code}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </MenuTrigger>

      <MenuPortal>
        <MenuPositioner sideOffset={6} align="end">
          <MenuPopup className="w-44 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-1.5 shadow-xl z-50">
            <MenuGroup>
              <MenuGroupLabel className="px-2 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Select Language
              </MenuGroupLabel>
              <div className="space-y-0.5 max-h-64 overflow-y-auto">
                {LANGUAGES.map((lang) => {
                  const isSelected = lang.code === currentLocaleCode;
                  return (
                    <MenuItem key={lang.code} render={<Link href={getLocalePath(lang.code)} />}>
                      <div className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        )}
                      </div>
                    </MenuItem>
                  );
                })}
              </div>
            </MenuGroup>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </MenuRoot>
  );
}
