import { RestaurantProfile } from '../types/index.ts';

export const RESTAURANTS: RestaurantProfile[] = [
  {
    id: 'rest-1',
    name: 'L’Astrance Moderne',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    location: 'Paris, France (16th Arrondissement)',
    cuisine: 'Modern French Haute Gastronomy',
    michelinStars: 3,
    description: 'Renowned 3-star Michelin establishment famous for zero-waste botanical extraction and modern tableside sauce service.',
    openPositionsCount: 2,
    website: 'https://lastrancemoderne.example.fr'
  },
  {
    id: 'rest-2',
    name: 'Mirazur',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    location: 'Menton, French Riviera',
    cuisine: 'Biodynamic Maritime & Permaculture',
    michelinStars: 3,
    description: 'Voted #1 Best Restaurant in the World. Cascading terraced orchards overlooking the Mediterranean.',
    openPositionsCount: 3,
    website: 'https://mirazur.example.fr'
  },
  {
    id: 'rest-3',
    name: 'Eleven Madison Park',
    logo: 'https://images.unsplash.com/photo-1514944298352-78d120a1db4b?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    location: 'New York City, NY',
    cuisine: 'Plant-Based Modern Fine Dining',
    michelinStars: 3,
    description: 'Trailblazing plant-based culinary temple celebrating regenerative farming and architectural plating.',
    openPositionsCount: 2,
    website: 'https://elevenmadisonpark.example.com'
  },
  {
    id: 'rest-4',
    name: 'Aman Tokyo & Arva',
    logo: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1200&q=80',
    location: 'Tokyo, Japan (Otemachi Tower)',
    cuisine: 'Italian-Japanese Minimalist Luxury',
    description: 'Ultra-luxury sanctuary at the top of Otemachi Tower combining Japanese seasonal micro-climates with rustic Italian soul.',
    openPositionsCount: 2,
    website: 'https://amantokyo.example.com'
  },
  {
    id: 'rest-5',
    name: 'The Ritz Paris - L’Espadon',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    location: 'Place Vendôme, Paris',
    cuisine: 'Historic French Palace Gastronomy',
    michelinStars: 2,
    description: 'Legendary palace hotel dining room featuring majestic garden courtyard tables and Escoffier foundations.',
    openPositionsCount: 1,
    website: 'https://ritzparis.example.com'
  },
  {
    id: 'rest-6',
    name: 'Osteria Della Luna',
    logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    location: 'Modena, Italy',
    cuisine: 'Contemporary Italian Masterpieces',
    michelinStars: 3,
    description: 'Home of Chef Massimo Bellini, reinterpreting Emilia-Romagna traditions through artistic storytelling.',
    openPositionsCount: 1,
    website: 'https://osteriadellaluna.example.it'
  },
  {
    id: 'rest-7',
    name: 'Saffron & Smoke',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=1200&q=80',
    location: 'Mayfair, London, UK',
    cuisine: 'Royal Indian Dum Pukht & Tandoor',
    michelinStars: 2,
    description: 'Mayfair fine dining benchmark presenting ancient Mughal court banquet dishes with contemporary refinement.',
    openPositionsCount: 2,
    website: 'https://saffronandsmoke.example.co.uk'
  },
  {
    id: 'rest-8',
    name: 'The French Laundry',
    logo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    location: 'Yountville, Napa Valley, CA',
    cuisine: 'Classical French American',
    michelinStars: 3,
    description: 'Thomas Keller’s legendary benchmark for American culinary excellence and garden-driven hospitality.',
    openPositionsCount: 1,
    website: 'https://frenchlaundry.example.com'
  }
];
