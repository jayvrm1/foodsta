import { JobPosition } from '../types/index.ts';

export const JOB_POSITIONS: JobPosition[] = [
  {
    id: 'job-1',
    restaurantId: 'rest-1',
    restaurantName: 'L’Astrance Moderne',
    restaurantLogo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
    restaurantLocation: 'Paris, France',
    michelinStars: 3,
    title: 'Senior Sous Chef - Research & Development',
    cuisine: 'Modern French Haute Cuisine',
    salaryRange: '€75,000 – €92,000 / year + Performance Bonus',
    employmentType: 'Full-time',
    experienceRequired: '5+ years in Michelin-starred brigades (minimum 2★)',
    description: 'Lead the testing lab alongside Chef Marcus Vander. Spearhead our computational extraction program and manage daily brigade operations.',
    requirements: [
      'Proven experience in precision sauce emulsification and temperature-controlled cooking.',
      'Familiarity with computational flavor analysis (FlavorDB/RecipeDB preferred).',
      'Strong leadership track record managing high-performing 25+ cook teams.',
      'Fluency in French and English.'
    ],
    perks: [
      'Comprehensive European health coverage & 6 weeks paid annual leave',
      'Annual stage sponsorship in Tokyo or Copenhagen',
      'Direct contribution to Michelin 3-star menu development'
    ],
    postedDate: '3 days ago',
    isApplied: false
  },
  {
    id: 'job-2',
    restaurantId: 'rest-2',
    restaurantName: 'Mirazur',
    restaurantLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    restaurantLocation: 'Menton, France',
    michelinStars: 3,
    title: 'Chef de Partie - Garde Manger & Foraging',
    cuisine: 'Biodynamic Maritime',
    salaryRange: '€42,000 – €52,000 / year + Housing Allowance',
    employmentType: 'Full-time',
    experienceRequired: '3+ years fine dining experience',
    description: 'Oversee cold kitchen prep utilizing daily harvests from our 5 bio-dynamic gardens overlooking the sea.',
    requirements: [
      'High dexterity in floral plating, botanical dressings, and delicate raw seafood butchery.',
      'Passion for seasonal foraging and lunar biodynamic harvesting rhythms.'
    ],
    perks: [
      'Staff accommodation on the French Riviera provided',
      'Daily meals prepared with 3-star garden ingredients'
    ],
    postedDate: '5 days ago',
    isApplied: false
  },
  {
    id: 'job-3',
    restaurantId: 'rest-3',
    restaurantName: 'Eleven Madison Park',
    restaurantLogo: 'https://images.unsplash.com/photo-1514944298352-78d120a1db4b?auto=format&fit=crop&w=200&q=80',
    restaurantLocation: 'New York City, NY',
    michelinStars: 3,
    title: 'Pastry Sous Chef',
    cuisine: 'Modernist Plant-Based Pastry',
    salaryRange: '$95,000 – $115,000 / year',
    employmentType: 'Full-time',
    experienceRequired: '4+ years high-end restaurant pastry',
    description: 'Push the frontiers of vegan and plant-based pastry architecture with single-origin beans, seed milks, and natural hydrocolloids.',
    requirements: [
      'Mastery of vegan aeration, aquafaba meringues, cocoa butter fat crystallisation.',
      'Passion for sustainability and zero-refined-sugar formulation.'
    ],
    perks: [
      'Full 401(k) matching up to 5%',
      'Comprehensive dental, vision, and wellness package'
    ],
    postedDate: '1 week ago',
    isApplied: false
  },
  {
    id: 'job-4',
    restaurantId: 'rest-4',
    restaurantName: 'Aman Tokyo',
    restaurantLogo: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=200&q=80',
    restaurantLocation: 'Tokyo, Japan',
    title: 'Executive Italian Chef de Cuisine - Arva',
    cuisine: 'Italian-Japanese Fine Dining',
    salaryRange: '¥12,000,000 – ¥15,500,000 / year',
    employmentType: 'Full-time',
    experienceRequired: '7+ years luxury hotel or fine dining lead',
    description: 'Direct the flagship culinary experience at the top of Tokyo skyline. Translate rustic Italian soul using pristine Japanese market ingredients.',
    requirements: [
      'Experience in luxury 5-star hotel gastronomy management.',
      'Knowledge of Toyosu seafood auctions and artisanal pasta production.'
    ],
    perks: [
      'Expatriate relocation assistance and Tokyo housing subsidy',
      'Worldwide Aman hotel stay benefits'
    ],
    postedDate: '4 days ago',
    isApplied: false
  },
  {
    id: 'job-5',
    restaurantId: 'rest-7',
    restaurantName: 'Saffron & Smoke',
    restaurantLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    restaurantLocation: 'London, UK (Mayfair)',
    michelinStars: 2,
    title: 'Head Tandoor & Grill Master',
    cuisine: 'Royal Awadhi & Dum Pukht',
    salaryRange: '£55,000 – £68,000 / year',
    employmentType: 'Full-time',
    experienceRequired: '5+ years clay tandoor expertise',
    description: 'Command the central tandoor hearth in Mayfair. Execute signature marinades, saffron smoking techniques, and ancient bread craft.',
    requirements: [
      'Absolute mastery of live-charcoal tandoor temperature zones.',
      'Precision skewering, lamb tenderization chemistry, and artisanal naan aeration.'
    ],
    perks: [
      'Generous service charge gratuities split',
      'Private healthcare and Central London transit pass'
    ],
    postedDate: '2 days ago',
    isApplied: false
  }
];
