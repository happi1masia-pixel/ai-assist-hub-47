import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { runAiFeature } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type Feature = "email" | "notes" | "planner" | "research";

interface Props {
  feature: Feature;
  title: string;
  description: string;
  icon: ReactNode;
  buildPayload: () => Record<string, string> | null;
  children: ReactNode;
}

export function FeatureRunner({ feature, title, description, icon, buildPayload, children }: Props) {
  const runFn = useServerFn(runAiFeature);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function onGenerate() {
    const payload = buildPayload();
    if (!payload) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");
    try {
      const res = await runFn({ data: { feature, payload } });
      setResult(res.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Provide details below and let AI do the drafting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button onClick={onGenerate} disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              "Generate with AI"
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>AI Output</CardTitle>
            <CardDescription>Review before using.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-foreground">
              {result}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}