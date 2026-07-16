import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { FeatureRunner } from "@/components/feature-runner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Workplace AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("Client");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Formal");

  return (
    <FeatureRunner
      feature="email"
      title="Smart Email Generator"
      description="Draft professional emails with the right tone in seconds."
      icon={<Mail className="h-5 w-5" />}
      buildPayload={() => (purpose.trim() ? { recipient, purpose, tone } : null)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Recipient</Label>
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Client">Client</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Team">Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Formal">Formal</SelectItem>
              <SelectItem value="Friendly">Friendly</SelectItem>
              <SelectItem value="Persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Email purpose</Label>
        <Textarea
          rows={4}
          placeholder="e.g. Follow up on the Q3 proposal and ask for feedback by Friday."
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>
    </FeatureRunner>
  );
}