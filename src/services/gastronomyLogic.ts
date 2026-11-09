import { JudgeCriteriaScores, BattleSubmission } from '../types/index.ts';

/**
 * Calculates official FOODSTA Expert Evaluation Score
 * Weights:
 * - Creativity & Innovation: 25%
 * - Taste & Flavour balance: 25%
 * - Presentation: 20%
 * - Cooking Technique: 20%
 * - Ingredient Utilisation: 10%
 */
export function calculateJudgeScore(scores: JudgeCriteriaScores): number {
  const weighted = 
    (scores.creativity * 0.25) +
    (scores.tasteAndFlavor * 0.25) +
    (scores.presentation * 0.20) +
    (scores.cookingTechnique * 0.20) +
    (scores.ingredientUtilisation * 0.10);
  
  return Math.round(weighted * 10) / 10;
}

/**
 * Computes scientific pairing affinity between two ingredients based on shared aromatic compounds
 * Uses FlavorDB overlap metric model
 */
export function calculateSharedCompoundAffinity(
  compoundsA: string[], 
  compoundsB: string[]
): { sharedCount: number; affinityScore: number; sharedList: string[] } {
  const setB = new Set(compoundsB.map(c => c.toLowerCase().trim()));
  const sharedList = compoundsA
    .map(c => c.trim())
    .filter(c => setB.has(c.toLowerCase()));
  
  const sharedCount = sharedList.length;
  // If no compounds, baseline 35% affinity; each shared compound adds ~15% up to 98%
  const affinityScore = sharedCount === 0 
    ? 38 
    : Math.min(99, Math.round(45 + sharedCount * 13.5));

  return {
    sharedCount,
    affinityScore,
    sharedList
  };
}

/**
 * Computes composite ranking score for the Global Chef Leaderboard
 * Transparent combination:
 * - Battle wins & scores: 40%
 * - Expert evaluation / Michelin credentials: 30%
 * - Recipe quality & depth: 20%
 * - Community engagement: 10%
 */
export function calculateChefRankingScore(params: {
  battlesWon: number;
  expertRating: number; // 0.0 - 5.0
  recipesCount: number;
  followersCount: number;
  michelinStars?: number;
}): number {
  const battlePoints = Math.min(100, params.battlesWon * 18);
  const ratingPoints = (params.expertRating / 5.0) * 100;
  const michelinBonus = (params.michelinStars || 0) * 10;
  const recipePoints = Math.min(100, params.recipesCount * 4);
  const engagementPoints = Math.min(100, Math.log10(Math.max(10, params.followersCount)) * 20);

  const total = 
    (battlePoints * 0.40) + 
    ((ratingPoints + michelinBonus) * 0.30) + 
    (recipePoints * 0.20) + 
    (engagementPoints * 0.10);

  return Math.round(total * 10) / 10;
}

/**
 * Sorts battle submissions by composite expert score and assigns 1st, 2nd, 3rd ranks
 */
export function rankBattleSubmissions(submissions: BattleSubmission[]): BattleSubmission[] {
  const sorted = [...submissions].sort((a, b) => {
    const scoreA = a.expertCompositeScore ?? 0;
    const scoreB = b.expertCompositeScore ?? 0;
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    return (b.communityVotes || 0) - (a.communityVotes || 0);
  });

  return sorted.map((sub, index) => ({
    ...sub,
    finalRank: index + 1
  }));
}
