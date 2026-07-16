import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { FeatureRunner } from "@/components/feature-runner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Workplace AI" }] }),
  component: NotesPage,
});

function NotesPage() {
  const [notes, setNotes] = useState("");
  return (
    <FeatureRunner
      feature="notes"
      title="Meeting Notes Summarizer"
      description="Turn raw notes into a structured brief."
      icon={<FileText className="h-5 w-5" />}
      buildPayload={() => (notes.trim() ? { notes } : null)}
    >
      <div className="space-y-2">
        <Label>Paste your meeting notes</Label>
        <Textarea
          rows={12}
          placeholder="Paste raw meeting notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </FeatureRunner>
  );
}