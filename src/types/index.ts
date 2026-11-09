export type CuisineType = 
  | 'French' 
  | 'Japanese' 
  | 'Italian' 
  | 'Nordic' 
  | 'Modernist' 
  | 'Mexican' 
  | 'Indian' 
  | 'Spanish' 
  | 'Peruvian' 
  | 'Mediterranean';

export interface Chef {
  id: string;
  username: string;
  name: string;
  avatar: string;
  coverImage?: string;
  isVerified: boolean;
  isMasterChef: boolean; // Gold verified ring
  title: string; // e.g., "Executive Chef"
  restaurant: string;
  restaurantLocation: string;
  michelinStars?: number;
  bio: string;
  specialties: string[];
  followersCount: number;
  followingCount: number;
  postsCount: number;
  battlesWon: number;
  expertRating: number; // e.g. 4.95
  experienceYears: number;
  experience: {
    role: string;
    establishment: string;
    period: string;
    description: string;
  }[];
  awards: string[];
  certifications: string[];
  isFollowing?: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number;
  fat: number;
  fiber?: number;
  sourceLabel?: string; // e.g., "Foodoscope USDA Verified Estimate"
}

export interface FlavorProfile {
  umami: number; // 0-100
  savory: number;
  acidic: number;
  sweet: number;
  bitter: number;
  spicy: number;
  aromaNotes: string[];
}

export interface IngredientItem {
  name: string;
  quantity: string;
  category?: 'protein' | 'produce' | 'dairy' | 'spice' | 'pantry' | 'molecular';
  flavorCompounds?: string[];
}

export interface Recipe {
  id: string;
  chefId: string;
  chefName: string;
  chefUsername: string;
  chefAvatar: string;
  chefRestaurant: string;
  title: string;
  description: string;
  imageUrl: string;
  galleryUrls?: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Intermediate' | 'Master' | 'Experimental';
  cuisine: CuisineType;
  dietaryTags: ('Vegetarian' | 'Vegan' | 'High Protein' | 'Low Carb' | 'Gluten-Free' | 'Dairy-Free')[];
  ingredients: IngredientItem[];
  instructions: string[];
  nutrition: NutritionInfo;
  flavorProfile: FlavorProfile;
  pairingSuggestions: {
    ingredient: string;
    synergyReason: string;
    sharedCompounds: string[];
    affinityScore: number; // 0-100
  }[];
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  username: string;
  userAvatar: string;
  userTitle?: string;
  isVerified?: boolean;
  content: string;
  timestamp: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  chefId: string;
  chefUsername: string;
  chefName: string;
  chefAvatar: string;
  chefRestaurant: string;
  isVerified: boolean;
  isMasterChef?: boolean;
  imageUrl: string;
  mediaType: 'image' | 'video';
  videoUrl?: string;
  aspectRatio?: '1:1' | '4:5' | '9:16';
  caption: string;
  hashtags: string[];
  locationTag?: string;
  recipeId?: string; // Links to rich recipe
  recipeTitle?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  timestamp: string;
  comments: Comment[];
  nutritionPreview?: {
    calories: number;
    protein: number;
  };
  battleId?: string; // If this post is a competition submission
}

export interface Story {
  id: string;
  chefId: string;
  chefUsername: string;
  chefAvatar: string;
  chefName: string;
  isVerified: boolean;
  isMasterChef: boolean;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  timestamp: string;
  dishName?: string;
  hasUnread: boolean;
}

export interface Reel {
  id: string;
  chefId: string;
  chefUsername: string;
  chefName: string;
  chefAvatar: string;
  chefRestaurant: string;
  isVerified: boolean;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  audioTrack: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  recipe?: {
    title: string;
    prepTime: string;
    ingredients: string[];
    steps: string[];
  };
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface JudgeCriteriaScores {
  creativity: number; // 0-100 (weight: 25%)
  tasteAndFlavor: number; // 0-100 (weight: 25%)
  presentation: number; // 0-100 (weight: 20%)
  cookingTechnique: number; // 0-100 (weight: 20%)
  ingredientUtilisation: number; // 0-100 (weight: 10%)
}

export interface JudgeEvaluation {
  id: string;
  judgeId: string;
  judgeName: string;
  judgeTitle: string;
  judgeAvatar: string;
  scores: JudgeCriteriaScores;
  overallScore: number; // Weighted composite
  writtenFeedback: string;
  evaluatedAt: string;
}

export interface BattleSubmission {
  id: string;
  battleId: string;
  chefId: string;
  chefUsername: string;
  chefName: string;
  chefAvatar: string;
  chefRestaurant: string;
  dishName: string;
  imageUrl: string;
  videoUrl?: string;
  inspiration: string;
  ingredients: IngredientItem[];
  instructions: string[];
  cookingTimeMinutes: number;
  flavorCompoundsIdentified: string[];
  recipeDbSynergyIndex: number; // 0-100
  flavorDbPairingScore: number; // 0-100
  communityVotes: number;
  hasVoted?: boolean;
  judgeEvaluations: JudgeEvaluation[];
  expertCompositeScore?: number; // 0-100
  finalRank?: number; // 1, 2, 3
  submittedAt: string;
}

export interface Competition {
  id: string;
  title: string;
  theme: string;
  description: string;
  coverImage: string;
  status: 'active' | 'upcoming' | 'completed';
  requiredIngredients: string[];
  rules: string[];
  submissionDeadline: string;
  prizePool: string;
  prizeFirst: string;
  prizeSecond: string;
  prizeThird: string;
  participantsCount: number;
  judges: {
    id: string;
    name: string;
    title: string;
    restaurant: string;
    avatar: string;
  }[];
  submissions: BattleSubmission[];
  winners?: {
    firstPlace?: BattleSubmission;
    secondPlace?: BattleSubmission;
    thirdPlace?: BattleSubmission;
  };
}

export interface FlavorCompound {
  name: string;
  formula: string;
  flavorClass: string; // e.g. "Earthy", "Roasted", "Sulfury", "Fruity", "Pyrazine"
  odorDescription: string;
  foundIn: string[];
}

export interface IngredientFlavorData {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  flavorDescriptor: string[];
  compounds: FlavorCompound[];
  bestPairings: {
    ingredient: string;
    synergyScore: number; // 0-100
    sharedCompoundsCount: number;
    flavorReason: string;
  }[];
  recipeMatches: string[]; // Recipe titles
}

export interface RestaurantProfile {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  location: string;
  cuisine: string;
  michelinStars?: number;
  description: string;
  openPositionsCount: number;
  website: string;
}

export interface JobPosition {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantLogo: string;
  restaurantLocation: string;
  michelinStars?: number;
  title: string; // e.g. "Senior Sous Chef"
  cuisine: string;
  salaryRange: string;
  employmentType: 'Full-time' | 'Executive Contract' | 'Seasonal Residency';
  experienceRequired: string;
  description: string;
  requirements: string[];
  perks: string[];
  postedDate: string;
  isApplied?: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'battle_result' | 'career_inquiry' | 'judge_score';
  actorName: string;
  actorAvatar: string;
  content: string;
  targetPreview?: string;
  timestamp: string;
  isRead: boolean;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    title: string;
    restaurant: string;
    isVerified: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: MessageItem[];
}
