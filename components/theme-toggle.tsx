"use client";

import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <Button
        aria-label="Toggle theme"
        className="h-8 w-8 rounded-md border border-zinc-200 bg-transparent p-0 text-zinc-500 dark:border-zinc-800"
      >
        <span className="h-4 w-4" />
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      onClick={cycleTheme}
      aria-label={`Current theme: ${theme}. Click to switch theme.`}
      title={`Theme: ${theme}`}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-transparent p-0 text-zinc-700 transition-colors hover:bg-zinc-200/60 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
    >
      {theme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
      {theme === "dark" && <Moon className="h-4 w-4 text-indigo-400" />}
      {theme === "system" && <Laptop className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />}
    </Button>
  );
}
