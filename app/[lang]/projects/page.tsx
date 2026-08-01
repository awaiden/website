"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardRoot } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderGit2, Star, GitFork, ExternalLink, RefreshCw, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
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
          description: "High-performance, accessible UI primitive registry designed for modern React & Next.js applications using Base UI and Tailwind v4.",
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
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">🚀 {dict.projects.title}</h1>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>{dict.projects.badge}</span>
            </Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
            {dict.projects.desc} <a href="https://github.com/stars/awaiden/lists/featured" target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-900 dark:text-zinc-100 underline underline-offset-4">{dict.projects.descList}</a>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={fetchStackProjects}
            disabled={isLoading}
            className="h-9 px-3 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg flex items-center gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-indigo-500" : ""}`} />
            <span>{dict.projects.refresh}</span>
          </Button>

          <a
            href="https://github.com/stars/awaiden/lists/featured"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-100 dark:text-zinc-900 text-xs font-medium transition-colors shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{dict.projects.openList}</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Sync Status Banner */}
      {lastRefreshed && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>{dict.projects.autofetched} <strong>{dict.projects.featuredList}</strong>. {dict.projects.lastChecked} {lastRefreshed}.</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-400">cache: no-store</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <CardRoot key={n} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4 animate-pulse">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800/50 rounded w-full" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
            </CardRoot>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <CardRoot
              key={project.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl p-6 flex flex-col justify-between space-y-4 transition-all shadow-xs hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="h-5 w-5 text-indigo-500 shrink-0" />
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {project.name}
                    </h3>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono">
                    {project.language}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.topics.slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 font-medium"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
                <div className="flex items-center gap-3 text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
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
                    className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    title={dict.projects.viewGithub}
                  >
                    <FolderGit2 className="h-4 w-4" />
                  </a>
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="h-7 px-2.5 text-[11px] bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-zinc-100 dark:text-zinc-900 font-medium rounded-md flex items-center gap-1">
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
