import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListTodo } from "lucide-react";
import { FeatureRunner } from "@/components/feature-runner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "AI Task Planner — Workplace AI" }] }),
  component: PlannerPage,
});

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  return (
    <FeatureRunner
      feature="planner"
      title="AI Task Planner"
      description="Prioritize tasks and get a suggested daily schedule."
      icon={<ListTodo className="h-5 w-5" />}
      buildPayload={() => (tasks.trim() ? { tasks } : null)}
    >
      <div className="space-y-2">
        <Label>Your tasks (one per line)</Label>
        <Textarea
          rows={10}
          placeholder={"Finish Q3 report\nCall client about proposal\nReview PRs\nGym"}
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
      </div>
    </FeatureRunner>
  );
}