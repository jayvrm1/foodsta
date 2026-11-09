import React, { useState } from 'react';
import { 
  Search, Filter, Heart, MessageCircle, ChefHat, 
  Flame, Sparkles, Trophy, X
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { ALL_EXPLORE_POSTS } from '../data/posts.ts';
import { Post, Recipe } from '../types/index.ts';
import { PostCard } from '../components/feed/PostCard.tsx';

export const Explore: React.FC = () => {
  const { recipes, setActiveRecipeModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filters = [
    'All',
    'Trending',
    'Vegetarian',
    'High Protein',
    'Low Carb',
    'French',
    'Japanese',
    'Italian',
    'Modernist',
    'Chef Battle Winner'
  ];

  const filteredPosts = ALL_EXPLORE_POSTS.filter(post => {
    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || (
      post.caption.toLowerCase().includes(q) ||
      post.chefName.toLowerCase().includes(q) ||
      post.chefUsername.toLowerCase().includes(q) ||
      (post.recipeTitle && post.recipeTitle.toLowerCase().includes(q)) ||
      (post.locationTag && post.locationTag.toLowerCase().includes(q)) ||
      post.hashtags.some(h => h.toLowerCase().includes(q))
    );

    // Filter chip match
    let matchFilter = true;
    if (selectedFilter === 'Trending') {
      matchFilter = post.likesCount > 2500;
    } else if (selectedFilter === 'Vegetarian') {
      matchFilter = post.caption.toLowerCase().includes('vegetarian') || post.caption.toLowerCase().includes('potato') || post.caption.toLowerCase().includes('mushroom') || post.caption.toLowerCase().includes('parmigiano');
    } else if (selectedFilter === 'High Protein') {
      matchFilter = (post.nutritionPreview?.protein || 0) > 30 || post.caption.toLowerCase().includes('duck') || post.caption.toLowerCase().includes('lamb') || post.caption.toLowerCase().includes('fish');
    } else if (selectedFilter === 'Low Carb') {
      matchFilter = post.caption.toLowerCase().includes('tartare') || post.caption.toLowerCase().includes('sashimi') || post.caption.toLowerCase().includes('duck');
    } else if (selectedFilter === 'French' || selectedFilter === 'Japanese' || selectedFilter === 'Italian' || selectedFilter === 'Modernist') {
      matchFilter = post.chefRestaurant.toLowerCase().includes(selectedFilter.toLowerCase()) || post.caption.toLowerCase().includes(selectedFilter.toLowerCase());
    } else if (selectedFilter === 'Chef Battle Winner') {
      matchFilter = Boolean(post.battleId);
    }

    return matchSearch && matchFilter;
  });

  return (
    <div className="w-full max-w-[975px] mx-auto pt-4 pb-20 px-3 sm:px-4">
      {/* Search Header */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="relative w-full max-w-xl mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E8E]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish, ingredient, cuisine (e.g., Truffle, Duck, Shima Aji, Awadhi)..."
            className="w-full bg-[#EFEFEF] text-[#262626] text-sm rounded-xl pl-10 pr-10 py-2.5 border-none focus:outline-hidden focus:ring-1 focus:ring-[#0095F6] transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E8E8E] hover:text-[#262626] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === filter 
                  ? 'bg-[#0095F6] text-white' 
                  : 'bg-white border border-[#DBDBDB] text-[#262626] hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results Count */}
      <div className="flex justify-between items-center text-xs text-[#8E8E8E] mb-3 px-1">
        <span>Showing {filteredPosts.length} culinary discoveries</span>
        <span>Grid View (3x3)</span>
      </div>

      {/* Instagram 3-Column Explore Grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
        {filteredPosts.map((post, idx) => {
          // Instagram style: every 5th or 10th item can span 2 rows if desired, or uniform clean grid
          const isLarge = idx % 8 === 2;

          return (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`group relative aspect-square bg-[#FAFAFA] overflow-hidden rounded-md sm:rounded-lg cursor-pointer ${
                isLarge ? 'md:row-span-2 md:col-span-2 md:aspect-auto' : ''
              }`}
            >
              <img 
                src={post.imageUrl} 
                alt={post.caption} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Badges on corner */}
              <div className="absolute top-2 right-2 flex items-center gap-1">
                {post.recipeId && (
                  <span className="p-1 rounded-md bg-black/60 text-white backdrop-blur-xs">
                    <ChefHat className="w-3.5 h-3.5 text-amber-300" />
                  </span>
                )}
                {post.battleId && (
                  <span className="p-1 rounded-md bg-[#0095F6]/80 text-white backdrop-blur-xs">
                    <Trophy className="w-3.5 h-3.5 text-white" />
                  </span>
                )}
              </div>

              {/* Hover Dark Overlay with Likes and Comments */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-sm">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-5 h-5 fill-white text-white" />
                  <span>{post.likesCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                  <span>{post.commentsCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Post Modal Lightbox */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3">
          <div className="relative w-full max-w-[480px]">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <PostCard post={selectedPost} />
          </div>
        </div>
      )}
    </div>
  );
};
