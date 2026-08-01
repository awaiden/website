import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface ProjectItem {
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

export async function GET() {
  try {
    // 1. Fetch the exact HTML page of the GitHub starred list
    const listRes = await fetch("https://github.com/stars/awaiden/lists/featured", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 0 },
    });

    let repoPaths: string[] = [];

    if (listRes.ok) {
      const html = await listRes.text();
      // Extract repositories inside #user-list-repositories section
      const userListSection = html.split('id="user-list-repositories"')[1] || html;
      const matches = Array.from(userListSection.matchAll(/href="\/([a-zA-Z0-9_-]+\/[a-zA-Z0-9_\-.]+)"/g));

      const extracted = new Set<string>();
      for (const match of matches) {
        const path = match[1];
        // Filter out non-repo paths like /stargazers, /network, /issues, etc.
        if (
          path &&
          !path.includes("/stargazers") &&
          !path.includes("/network") &&
          !path.includes("/issues") &&
          !path.includes("/pulls") &&
          !path.includes("/tab=") &&
          !path.includes("site-policy")
        ) {
          extracted.add(path);
        }
      }
      repoPaths = Array.from(extracted);
    }

    // Default fallback if scraping encounters rate-limits or empty list
    if (repoPaths.length === 0) {
      repoPaths = ["awaiden/adn-ui"];
    }

    // 2. Fetch live GitHub details ONLY for repos present in featured list
    const projects: ProjectItem[] = await Promise.all(
      repoPaths.map(async (repoPath) => {
        try {
          const apiRes = await fetch(`https://api.github.com/repos/${repoPath}`, {
            headers: {
              "User-Agent": "awaiden-portfolio-app",
              Accept: "application/vnd.github.v3+json",
            },
            next: { revalidate: 0 },
          });

          if (apiRes.ok) {
            const data = await apiRes.json();
            return {
              id: data.id,
              name: data.name,
              full_name: data.full_name,
              description: data.description || "Project listed in Featured.",
              html_url: data.html_url,
              homepage: data.homepage || "https://ui.awaiden.com",
              language: data.language || "TypeScript",
              stars: data.stargazers_count,
              forks: data.forks_count,
              topics: data.topics && data.topics.length > 0 ? data.topics : ["TypeScript", "React"],
            };
          }
        } catch (e) {
          console.error(`Failed to fetch repo data for ${repoPath}:`, e);
        }

        // Default item for awaiden/adn-ui
        const [, name] = repoPath.split("/");
        return {
          id: repoPath,
          name: name || repoPath,
          full_name: repoPath,
          description: "High-performance, accessible UI primitive registry designed for modern React & Next.js applications.",
          html_url: `https://github.com/${repoPath}`,
          homepage: "https://ui.awaiden.com",
          language: "TypeScript",
          stars: 1,
          forks: 0,
          topics: ["TypeScript", "Base UI", "Tailwind v4", "React"],
        };
      })
    );

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      listUrl: "https://github.com/stars/awaiden/lists/featured",
      totalInList: projects.length,
      projects,
    });
  } catch (err) {
    console.error("Stack fetch error:", err);
    return NextResponse.json(
      {
        success: false,
        projects: [
          {
            id: "awaiden/adn-ui",
            name: "adn-ui",
            full_name: "awaiden/adn-ui",
            description: "High-performance, accessible UI primitive registry designed for modern React & Next.js applications.",
            html_url: "https://github.com/awaiden/adn-ui",
            homepage: "https://ui.awaiden.com",
            language: "TypeScript",
            stars: 1,
            forks: 0,
            topics: ["TypeScript", "Base UI", "Tailwind v4", "React"],
          },
        ],
      },
      { status: 500 }
    );
  }
}
