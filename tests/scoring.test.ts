import { describe, expect, it } from "vitest";
import { scoreAssessment } from "@/lib/assessment/scoring";
import { assessmentQuestions } from "@/content/assessment";

describe("scoreAssessment", () => {
  it("scores all top answers as Optimizing", () => {
    const answers: Record<string, string> = {};
    for (const q of assessmentQuestions) {
      answers[q.id] = q.choices[q.choices.length - 1].id;
    }
    const result = scoreAssessment(answers);
    expect(result.overall).toBe(100);
    expect(result.levelId).toBe("optimizing");
    expect(result.recommendedPhaseId).toBe("scale");
  });

  it("scores all lowest answers as Exploring", () => {
    const answers: Record<string, string> = {};
    for (const q of assessmentQuestions) {
      answers[q.id] = q.choices[0].id;
    }
    const result = scoreAssessment(answers);
    expect(result.overall).toBe(0);
    expect(result.levelId).toBe("exploring");
    expect(result.recommendedPhaseId).toBe("assess");
  });
});
