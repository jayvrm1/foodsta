import { Competition, BattleSubmission } from '../types/index.ts';

const SAMPLE_SUBMISSIONS_MUSHROOM: BattleSubmission[] = [
  {
    id: 'sub-mush-1',
    battleId: 'battle-mushroom',
    chefId: 'chef-4',
    chefUsername: 'clara_chen',
    chefName: 'Clara Chen',
    chefAvatar: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Restaurant Chroma (Singapore, 1★)',
    dishName: 'Shiitake-Koji Glazed Duck Breast with Porcini Silk & Cacao Gastrique',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    inspiration: 'Investigating FlavorDB 1-Octen-3-ol and roasted pyrazine overlap between fungi, aged duck lipid layers, and single-origin dark chocolate.',
    ingredients: [
      { name: 'Fresh Maitake & Shiitake Fungi', quantity: '300g', category: 'produce' },
      { name: 'Dry-Aged Duck Breast', quantity: '2 whole', category: 'protein' },
      { name: 'Koji Fermented Porcini Paste', quantity: '60g', category: 'molecular' },
      { name: 'Valrhona 72% Dark Cacao', quantity: '25g', category: 'pantry' },
      { name: 'Smoked Pine Needles', quantity: '10g', category: 'produce' }
    ],
    instructions: [
      'Inoculate dried porcini with Aspergillus oryzae to build deep koji amino acids.',
      'Pan-roast duck breast skin until brittle glass; rest at 52°C.',
      'Glaze with cacao-shiitake reduction and smoke table-side over Scots pine.'
    ],
    cookingTimeMinutes: 45,
    flavorCompoundsIdentified: ['1-Octen-3-ol', 'Lentinan', 'Methional', '2,3,5-Trimethylpyrazine'],
    recipeDbSynergyIndex: 94,
    flavorDbPairingScore: 96,
    communityVotes: 1420,
    hasVoted: false,
    judgeEvaluations: [
      {
        id: 'eval-1',
        judgeId: 'chef-11',
        judgeName: 'Sebastian Vogel',
        judgeTitle: 'Senior Gastronomy Critic',
        judgeAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        scores: {
          creativity: 96,
          tasteAndFlavor: 98,
          presentation: 94,
          cookingTechnique: 95,
          ingredientUtilisation: 92
        },
        overallScore: 95.7,
        writtenFeedback: 'A breathtaking demonstration of computational gastronomy. The synergy between mushroom guanylate and dark cacao pyrazines provides unexpected harmonic balance.',
        evaluatedAt: '2026-10-29'
      },
      {
        id: 'eval-2',
        judgeId: 'chef-1',
        judgeName: 'Marcus Vander',
        judgeTitle: '3-Star Michelin Chef',
        judgeAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
        scores: {
          creativity: 92,
          tasteAndFlavor: 96,
          presentation: 95,
          cookingTechnique: 97,
          ingredientUtilisation: 94
        },
        overallScore: 95.1,
        writtenFeedback: 'Flawless fat rendering on the duck. The porcini silk delivers immense velvety coating on the palate.',
        evaluatedAt: '2026-10-30'
      }
    ],
    expertCompositeScore: 95.4,
    finalRank: 1,
    submittedAt: '2026-10-28'
  },
  {
    id: 'sub-mush-2',
    battleId: 'battle-mushroom',
    chefId: 'chef-8',
    chefUsername: 'astrid_lindqvist',
    chefName: 'Astrid Lindqvist',
    chefAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Nord Terroir (Copenhagen, 2★)',
    dishName: 'Chanterelle Tartlet with Birch Sap Reduction & Fermented Cloudberry',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    inspiration: 'Sub-arctic autumn foraging in Jämtland forests. Pairing wild apricot notes of golden chanterelles with birch bark sugar.',
    ingredients: [
      { name: 'Wild Foraged Golden Chanterelles', quantity: '350g', category: 'produce' },
      { name: 'Crisp Sourdough Rye Tart Shells', quantity: '4 pcs', category: 'pantry' },
      { name: 'Birch Sap Syrup', quantity: '40ml', category: 'pantry' },
      { name: 'Fermented Cloudberries', quantity: '30g', category: 'produce' }
    ],
    instructions: [
      'Gently poach young chanterelles in rendered bone marrow butter.',
      'Reduce birch sap to thick crystalline glaze.',
      'Assemble warm in brittle rye shell and crown with acidic cloudberries.'
    ],
    cookingTimeMinutes: 35,
    flavorCompoundsIdentified: ['1-Octen-3-ol', 'Benzaldehyde', 'Linalool'],
    recipeDbSynergyIndex: 88,
    flavorDbPairingScore: 91,
    communityVotes: 1180,
    hasVoted: true,
    judgeEvaluations: [
      {
        id: 'eval-3',
        judgeId: 'chef-11',
        judgeName: 'Sebastian Vogel',
        judgeTitle: 'Senior Gastronomy Critic',
        judgeAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        scores: {
          creativity: 91,
          tasteAndFlavor: 94,
          presentation: 96,
          cookingTechnique: 92,
          ingredientUtilisation: 95
        },
        overallScore: 93.3,
        writtenFeedback: 'Poetic Nordic expression. The acidity of the fermented cloudberry prevents the richness from fatiguing.',
        evaluatedAt: '2026-10-30'
      }
    ],
    expertCompositeScore: 93.3,
    finalRank: 2,
    submittedAt: '2026-10-27'
  },
  {
    id: 'sub-mush-3',
    battleId: 'battle-mushroom',
    chefId: 'chef-10',
    chefUsername: 'maya_lin',
    chefName: 'Maya Lin',
    chefAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Studio Umami (San Francisco)',
    dishName: 'King Oyster Scallops with Truffle Dashi Emulsion & Crispy Enoki Straw',
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80',
    inspiration: 'Transforming king oyster mushroom stems into vegan sea scallops with cross-hatch scores and caramelized allium butter.',
    ingredients: [
      { name: 'King Oyster Stems', quantity: '4 thick cylinders', category: 'produce' },
      { name: 'Fresh Enoki Mushrooms (Fried crisp)', quantity: '100g', category: 'produce' },
      { name: 'Kombu-Shiitake Dashi', quantity: '120ml', category: 'pantry' },
      { name: 'White Truffle Oil & Shaved Truffle', quantity: '10g', category: 'pantry' }
    ],
    instructions: [
      'Score stem cylinders in diamond grid; sous-vide in mushroom brine.',
      'Pan-sear in hot cast iron with thyme butter until golden caramelized.',
      'Blend dashi with soy lecithin into a buoyant aerated foam.'
    ],
    cookingTimeMinutes: 25,
    flavorCompoundsIdentified: ['1-Octen-3-ol', 'Methional', 'Glutamic Acid'],
    recipeDbSynergyIndex: 86,
    flavorDbPairingScore: 89,
    communityVotes: 980,
    hasVoted: false,
    judgeEvaluations: [],
    expertCompositeScore: 90.8,
    finalRank: 3,
    submittedAt: '2026-10-29'
  }
];

