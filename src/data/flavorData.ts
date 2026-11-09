import { IngredientFlavorData, FlavorCompound } from '../types/index.ts';

export const FLAVOR_COMPOUNDS: Record<string, FlavorCompound> = {
  octenol: {
    name: '1-Octen-3-ol',
    formula: 'C8H16O',
    flavorClass: 'Earthy & Fungal',
    odorDescription: 'Characteristic mushroom, forest floor, and damp woodland aroma.',
    foundIn: ['Shiitake Mushroom', 'Black Truffle', 'Porcini', 'Chanterelle']
  },
  lentinan: {
    name: 'Lentinan / Guanylate',
    formula: 'C40H66O33',
    flavorClass: 'Deep Umami',
    odorDescription: 'Intense savory ribonucleotide synergist multiplying monosodium glutamate sensation.',
    foundIn: ['Shiitake Mushroom', 'Kombu Kelp', 'Dried Bonito']
  },
  pyrazines: {
    name: '2,3,5-Trimethylpyrazine',
    formula: 'C7H10N2',
    flavorClass: 'Roasted & Nutty',
    odorDescription: 'Deep roasted cocoa, baked crust, toasted sesame and seared meat notes.',
    foundIn: ['Dark Chocolate', 'Roasted Coffee', 'Seared Wagyu', 'Black Garlic']
  },
  eugenol: {
    name: 'Eugenol',
    formula: 'C10H12O2',
    flavorClass: 'Spiced & Phenolic',
    odorDescription: 'Warm clove, allspice, woody herbal and aromatic cinnamon note.',
    foundIn: ['Clove', 'Thai Basil', 'Nutmeg', 'Bay Leaf', 'Red Wine']
  },
  limonene: {
    name: 'D-Limonene',
    formula: 'C10H16',
    flavorClass: 'Citrus & Terpenic',
    odorDescription: 'Bright zesty citrus peel, fresh bergamot and refreshing sweet rind.',
    foundIn: ['Yuzu', 'Meyer Lemon', 'Finger Lime', 'Cardamom']
  },
  benzaldehyde: {
    name: 'Benzaldehyde',
    formula: 'C7H6O',
    flavorClass: 'Fruity & Amygdalic',
    odorDescription: 'Sweet almond, marzipan, cherry pit and stone fruit nuance.',
    foundIn: ['Morello Cherry', 'Marcona Almond', 'Tonka Bean', 'Aged Balsamic']
  },
  methional: {
    name: 'Methional',
    formula: 'C4H8OS',
    flavorClass: 'Sulfury & Savory',
    odorDescription: 'Baked potato skin, toasted bread, rich broth and roasted allium.',
    foundIn: ['Kennebec Potato', 'Brown Butter', 'Caramelized Leek']
  },
  linalool: {
    name: 'Linalool',
    formula: 'C10H18O',
    flavorClass: 'Floral & Woody',
    odorDescription: 'Sweet floral lavender, fresh citrus blossom and subtle coriander spice.',
    foundIn: ['Coriander Seed', 'Bergamot', 'Lavender', 'Thyme']
  },
  guaiacol: {
    name: 'Guaiacol',
    formula: 'C7H8O2',
    flavorClass: 'Smoky & Phenolic',
    odorDescription: 'Smoked hardwood, peaty barrel, charred cedar and barbecue crust.',
    foundIn: ['Smoked Paprika', 'Binchotan Charcoal Smoke', 'Aged Mezcal']
  }
};

