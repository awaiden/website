import { Code2, Terminal, Cpu } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardRoot } from "@/components/ui/card";
import { SeparatorRoot } from "@/components/ui/separator";
import { getDictionary, hasLocale } from "@/lib/dictionaries";

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

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-12">
      {/* Header */}
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-zinc-200 shadow-md sm:h-24 sm:w-24 dark:border-zinc-800">
          <Image
            src="/logo.jpeg"
            alt="awaiden logo"
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="space-y-3">
          <Badge className="border border-purple-500/20 bg-purple-500/10 text-xs text-purple-600 dark:text-purple-400">
            {dict.about.badge}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{dict.about.title}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            I&apos;m <span className="font-semibold text-zinc-900 dark:text-zinc-100">awaiden</span>
            . {dict.about.intro}
          </p>
        </div>
      </div>

      <SeparatorRoot className="border-zinc-200 dark:border-zinc-800" />

      {/* Principles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <CardRoot className="space-y-2 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-500">
            <Code2 className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">{dict.about.cleanCode}</h3>
          <p className="text-xs leading-relaxed text-zinc-500">{dict.about.cleanCodeDesc}</p>
        </CardRoot>

        <CardRoot className="space-y-2 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500">
            <Cpu className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">{dict.about.performance}</h3>
          <p className="text-xs leading-relaxed text-zinc-500">{dict.about.performanceDesc}</p>
        </CardRoot>

        <CardRoot className="space-y-2 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500/10 text-purple-500">
            <Terminal className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">{dict.about.dx}</h3>
          <p className="text-xs leading-relaxed text-zinc-500">{dict.about.dxDesc}</p>
        </CardRoot>
      </div>

      <SeparatorRoot className="border-zinc-200 dark:border-zinc-800" />

      {/* Detailed Skills Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">{dict.about.breakdown}</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              {dict.about.frontend}
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "JavaScript (ES6+)",
                "TypeScript",
                "React 19",
                "Next.js 16",
                "Tailwind CSS v4",
                "HTML5/CSS3",
                "Base UI",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              {dict.about.backend}
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Node.js",
                "Bun",
                "ESLint / Oxlint",
                "Git / GitHub",
                "REST APIs",
                "Vercel Deployment",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SeparatorRoot className="border-zinc-200 dark:border-zinc-800" />

      {/* Connect Box */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-zinc-900 p-6 text-zinc-100 sm:flex-row">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-semibold">{dict.about.workTogether}</h3>
          <p className="text-xs text-zinc-400">{dict.about.workTogetherSub}</p>
        </div>
        <Link href={`/${lang}/contact`}>
          <Button className="flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-zinc-100 px-4 text-xs font-medium text-zinc-900 hover:bg-zinc-200">
            <span>{dict.about.contactMe}</span>
          </Button>
        </Link>
      </div>
    </main>
  );
}
