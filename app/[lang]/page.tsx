import { ArrowUpRight, FolderGit2, ArrowRight, Sparkles, AtSign, Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardRoot } from "@/components/ui/card";
import { getDictionary, hasLocale } from "@/lib/dictionaries";

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

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="mx-auto max-w-4xl space-y-12 px-4 py-12">
      {/* Hero */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-zinc-200 shadow-md sm:h-20 sm:w-20 dark:border-zinc-800">
            <Image
              src="/logo.jpeg"
              alt="awaiden logo"
              width={80}
              height={80}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300/50 bg-zinc-200/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            {dict.hero.available}
          </div>
        </div>

        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl leading-tight font-bold tracking-tight md:text-5xl">
            {dict.hero.title}
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {dict.hero.intro}{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">awaiden</span>.{" "}
            {dict.hero.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href={`/${lang}/projects`}>
            <Button className="flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-4 text-xs font-medium text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              <span>{dict.hero.viewProjects}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <a
            href="https://github.com/awaiden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <FolderGit2 className="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
          </a>

          <a
            href="https://x.com/_awaiden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <AtSign className="h-4 w-4" />
            <span>@_awaiden</span>
          </a>

          <a
            href="https://instagram.com/_awaiden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <Camera className="h-4 w-4 text-pink-500" />
            <span>Instagram</span>
          </a>
        </div>
      </section>

      {/* Pages Quick Hub */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">{dict.hero.exploreHub}</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{dict.hero.exploreHubSub}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Link href={`/${lang}/projects`}>
            <CardRoot className="flex h-full flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
              <div className="space-y-1">
                <Badge className="border-blue-500/20 bg-blue-500/10 text-[10px] text-blue-600 dark:text-blue-400">
                  {dict.hero.showcase}
                </Badge>
                <h3 className="pt-1 text-sm font-semibold">{dict.nav.projects}</h3>
                <p className="text-xs text-zinc-500">{dict.hero.showcaseSub}</p>
              </div>
              <span className="flex items-center gap-1 pt-3 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                <span>{dict.hero.viewProjects}</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </CardRoot>
          </Link>

          <Link href={`/${lang}/about`}>
            <CardRoot className="flex h-full flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
              <div className="space-y-1">
                <Badge className="border-purple-500/20 bg-purple-500/10 text-[10px] text-purple-600 dark:text-purple-400">
                  {dict.hero.background}
                </Badge>
                <h3 className="pt-1 text-sm font-semibold">{dict.nav.about}</h3>
                <p className="text-xs text-zinc-500">{dict.hero.aboutSub}</p>
              </div>
              <span className="flex items-center gap-1 pt-3 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                <span>{dict.about.badge}</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </CardRoot>
          </Link>

          <Link href={`/${lang}/stats`}>
            <CardRoot className="flex h-full flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
              <div className="space-y-1">
                <Badge className="border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400">
                  {dict.hero.metrics}
                </Badge>
                <h3 className="pt-1 text-sm font-semibold">{dict.nav.stats}</h3>
                <p className="text-xs text-zinc-500">{dict.hero.statsSub}</p>
              </div>
              <span className="flex items-center gap-1 pt-3 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                <span>{dict.nav.stats}</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </CardRoot>
          </Link>

          <Link href={`/${lang}/contact`}>
            <CardRoot className="flex h-full flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
              <div className="space-y-1">
                <Badge className="border-amber-500/20 bg-amber-500/10 text-[10px] text-amber-600 dark:text-amber-400">
                  {dict.hero.connect}
                </Badge>
                <h3 className="pt-1 text-sm font-semibold">{dict.nav.contact}</h3>
                <p className="text-xs text-zinc-500">{dict.hero.contactSub}</p>
              </div>
              <span className="flex items-center gap-1 pt-3 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                <span>{dict.about.contactMe}</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </CardRoot>
          </Link>
        </div>
      </section>

      {/* Featured Project Preview */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">🚀 {dict.hero.featuredItem}</h2>
          <Link
            href={`/${lang}/projects`}
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {dict.hero.viewAllFeatured}
          </Link>
        </div>

        <CardRoot className="space-y-3 rounded-xl border border-amber-500/40 bg-white p-6 ring-1 ring-amber-500/20 dark:border-amber-500/30 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold">adn-ui</h3>
            </div>
            <Badge className="border-amber-500/30 bg-amber-500/10 text-xs text-amber-600 dark:text-amber-400">
              {dict.hero.primaryRegistry}
            </Badge>
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            {dict.hero.adnUiDesc}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="https://github.com/awaiden/adn-ui" target="_blank" rel="noopener noreferrer">
              <Button className="flex h-8 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-xs font-medium text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>{dict.projects.viewGithub}</span>
              </Button>
            </a>
            <a href="https://ui.awaiden.com" target="_blank" rel="noopener noreferrer">
              <Button className="flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>{dict.projects.liveDemo}</span>
              </Button>
            </a>
          </div>
        </CardRoot>
      </section>
    </main>
  );
}
