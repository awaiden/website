"use client";

import {
  Send,
  CheckCircle2,
  ArrowUpRight,
  FileText,
  ExternalLink,
  FolderGit2,
  AtSign,
  Camera,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardRoot } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getClientDictionary } from "@/lib/client-dictionaries";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeuhMS6ro8H7llghsvGTXxzeSZXX68h-3fZzesfUbkc1zhEnA/formResponse";
const GOOGLE_FORM_VIEW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeuhMS6ro8H7llghsvGTXxzeSZXX68h-3fZzesfUbkc1zhEnA/viewform";

export default function ContactPage() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const dict = getClientDictionary(currentLocale);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      const searchParams = new URLSearchParams(formData as unknown as Record<string, string>);

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams.toString(),
      });

      form.reset();
      setSubmitted(true);
    } catch (err) {
      console.error("Failed client-side Google Form post:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <Badge className="border border-amber-500/20 bg-amber-500/10 text-xs text-amber-600 dark:text-amber-400">
            {dict.contact.badge}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">{dict.contact.title}</h1>
          <p className="max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
            {dict.contact.desc}{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">awaiden</span>{" "}
            {dict.contact.descSub}
          </p>
        </div>

        <a
          href={GOOGLE_FORM_VIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200 sm:self-auto dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <FileText className="h-3.5 w-3.5 text-blue-500" />
          <span>{dict.contact.openForm}</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Contact Form */}
        <CardRoot className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          {submitted ? (
            <div className="flex flex-col items-center justify-center space-y-3 py-12 text-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              <h3 className="text-base font-semibold">{dict.contact.sentTitle}</h3>
              <p className="max-w-xs text-xs text-zinc-500">{dict.contact.sentDesc}</p>
              <Button
                onClick={() => setSubmitted(false)}
                className="mt-2 bg-zinc-100 text-xs text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                {dict.contact.sendAnother}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {dict.contact.name}
                </label>
                <Input
                  type="text"
                  name="entry.1169420488"
                  required
                  placeholder={dict.contact.namePlaceholder}
                  className="h-10 w-full rounded-md border-zinc-200 bg-zinc-50 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {dict.contact.email}
                </label>
                <Input
                  type="email"
                  name="entry.399245914"
                  required
                  placeholder={dict.contact.emailPlaceholder}
                  className="h-10 w-full rounded-md border-zinc-200 bg-zinc-50 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {dict.contact.subject}
                </label>
                <Input
                  type="text"
                  name="entry.279550735"
                  required
                  placeholder={dict.contact.subjectPlaceholder}
                  className="h-10 w-full rounded-md border-zinc-200 bg-zinc-50 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {dict.contact.message}
                </label>
                <textarea
                  name="entry.362215455"
                  required
                  rows={4}
                  placeholder={dict.contact.messagePlaceholder}
                  className="w-full rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 focus:ring-2 focus:ring-zinc-950 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-zinc-300"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-zinc-900 text-xs font-medium text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>{dict.contact.sendMessage}</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </CardRoot>

        {/* Social Cards & Direct Channels */}
        <div className="space-y-4">
          <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              {dict.contact.socials}
            </h3>

            <div className="space-y-2">
              <a
                href="https://x.com/_awaiden"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
              >
                <div className="flex items-center gap-3">
                  <AtSign className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                  <div>
                    <div className="text-xs font-semibold">X (Twitter)</div>
                    <div className="text-[11px] text-zinc-400">@_awaiden</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400" />
              </a>

              <a
                href="https://instagram.com/_awaiden"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
              >
                <div className="flex items-center gap-3">
                  <Camera className="h-4 w-4 text-pink-500" />
                  <div>
                    <div className="text-xs font-semibold">Instagram</div>
                    <div className="text-[11px] text-zinc-400">@_awaiden</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400" />
              </a>

              <a
                href="https://github.com/awaiden"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                  <div>
                    <div className="text-xs font-semibold">GitHub</div>
                    <div className="text-[11px] text-zinc-400">@awaiden</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