export const FLAVOR_INGREDIENTS: IngredientFlavorData[] = [
  {
    id: 'ing-shiitake',
    name: 'Shiitake Mushroom',
    category: 'Fungi / Umami',
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    flavorDescriptor: ['Earthy', 'Deep Umami', 'Woody', 'Savory Broth'],
    compounds: [FLAVOR_COMPOUNDS.octenol, FLAVOR_COMPOUNDS.lentinan],
    bestPairings: [
      {
        ingredient: 'Duck Breast',
        synergyScore: 94,
        sharedCompoundsCount: 3,
        flavorReason: 'Shared sulfurous and savory fatty esters balance rich gamey lipid notes.'
      },
      {
        ingredient: 'Black Garlic',
        synergyScore: 92,
        sharedCompoundsCount: 2,
        flavorReason: 'Synergistic guanylate-glutamate umami multiplier produces 8x sensory depth.'
      },
      {
        ingredient: 'Brown Butter',
        synergyScore: 89,
        sharedCompoundsCount: 2,
        flavorReason: 'Lactone richness harmonizes the damp woodland volatile 1-octen-3-ol.'
      }
    ],
    recipeMatches: [
      'Shiitake & Duck Consommé',
      'Wild Mushroom & Truffle Agnolotti',
      'Miso Glazed King Oyster & Shiitake Skewer'
    ]
  },
  {
    id: 'ing-truffle',
    name: 'Black Winter Truffle',
    category: 'Gourmet Fungi',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80',
    flavorDescriptor: ['Pungent', 'Forest Musk', 'Garlicky Sulphur', 'Oak'],
    compounds: [FLAVOR_COMPOUNDS.octenol, FLAVOR_COMPOUNDS.methional],
    bestPairings: [
      {
        ingredient: 'Yukon Gold Potato',
        synergyScore: 97,
        sharedCompoundsCount: 3,
        flavorReason: 'Methional baked potato skin resonance magnifies truffle dimethyl sulfide.'
      },
      {
        ingredient: 'Parmigiano-Reggiano',
        synergyScore: 95,
        sharedCompoundsCount: 3,
        flavorReason: 'Glutamate crystals amplify volatile aromatic truffle sterols.'
      },
      {
        ingredient: 'Farm Egg Yolk',
        synergyScore: 96,
        sharedCompoundsCount: 2,
        flavorReason: 'Lipid emulsification binds fat-soluble aroma ketones directly to tongue papillae.'
      }
    ],
    recipeMatches: [
      'Pomme Purée with Shaved Perigord Truffle',
      'Hand-Cut Truffle Tagliolini with Bordier Butter',
      'Slow-Poached Egg in Truffle Cloud'
    ]
  },
  {
    id: 'ing-potato',
    name: 'Kennebec & Yukon Potato',
    category: 'Tubers',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    flavorDescriptor: ['Earthy Starch', 'Methional Toasted Crust', 'Nutty', 'Subtle Sweet'],
    compounds: [FLAVOR_COMPOUNDS.methional, FLAVOR_COMPOUNDS.pyrazines],
    bestPairings: [
      {
        ingredient: 'Rosemary',
        synergyScore: 91,
        sharedCompoundsCount: 2,
        flavorReason: 'Camphorous pinene penetrates and brightens dense potato starch granules.'
      },
      {
        ingredient: 'Gruyère AOP',
        synergyScore: 93,
        sharedCompoundsCount: 3,
        flavorReason: 'Lactic acid and casein proteins elevate baked tuber aroma.'
      },
      {
        ingredient: 'Smoked Paprika',
        synergyScore: 88,
        sharedCompoundsCount: 2,
        flavorReason: 'Guaiacol smoke compounds bridge with roasted pyrazine potato skin.'
      }
    ],
    recipeMatches: [
      'Pommes Pavé with Thyme Emulsion',
      'Crispy Kennebec Mille-Feuille',
      'Gnocchi with Roasted Yeast Butter'
    ]
  },
  {
    id: 'ing-chocolate',
    name: 'Single-Origin Dark Chocolate (72%)',
    category: 'Cacao / Confectionery',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    flavorDescriptor: ['Bitter Roasted', 'Red Fruit Acidity', 'Alkaloid', 'Silky Tannin'],
    compounds: [FLAVOR_COMPOUNDS.pyrazines, FLAVOR_COMPOUNDS.benzaldehyde],
    bestPairings: [
      {
        ingredient: 'Blue Cheese (Roquefort)',
        synergyScore: 90,
        sharedCompoundsCount: 3,
        flavorReason: 'Counter-intuitive scientific pairing: methyl ketones bridge cacao bitterness with blue penicillium.'
      },
      {
        ingredient: 'Morello Cherry',
        synergyScore: 95,
        sharedCompoundsCount: 3,
        flavorReason: 'Shared benzaldehyde amygdalic notes bridge deep cacao astringency.'
      },
      {
        ingredient: 'Chili Chipotle',
        synergyScore: 87,
        sharedCompoundsCount: 2,
        flavorReason: 'Capsaicin stimulates trigeminal receptor while pyrazines satisfy retronasal aroma.'
      }
    ],
    recipeMatches: [
      'Valrhona Dark Chocolate Cremeux with Tonka Bean',
      'Venison Loin with Savory Cacao & Juniper Reduction',
      'Smoked Salted Chocolate Tart'
    ]
  },
  {
    id: 'ing-yuzu',
    name: 'Kochi Yuzu Citrus',
    category: 'Citrus',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    flavorDescriptor: ['Zesty Floral', 'High Acidity', 'Mandarin-Grapefruit Hybrid', 'Terpenic'],
    compounds: [FLAVOR_COMPOUNDS.limonene, FLAVOR_COMPOUNDS.linalool],
    bestPairings: [
      {
        ingredient: 'Hokkaido Scallop',
        synergyScore: 96,
        sharedCompoundsCount: 3,
        flavorReason: 'Limonene cuts scallop glycine sweetness while preserving raw maritime sweetness.'
      },
      {
        ingredient: 'White Soy Sauce (Shiro Shoyu)',
        synergyScore: 94,
        sharedCompoundsCount: 2,
        flavorReason: 'Delicate wheat-brewed umami prevents citrus acidity from over-denaturing proteins.'
      },
      {
        ingredient: 'Fennel Pollen',
        synergyScore: 88,
        sharedCompoundsCount: 2,
        flavorReason: 'Anethole floral anise compounds create dimensional citrus top-notes.'
      }
    ],
    recipeMatches: [
      'Cured Sea Bream with Yuzu Kosho Vinaigrette',
      'Yuzu & White Chocolate Curd with Shiso Granita',
      'Scallop Crudo with Finger Lime and Pressed Yuzu Oil'
    ]
  },
  {
    id: 'ing-duck',
    name: 'Aged Duck Breast',
    category: 'Game Poultry',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    flavorDescriptor: ['Rich Iron', 'Crispy Rendered Fat', 'Gamey Umami', 'Pungent Skin'],
    compounds: [FLAVOR_COMPOUNDS.methional, FLAVOR_COMPOUNDS.pyrazines],
    bestPairings: [
      {
        ingredient: 'Morello Cherry',
        synergyScore: 95,
        sharedCompoundsCount: 3,
        flavorReason: 'Fruit malic acidity cuts through heavy subcutaneous waterfowl lipid coating.'
      },
      {
        ingredient: 'Shiitake Mushroom',
        synergyScore: 94,
        sharedCompoundsCount: 3,
        flavorReason: 'Fungal umami deepens iron richness of seared dry-aged duck breast.'
      },
      {
        ingredient: 'Lavender Honey',
        synergyScore: 89,
        sharedCompoundsCount: 2,
        flavorReason: 'Linalool floral honey lacquering caramelizes skin into brittle glass.'
      }
    ],
    recipeMatches: [
      'Dry-Aged Spiced Duck Breast with Cherry Jus',
      'Crispy Duck Confit with Fermented Plum',
      'Smoked Duck Carpaccio with Yuzu Kosho'
    ]
  }
];
