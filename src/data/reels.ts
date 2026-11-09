import { Reel } from '../types/index.ts';

export const REELS: Reel[] = [
  {
    id: 'reel-1',
    chefId: 'chef-4',
    chefUsername: 'clara_chen',
    chefName: 'Clara Chen',
    chefAvatar: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Restaurant Chroma (Singapore, 1★)',
    isVerified: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-with-fire-41619-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514944298352-78d120a1db4b?auto=format&fit=crop&w=600&q=80',
    caption: 'How to crisp duck breast skin to pure glass using acoustic heat transfer and slow fat rendering 🦆🔥 #ChefTips #DuckSkin #FoodstaScience',
    audioTrack: 'Claude Debussy - Clair de Lune (Lo-Fi Culinary Edit)',
    likesCount: 14200,
    commentsCount: 680,
    sharesCount: 3100,
    recipe: {
      title: 'Glass-Crisp Duck Skin Technique',
      prepTime: '20 mins',
      ingredients: ['Challans Duck Breast', 'Fine Sel Gris', 'Smoked Thyme Sprigs'],
      steps: [
        'Score skin in micro diamond pattern without touching meat fibers.',
        'Place skin down into cold pan with zero added oil.',
        'Cook on lowest flame for 14 minutes pouring off rendered grease continuously.',
        'Finish with high heat sear for 90 seconds. Listen for the acoustic shatter!'
      ]
    },
    isLiked: false,
    isSaved: false
  },
  {
    id: 'reel-2',
    chefId: 'chef-1',
    chefUsername: 'marcus_vander',
    chefName: 'Marcus Vander',
    chefAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'L’Astrance Moderne (Paris, 3★)',
    isVerified: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vegetables-being-sauteed-in-a-pan-41584-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    caption: 'Slicing 64 microscopic layers of Kennebec potato for our Perigord truffle pavé. Precision knife craft in Paris.',
    audioTrack: 'Original Kitchen Sound - L’Astrance Moderne',
    likesCount: 28900,
    commentsCount: 1240,
    sharesCount: 7800,
    recipe: {
      title: 'Precision Potato Mille-Feuille',
      prepTime: '45 mins',
      ingredients: ['Kennebec Potatoes', 'Black Perigord Truffle', 'Bordier Cultured Butter'],
      steps: [
        'Mandoline into 1mm paper-thin discs.',
        'Toss with melted butter and microplaned truffle.',
        'Layer densely in terrine, press under weights, and sear until glass crisp.'
      ]
    },
    isLiked: true,
    isSaved: true
  },
  {
    id: 'reel-3',
    chefId: 'chef-3',
    chefUsername: 'kenji_sato',
    chefName: 'Kenjiro Sato',
    chefAvatar: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Sato Ginza (Tokyo, 3★)',
    isVerified: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-plating-a-gourmet-dish-in-a-restaurant-41617-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    caption: 'The art of Ikejime spinal cord nerve wire and 6-day dry aging Shima-Aji. Umami concentration at its absolute zenith.',
    audioTrack: 'Traditional Koto Melodies - Ginza Evening',
    likesCount: 19800,
    commentsCount: 890,
    sharesCount: 4200,
    recipe: {
      title: 'Kaiseki Fish Aging Protocol',
      prepTime: '6 days',
      ingredients: ['Ikejime Shima-Aji', 'Cedar Paper', 'Rishiri Kombu'],
      steps: [
        'Drain residual blood along spinal column using pressurized saline.',
        'Wrap in cedar moisture-wicking paper at 1.5°C and 85% relative humidity.',
        'Monitor inosinic acid nucleotide accumulation until day 6 for slicing.'
      ]
    },
    isLiked: false,
    isSaved: false
  },
  {
    id: 'reel-4',
    chefId: 'chef-9',
    chefUsername: 'julian_baptiste',
    chefName: 'Julian Baptiste',
    chefAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    chefRestaurant: 'Le Sucre d’Or (Lyon, 2★)',
    isVerified: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-baker-working-with-dough-41604-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    caption: 'Cross-section of a 108-layer honeycombed croissant. Cold butter laminations at 14°C exactly 🥐 #CroissantArt #PastryChef #ButterLamination',
    audioTrack: 'Chopin - Nocturne in E Flat Major',
    likesCount: 45600,
    commentsCount: 2100,
    sharesCount: 12400,
    recipe: {
      title: 'Master Laminating Technique',
      prepTime: '24 hours',
      ingredients: ['T55 French Flour', 'Isigny Ste Mère 84% Butter Sheet', 'Wildflower Honey'],
      steps: [
        'Form détrempe dough and cold ferment for 18 hours at 3°C.',
        'Lock in pliable butter block and perform 1 double turn and 1 single turn.',
        'Rest, roll to 3.5mm, cut isosceles triangles, and proof at 26°C with 78% humidity.'
      ]
    },
    isLiked: true,
    isSaved: false
  }
];
