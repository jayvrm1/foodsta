import React, { useState } from 'react';
import { 
  X, Clock, Flame, ChefHat, Bookmark, Share2, 
  Sparkles, CheckCircle2, ChevronRight, Star, Heart, 
  MessageCircle, Scale
} from 'lucide-react';
import { Recipe } from '../../types/index.ts';
import { useApp } from '../../context/AppContext.tsx';
import { VerifiedBadge } from '../common/VerifiedBadge.tsx';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  const { saveRecipe, currentUser } = useApp();
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'flavor' | 'nutrition'>('ingredients');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!recipe) return null;

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    saveRecipe(recipe.id);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative">
        {/* Floating close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors cursor-pointer"
          aria-label="Close recipe details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto no-scrollbar flex-1">
          {/* Hero Image & Headline */}
          <div className="relative w-full h-72 sm:h-96 bg-stone-900">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0095F6] text-white text-[11px] font-bold uppercase tracking-wider">
                  {recipe.cuisine} Gastronomy
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-medium">
                  {recipe.difficulty} Level
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/80 text-white text-[11px] font-medium">
                  ★ {recipe.rating} ({recipe.reviewCount} reviews)
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight text-white mb-2 drop-shadow-md">
                {recipe.title}
              </h2>

              <p className="text-white/80 text-sm max-w-2xl line-clamp-2">
                {recipe.description}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar & Author Bar */}
          <div className="border-b border-[#DBDBDB] px-6 py-4 bg-[#FAFAFA] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={recipe.chefAvatar} 
                alt={recipe.chefName} 
                className="w-11 h-11 rounded-full object-cover border border-[#DBDBDB]"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-[#262626]">{recipe.chefName}</span>
                  <VerifiedBadge isMasterChef={true} size="sm" />
                </div>
                <span className="text-xs text-[#8E8E8E]">{recipe.chefRestaurant}</span>
              </div>
            </div>

            {/* Timers & Servings */}
            <div className="flex items-center gap-6 text-xs text-[#262626]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8E8E8E]" />
                <div className="flex flex-col">
                  <span className="text-[#8E8E8E] text-[10px] uppercase font-bold">Prep / Cook</span>
                  <span className="font-semibold">{recipe.prepTimeMinutes}m / {recipe.cookTimeMinutes}m</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-[#8E8E8E] text-[10px] uppercase font-bold">Calories</span>
                  <span className="font-semibold">{recipe.nutrition.calories} kcal</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#0095F6]" />
                <div className="flex flex-col">
                  <span className="text-[#8E8E8E] text-[10px] uppercase font-bold">Servings</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 4].map(scale => (
                      <button
                        key={scale}
                        onClick={() => setServingsMultiplier(scale)}
                        className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                          servingsMultiplier === scale 
                            ? 'bg-[#0095F6] text-white' 
                            : 'bg-gray-200 text-[#262626] hover:bg-gray-300'
                        }`}
                      >
                        {scale}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleSave}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isSaved 
                    ? 'bg-[#262626] text-white' 
                    : 'bg-white border border-[#DBDBDB] text-[#262626] hover:bg-gray-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save Recipe'}</span>
              </button>

              <button 
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#DBDBDB] text-[#262626] hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#DBDBDB] px-6 text-sm font-semibold text-[#8E8E8E]">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'ingredients' 
                  ? 'border-[#0095F6] text-[#0095F6]' 
                  : 'border-transparent hover:text-[#262626]'
              }`}
            >
              Ingredients & Method
            </button>
            <button
              onClick={() => setActiveTab('flavor')}
              className={`py-3 px-4 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'flavor' 
                  ? 'border-[#0095F6] text-[#0095F6]' 
                  : 'border-transparent hover:text-[#262626]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Computational Gastronomy (FlavorDB)</span>
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'nutrition' 
                  ? 'border-[#0095F6] text-[#0095F6]' 
                  : 'border-transparent hover:text-[#262626]'
              }`}
            >
              Nutrition Facts
            </button>
          </div>

          {/* Tab 1: Ingredients & Method */}
          {activeTab === 'ingredients' && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Ingredients Checklist */}
              <div className="md:col-span-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#262626]">Ingredients</h3>
                  <span className="text-xs text-[#8E8E8E]">
                    Yields {recipe.servings * servingsMultiplier} portions
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {recipe.ingredients.map((ing, i) => (
                    <label 
                      key={i} 
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#FAFAFA] cursor-pointer text-xs leading-normal select-none"
                    >
                      <input 
                        type="checkbox" 
                        className="mt-0.5 rounded border-[#DBDBDB] text-[#0095F6] focus:ring-0"
                      />
                      <div className="flex flex-col flex-1">
                        <span className="font-semibold text-[#262626]">{ing.name}</span>
                        <span className="text-[#8E8E8E]">{ing.quantity}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Instructions Steps */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#262626]">Preparation & Method</h3>
                  <span className="text-xs text-[#8E8E8E]">
                    {completedSteps.length} of {recipe.instructions.length} completed
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {recipe.instructions.map((step, idx) => {
                    const isDone = completedSteps.includes(idx);
                    return (
                      <div 
                        key={idx}
                        onClick={() => toggleStep(idx)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isDone 
                            ? 'bg-emerald-50/50 border-emerald-200 opacity-60' 
                            : 'bg-white border-[#DBDBDB] hover:border-gray-400'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          isDone ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-[#262626]'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-gray-500' : 'text-[#262626]'}`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Computational Gastronomy & FlavorDB */}
          {activeTab === 'flavor' && (
            <div className="p-6 flex flex-col gap-6">
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#0095F6] shrink-0 mt-0.5" />
                <div className="text-xs text-[#002B4D] leading-relaxed">
                  <strong>Foodoscope Computational Gastronomy Layer:</strong> This profile maps aromatic volatile compounds extracted from FlavorDB. FlavorDB supports pairing exploration and molecular synergy analysis, not artificial taste judgment.
                </div>
              </div>

              {/* Flavor Profile Metrics */}
              <div>
                <h4 className="font-bold text-sm text-[#262626] mb-3">Sensory Flavor Radar</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Umami Depth', val: recipe.flavorProfile.umami, color: 'bg-indigo-600' },
                    { label: 'Savory Richness', val: recipe.flavorProfile.savory, color: 'bg-emerald-600' },
                    { label: 'Acidity Brightness', val: recipe.flavorProfile.acidic, color: 'bg-amber-500' },
                    { label: 'Sweet Balance', val: recipe.flavorProfile.sweet, color: 'bg-rose-500' },
                    { label: 'Bitterness / Tannin', val: recipe.flavorProfile.bitter, color: 'bg-stone-600' },
                    { label: 'Spiciness / Heat', val: recipe.flavorProfile.spicy, color: 'bg-red-600' },
                  ].map(item => (
                    <div key={item.label} className="border border-[#DBDBDB] rounded-lg p-3 bg-[#FAFAFA]">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>{item.label}</span>
                        <span>{item.val}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scientific Pairing Suggestions */}
              <div>
                <h4 className="font-bold text-sm text-[#262626] mb-3">FlavorDB High-Affinity Pairings</h4>
                <div className="flex flex-col gap-3">
                  {recipe.pairingSuggestions.map((pair, idx) => (
                    <div key={idx} className="border border-[#DBDBDB] rounded-xl p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#262626]">{pair.ingredient}</span>
                          <span className="text-[11px] font-bold text-[#0095F6] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {pair.affinityScore}% Synergy
                          </span>
                        </div>
                        <p className="text-xs text-[#8E8E8E] mt-1 leading-relaxed">
                          {pair.synergyReason}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {pair.sharedCompounds.map((c, i) => (
                          <span key={i} className="text-[10px] font-mono bg-stone-100 text-stone-700 px-2 py-1 rounded">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Nutrition Information */}
          {activeTab === 'nutrition' && (
            <div className="p-6 max-w-xl mx-auto flex flex-col gap-4">
              <div className="border border-black rounded-lg p-5 bg-white font-sans text-[#262626]">
                <h3 className="font-black text-2xl border-b-8 border-black pb-1 leading-none">
                  Nutrition Facts
                </h3>
                <div className="flex justify-between py-1 text-xs border-b border-gray-300">
                  <span>Serving Size</span>
                  <span className="font-bold">1 plate (approx 320g)</span>
                </div>
                <div className="flex justify-between py-2 text-xl font-black border-b-4 border-black">
                  <span>Calories</span>
                  <span>{recipe.nutrition.calories * servingsMultiplier}</span>
                </div>

                <div className="flex flex-col text-xs divide-y divide-gray-200">
                  <div className="flex justify-between py-1.5 font-bold">
                    <span>Total Fat {recipe.nutrition.fat * servingsMultiplier}g</span>
                    <span>{Math.round(((recipe.nutrition.fat * servingsMultiplier) / 78) * 100)}%</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-bold">
                    <span>Total Carbohydrate {recipe.nutrition.carbs * servingsMultiplier}g</span>
                    <span>{Math.round(((recipe.nutrition.carbs * servingsMultiplier) / 275) * 100)}%</span>
                  </div>
                  <div className="flex justify-between py-1.5 pl-4 text-gray-600">
                    <span>Dietary Fiber {recipe.nutrition.fiber ? recipe.nutrition.fiber * servingsMultiplier : 3}g</span>
                    <span>12%</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-bold">
                    <span>Protein {recipe.nutrition.protein * servingsMultiplier}g</span>
                    <span>{Math.round(((recipe.nutrition.protein * servingsMultiplier) / 50) * 100)}%</span>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t-2 border-black text-[10px] text-gray-500 leading-tight">
                  * {recipe.nutrition.sourceLabel || 'Nutritional values derived from Foodoscope computational database estimates.'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
