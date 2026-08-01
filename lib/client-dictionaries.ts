import en from "@/dictionaries/en.json";
import tr from "@/dictionaries/tr.json";
import es from "@/dictionaries/es.json";
import de from "@/dictionaries/de.json";
import fr from "@/dictionaries/fr.json";
import it from "@/dictionaries/it.json";
import ja from "@/dictionaries/ja.json";
import zh from "@/dictionaries/zh.json";

const clientDictionaries = { en, tr, es, de, fr, it, ja, zh };

export type ClientDictionary = typeof en;

export function getClientDictionary(locale: string): ClientDictionary {
  if (locale in clientDictionaries) {
    return clientDictionaries[locale as keyof typeof clientDictionaries];
  }
  return clientDictionaries.en;
}
