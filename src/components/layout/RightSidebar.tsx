import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swords, ArrowRight, Sparkles, Check, UserPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { VerifiedBadge } from '../common/VerifiedBadge.tsx';

export const RightSidebar: React.FC = () => {
  const { currentUser, switchUser, chefs, toggleFollowChef, competitions, setActiveRecipeModal, recipes } = useApp();
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  // Suggested chefs (excluding current user, prioritizing those not followed)
  const suggestedChefs = chefs
    .filter(c => c.id !== currentUser.id)
    .slice(0, 5);

  const activeBattle = competitions.find(c => c.status === 'active');
  const trendingRecipes = recipes.slice(0, 3);

  return (
    <aside className="w-[320px] shrink-0 pt-4 hidden xl:flex flex-col gap-6 text-[#262626] select-none">
      {/* Current User Card & Switch Account */}
      <div className="flex items-center justify-between">
        <Link to={`/chef/${currentUser.id}`} className="flex items-center gap-3 group">
          <div className="relative">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-12 h-12 rounded-full object-cover border border-[#DBDBDB] group-hover:scale-105 transition-transform"
            />
            {currentUser.isVerified && (
              <span className="absolute -bottom-1 -right-1">
                <VerifiedBadge isMasterChef={currentUser.isMasterChef} size="sm" />
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[14px] text-[#262626] leading-tight group-hover:underline">
              {currentUser.username}
            </span>
            <span className="text-[12px] text-[#8E8E8E] truncate max-w-[150px]">
              {currentUser.restaurant}
            </span>
          </div>
        </Link>
        <button
          onClick={() => setShowSwitchModal(!showSwitchModal)}
          className="text-[#0095F6] text-[12px] font-semibold hover:text-[#1877F2] cursor-pointer"
        >
          Switch
        </button>
      </div>

      {/* Switch Chef Modal Dropdown */}
      {showSwitchModal && (
        <div className="bg-white border border-[#DBDBDB] rounded-lg p-3 shadow-md flex flex-col gap-2 max-h-60 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center pb-2 border-b border-[#EFEFEF]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E8E]">Switch Profile</span>
            <button 
              onClick={() => setShowSwitchModal(false)}
              className="text-xs text-[#8E8E8E] hover:text-black cursor-pointer"
            >
              Close
            </button>
          </div>
          {chefs.slice(0, 8).map(chef => (
            <button
              key={chef.id}
              onClick={() => {
                switchUser(chef.id);
                setShowSwitchModal(false);
              }}
              className={`flex items-center justify-between p-1.5 rounded-md text-left transition-colors cursor-pointer ${
                chef.id === currentUser.id ? 'bg-blue-50 font-bold' : 'hover:bg-[#FAFAFA]'
              }`}
            >
              <div className="flex items-center gap-2">
                <img src={chef.avatar} alt={chef.name} className="w-7 h-7 rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#262626]">{chef.name}</span>
                  <span className="text-[10px] text-[#8E8E8E] truncate max-w-[150px]">{chef.title}</span>
                </div>
              </div>
              {chef.id === currentUser.id && (
                <Check className="w-4 h-4 text-[#0095F6]" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Signature Chef Battles Banner Widget */}
      {activeBattle && (
        <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-4 shadow-2xs relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-[#0095F6] text-white">
              <Swords className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0095F6]">
              Active Chef Battle
            </span>
          </div>

          <h4 className="font-bold text-[14px] leading-tight text-[#262626] mb-1">
            {activeBattle.title}
          </h4>
          <p className="text-[12px] text-[#8E8E8E] line-clamp-2 mb-3">
            {activeBattle.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-blue-100">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {activeBattle.prizePool}
            </span>
            <Link 
              to="/battles" 
              className="inline-flex items-center gap-1 text-[12px] font-bold text-[#0095F6] hover:underline"
            >
              View Battle <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Suggested For You */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#8E8E8E]">
            Suggested for you
          </span>
          <Link to="/chefs" className="text-[12px] font-semibold text-[#262626] hover:text-[#8E8E8E]">
            See All
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {suggestedChefs.map(chef => (
            <div key={chef.id} className="flex items-center justify-between">
              <Link to={`/chef/${chef.id}`} className="flex items-center gap-2.5 min-w-0 flex-1 group">
                <div className="relative shrink-0">
                  <img 
                    src={chef.avatar} 
                    alt={chef.name} 
                    className="w-9 h-9 rounded-full object-cover border border-[#DBDBDB]"
                  />
                  {chef.isVerified && (
                    <span className="absolute -bottom-0.5 -right-0.5">
                      <VerifiedBadge isMasterChef={chef.isMasterChef} size="sm" />
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-semibold text-[#262626] truncate leading-tight group-hover:underline">
                    {chef.username}
                  </span>
                  <span className="text-[11px] text-[#8E8E8E] truncate">
                    {chef.restaurant}
                  </span>
                </div>
              </Link>
              
              <button
                onClick={() => toggleFollowChef(chef.id)}
                className={`text-[12px] font-semibold px-2 py-1 rounded transition-colors cursor-pointer shrink-0 ml-2 ${
                  chef.isFollowing 
                    ? 'text-[#262626] bg-[#EFEFEF] hover:bg-[#DBDBDB]' 
                    : 'text-[#0095F6] hover:text-[#1877F2]'
                }`}
              >
                {chef.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Computational Recipes */}
      <div className="flex flex-col gap-3 pt-2 border-t border-[#EFEFEF]">
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#8E8E8E]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Trending Gastronomy</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {trendingRecipes.map(recipe => (
            <button
              key={recipe.id}
              onClick={() => setActiveRecipeModal(recipe)}
              className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#FAFAFA] text-left transition-colors cursor-pointer group"
            >
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title} 
                className="w-11 h-11 rounded-md object-cover shrink-0 border border-[#DBDBDB]"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[12px] font-semibold text-[#262626] line-clamp-1 group-hover:text-[#0095F6]">
                  {recipe.title}
                </span>
                <span className="text-[11px] text-[#8E8E8E] truncate">
                  By {recipe.chefName} • ★ {recipe.rating}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Legal & Tagline */}
      <div className="flex flex-col gap-1 text-[11px] text-[#C7C7C7] pt-2">
        <p className="font-semibold text-[#8E8E8E] tracking-wider uppercase">
          "SHARE YOUR TASTE. SHOWCASE YOUR TALENT."
        </p>
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <span>About</span>•
          <span>RecipeDB</span>•
          <span>FlavorDB</span>•
          <span>Chef Battles</span>•
          <span>API Architecture</span>•
          <span>Privacy</span>
        </div>
        <p className="mt-2">© 2026 FOODSTA FROM FOODOSCOPE LABS</p>
      </div>
    </aside>
  );
};
