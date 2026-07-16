import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/email", label: "Email" },
  { to: "/notes", label: "Notes" },
  { to: "/planner", label: "Planner" },
  { to: "/research", label: "Research" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Workplace AI</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{ className: "rounded-md px-3 py-2 text-primary font-medium bg-accent" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          <p className="rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-foreground">
            <strong className="text-primary">Disclaimer:</strong> AI-generated content should always be reviewed before use.
          </p>
          <p className="mt-4 text-center">
            &copy; {new Date().getFullYear()} Workplace AI. Built for modern teams.
          </p>
        </div>
      </footer>
    </div>
  );
}