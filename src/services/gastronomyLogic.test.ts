import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  calculateJudgeScore, 
  calculateSharedCompoundAffinity, 
  calculateChefRankingScore,
  rankBattleSubmissions
} from './gastronomyLogic.ts';
import { BattleSubmission } from '../types/index.ts';

test('calculateJudgeScore calculates weighted composite correctly according to official weights', () => {
  // 25% creativity, 25% taste, 20% presentation, 20% technique, 10% ingredient utilization
  const perfectScores = {
    creativity: 100,
    tasteAndFlavor: 100,
    presentation: 100,
    cookingTechnique: 100,
    ingredientUtilisation: 100,
  };
  assert.equal(calculateJudgeScore(perfectScores), 100.0);

  const mixedScores = {
    creativity: 90,        // 90 * 0.25 = 22.5
    tasteAndFlavor: 95,    // 95 * 0.25 = 23.75
    presentation: 80,      // 80 * 0.20 = 16.0
    cookingTechnique: 85,  // 85 * 0.20 = 17.0
    ingredientUtilisation: 70, // 70 * 0.10 = 7.0
    // Total = 22.5 + 23.75 + 16.0 + 17.0 + 7.0 = 86.25 -> rounded to 86.3
  };
  assert.equal(calculateJudgeScore(mixedScores), 86.3);
});

test('calculateSharedCompoundAffinity finds overlapping compounds and bounds scores', () => {
  const compoundsA = ['1-Octen-3-ol', 'Lentinan', '2-Methylbutanal', 'Guanylic acid'];
  const compoundsB = ['1-Octen-3-ol', 'Guanylic acid', 'Methional', 'Eugenol'];
  
  const result = calculateSharedCompoundAffinity(compoundsA, compoundsB);
  assert.equal(result.sharedCount, 2);
  assert.deepEqual(result.sharedList, ['1-Octen-3-ol', 'Guanylic acid']);
  assert.ok(result.affinityScore > 60 && result.affinityScore < 100);

  const noOverlap = calculateSharedCompoundAffinity(['A'], ['B']);
  assert.equal(noOverlap.sharedCount, 0);
  assert.equal(noOverlap.affinityScore, 38);
});

test('calculateChefRankingScore rewards battles and culinary credentials', () => {
  const masterScore = calculateChefRankingScore({
    battlesWon: 4,
    expertRating: 4.95,
    recipesCount: 18,
    followersCount: 150000,
    michelinStars: 3
  });

  const noviceScore = calculateChefRankingScore({
    battlesWon: 0,
    expertRating: 3.5,
    recipesCount: 2,
    followersCount: 500,
  });

  assert.ok(masterScore > noviceScore, 'Master chef score must rank higher than novice');
  assert.ok(masterScore > 70, 'Master chef score should be high tier');
});

test('rankBattleSubmissions correctly sorts submissions by composite score', () => {
  const sampleSubs: BattleSubmission[] = [
    {
      id: 'sub-1',
      battleId: 'b-1',
      chefId: 'c-1',
      chefUsername: 'chef_one',
      chefName: 'Chef One',
      chefAvatar: '',
      chefRestaurant: 'Test 1',
      dishName: 'Dish 1',
      imageUrl: '',
      inspiration: '',
      ingredients: [],
      instructions: [],
      cookingTimeMinutes: 30,
      flavorCompoundsIdentified: [],
      recipeDbSynergyIndex: 80,
      flavorDbPairingScore: 80,
      communityVotes: 120,
      judgeEvaluations: [],
      expertCompositeScore: 84.5,
      submittedAt: '2026-10-01'
    },
    {
      id: 'sub-2',
      battleId: 'b-1',
      chefId: 'c-2',
      chefUsername: 'chef_two',
      chefName: 'Chef Two',
      chefAvatar: '',
      chefRestaurant: 'Test 2',
      dishName: 'Dish 2',
      imageUrl: '',
      inspiration: '',
      ingredients: [],
      instructions: [],
      cookingTimeMinutes: 45,
      flavorCompoundsIdentified: [],
      recipeDbSynergyIndex: 90,
      flavorDbPairingScore: 92,
      communityVotes: 95,
      judgeEvaluations: [],
      expertCompositeScore: 96.0,
      submittedAt: '2026-10-02'
    }
  ];

  const ranked = rankBattleSubmissions(sampleSubs);
  assert.equal(ranked[0].id, 'sub-2');
  assert.equal(ranked[0].finalRank, 1);
  assert.equal(ranked[1].id, 'sub-1');
  assert.equal(ranked[1].finalRank, 2);
});
