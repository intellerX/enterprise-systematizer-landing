import {
  assessmentQuestions,
  maturityLevels,
  pillars,
  type MaturityLevelId,
  type PillarId,
} from "@/content/assessment";

export type Answers = Record<string, string>;

export type PillarScore = {
  pillarId: PillarId;
  label: string;
  score: number;
};

export type AssessmentResult = {
  pillarScores: PillarScore[];
  overall: number;
  levelId: MaturityLevelId;
  levelLabel: string;
  summary: string;
  recommendedPhaseId: string;
  weakestPillars: PillarId[];
};

export function scoreAssessment(answers: Answers): AssessmentResult {
  const byPillar: Record<PillarId, number[]> = {
    strategy: [],
    data: [],
    engineering: [],
    governance: [],
    people: [],
  };

  for (const q of assessmentQuestions) {
    const choiceId = answers[q.id];
    const choice = q.choices.find((c) => c.id === choiceId);
    if (choice) byPillar[q.pillarId].push(choice.score);
  }

  const pillarScores: PillarScore[] = pillars.map((p) => {
    const scores = byPillar[p.id];
    const score =
      scores.length === 0
        ? 0
        : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return { pillarId: p.id, label: p.label, score };
  });

  const overall = Math.round(
    pillarScores.reduce((a, b) => a + b.score, 0) / pillarScores.length,
  );

  const sortedLevels = [...maturityLevels].sort(
    (a, b) => b.minScore - a.minScore,
  );
  const level =
    sortedLevels.find((l) => overall >= l.minScore) ?? maturityLevels[0];

  const weakestPillars = [...pillarScores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .map((p) => p.pillarId);

  return {
    pillarScores,
    overall,
    levelId: level.id,
    levelLabel: level.label,
    summary: level.summary,
    recommendedPhaseId: level.phaseId,
    weakestPillars,
  };
}

/**
 * Future backend contract (v2):
 * POST /api/assessment
 * body: { answers: Answers, result: AssessmentResult, consentPersist: boolean }
 * response: { id: string }
 * Auth: none for anonymous; rate-limited.
 */
export type FutureAssessmentPersistRequest = {
  answers: Answers;
  result: AssessmentResult;
  consentPersist: boolean;
};
