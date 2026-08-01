"use client";

import {
  FolderGit2,
  Star,
  GitFork,
  ExternalLink,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardRoot } from "@/components/ui/card";
import { getClientDictionary } from "@/lib/client-dictionaries";

interface Project {
  id: string | number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
}

export default function ProjectsPage() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const dict = getClientDictionary(currentLocale);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  const fetchStackProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stack", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch featured projects list");
      const data = await res.json();
      if (data.projects && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
      setError(dict.projects.errorMsg);
      setProjects([
        {
          id: "awaiden/adn-ui",
          name: "adn-ui",
          full_name: "awaiden/adn-ui",
          description:
            "High-performance, accessible UI primitive registry designed for modern React & Next.js applications using Base UI and Tailwind v4.",
          html_url: "https://github.com/awaiden/adn-ui",
          homepage: "https://ui.awaiden.com",
          language: "TypeScript",
          stars: 1,
          forks: 0,
          topics: ["TypeScript", "Base UI", "Tailwind v4", "React"],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStackProjects();
  }, []);

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-12">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">🚀 {dict.projects.title}</h1>
            <Badge className="flex items-center gap-1 border-amber-500/30 bg-amber-500/10 text-xs text-amber-600 dark:text-amber-400">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>{dict.projects.badge}</span>
            </Badge>
          </div>
          <p className="max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
            {dict.projects.desc}{" "}
            <a
              href="https://github.com/stars/awaiden/lists/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
            >
              {dict.projects.descList}
            </a>
            .
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            onClick={fetchStackProjects}
            disabled={isLoading}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-indigo-500" : ""}`}
            />
            <span>{dict.projects.refresh}</span>
          </Button>

          <a
            href="https://github.com/stars/awaiden/lists/featured"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-100 shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{dict.projects.openList}</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Sync Status Banner */}
      {lastRefreshed && (
        <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-100 p-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>
              {dict.projects.autofetched} <strong>{dict.projects.featuredList}</strong>.{" "}
              {dict.projects.lastChecked} {lastRefreshed}.
            </span>
          </div>
          <span className="font-mono text-[11px] text-zinc-400">cache: no-store</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2].map((n) => (
            <CardRoot
              key={n}
              className="animate-pulse space-y-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="h-6 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-12 w-full rounded bg-zinc-100 dark:bg-zinc-800/50" />
              <div className="h-4 w-1/4 rounded bg-zinc-200 dark:bg-zinc-800" />
            </CardRoot>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <CardRoot
              key={project.id}
              className="flex flex-col justify-between space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-xs transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="h-5 w-5 shrink-0 text-indigo-500" />
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {project.name}
                    </h3>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {project.language}
                  </span>
                </div>

                <p className="line-clamp-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.topics.slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-zinc-100 pt-2 text-xs dark:border-zinc-800/80">
                <div className="flex items-center gap-3 text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500/20 text-amber-500" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" />
                    <span>{project.forks}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    title={dict.projects.viewGithub}
                  >
                    <FolderGit2 className="h-4 w-4" />
                  </a>
                  {project.homepage && (
                    <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                      <Button className="flex h-7 items-center gap-1 rounded-md bg-zinc-900 px-2.5 text-[11px] font-medium text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                        <span>{dict.projects.liveDemo}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </CardRoot>
          ))}
        </div>
      )}
    </main>
  );
}
