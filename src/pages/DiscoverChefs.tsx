import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Award, Star, MapPin, Users, ChefHat } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { VerifiedBadge } from '../components/common/VerifiedBadge.tsx';

export const DiscoverChefs: React.FC = () => {
  const { chefs, toggleFollowChef, currentUser } = useApp();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const filtered = chefs.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.username.toLowerCase().includes(search.toLowerCase()) ||
      c.restaurant.toLowerCase().includes(search.toLowerCase()) ||
      c.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));

    let matchTag = true;
    if (selectedTag === 'Master Chefs') matchTag = c.isMasterChef;
    if (selectedTag === 'Michelin Starred') matchTag = (c.michelinStars || 0) > 0;
    if (selectedTag === 'Pastry') matchTag = c.specialties.some(s => s.toLowerCase().includes('pastry'));
    if (selectedTag === 'Modernist') matchTag = c.specialties.some(s => s.toLowerCase().includes('modernist') || s.toLowerCase().includes('computational'));

    return matchSearch && matchTag;
  });

  return (
    <div className="w-full max-w-[1020px] mx-auto pt-4 pb-20 px-3 sm:px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#262626]">Discover Culinary Talents</h1>
        <p className="text-xs text-[#8E8E8E]">
          Explore 3-star Michelin masters, hotel executive chefs, and rising computational gastronomists
        </p>

        {/* Search & Tags */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E8E]" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by chef name, restaurant, or culinary specialty..."
              className="w-full bg-white border border-[#DBDBDB] rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-hidden focus:border-[#0095F6]"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {['All', 'Master Chefs', 'Michelin Starred', 'Pastry', 'Modernist'].map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedTag === tag 
                    ? 'bg-[#0095F6] text-white' 
                    : 'bg-white border border-[#DBDBDB] text-[#262626] hover:bg-gray-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chefs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(chef => (
          <div 
            key={chef.id}
            className="bg-white border border-[#DBDBDB] rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:border-gray-400 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <Link to={`/chef/${chef.id}`} className="relative shrink-0">
                  <img src={chef.avatar} alt={chef.name} className="w-14 h-14 rounded-full object-cover border border-[#DBDBDB]" />
                  <span className="absolute -bottom-1 -right-1">
                    <VerifiedBadge isMasterChef={chef.isMasterChef} size="sm" />
                  </span>
                </Link>

                <div className="text-right">
                  <span className="text-xs font-bold text-amber-600">★ {chef.expertRating}</span>
                  <span className="text-[10px] text-[#8E8E8E] block">{chef.battlesWon} Battles Won</span>
                </div>
              </div>

              <Link to={`/chef/${chef.id}`} className="block group">
                <h3 className="font-bold text-sm text-[#262626] group-hover:underline truncate">{chef.name}</h3>
                <span className="text-xs text-[#0095F6] font-semibold truncate block">{chef.username}</span>
              </Link>

              <span className="text-xs text-[#8E8E8E] line-clamp-1 mt-0.5">{chef.restaurant} ({chef.restaurantLocation})</span>

              <p className="text-xs text-[#3F4752] line-clamp-2 mt-2 leading-relaxed">
                {chef.bio}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1 mt-3">
                {chef.specialties.slice(0, 2).map((sp, i) => (
                  <span key={i} className="text-[10px] bg-gray-100 text-[#262626] px-2 py-0.5 rounded font-medium">
                    {sp}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EFEFEF] flex items-center justify-between gap-2">
              <span className="text-xs text-[#8E8E8E]">
                {chef.followersCount.toLocaleString()} followers
              </span>

              {chef.id !== currentUser.id ? (
                <button
                  onClick={() => toggleFollowChef(chef.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    chef.isFollowing 
                      ? 'bg-gray-100 hover:bg-gray-200 text-[#262626]' 
                      : 'bg-[#0095F6] hover:bg-[#1877F2] text-white'
                  }`}
                >
                  {chef.isFollowing ? 'Following' : 'Follow'}
                </button>
              ) : (
                <span className="text-[11px] text-[#0095F6] font-bold">You</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
