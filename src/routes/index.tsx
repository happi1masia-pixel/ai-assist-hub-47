import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Mail, FileText, ListTodo, BookOpen, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  {
    to: "/email" as const,
    icon: Mail,
    title: "Smart Email Generator",
    description: "Draft polished emails tailored to recipient, purpose, and tone.",
  },
  {
    to: "/notes" as const,
    icon: FileText,
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes into summaries, decisions, action items, and deadlines.",
  },
  {
    to: "/planner" as const,
    icon: ListTodo,
    title: "AI Task Planner",
    description: "Prioritize your tasks and generate a suggested daily schedule.",
  },
  {
    to: "/research" as const,
    icon: BookOpen,
    title: "AI Research Assistant",
    description: "Get summaries, key insights, and recommendations on any topic.",
  },
];

function Index() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" /> AI-Powered Productivity
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Workplace <span className="text-primary">AI Assistant</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Write better emails, summarize meetings, plan your day, and research any topic —
            all in one clean, modern workspace.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/email">Get started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/research">Try research</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Four tools, one workspace</h2>
          <p className="mt-2 text-muted-foreground">Everything you need to move faster at work.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map(({ to, icon: Icon, title, description }) => (
            <Link key={to} to={to} className="group">
              <Card className="h-full transition-all group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm font-medium text-primary">Open tool →</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
