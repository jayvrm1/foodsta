import { Chef } from '../types/index.ts';

export const CHEFS: Chef[] = [
  {
    id: 'chef-1',
    username: 'marcus_vander',
    name: 'Marcus Vander',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    isVerified: true,
    isMasterChef: true,
    title: 'Executive Chef & Co-Owner',
    restaurant: 'L’Astrance Moderne',
    restaurantLocation: 'Paris, France',
    michelinStars: 3,
    bio: 'Pioneering neo-classical French gastronomy through computational flavor extraction and hyper-seasonal botanicals. 3 Michelin Stars.',
    specialties: ['Modern French', 'Sauce Emulsification', 'Hyper-seasonal Foraging'],
    followersCount: 284500,
    followingCount: 342,
    postsCount: 164,
    battlesWon: 6,
    expertRating: 4.98,
    experienceYears: 22,
    experience: [
      {
        role: 'Chef Patron',
        establishment: 'L’Astrance Moderne',
        period: '2016 – Present',
        description: 'Earned and maintained 3 Michelin Stars; instituted zero-waste vegetable broth centrifuge program.'
      },
      {
        role: 'Senior Sous Chef',
        establishment: 'Le Cinq, Four Seasons George V',
        period: '2011 – 2016',
        description: 'Led 45-cook brigade under Christian Le Squer.'
      }
    ],
    awards: ['Best Chef Europe 2024', '3 Michelin Stars', 'World’s 50 Best #4'],
    certifications: ['MOF (Meilleur Ouvrier de France) 2018', 'Ferrandi Paris Alumnus'],
    isFollowing: false
  },
  {
    id: 'chef-2',
    username: 'elena_morales',
    name: 'Elena Morales',
    avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    isVerified: true,
    isMasterChef: true,
    title: 'Chef de Cuisine',
    restaurant: 'Atelier Raíces',
    restaurantLocation: 'Oaxaca & Mexico City',
    michelinStars: 2,
    bio: 'Reinterpreting pre-Hispanic nixtamalization, endemic heirloom chilies, and ancient fermentations through modernist pastry & savory prisms.',
    specialties: ['Modern Mexican', 'Heirloom Corn Nixtamal', 'Wild Ferments', 'Mole Architecture'],
    followersCount: 198200,
    followingCount: 421,
    postsCount: 142,
    battlesWon: 5,
    expertRating: 4.94,
    experienceYears: 16,
    experience: [
      {
        role: 'Executive Chef',
        establishment: 'Atelier Raíces',
        period: '2018 – Present',
        description: 'Cataloged 42 endemic Oaxaca criollo maizes and designed seasonal 14-course tasting menu.'
      }
    ],
    awards: ['Latin America’s Best Female Chef 2023', '2 Michelin Stars'],
    certifications: ['Basque Culinary Center Master', 'Biodynamic Agriculture Fellow'],
    isFollowing: true
  },
  {
    id: 'chef-3',
    username: 'kenji_sato',
    name: 'Kenjiro Sato',
    avatar: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1200&q=80',
    isVerified: true,
    isMasterChef: true,
    title: 'Kaiseki Master',
    restaurant: 'Sato Ginza',
    restaurantLocation: 'Tokyo, Japan',
    michelinStars: 3,
    bio: '4th generation Kaiseki practitioner. Precision dashi extraction, dry-aged sashimi chemistry, and seasonal shizome philosophy.',
    specialties: ['Kaiseki', 'Umami Biochemistry', 'Binchotan Yakitori', 'Ikejime Curation'],
    followersCount: 312000,
    followingCount: 198,
    postsCount: 210,
    battlesWon: 8,
    expertRating: 4.99,
    experienceYears: 28,
    experience: [
      {
        role: 'Master Chef / Owner',
        establishment: 'Sato Ginza',
        period: '2008 – Present',
        description: 'Awarded 3 Michelin Stars for 12 consecutive years.'
      }
    ],
    awards: ['Japan National Culinary Treasure 2022', '3 Michelin Stars'],
    certifications: ['Certified Fugu Master', 'Kyoto Culinary Guild Master'],
    isFollowing: false
  },
  {
    id: 'chef-4',
    username: 'clara_chen',
    name: 'Clara Chen',
    avatar: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Computational Gastronomist & R&D Lead',
    restaurant: 'FoodScope Labs & Restaurant Chroma',
    restaurantLocation: 'Singapore & London',
    michelinStars: 1,
    bio: 'Bridging molecular chromatography, FlavorDB compound networks, and cross-cultural street gastronomy into unforgettable dining experiences.',
    specialties: ['Computational Gastronomy', 'FlavorDB Pairing', 'Cryo-Concentration', 'Pan-Asian'],
    followersCount: 165400,
    followingCount: 512,
    postsCount: 189,
    battlesWon: 4,
    expertRating: 4.88,
    experienceYears: 11,
    experience: [
      {
        role: 'Head of Culinary Innovation',
        establishment: 'Restaurant Chroma',
        period: '2020 – Present',
        description: 'Engineered sensory algorithms for 8-course algorithmic wine and food pairing.'
      }
    ],
    awards: ['Innovator of the Year 2024', '1 Michelin Star'],
    certifications: ['M.Sc Food Science (Imperial College)', 'Le Cordon Bleu London'],
    isFollowing: true
  },
  {
    id: 'chef-5',
    username: 'massimo_bellini',
    name: 'Massimo Bellini',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: true,
    title: 'Chef Patron',
    restaurant: 'Osteria Della Luna',
    restaurantLocation: 'Modena, Italy',
    michelinStars: 3,
    bio: 'Reinventing Italian heritage. Where 50-year aged balsamic meets sous-vide tortellini and parmesan foam.',
    specialties: ['Handmade Pasta', 'Emilia-Romagna Tradition', 'Parmigiano Aging Chemistry'],
    followersCount: 420000,
    followingCount: 280,
    postsCount: 312,
    battlesWon: 7,
    expertRating: 4.97,
    experienceYears: 30,
    experience: [
      {
        role: 'Chef Patron',
        establishment: 'Osteria Della Luna',
        period: '2004 – Present',
        description: 'Global icon of avant-garde Italian gastronomy.'
      }
    ],
    awards: ['World’s Best Restaurant Hall of Fame', '3 Michelin Stars'],
    certifications: ['Accademia Italiana della Cucina Grand Master'],
    isFollowing: false
  },
  {
    id: 'chef-6',
    username: 'amara_okonkwo',
    name: 'Chef Amara Okonkwo',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Founder & Executive Chef',
    restaurant: 'Jollof & Terroir',
    restaurantLocation: 'Lagos & New York',
    michelinStars: 1,
    bio: 'Elevating West African terroir. Fermented locust bean (iru), scotch bonnet reduction, and smoked crayfish emulsions.',
    specialties: ['Modern West African', 'Smoked Fish Emulsions', 'Ancient Grains (Fonio)'],
    followersCount: 142000,
    followingCount: 310,
    postsCount: 98,
    battlesWon: 3,
    expertRating: 4.86,
    experienceYears: 12,
    experience: [
      {
        role: 'Executive Chef',
        establishment: 'Jollof & Terroir',
        period: '2021 – Present',
        description: 'First Nigerian fine dining restaurant awarded a Michelin star in North America.'
      }
    ],
    awards: ['James Beard Best New Chef Finalist 2024'],
    certifications: ['Culinary Institute of America (CIA)'],
    isFollowing: false
  },
  {
    id: 'chef-7',
    username: 'vikram_sharma',
    name: 'Vikram Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: true,
    title: 'Culinary Director',
    restaurant: 'Saffron & Smoke',
    restaurantLocation: 'New Delhi & London',
    michelinStars: 2,
    bio: 'Deconstructing Royal Awadhi and coastal Malabar spices. Winner of the International Indian Culinary Cup.',
    specialties: ['Royal Awadhi Dum Pukht', 'Spiced Fat Wash', 'Tandoor Modernism'],
    followersCount: 224000,
    followingCount: 460,
    postsCount: 175,
    battlesWon: 5,
    expertRating: 4.92,
    experienceYears: 19,
    experience: [
      {
        role: 'Culinary Director',
        establishment: 'Saffron & Smoke',
        period: '2017 – Present',
        description: '2 Michelin stars in Mayfair London.'
      }
    ],
    awards: ['British Curry Awards Chef of the Decade', '2 Michelin Stars'],
    certifications: ['IHM Pusa Gold Medalist'],
    isFollowing: true
  },
  {
    id: 'chef-8',
    username: 'astrid_lindqvist',
    name: 'Astrid Lindqvist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Head Chef',
    restaurant: 'Nord Terroir',
    restaurantLocation: 'Copenhagen, Denmark',
    michelinStars: 2,
    bio: 'Arctic moss, fermented pine needles, sea buckthorn garums, and line-caught Scandinavian fjord cod.',
    specialties: ['New Nordic', 'Garums & Kojic Ferments', 'Wild Botanical Foraging'],
    followersCount: 178000,
    followingCount: 289,
    postsCount: 130,
    battlesWon: 4,
    expertRating: 4.91,
    experienceYears: 14,
    experience: [
      {
        role: 'Head Chef',
        establishment: 'Nord Terroir',
        period: '2019 – Present',
        description: 'Pioneered 100% locally foraged biodynamic Nordic tasting menu.'
      }
    ],
    awards: ['Green Michelin Star 2023', '2 Michelin Stars'],
    certifications: ['Nordic Food Lab Resident Alum'],
    isFollowing: false
  },
  {
    id: 'chef-9',
    username: 'julian_baptiste',
    name: 'Julian Baptiste',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Executive Pastry Chef',
    restaurant: 'Le Sucre d’Or',
    restaurantLocation: 'Lyon, France',
    michelinStars: 2,
    bio: 'Sculptural viennoiserie and botanical sugar architecture. World Pastry Cup Gold Medalist.',
    specialties: ['Architectural Pastry', 'Valrhona Chocolate Tempering', 'Laminated Viennoiserie'],
    followersCount: 389000,
    followingCount: 154,
    postsCount: 278,
    battlesWon: 6,
    expertRating: 4.96,
    experienceYears: 18,
    experience: [
      {
        role: 'Master Pastry Chef',
        establishment: 'Le Sucre d’Or',
        period: '2015 – Present',
        description: 'World champion pastry atelier.'
      }
    ],
    awards: ['Coupe du Monde de la Pâtisserie Gold 2021'],
    certifications: ['Ecole Nationale Supérieure de Pâtisserie'],
    isFollowing: false
  },
  {
    id: 'chef-10',
    username: 'maya_lin',
    name: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Independent Modernist Chef',
    restaurant: 'Studio Umami (Pop-Up)',
    restaurantLocation: 'San Francisco, CA',
    bio: 'Fermentation geek. Exploring koji, garum, sourdough kinetics and computational flavor pairings.',
    specialties: ['Koji Ferments', 'Handcrafted Pasta', 'Botanical Tonics'],
    followersCount: 89400,
    followingCount: 620,
    postsCount: 112,
    battlesWon: 2,
    expertRating: 4.82,
    experienceYears: 8,
    experience: [
      {
        role: 'Chef & Founder',
        establishment: 'Studio Umami',
        period: '2022 – Present',
        description: 'Cult pop-up dining series in the Mission District.'
      }
    ],
    awards: ['Eater Young Gun 2024'],
    certifications: ['Culinary Arts Degree CIA Hyde Park'],
    isFollowing: true
  },
  {
    id: 'chef-11',
    username: 'sebastian_vogel',
    name: 'Sebastian Vogel',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: true,
    title: 'Senior Food Critic & Gastronomy Judge',
    restaurant: 'International Culinary Review',
    restaurantLocation: 'Vienna & Zurich',
    bio: 'Permanent Judge for Foodsta Global Chef Battles. Chair of the European Gastronomy Council.',
    specialties: ['Sensory Evaluation', 'Wine Terroir Pairing', 'Culinary History'],
    followersCount: 145000,
    followingCount: 310,
    postsCount: 92,
    battlesWon: 0,
    expertRating: 4.99,
    experienceYears: 32,
    experience: [
      {
        role: 'Lead Critic',
        establishment: 'The Continental Gastronomy Journal',
        period: '2002 – Present',
        description: 'Reviewed over 3,000 fine dining restaurants worldwide.'
      }
    ],
    awards: ['Grand Prix de la Critique Gastronomique'],
    certifications: ['Master of Wine (MW)', 'Advanced Sensory Analyst'],
    isFollowing: false
  },
  {
    id: 'chef-12',
    username: 'chloe_dupont',
    name: 'Chloé Dupont',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Chef de Partie',
    restaurant: 'Mirazur',
    restaurantLocation: 'Menton, France',
    michelinStars: 3,
    bio: 'Passionate about coastal botanicals, Mediterranean fish butchery, and minimal intervention plating.',
    specialties: ['Seafood Butchery', 'Wild Citrus Infusions', 'Modern Garde Manger'],
    followersCount: 52400,
    followingCount: 390,
    postsCount: 84,
    battlesWon: 1,
    expertRating: 4.79,
    experienceYears: 6,
    experience: [
      {
        role: 'Chef de Partie (Fish)',
        establishment: 'Mirazur',
        period: '2023 – Present',
        description: 'Working under Chef Mauro Colagreco.'
      }
    ],
    awards: ['S.Pellegrino Young Chef Semi-Finalist 2024'],
    certifications: ['Institut Paul Bocuse'],
    isFollowing: true
  },
  {
    id: 'chef-13',
    username: 'mateo_silva',
    name: 'Mateo Silva',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Executive Chef',
    restaurant: 'Amazónico Fire',
    restaurantLocation: 'Lima, Peru',
    michelinStars: 1,
    bio: 'Amazonian river fish, paiche ceviches, camu-camu reductions, and Andean tuber preservation.',
    specialties: ['Nikkei & Amazonian', 'Ceviche Science', 'Claypot Ember Roasting'],
    followersCount: 118000,
    followingCount: 410,
    postsCount: 104,
    battlesWon: 3,
    expertRating: 4.87,
    experienceYears: 13,
    experience: [
      {
        role: 'Head Chef',
        establishment: 'Amazónico Fire',
        period: '2019 – Present',
        description: 'Celebrating hyper-local biodiverse river fish and sustainable cassava farming.'
      }
    ],
    awards: ['50 Best Discovery Latin America'],
    certifications: ['Cordon Bleu Lima'],
    isFollowing: false
  },
  {
    id: 'chef-14',
    username: 'sofia_rossi',
    name: 'Sofia Rossi',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Culinary Student & Recipe Creator',
    restaurant: 'ALMA Culinary Academy',
    restaurantLocation: 'Parma, Italy',
    bio: 'Documenting my master diploma in Italian gastronomy. Hand-rolled tajarin, sourdough focaccia, and flavor experiments.',
    specialties: ['Fresh Pasta', 'Flour Rheology', 'Tuscan Sourdough'],
    followersCount: 46200,
    followingCount: 740,
    postsCount: 65,
    battlesWon: 1,
    expertRating: 4.75,
    experienceYears: 3,
    experience: [
      {
        role: 'Stagiaire',
        establishment: 'Da Vittorio',
        period: '2024 – Present',
        description: 'Intense training on pasta station.'
      }
    ],
    awards: ['Rising Student Chef Italy 2024'],
    certifications: ['ALMA Master Diploma Candidate'],
    isFollowing: false
  },
  {
    id: 'chef-15',
    username: 'andre_dubois',
    name: 'Andre Dubois',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: true,
    title: 'Master Sommelier & Palate Judge',
    restaurant: 'Epicurean Guild',
    restaurantLocation: 'Bordeaux & Monaco',
    bio: 'Evaluating balance, acidity, tannin harmony, and aromatic volatility in culinary battle creations.',
    specialties: ['Sensory Analysis', 'Aromatic Compound Harmonies', 'Old World Cellar Curation'],
    followersCount: 88500,
    followingCount: 220,
    postsCount: 71,
    battlesWon: 0,
    expertRating: 4.97,
    experienceYears: 26,
    experience: [
      {
        role: 'Head Judge',
        establishment: 'European Sommelier & Gastronomy Panel',
        period: '2010 – Present',
        description: 'Tasting panel lead for international grand cru competitions.'
      }
    ],
    awards: ['Best Sommelier of France'],
    certifications: ['Master Sommelier (Court of Master Sommeliers)'],
    isFollowing: false
  },
  {
    id: 'chef-16',
    username: 'hannah_zimmermann',
    name: 'Hannah Zimmermann',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Head Baker & Fermentation Director',
    restaurant: 'Kruste & Korn',
    restaurantLocation: 'Berlin, Germany',
    bio: 'Heritage rye grains, 120-hour cold ferments, cultured butter, and wood-fired crust kinetics.',
    specialties: ['Artisanal Sourdough', 'Grain Fermentation', 'Cultured Dairy'],
    followersCount: 104000,
    followingCount: 315,
    postsCount: 145,
    battlesWon: 2,
    expertRating: 4.84,
    experienceYears: 9,
    experience: [
      {
        role: 'Founder',
        establishment: 'Kruste & Korn',
        period: '2020 – Present',
        description: '100% stone-milled organic regional grain bakery.'
      }
    ],
    awards: ['Berlin Food Award Winner 2023'],
    certifications: ['German Master Craftsman Baker (Bäckermeister)'],
    isFollowing: false
  },
  {
    id: 'chef-17',
    username: 'tariq_al_mansoor',
    name: 'Tariq Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Executive Chef',
    restaurant: 'The Royal Mirage Hotel',
    restaurantLocation: 'Dubai, UAE',
    michelinStars: 1,
    bio: 'Middle Eastern modern luxury. Rose water spherification, black lime dry-rubbed lamb, and saffron emulsions.',
    specialties: ['Modern Levantine', 'Sous-vide Lamb', 'Spice Infusions'],
    followersCount: 167000,
    followingCount: 380,
    postsCount: 133,
    battlesWon: 3,
    expertRating: 4.89,
    experienceYears: 17,
    experience: [
      {
        role: 'Executive Chef',
        establishment: 'The Royal Mirage Hotel',
        period: '2019 – Present',
        description: 'Managing 6 luxury restaurants across the beachfront resort.'
      }
    ],
    awards: ['Middle East Hospitality Chef of the Year 2024'],
    certifications: ['Swiss Culinary Academy Lucerne'],
    isFollowing: false
  },
  {
    id: 'chef-18',
    username: 'liam_oconnor',
    name: 'Liam O’Connor',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Sous Chef',
    restaurant: 'Chapter One by Mickael Viljanen',
    restaurantLocation: 'Dublin, Ireland',
    michelinStars: 2,
    bio: 'Irish coastal oysters, raw milk churned butter, and dry-aged Dexter beef with bone marrow jus.',
    specialties: ['Irish Terroir', 'Offal Gastronomy', 'Stock & Jus Reduction'],
    followersCount: 68000,
    followingCount: 420,
    postsCount: 88,
    battlesWon: 2,
    expertRating: 4.81,
    experienceYears: 7,
    experience: [
      {
        role: 'Sous Chef',
        establishment: 'Chapter One',
        period: '2022 – Present',
        description: 'Working under 2-star Michelin mastery.'
      }
    ],
    awards: ['Euro-Toques Young Chef Finalist'],
    certifications: ['Dublin Institute of Technology Culinary Arts'],
    isFollowing: true
  },
  {
    id: 'chef-19',
    username: 'lucas_pereira',
    name: 'Lucas Pereira',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: false,
    title: 'Culinary Creator & Blogger',
    restaurant: 'TasteLab Studio',
    restaurantLocation: 'Lisbon, Portugal',
    bio: 'Testing cooking science myths. Maillard reaction experiments, salinity thresholds, and crispy skin physics.',
    specialties: ['Food Science Media', 'Texture Chemistry', 'Seafood Rice'],
    followersCount: 295000,
    followingCount: 510,
    postsCount: 220,
    battlesWon: 1,
    expertRating: 4.78,
    experienceYears: 10,
    experience: [
      {
        role: 'Creator & Host',
        establishment: 'TasteLab YouTube & Foodsta',
        period: '2019 – Present',
        description: 'Reaching 1M+ home cooks and young chefs with scientific recipe testing.'
      }
    ],
    awards: ['Web Culinary Creator of the Year 2023'],
    certifications: ['Escola de Hotelaria e Turismo de Lisboa'],
    isFollowing: false
  },
  {
    id: 'chef-20',
    username: 'annika_berg',
    name: 'Annika Berg',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isMasterChef: true,
    title: 'Hospitality Recruiter & Talent Scout',
    restaurant: 'Global Gastronomy Search',
    restaurantLocation: 'London & Geneva',
    bio: 'Placing Michelin-starred talent, Executive Chefs, and Head Sommeliers into the world’s top 100 restaurants and luxury hotels.',
    specialties: ['Executive Culinary Placement', 'Brigade Structuring', 'Hotel Openings'],
    followersCount: 78000,
    followingCount: 920,
    postsCount: 62,
    battlesWon: 0,
    expertRating: 4.95,
    experienceYears: 20,
    experience: [
      {
        role: 'Managing Director',
        establishment: 'Global Gastronomy Search',
        period: '2014 – Present',
        description: 'Placed over 400 executive culinary leaders across Europe, Asia, and the Americas.'
      }
    ],
    awards: ['Top Hospitality Recruiter 2024'],
    certifications: ['Cornell School of Hotel Administration Alum'],
    isFollowing: false
  }
];

export const CURRENT_USER_CHEF: Chef = CHEFS[3]; // Clara Chen (Computational Gastronomist & R&D Lead)
