"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardRoot } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs">
            {dict.contact.badge}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">{dict.contact.title}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
            {dict.contact.desc} <span className="font-semibold text-zinc-900 dark:text-zinc-100">awaiden</span> {dict.contact.descSub}
          </p>
        </div>

        <a
          href={GOOGLE_FORM_VIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors shrink-0 self-start sm:self-auto"
        >
          <FileText className="h-3.5 w-3.5 text-blue-500" />
          <span>{dict.contact.openForm}</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <CardRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              <h3 className="text-base font-semibold">{dict.contact.sentTitle}</h3>
              <p className="text-xs text-zinc-500 max-w-xs">
                {dict.contact.sentDesc}
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                {dict.contact.sendAnother}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{dict.contact.name}</label>
                <Input
                  type="text"
                  name="entry.1169420488"
                  required
                  placeholder={dict.contact.namePlaceholder}
                  className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-sm h-10 w-full rounded-md"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{dict.contact.email}</label>
                <Input
                  type="email"
                  name="entry.399245914"
                  required
                  placeholder={dict.contact.emailPlaceholder}
                  className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-sm h-10 w-full rounded-md"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{dict.contact.subject}</label>
                <Input
                  type="text"
                  name="entry.279550735"
                  required
                  placeholder={dict.contact.subjectPlaceholder}
                  className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-sm h-10 w-full rounded-md"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{dict.contact.message}</label>
                <textarea
                  name="entry.362215455"
                  required
                  rows={4}
                  placeholder={dict.contact.messagePlaceholder}
                  className="w-full p-3 text-sm rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-zinc-100 dark:text-zinc-900 text-xs font-medium rounded-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
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
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{dict.contact.socials}</h3>
            
            <div className="space-y-2">
              <a
                href="https://x.com/_awaiden"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
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
                className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
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
                className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
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
