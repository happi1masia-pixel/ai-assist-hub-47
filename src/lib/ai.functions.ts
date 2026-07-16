import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const FeatureInput = z.object({
  feature: z.enum(["email", "notes", "planner", "research"]),
  payload: z.record(z.string(), z.string()),
});

function buildPrompt(feature: string, p: Record<string, string>) {
  switch (feature) {
    case "email":
      return {
        system:
          "You are a professional workplace writing assistant. Write clear, well-structured emails with a greeting, body, and closing.",
        prompt: `Write an email.\nRecipient type: ${p.recipient}\nPurpose: ${p.purpose}\nTone: ${p.tone}\n\nInclude a subject line, greeting, body paragraphs, and a professional closing.`,
      };
    case "notes":
      return {
        system:
          "You summarize meeting notes into structured briefs for busy professionals.",
        prompt: `Summarize the following meeting notes. Return clearly labeled sections in markdown:\n\n## Summary\n## Key Decisions\n## Action Items\n## Deadlines\n\nMeeting Notes:\n${p.notes}`,
      };
    case "planner":
      return {
        system:
          "You are a productivity coach who organizes tasks into a realistic daily schedule.",
        prompt: `Organize these tasks by priority and produce a suggested daily schedule with time blocks (e.g. 9:00 - 10:00). Return markdown with a Prioritized Tasks list and a Daily Schedule table.\n\nTasks:\n${p.tasks}`,
      };
    case "research":
      return {
        system:
          "You are a research assistant. Produce concise, well-structured briefs.",
        prompt: `Analyze the following topic or article and return markdown with these sections:\n\n## Summary\n## Key Insights\n## Recommendations\n\nInput:\n${p.topic}`,
      };
    default:
      throw new Error("Unknown feature");
  }
}

export const runAiFeature = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => FeatureInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);
    const { system, prompt } = buildPrompt(data.feature, data.payload);
    const { text } = await generateText({
      model: gateway("openai/gpt-5.5"),
      system,
      prompt,
    });
    return { text };
  });