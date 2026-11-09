import { Recipe } from '../types/index.ts';

export const RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    chefId: 'chef-1',
    chefName: 'Marcus Vander',
    chefUsername: 'marcus_vander',
    chefAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'L’Astrance Moderne (Paris, 3★)',
    title: 'Perigord Black Truffle & Kennebec Potato Pavé with Brown Butter Emulsion',
    description: 'Crisp layered potato mille-feuille pressed with Bordier cultured butter, infused with fresh Perigord black truffle melanosporum, served alongside an aerated brown butter sabayon.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80'
    ],
    prepTimeMinutes: 45,
    cookTimeMinutes: 75,
    servings: 4,
    difficulty: 'Master',
    cuisine: 'French',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    ingredients: [
      { name: 'Kennebec Potatoes (mandolined 1mm)', quantity: '1.2 kg', category: 'produce' },
      { name: 'Fresh Perigord Black Truffle', quantity: '35g', category: 'produce' },
      { name: 'Clarified Cultured Butter', quantity: '180g', category: 'dairy' },
      { name: 'Sel Gris de Guérande', quantity: '8g', category: 'pantry' },
      { name: 'Aged Parmigiano-Reggiano (36 Mo)', quantity: '60g', category: 'dairy' },
      { name: 'Organic Egg Yolks', quantity: '3 pcs', category: 'dairy' },
      { name: 'Champagne Vinegar Reduction', quantity: '15ml', category: 'pantry' },
      { name: 'Fresh Thyme Leaves', quantity: '5g', category: 'produce' }
    ],
    instructions: [
      'Mandoline Kennebec potatoes into translucent 1mm discs; do not rinse to retain surface amylose starch.',
      'Toss slices in melted clarified cultured butter, finely grated Parmigiano-Reggiano, and microplaned black truffle.',
      'Line a terrine mold with parchment; build tight uniform shingled layers, dusting fleur de sel every three layers.',
      'Cover with parchment and foil; bake at 150°C (300°F) for 1 hour 15 minutes until tender to the center knife test.',
      'Weight the hot terrine with 2kg weights and press under refrigeration for minimum 12 hours.',
      'Portion into pristine 3x7cm rectangles. Sear in clarified butter over high heat until glass-like crisp on all four sides.',
      'Emulsify egg yolks with champagne vinegar reduction and noisette brown butter into an airy foam; shave fresh truffle over the top.'
    ],
    nutrition: {
      calories: 385,
      protein: 8,
      carbs: 34,
      fat: 25,
      fiber: 4,
      sourceLabel: 'Foodoscope Computational Gastronomy USDA Estimate'
    },
    flavorProfile: {
      umami: 94,
      savory: 96,
      acidic: 32,
      sweet: 18,
      bitter: 14,
      spicy: 8,
      aromaNotes: ['Damp Earth', 'Toasted Hazelnut', 'Caramelized Starch', 'Oak Musk']
    },
    pairingSuggestions: [
      {
        ingredient: 'Vintage Blanc de Blancs Champagne',
        synergyReason: 'Fine yeast autolysis bready notes resonate with baked potato methional volatiles.',
        sharedCompounds: ['Methional', 'Acetaldehyde'],
        affinityScore: 96
      },
      {
        ingredient: 'Slow-Poached Farm Egg Yolk',
        synergyReason: 'Rich lecithin lipids solubilize lipophilic truffle ketones onto the palate.',
        sharedCompounds: ['Phospholipids', 'Butyric acid'],
        affinityScore: 98
      }
    ],
    likesCount: 3420,
    commentsCount: 184,
    savesCount: 1290,
    rating: 4.97,
    reviewCount: 88,
    createdAt: '2026-10-24'
  },
  {
    id: 'rec-2',
    chefId: 'chef-3',
    chefName: 'Kenjiro Sato',
    chefUsername: 'kenji_sato',
    chefAvatar: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Sato Ginza (Tokyo, 3★)',
    title: 'Dry-Aged Shima-Aji Tartare with Dashi Gelee & Smoked Yuzu Kosho',
    description: 'Line-caught striped jack aged 6 days on cedar paper, tossed with smoked mountain yuzu kosho, crowned with ichiban dashi consommé gelee and finger lime pearls.',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 30,
    cookTimeMinutes: 10,
    servings: 2,
    difficulty: 'Master',
    cuisine: 'Japanese',
    dietaryTags: ['High Protein', 'Gluten-Free', 'Dairy-Free'],
    ingredients: [
      { name: 'Ikejime Striped Jack (Shima-Aji)', quantity: '240g', category: 'protein' },
      { name: 'Rishiri Kombu (Cold-extracted 18h)', quantity: '15g', category: 'pantry' },
      { name: 'Hongarebushi (Aged Katsuobushi)', quantity: '25g', category: 'pantry' },
      { name: 'Green Yuzu Kosho (Wild-harvested)', quantity: '6g', category: 'spice' },
      { name: 'White Soy Sauce (Shiro Shoyu)', quantity: '12ml', category: 'pantry' },
      { name: 'Gelatin leaves (Gold bloom)', quantity: '2 sheets', category: 'pantry' },
      { name: 'Australian Finger Lime', quantity: '1 pod', category: 'produce' },
      { name: 'Micro Purple Shiso', quantity: '8 sprigs', category: 'produce' }
    ],
    instructions: [
      'Extract pristine first dashi: heat cold kombu infusion to 62°C, remove kelp, steep Hongarebushi at 85°C for 90 seconds, strain through double nel drip.',
      'Season dashi with shiro shoyu and mirin; melt softened gelatin leaves and chill into a delicate translucent gelee.',
      'Precision dice dry-aged Shima-Aji into pristine 4mm cubes under chilled marble.',
      'Fold sashimi with cold-pressed toasted sesame oil, sea salt crystals, and hand-ground smoked yuzu kosho.',
      'Press into a ring mold, unmold onto chilled artisanal ceramic plate, top with dashi cubes and bursting finger lime caviar.'
    ],
    nutrition: {
      calories: 220,
      protein: 34,
      carbs: 4,
      fat: 7,
      fiber: 0.5,
      sourceLabel: 'Foodoscope Verified Estimate'
    },
    flavorProfile: {
      umami: 98,
      savory: 92,
      acidic: 74,
      sweet: 20,
      bitter: 12,
      spicy: 42,
      aromaNotes: ['Maritime Ozone', 'Zesty Yuzu Citron', 'Smoky Bonito', 'Clean Sea Breeze']
    },
    pairingSuggestions: [
      {
        ingredient: 'Junmai Daiginjo Sake (Yamada Nishiki 35%)',
        synergyReason: 'Koji-derived ethyl caproate melon esters amplify raw marine sweetness.',
        sharedCompounds: ['Ethyl caproate', 'Isoamyl alcohol'],
        affinityScore: 97
      }
    ],
    likesCount: 2980,
    commentsCount: 142,
    savesCount: 970,
    rating: 4.98,
    reviewCount: 64,
    createdAt: '2026-10-26'
  },
  {
    id: 'rec-3',
    chefId: 'chef-4',
    chefName: 'Clara Chen',
    chefUsername: 'clara_chen',
    chefAvatar: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'FoodScope Labs & Restaurant Chroma (1★)',
    title: 'Computational Gastronomy: Shiitake & Single-Origin Cacao Glazed Duck Breast',
    description: 'Dry-aged Challans duck seared on bone, glazed with a 72% Valrhona cacao reduction fortified with shiitake guanylate, roasted parsnip silk, and pickled sour cherries.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 40,
    cookTimeMinutes: 35,
    servings: 2,
    difficulty: 'Intermediate',
    cuisine: 'Modernist',
    dietaryTags: ['High Protein', 'Gluten-Free'],
    ingredients: [
      { name: '14-Day Dry-Aged Duck Breast', quantity: '2 whole breasts', category: 'protein' },
      { name: 'Dried Shiitake Mushrooms', quantity: '40g', category: 'produce' },
      { name: 'Valrhona Araguani 72% Cacao', quantity: '30g', category: 'pantry' },
      { name: 'Duck Bone Glace / Demi-glace', quantity: '150ml', category: 'pantry' },
      { name: 'Parsnip Root', quantity: '400g', category: 'produce' },
      { name: 'Morello Cherries in Spiced Vinegar', quantity: '50g', category: 'pantry' },
      { name: 'Madagascar Black Peppercorn', quantity: '4g', category: 'spice' }
    ],
    instructions: [
      'Score dry duck skin in a fine 2mm diamond grid, leaving subcutaneous fat without piercing flesh.',
      'Place cold breast skin-side down in cold cast iron; gently render over medium-low heat for 14 minutes until mahogany and glass-crisp.',
      'Flip breast and baste with aromatic duck fat for 2 minutes to reach 54°C core temperature. Rest 8 minutes.',
      'Reduce shiitake broth and duck demi-glace with cracked peppercorns; whisk in 72% dark chocolate off heat to emulsify a glossy, savory glaze.',
      'Blend boiled parsnips with browned butter and sea salt into a mirror-like puree.',
      'Carve duck into thick medallions; lacquer with cacao-shiitake reduction and garnish with pickled cherries.'
    ],
    nutrition: {
      calories: 520,
      protein: 42,
      carbs: 22,
      fat: 29,
      fiber: 5,
      sourceLabel: 'FlavorDB Computational Foodoscope Verified'
    },
    flavorProfile: {
      umami: 96,
      savory: 94,
      acidic: 58,
      sweet: 28,
      bitter: 38,
      spicy: 22,
      aromaNotes: ['Roasted Pyrazines', 'Dark Cocoa', 'Deep Fungal Umami', 'Tart Cherry Acid']
    },
    pairingSuggestions: [
      {
        ingredient: 'Northern Rhône Syrah (Hermitage)',
        synergyReason: 'Rotundone black pepper terpenes synchronize with roasted cacao pyrazines.',
        sharedCompounds: ['Rotundone', 'Guaiacol'],
        affinityScore: 94
      }
    ],
    likesCount: 4120,
    commentsCount: 230,
    savesCount: 1840,
    rating: 4.95,
    reviewCount: 112,
    createdAt: '2026-10-28'
  },
  {
    id: 'rec-4',
    chefId: 'chef-5',
    chefName: 'Massimo Bellini',
    chefUsername: 'massimo_bellini',
    chefAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Osteria Della Luna (Modena, 3★)',
    title: 'The Five Ages of Parmigiano-Reggiano in Five Textures',
    description: 'An homage to Emilia-Romagna culinary heritage: 24-month cream, 30-month warm mousse, 36-month cold foam, 40-month crispy wafer, and 50-month translucent broth.',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 50,
    cookTimeMinutes: 40,
    servings: 4,
    difficulty: 'Master',
    cuisine: 'Italian',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    ingredients: [
      { name: 'Parmigiano-Reggiano 24 Mo', quantity: '150g', category: 'dairy' },
      { name: 'Parmigiano-Reggiano 30 Mo', quantity: '120g', category: 'dairy' },
      { name: 'Parmigiano-Reggiano 36 Mo', quantity: '100g', category: 'dairy' },
      { name: 'Parmigiano-Reggiano 40 Mo', quantity: '80g', category: 'dairy' },
      { name: 'Parmigiano-Reggiano 50 Mo (Rinds & Core)', quantity: '200g', category: 'dairy' },
      { name: 'Spring Water (Low Mineral)', quantity: '600ml', category: 'pantry' },
      { name: 'Aged Balsamic of Modena (Tradizionale 25 Yr)', quantity: '12 drops', category: 'pantry' }
    ],
    instructions: [
      'Simmer 50-month rinds in spring water at 82°C for 3 hours; clarify through cheesecloth into pure golden broth.',
      'Blend 24-month cheese with warm cream to form a velvety fonduta base.',
      'Emulsify 30-month cheese with ricotta and warm milk; charge in siphon for warm mousse.',
      'Gel 36-month infusion with lecithin into cold ethereal cloud foam.',
      'Bake microplaned 40-month cheese on silpat into delicate lace wafer.',
      'Layer the 5 temperatures and textures in sequence; finish with drops of 25-year aceto balsamico.'
    ],
    nutrition: {
      calories: 340,
      protein: 26,
      carbs: 3,
      fat: 24,
      fiber: 0,
      sourceLabel: 'Foodoscope Lab Certified'
    },
    flavorProfile: {
      umami: 100,
      savory: 98,
      acidic: 44,
      sweet: 22,
      bitter: 10,
      spicy: 0,
      aromaNotes: ['Aged Casein Crystals', 'Toasted Whey', 'Caramelized Lactose', 'Wood Cask Balsamic']
    },
    pairingSuggestions: [
      {
        ingredient: 'Lambrusco di Sorbara',
        synergyReason: 'Vibrant natural effervescence and acidity scrubs dense dairy lipids from the tongue.',
        sharedCompounds: ['Tartaric acid', 'Malic acid'],
        affinityScore: 95
      }
    ],
    likesCount: 5600,
    commentsCount: 310,
    savesCount: 2410,
    rating: 4.99,
    reviewCount: 145,
    createdAt: '2026-10-22'
  },
  {
    id: 'rec-5',
    chefId: 'chef-2',
    chefName: 'Elena Morales',
    chefUsername: 'elena_morales',
    chefAvatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Atelier Raíces (Mexico City, 2★)',
    title: 'Mole Madre 1000-Day Aged with Heirloom Blue Corn Tetela & Wild Chanterelles',
    description: 'Ancestral mole fed daily with fresh roasted chilhuacle negro, plantain, raisins, and sesame seeds, paired with freshly ground blue corn tetela stuffed with quesillo and butter-poached chanterelles.',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 60,
    cookTimeMinutes: 90,
    servings: 4,
    difficulty: 'Master',
    cuisine: 'Mexican',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    ingredients: [
      { name: 'Heirloom Blue Bolita Corn (Nixtamalized)', quantity: '500g', category: 'produce' },
      { name: 'Mole Madre Base (Chilhuacle, Cacao, Seeds)', quantity: '300ml', category: 'pantry' },
      { name: 'Fresh Golden Chanterelle Mushrooms', quantity: '250g', category: 'produce' },
      { name: 'Oaxacan Quesillo String Cheese', quantity: '120g', category: 'dairy' },
      { name: 'Epazote Leaves (Fresh)', quantity: '10 leaves', category: 'produce' },
      { name: 'Unrefined Piloncillo Sugar', quantity: '15g', category: 'pantry' }
    ],
    instructions: [
      'Stone grind fresh cal-cooked blue maize into velvety masa with fine elasticity.',
      'Sauté wild chanterelles in rendered lard or butter with epazote and sea salt.',
      'Form triangular tetelas stuffed with melting quesillo; sear on clay comal until puffed.',
      'Heat the 1000-day mole madre alongside fresh mole nuevo in concentric bullseye rings.',
      'Plate hot charred tetela atop mole; arrange glistening chanterelles and toasted sesame.'
    ],
    nutrition: {
      calories: 460,
      protein: 16,
      carbs: 58,
      fat: 20,
      fiber: 9,
      sourceLabel: 'Foodoscope USDA Estimate'
    },
    flavorProfile: {
      umami: 92,
      savory: 94,
      acidic: 38,
      sweet: 45,
      bitter: 35,
      spicy: 62,
      aromaNotes: ['Smoke Ash', 'Nixtamalized Corn', 'Dark Raisin', 'Spiced Allspice']
    },
    pairingSuggestions: [
      {
        ingredient: 'Tobalá Mezcal (Clay Distilled)',
        synergyReason: 'Herbaceous wild agave and earthy smoke mirror charred chilhuacle pyrazines.',
        sharedCompounds: ['Guaiacol', 'Syringol'],
        affinityScore: 98
      }
    ],
    likesCount: 3850,
    commentsCount: 204,
    savesCount: 1620,
    rating: 4.96,
    reviewCount: 92,
    createdAt: '2026-10-19'
  },
  {
    id: 'rec-6',
    chefId: 'chef-7',
    chefName: 'Vikram Sharma',
    chefUsername: 'vikram_sharma',
    chefAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Saffron & Smoke (London, 2★)',
    title: 'Deconstructed 72-Hour Dum Pukht Lamb Shank with Saffron Warqi Paratha',
    description: 'Slow sealed-pot Awadhi braised lamb shank in bone marrow extract, Kashmiri chili reduction, and edible silver foil paratha.',
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 45,
    cookTimeMinutes: 180,
    servings: 4,
    difficulty: 'Intermediate',
    cuisine: 'Indian',
    dietaryTags: ['High Protein'],
    ingredients: [
      { name: 'Free-range Lamb Shanks', quantity: '4 pcs (1.4kg)', category: 'protein' },
      { name: 'Kashmiri Saffron (Grade 1)', quantity: '1.5g', category: 'spice' },
      { name: 'Caramelized Onion Paste (Birista)', quantity: '180g', category: 'produce' },
      { name: 'Roasted Bone Marrow Broth', quantity: '500ml', category: 'pantry' },
      { name: 'Green Cardamom & Mace Powder', quantity: '5g', category: 'spice' },
      { name: 'Kewra Water (Screw Pine Essence)', quantity: '5ml', category: 'pantry' }
    ],
    instructions: [
      'Sear seasoned lamb shanks in ghee until deep mahogany bark forms.',
      'Sauté whole spices, browned onion paste, and garlic-ginger paste.',
      'Combine in heavy copper handi; seal lid with sourdough dough ribbon.',
      'Bake at 120°C for 4 hours until meat slips effortlessly from the bone.',
      'Strain and reduce sauce; enrich with bloomed saffron milk and drops of kewra essence.'
    ],
    nutrition: {
      calories: 590,
      protein: 52,
      carbs: 18,
      fat: 36,
      fiber: 3,
      sourceLabel: 'Foodoscope Verified Estimate'
    },
    flavorProfile: {
      umami: 95,
      savory: 96,
      acidic: 30,
      sweet: 25,
      bitter: 15,
      spicy: 55,
      aromaNotes: ['Floral Saffron', 'Warm Mace & Cardamom', 'Deep Bone Glaze', 'Nutty Ghee']
    },
    pairingSuggestions: [
      {
        ingredient: 'Smoked Garlic Raita',
        synergyReason: 'Lactic acid cooling balances capsaicin heat while allicin deepens broth notes.',
        sharedCompounds: ['Diallyl disulfide', 'Lactic acid'],
        affinityScore: 92
      }
    ],
    likesCount: 2790,
    commentsCount: 162,
    savesCount: 1180,
    rating: 4.93,
    reviewCount: 76,
    createdAt: '2026-10-15'
  }
];
