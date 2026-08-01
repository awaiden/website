<div align="center">
  <img src="public/logo.jpeg" alt="awaiden logo" width="96" height="96" style="border-radius: 16px;" />
  <h1>awaiden</h1>
  <p><strong>Personal Developer Portfolio, Project Showcase & Interactive Workspace</strong></p>

  <p>
    <a href="https://github.com/awaiden/next">
      <img src="https://img.shields.io/github/stars/awaiden/next?style=flat-square" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/awaiden/next/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-16.2.12-black?style=flat-square&logo=next.js" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/i18n-8_Languages-emerald?style=flat-square" alt="i18n 8 Languages" />
  </p>
</div>

---

## ✨ Features

- **🚀 Next.js 16 App Router & Turbopack**: Built with the latest Next.js 16 App Router architecture, SSG page generation, and Turbo compilation.
- **🎨 Base UI & @adn-ui Registry**: Customized UI components built using `@adn-ui` primitives and Base UI (`@base-ui/react`).
- **🌐 8-Language Internationalization (i18n)**: Native internationalized routing supporting 8 languages:
  - 🇬🇧 English (`en`)
  - 🇹🇷 Türkçe (`tr`)
  - 🇪🇸 Español (`es`)
  - 🇩🇪 Deutsch (`de`)
  - 🇫🇷 Français (`fr`)
  - 🇮🇹 Italiano (`it`)
  - 🇯🇵 日本語 (`ja`)
  - 🇨🇳 中文 (`zh`)
- **🔽 Interactive Language Dropdown**: Accessible `@adn-ui/menu` dropdown with flags, smooth transitions, and route preservation.
- **⭐ Live GitHub Featured List Sync**: Direct API integration fetching live starred repositories from [@awaiden's Featured list](https://github.com/stars/awaiden/lists/featured).
- **📬 Client-Side Google Form Integration**: Contact page posts directly to Google Forms (`formResponse`) without needing a custom backend server.
- **🌙 Dark & Light Mode**: Seamless theme toggling powered by `next-themes` and Tailwind CSS v4 variables.
- **🔍 100% Full SEO & Social Sharing**: Complete with `sitemap.xml`, `robots.txt`, Open Graph cards, Twitter metadata, and multi-language `hreflang` tags.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI & Components**: [@adn-ui](https://ui.awaiden.com/), [@base-ui/react](https://base-ui.com/), [Lucide React Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `tailwind-variants`, `clsx`
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Language**: TypeScript 5

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) (or Node.js >= 20) installed.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/awaiden/next.git
   cd next
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Run the development server**:

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

4. **Build for production**:

   ```bash
   bun run build
   ```

5. **Start production server**:
   ```bash
   bun run start
   ```

---

## 📁 Directory Structure

```text
├── app/
│   ├── [lang]/              # Localized App Router pages (en, tr, es, de, fr, it, ja, zh)
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page (Google Forms integration)
│   │   ├── projects/        # Featured projects page
│   │   ├── stats/           # GitHub activity stats page
│   │   ├── layout.tsx       # Localized root layout & SEO metadata
│   │   └── page.tsx         # Localized home page
│   ├── api/
│   │   └── stack/           # GitHub featured list proxy API
│   ├── robots.ts            # Robots.txt generator
│   └── sitemap.ts           # Dynamic sitemap.xml generator
├── components/
│   ├── ui/                  # @adn-ui component primitives (button, card, menu, drawer, badge, etc.)
│   ├── language-dropdown.tsx# 8-language menu dropdown
│   ├── navbar.tsx           # Responsive navbar with drawer navigation
│   └── footer.tsx           # Footer with locale links
├── dictionaries/            # i18n translation JSON files (en, tr, es, de, fr, it, ja, zh)
├── lib/
│   ├── client-dictionaries.ts # Synchronous client dictionary helper
│   ├── dictionaries.ts      # Server-side dictionary loader
│   └── utils.ts             # Tailwind class merge utilities
├── public/                  # Public static assets (logo.jpeg)
└── proxy.ts                 # Next.js 16 Proxy i18n routing handler
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Created with ❤️ by [awaiden](https://github.com/awaiden).