export const COMPETITIONS: Competition[] = [
  {
    id: 'battle-mushroom',
    title: 'The Ultimate Mushroom Challenge',
    theme: 'Fungal Alchemy & Umami Frontiers',
    description: 'Create an original dish celebrating wild or cultivated mushrooms as the primary taste and sensory focus. Highlight computational volatile compounds (1-Octen-3-ol, Lentinan) and innovative cooking techniques.',
    coverImage: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    requiredIngredients: ['Wild or Cultivated Mushrooms (Min 2 varieties)', 'Natural Umami Booster (Koji, Kelp, or Miso)'],
    rules: [
      'Mushrooms must represent at least 45% of total dish volume or core flavor axis.',
      'Dish must be completely original with step-by-step instructions and high-resolution plating photography.',
      'Submissions must identify at least 2 key volatile flavor compounds.'
    ],
    submissionDeadline: 'Nov 15, 2026 (14 Days Remaining)',
    prizePool: '$25,000 Total Prize Pool',
    prizeFirst: '$15,000 + 1-Month Guest Residency at Mirazur (3★ Michelin)',
    prizeSecond: '$7,000 + Custom Japanese Damascus Knife Set by Nenohi',
    prizeThird: '$3,000 + PolyScience Precision Sous-Vide Station',
    participantsCount: 48,
    judges: [
      {
        id: 'chef-1',
        name: 'Marcus Vander',
        title: '3-Star Michelin Chef',
        restaurant: 'L’Astrance Moderne (Paris)',
        avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'chef-11',
        name: 'Sebastian Vogel',
        title: 'Senior Gastronomy Critic & Chair',
        restaurant: 'European Gastronomy Council',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'chef-3',
        name: 'Kenjiro Sato',
        title: 'Kaiseki Master (3★ Michelin)',
        restaurant: 'Sato Ginza (Tokyo)',
        avatar: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=400&q=80'
      }
    ],
    submissions: SAMPLE_SUBMISSIONS_MUSHROOM
  },
  {
    id: 'battle-potato',
    title: 'Potato Innovation Challenge',
    theme: 'Humblest Tuber, Highest Gastronomy',
    description: 'Elevate the potato into a three-star culinary masterpiece. Texture contrasts, crispness kinetics, and methional aromatics under scrutiny.',
    coverImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    requiredIngredients: ['Kennebec, Russet, or Ratte Potatoes', 'Cultured Butter or Animal Fat'],
    rules: [
      'Focus on innovative texture architecture (glass crisp, silky gel, or aerated foam).',
      'Full nutritional breakdown and prep timing required.'
    ],
    submissionDeadline: 'Nov 22, 2026',
    prizePool: '$20,000 Total Pool',
    prizeFirst: '$12,000 + Feature in Global Culinary Review',
    prizeSecond: '$5,000 + Pacojet 4 System',
    prizeThird: '$3,000 Cash Award',
    participantsCount: 36,
    judges: [
      {
        id: 'chef-5',
        name: 'Massimo Bellini',
        title: 'Chef Patron (3★)',
        restaurant: 'Osteria Della Luna',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'chef-15',
        name: 'Andre Dubois',
        title: 'Master Sommelier & Palate Judge',
        restaurant: 'Epicurean Guild (Monaco)',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    submissions: []
  },
  {
    id: 'battle-five-ingredients',
    title: 'Five-Ingredient Masterpiece',
    theme: 'Radical Culinary Minimalism',
    description: 'Produce an unforgettable dish using EXACTLY five ingredients (excluding water and salt). No garnishes or hidden additives allowed.',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    requiredIngredients: ['Exactly 5 declared ingredients'],
    rules: [
      'Only water, salt, and 5 distinct raw ingredients permitted.',
      'Technique, extraction, and temperature control must carry the dish.'
    ],
    submissionDeadline: 'Dec 05, 2026',
    prizePool: '$18,000 Total Pool',
    prizeFirst: '$10,000 + Head Chef Stage at Le Bernardin NYC',
    prizeSecond: '$5,000 Cash',
    prizeThird: '$3,000 Cash',
    participantsCount: 52,
    judges: [
      {
        id: 'chef-1',
        name: 'Marcus Vander',
        title: '3-Star Michelin Chef',
        restaurant: 'L’Astrance Moderne',
        avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80'
      }
    ],
    submissions: []
  },
  {
    id: 'battle-indian',
    title: 'Reinvent Traditional Indian Cuisine',
    theme: 'Subcontinental Aromatics Deconstructed',
    description: 'Bring ancient Awadhi, Malabar, Chettinad, or Bengali culinary heritage into the contemporary modernist spotlight.',
    coverImage: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
    requiredIngredients: ['Heritage Spices (Cardamom, Clove, or Saffron)', 'Ghee or Cold-Pressed Mustard Oil'],
    rules: [
      'Celebrate authentic regional flavor foundations while pushing modern plating and textures.'
    ],
    submissionDeadline: 'Dec 18, 2026 (Registration Opens Soon)',
    prizePool: '$22,000 Total Pool',
    prizeFirst: '$14,000 + London Pop-Up Showcase',
    prizeSecond: '$5,000 Cash',
    prizeThird: '$3,000 Cash',
    participantsCount: 64,
    judges: [
      {
        id: 'chef-7',
        name: 'Vikram Sharma',
        title: 'Culinary Director (2★)',
        restaurant: 'Saffron & Smoke',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      }
    ],
    submissions: []
  },
  {
    id: 'battle-fermentation',
    title: 'Global Umami & Fermentation Frontier',
    theme: 'Microbial Gastronomy & Koji Science',
    description: 'Koji, garum, lacto-fermentation, and vinegar kinetics. Showcase living culinary cultures.',
    coverImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
    requiredIngredients: ['Self-inoculated Koji or 30-day Fermented Garum'],
    rules: [
      'Document pH curves, salinity, and fermentation chamber conditions.'
    ],
    submissionDeadline: 'Jan 10, 2027',
    prizePool: '$20,000 Total Pool',
    prizeFirst: '$12,000 + FoodScope Labs R&D Fellowship',
    prizeSecond: '$5,000 Cash',
    prizeThird: '$3,000 Cash',
    participantsCount: 39,
    judges: [],
    submissions: []
  },
  {
    id: 'battle-truffle-completed',
    title: 'International Truffle Showdown 2025',
    theme: 'Black Gold of Gastronomy',
    description: 'The premier global championship showcasing autumn truffles across classical and modernist spectrums.',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    status: 'completed',
    requiredIngredients: ['Fresh Black Truffle Tuber Melanosporum'],
    rules: ['Judged across the 5 official Foodsta criteria by an elite panel of 4 judges.'],
    submissionDeadline: 'Completed Oct 2025',
    prizePool: '$30,000 Awarded',
    prizeFirst: '$18,000 Awarded to Chef Marcus Vander',
    prizeSecond: '$8,000 Awarded to Chef Massimo Bellini',
    prizeThird: '$4,000 Awarded to Chef Kenjiro Sato',
    participantsCount: 72,
    judges: [],
    submissions: [],
    winners: {
      firstPlace: {
        id: 'win-1',
        battleId: 'battle-truffle-completed',
        chefId: 'chef-1',
        chefUsername: 'marcus_vander',
        chefName: 'Marcus Vander',
        chefAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
        chefRestaurant: 'L’Astrance Moderne (Paris, 3★)',
        dishName: 'Perigord Black Truffle & Kennebec Potato Pavé with Brown Butter Emulsion',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
        inspiration: 'Classical French layering meets modern thermal pressing precision.',
        ingredients: [],
        instructions: [],
        cookingTimeMinutes: 75,
        flavorCompoundsIdentified: ['Methional', '1-Octen-3-ol', 'Dimethyl sulfide'],
        recipeDbSynergyIndex: 98,
        flavorDbPairingScore: 99,
        communityVotes: 3840,
        judgeEvaluations: [],
        expertCompositeScore: 98.6,
        finalRank: 1,
        submittedAt: '2025-10-15'
      }
    }
  }
];
