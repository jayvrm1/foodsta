import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Award, Star, Flame, Swords, ShieldCheck, 
  TrendingUp, Filter, ChefHat, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { calculateChefRankingScore } from '../services/gastronomyLogic.ts';
import { VerifiedBadge } from '../components/common/VerifiedBadge.tsx';

export const Leaderboard: React.FC = () => {
  const { chefs, toggleFollowChef } = useApp();
  const [filterMode, setFilterMode] = useState<'all' | 'monthly' | 'battles' | 'michelin' | 'rising'>('all');

  // Compute transparent scores for each chef
  const scoredChefs = chefs.map(chef => {
    const compositeScore = calculateChefRankingScore({
      battlesWon: chef.battlesWon,
      expertRating: chef.expertRating,
      recipesCount: chef.postsCount,
      followersCount: chef.followersCount,
      michelinStars: chef.michelinStars
    });
    return {
      ...chef,
      compositeScore
    };
  });

  // Filter & sort
  let filtered = [...scoredChefs];
  if (filterMode === 'battles') {
    filtered = filtered.filter(c => c.battlesWon > 0).sort((a, b) => b.battlesWon - a.battlesWon);
  } else if (filterMode === 'michelin') {
    filtered = filtered.filter(c => (c.michelinStars || 0) > 0).sort((a, b) => (b.michelinStars || 0) - (a.michelinStars || 0));
  } else if (filterMode === 'rising') {
    filtered = filtered.filter(c => c.experienceYears <= 10).sort((a, b) => b.compositeScore - a.compositeScore);
  } else {
    filtered.sort((a, b) => b.compositeScore - a.compositeScore);
  }

  const top3 = filtered.slice(0, 3);
  const remaining = filtered.slice(3);

  return (
    <div className="w-full max-w-[1020px] mx-auto pt-4 pb-20 px-3 sm:px-4">
      {/* Title & Algorithm Transparency Banner */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950 text-white p-6 sm:p-8 mb-6 shadow-md">
        <div className="max-w-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400 text-stone-950 font-bold">
              <Trophy className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300">
              Global Official Rankings
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            CHEF LEADERBOARD
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Transparent culinary meritocracy. Ranked not by superficial vanity metrics, but by verified Chef Battle wins (40%), Michelin & expert evaluations (30%), recipe technical depth (20%), and community engagement (10%).
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {[
          { id: 'all', label: '🏆 Global Overall' },
          { id: 'battles', label: '⚔️ Battle Champions' },
          { id: 'michelin', label: '★ Michelin Stars' },
          { id: 'rising', label: '🌱 Rising Young Stars' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterMode(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterMode === tab.id 
                ? 'bg-[#262626] text-white shadow-xs' 
                : 'bg-white border border-[#DBDBDB] text-[#262626] hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {top3.map((chef, idx) => {
          const podiumOrder = [
            { rank: 1, medal: '🥇 Gold Grandmaster', ringColor: 'ring-amber-400', badgeBg: 'bg-amber-400 text-stone-950' },
            { rank: 2, medal: '🥈 Silver Master', ringColor: 'ring-gray-300', badgeBg: 'bg-gray-200 text-stone-900' },
            { rank: 3, medal: '🥉 Bronze Master', ringColor: 'ring-amber-700', badgeBg: 'bg-amber-100 text-amber-900' }
          ][idx];

          return (
            <div 
              key={chef.id}
              className={`bg-white border border-[#DBDBDB] rounded-2xl p-6 flex flex-col items-center text-center shadow-xs relative overflow-hidden ${
                idx === 0 ? 'ring-2 ring-amber-400 bg-gradient-to-b from-amber-50/40 to-white' : ''
              }`}
            >
              <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-4 ${podiumOrder.badgeBg}`}>
                {podiumOrder.medal}
              </span>

              <div className="relative mb-3">
                <img 
                  src={chef.avatar} 
                  alt={chef.name} 
                  className={`w-20 h-20 rounded-full object-cover ring-4 ${podiumOrder.ringColor}`}
                />
                <span className="absolute -bottom-1 -right-1">
                  <VerifiedBadge isMasterChef={chef.isMasterChef} size="md" />
                </span>
              </div>

              <h3 className="font-extrabold text-base text-[#262626] leading-tight">
                {chef.name}
              </h3>
              <span className="text-xs text-[#8E8E8E] mb-2">{chef.restaurant}</span>

              {/* Score HUD */}
              <div className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-3 flex items-center justify-around text-xs mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8E8E8E] font-bold uppercase">Composite</span>
                  <span className="font-black text-sm text-[#0095F6]">{chef.compositeScore}</span>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8E8E8E] font-bold uppercase">Battles Won</span>
                  <span className="font-bold text-sm text-[#262626]">{chef.battlesWon} ⚔️</span>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8E8E8E] font-bold uppercase">Rating</span>
                  <span className="font-bold text-sm text-[#262626]">★ {chef.expertRating}</span>
                </div>
              </div>

              <div className="flex gap-2 w-full">
                <Link
                  to={`/chef/${chef.id}`}
                  className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#262626] text-xs font-bold transition-colors"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => toggleFollowChef(chef.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    chef.isFollowing 
                      ? 'bg-gray-200 text-[#262626]' 
                      : 'bg-[#0095F6] hover:bg-[#1877F2] text-white'
                  }`}
                >
                  {chef.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ranks 4 to N List Table */}
      <div className="bg-white border border-[#DBDBDB] rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-[#DBDBDB] flex items-center justify-between text-xs font-bold text-[#8E8E8E] uppercase tracking-wider">
          <span>Rank & Chef Information</span>
          <div className="flex items-center gap-8">
            <span className="hidden sm:inline">Battles</span>
            <span className="hidden sm:inline">Expert Score</span>
            <span>Composite Score</span>
            <span>Action</span>
          </div>
        </div>

        <div className="divide-y divide-[#EFEFEF]">
          {remaining.map((chef, idx) => (
            <div key={chef.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-[#FAFAFA] transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                <span className="font-black text-sm text-[#8E8E8E] w-6 text-center">
                  #{idx + 4}
                </span>

                <Link to={`/chef/${chef.id}`} className="flex items-center gap-3 min-w-0 group">
                  <img src={chef.avatar} alt={chef.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#262626] group-hover:underline truncate">{chef.name}</span>
                      <VerifiedBadge isMasterChef={chef.isMasterChef} size="sm" />
                    </div>
                    <span className="text-[11px] text-[#8E8E8E] truncate">{chef.restaurant}</span>
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-xs">
                <span className="hidden sm:inline font-bold text-[#262626]">{chef.battlesWon} ⚔️</span>
                <span className="hidden sm:inline font-bold text-emerald-600">★ {chef.expertRating}</span>
                <span className="font-black text-sm text-[#0095F6]">{chef.compositeScore}</span>

                <button
                  onClick={() => toggleFollowChef(chef.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    chef.isFollowing 
                      ? 'bg-gray-100 text-[#262626]' 
                      : 'bg-[#0095F6] text-white hover:bg-[#1877F2]'
                  }`}
                >
                  {chef.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
