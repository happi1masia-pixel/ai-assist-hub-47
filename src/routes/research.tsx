import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { FeatureRunner } from "@/components/feature-runner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Workplace AI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  return (
    <FeatureRunner
      feature="research"
      title="AI Research Assistant"
      description="Get a summary, key insights, and recommendations."
      icon={<BookOpen className="h-5 w-5" />}
      buildPayload={() => (topic.trim() ? { topic } : null)}
    >
      <div className="space-y-2">
        <Label>Topic or article</Label>
        <Textarea
          rows={10}
          placeholder="Enter a topic (e.g. 'Impact of AI on customer support') or paste article text..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
    </FeatureRunner>
  );
}