import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { CardRoot } from "@/components/ui/card";
import { ArrowUpRight, Activity, Globe } from "lucide-react";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.stats.title,
    description: dict.stats.desc,
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

export default async function StatsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs">
            {dict.stats.badge}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{dict.stats.title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
          {dict.stats.desc} <span className="font-semibold text-zinc-900 dark:text-zinc-100">@awaiden</span>.
        </p>
      </div>

      <div className="flex items-center gap-4 py-2 border-y border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Activity className="h-4 w-4 text-emerald-500" />
          <span>{dict.stats.liveSync}</span>
        </div>
        <span>&bull;</span>
        <div className="flex items-center gap-1.5">
          <Globe className="h-4 w-4 text-blue-500" />
          <img
            src="https://komarev.com/ghpvc/?username=awaiden&icon=0&color=27272a"
            alt="Profile Visitors"
            className="h-4 dark:invert opacity-80"
          />
        </div>
        <span>&bull;</span>
        <a
          href="https://github.com/awaiden"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-900 dark:text-zinc-100 font-medium hover:underline flex items-center gap-1"
        >
          <span>github.com/awaiden</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold tracking-tight">{dict.stats.overview}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center overflow-hidden">
            <h3 className="text-xs font-medium text-zinc-400 mb-3 uppercase tracking-wider">{dict.stats.summary}</h3>
            <img
              src="https://github-readme-stats.shion.dev/api?username=awaiden&theme=dark&hide_border=true&include_all_commits=false"
              alt="GitHub Stats for awaiden"
              className="w-full max-w-sm rounded-lg"
            />
          </CardRoot>

          <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center overflow-hidden">
            <h3 className="text-xs font-medium text-zinc-400 mb-3 uppercase tracking-wider">{dict.stats.streak}</h3>
            <img
              src="https://streak-stats.demolab.com/?user=awaiden&theme=dark&hide_border=true"
              alt="GitHub Streak for awaiden"
              className="w-full max-w-sm rounded-lg"
            />
          </CardRoot>
        </div>

        <h2 className="text-lg font-bold tracking-tight pt-4">{dict.stats.topLangs}</h2>

        <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center overflow-hidden">
          <img
            src="https://github-readme-stats.shion.dev/api/top-langs/?username=awaiden&theme=dark&hide_border=true&layout=compact"
            alt="Top Languages for awaiden"
            className="w-full max-w-md rounded-lg"
          />
        </CardRoot>
      </div>
    </main>
  );
}
