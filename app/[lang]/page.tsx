import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardRoot } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  FolderGit2,
  ArrowRight,
  Sparkles,
  AtSign,
  Camera,
} from "lucide-react";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Hero */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-md shrink-0">
            <Image
              src="/logo.jpeg"
              alt="awaiden logo"
              width={80}
              height={80}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300/50 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {dict.hero.available}
          </div>
        </div>

        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {dict.hero.title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
            {dict.hero.intro} <span className="font-semibold text-zinc-900 dark:text-zinc-100">awaiden</span>. {dict.hero.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href={`/${lang}/projects`}>
            <Button className="h-9 px-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-zinc-100 dark:text-zinc-900 text-xs font-medium rounded-md flex items-center gap-1.5">
              <span>{dict.hero.viewProjects}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <a
            href="https://github.com/awaiden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
          >
            <FolderGit2 className="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
          </a>

          <a
            href="https://x.com/_awaiden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
          >
            <AtSign className="h-4 w-4" />
            <span>@_awaiden</span>
          </a>

          <a
            href="https://instagram.com/_awaiden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href={`/${lang}/projects`}>
            <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all h-full flex flex-col justify-between">
              <div className="space-y-1">
                <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-[10px]">{dict.hero.showcase}</Badge>
                <h3 className="text-sm font-semibold pt-1">{dict.nav.projects}</h3>
                <p className="text-xs text-zinc-500">{dict.hero.showcaseSub}</p>
              </div>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1 pt-3">
                <span>{dict.hero.viewProjects}</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </CardRoot>
          </Link>

          <Link href={`/${lang}/about`}>
            <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all h-full flex flex-col justify-between">
              <div className="space-y-1">
                <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-[10px]">{dict.hero.background}</Badge>
                <h3 className="text-sm font-semibold pt-1">{dict.nav.about}</h3>
                <p className="text-xs text-zinc-500">{dict.hero.aboutSub}</p>
              </div>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1 pt-3">
                <span>{dict.about.badge}</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </CardRoot>
          </Link>

          <Link href={`/${lang}/stats`}>
            <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all h-full flex flex-col justify-between">
              <div className="space-y-1">
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">{dict.hero.metrics}</Badge>
                <h3 className="text-sm font-semibold pt-1">{dict.nav.stats}</h3>
                <p className="text-xs text-zinc-500">{dict.hero.statsSub}</p>
              </div>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1 pt-3">
                <span>{dict.nav.stats}</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </CardRoot>
          </Link>

          <Link href={`/${lang}/contact`}>
            <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all h-full flex flex-col justify-between">
              <div className="space-y-1">
                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px]">{dict.hero.connect}</Badge>
                <h3 className="text-sm font-semibold pt-1">{dict.nav.contact}</h3>
                <p className="text-xs text-zinc-500">{dict.hero.contactSub}</p>
              </div>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1 pt-3">
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
          <Link href={`/${lang}/projects`} className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            {dict.hero.viewAllFeatured}
          </Link>
        </div>

        <CardRoot className="bg-white dark:bg-zinc-900 border border-amber-500/40 dark:border-amber-500/30 ring-1 ring-amber-500/20 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold">adn-ui</h3>
            </div>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs">
              {dict.hero.primaryRegistry}
            </Badge>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {dict.hero.adnUiDesc}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://github.com/awaiden/adn-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="h-8 px-3 text-xs bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-zinc-100 dark:text-zinc-900 font-medium rounded-md flex items-center gap-1.5">
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>{dict.projects.viewGithub}</span>
              </Button>
            </a>
            <a
              href="https://ui.awaiden.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="h-8 px-3 text-xs bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium rounded-md flex items-center gap-1.5">
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
