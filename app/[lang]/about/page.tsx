import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardRoot } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeparatorRoot } from "@/components/ui/separator";
import { Code2, Terminal, Cpu } from "lucide-react";
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
    title: dict.about.badge,
    description: dict.about.intro,
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-md shrink-0">
          <Image
            src="/logo.jpeg"
            alt="awaiden logo"
            width={96}
            height={96}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="space-y-3">
          <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs">
            {dict.about.badge}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.about.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
            I&apos;m <span className="font-semibold text-zinc-900 dark:text-zinc-100">awaiden</span>. {dict.about.intro}
          </p>
        </div>
      </div>

      <SeparatorRoot className="border-zinc-200 dark:border-zinc-800" />

      {/* Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
          <div className="h-8 w-8 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Code2 className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">{dict.about.cleanCode}</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {dict.about.cleanCodeDesc}
          </p>
        </CardRoot>

        <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
          <div className="h-8 w-8 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Cpu className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">{dict.about.performance}</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {dict.about.performanceDesc}
          </p>
        </CardRoot>

        <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
          <div className="h-8 w-8 rounded-md bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Terminal className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">{dict.about.dx}</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {dict.about.dxDesc}
          </p>
        </CardRoot>
      </div>

      <SeparatorRoot className="border-zinc-200 dark:border-zinc-800" />

      {/* Detailed Skills Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">{dict.about.breakdown}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider">{dict.about.frontend}</h3>
            <div className="flex flex-wrap gap-2">
              {["JavaScript (ES6+)", "TypeScript", "React 19", "Next.js 16", "Tailwind CSS v4", "HTML5/CSS3", "Base UI"].map((item) => (
                <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider">{dict.about.backend}</h3>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Bun", "ESLint / Oxlint", "Git / GitHub", "REST APIs", "Vercel Deployment"].map((item) => (
                <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SeparatorRoot className="border-zinc-200 dark:border-zinc-800" />

      {/* Connect Box */}
      <div className="p-6 rounded-xl bg-zinc-900 text-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-semibold">{dict.about.workTogether}</h3>
          <p className="text-xs text-zinc-400">{dict.about.workTogetherSub}</p>
        </div>
        <Link href={`/${lang}/contact`}>
          <Button className="h-9 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-medium rounded-md flex items-center gap-1.5 shrink-0">
            <span>{dict.about.contactMe}</span>
          </Button>
        </Link>
      </div>
    </main>
  );
}
