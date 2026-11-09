import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Award, Star, Grid, Film, Bookmark, Trophy, 
  MapPin, Calendar, Check, MessageCircle, Share2, 
  ChefHat, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { VerifiedBadge } from '../components/common/VerifiedBadge.tsx';
import { RecipeDetailModal } from '../components/recipes/RecipeDetailModal.tsx';
import { PostCard } from '../components/feed/PostCard.tsx';
import { Recipe, Post } from '../types/index.ts';

export const ChefProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { chefs, currentUser, toggleFollowChef, posts, recipes, setActiveRecipeModal } = useApp();
  
  const [activeTab, setActiveTab] = useState<'posts' | 'battles' | 'experience' | 'saved'>('posts');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const chef = chefs.find(c => c.id === id) || currentUser;
  const isSelf = chef.id === currentUser.id;

  // Filter posts by this chef
  const chefPosts = posts.filter(p => p.chefId === chef.id);
  const chefRecipes = recipes.filter(r => r.chefId === chef.id);
  const battlePosts = chefPosts.filter(p => p.battleId);

  return (
    <div className="w-full max-w-[975px] mx-auto pt-4 pb-20 px-3 sm:px-4">
      {/* Profile Header */}
      <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6 sm:p-8 mb-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
          {/* Avatar with Ring */}
          <div className="relative shrink-0">
            <div className={`p-1 rounded-full ${
              chef.isMasterChef ? 'chef-ring-gradient' : 'ring-2 ring-gray-200'
            }`}>
              <div className="p-0.5 bg-white rounded-full">
                <img 
                  src={chef.avatar} 
                  alt={chef.name} 
                  className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col flex-1 min-w-0 text-center sm:text-left">
            {/* Top row: Handle & Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-3">
              <h1 className="font-extrabold text-xl text-[#262626]">{chef.username}</h1>
              <VerifiedBadge isMasterChef={chef.isMasterChef} size="md" />

              {!isSelf ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFollowChef(chef.id)}
                    className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      chef.isFollowing 
                        ? 'bg-gray-100 hover:bg-gray-200 text-[#262626]' 
                        : 'bg-[#0095F6] hover:bg-[#1877F2] text-white'
                    }`}
                  >
                    {chef.isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <Link
                    to="/messages"
                    className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#262626] text-xs font-bold transition-colors"
                  >
                    Message
                  </Link>
                </div>
              ) : (
                <span className="text-xs bg-blue-50 text-[#0095F6] px-2.5 py-1 rounded-md font-bold">
                  Your Active Profile
                </span>
              )}
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-center sm:justify-start gap-6 text-sm mb-4">
              <div>
                <span className="font-bold text-[#262626]">{chef.postsCount}</span>{' '}
                <span className="text-[#8E8E8E]">posts</span>
              </div>
              <div>
                <span className="font-bold text-[#262626]">{chef.followersCount.toLocaleString()}</span>{' '}
                <span className="text-[#8E8E8E]">followers</span>
              </div>
              <div>
                <span className="font-bold text-[#262626]">{chef.followingCount}</span>{' '}
                <span className="text-[#8E8E8E]">following</span>
              </div>
              <div className="hidden sm:inline">
                <span className="font-bold text-amber-600">{chef.battlesWon}</span>{' '}
                <span className="text-[#8E8E8E]">battles won ⚔️</span>
              </div>
            </div>

            {/* Name & Restaurant */}
            <div className="flex flex-col gap-1 text-xs">
              <span className="font-bold text-sm text-[#262626]">{chef.name}</span>
              <span className="font-semibold text-[#0095F6]">{chef.title} at {chef.restaurant}</span>
              <span className="text-[#8E8E8E] flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3 h-3" /> {chef.restaurantLocation}
                {chef.michelinStars && (
                  <span className="text-amber-600 font-bold ml-1">
                    {'★'.repeat(chef.michelinStars)} Michelin Stars
                  </span>
                )}
              </span>

              {/* Bio */}
              <p className="text-[#3F4752] leading-relaxed max-w-xl mt-1">
                {chef.bio}
              </p>

              {/* Specialties Tags */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-2">
                {chef.specialties.map((spec, idx) => (
                  <span key={idx} className="bg-[#FAFAFA] border border-[#DBDBDB] text-[#262626] px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-t border-[#DBDBDB] mb-6">
        <div className="flex gap-10 text-xs font-bold uppercase tracking-wider text-[#8E8E8E]">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3.5 flex items-center gap-1.5 border-t-2 -mt-px cursor-pointer transition-colors ${
              activeTab === 'posts' ? 'border-[#262626] text-[#262626]' : 'border-transparent hover:text-black'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Dishes & Posts</span>
          </button>

          <button
            onClick={() => setActiveTab('battles')}
            className={`py-3.5 flex items-center gap-1.5 border-t-2 -mt-px cursor-pointer transition-colors ${
              activeTab === 'battles' ? 'border-[#262626] text-[#262626]' : 'border-transparent hover:text-black'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Battle Achievements ({chef.battlesWon})</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`py-3.5 flex items-center gap-1.5 border-t-2 -mt-px cursor-pointer transition-colors ${
              activeTab === 'experience' ? 'border-[#262626] text-[#262626]' : 'border-transparent hover:text-black'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Experience & Awards</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Posts Grid */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
          {chefPosts.length === 0 ? (
            <div className="col-span-3 py-12 text-center text-[#8E8E8E] text-xs">
              No posts shared yet.
            </div>
          ) : (
            chefPosts.map(post => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-square bg-[#FAFAFA] rounded-md overflow-hidden cursor-pointer shadow-2xs"
              >
                <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs">
                  ★ {post.likesCount}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Battles Tab */}
      {activeTab === 'battles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chef.awards.map((award, idx) => (
            <div key={idx} className="bg-white border border-[#DBDBDB] rounded-xl p-5 flex items-start gap-3 shadow-2xs">
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-600">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-[#262626]">{award}</span>
                <span className="text-xs text-[#8E8E8E] mt-0.5">Verified International Foodsta Council Award</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Experience & Certifications */}
      {activeTab === 'experience' && (
        <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6 shadow-xs flex flex-col gap-6">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#262626] mb-3">
              Culinary Journey & Brigade Experience
            </h3>
            <div className="space-y-4">
              {chef.experience.map((exp, idx) => (
                <div key={idx} className="flex flex-col border-l-2 border-[#0095F6] pl-4">
                  <span className="font-bold text-sm text-[#262626]">{exp.role}</span>
                  <span className="text-xs text-[#8E8E8E]">{exp.establishment} • {exp.period}</span>
                  <p className="text-xs text-[#3F4752] mt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#EFEFEF]">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#262626] mb-2">
              Certifications & Diplomas
            </h3>
            <div className="flex flex-wrap gap-2">
              {chef.certifications.map((cert, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-blue-50 text-[#0095F6] border border-blue-200 text-xs font-semibold">
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Selected Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3">
          <div className="relative w-full max-w-[480px]">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 cursor-pointer"
            >
              ✕
            </button>
            <PostCard post={selectedPost} />
          </div>
        </div>
      )}
    </div>
  );
};
