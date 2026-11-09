import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, Sparkles, Search, ArrowRight, Dna, 
  Layers, Check, Plus, AlertCircle, BookOpen, Flame
} from 'lucide-react';
import { flavorService } from '../services/flavorService.ts';
import { recipeService } from '../services/recipeService.ts';
import { IngredientFlavorData, FlavorCompound, Recipe } from '../types/index.ts';
import { useApp } from '../context/AppContext.tsx';

export const FlavourLab: React.FC = () => {
  const { setActiveRecipeModal } = useApp();
  const [ingredients, setIngredients] = useState<IngredientFlavorData[]>([]);
  const [selectedA, setSelectedA] = useState<IngredientFlavorData | null>(null);
  const [selectedB, setSelectedB] = useState<IngredientFlavorData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingRecipes, setMatchingRecipes] = useState<Recipe[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    flavorService.getAllIngredients().then(res => {
      setIngredients(res.data);
      if (res.data.length >= 2) {
        setSelectedA(res.data[0]); // Shiitake
        setSelectedB(res.data[1]); // Black Truffle
      }
    });
  }, []);

  useEffect(() => {
    if (selectedA && selectedB) {
      setIsAnalyzing(true);
      recipeService.getRelatedRecipesByIngredients([selectedA.name, selectedB.name])
        .then(res => {
          setMatchingRecipes(res);
          setIsAnalyzing(false);
        });
    }
  }, [selectedA, selectedB]);

  const pairingAnalysis = (selectedA && selectedB) 
    ? flavorService.analyzePairing(selectedA, selectedB) 
    : null;

  const compoundLibrary = flavorService.getCompoundLibrary();

  return (
    <div className="w-full max-w-[1020px] mx-auto pt-4 pb-20 px-3 sm:px-4">
      {/* Banner */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 mb-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0095F6] text-white">
              <FlaskConical className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-sky-300">
              Computational Gastronomy Lab
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            FLAVOUR LAB
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
            Harnessing Foodoscope FlavorDB & RecipeDB. Explore molecular aroma compounds, shared volatile molecules, and scientifically backed pairing synergies.
          </p>

          <div className="mt-2 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs text-sky-200 border border-white/15">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>FlavorDB provides compound-level insight to support creative exploration, not artificial taste judgment.</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Sandbox: Select Ingredients */}
      <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6 mb-8 shadow-xs">
        <h2 className="text-base font-bold text-[#262626] mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#0095F6]" />
          <span>Molecular Volatile Pairing Matrix</span>
        </h2>

        {/* Two Ingredient Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#DBDBDB]">
          {/* Ingredient 1 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#8E8E8E] uppercase tracking-wider">
              Primary Ingredient (Base)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ingredients.map(ing => (
                <button
                  key={ing.id}
                  onClick={() => setSelectedA(ing)}
                  className={`p-2 rounded-xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    selectedA?.id === ing.id 
                      ? 'bg-blue-50/80 border-[#0095F6] ring-1 ring-[#0095F6]' 
                      : 'bg-white border-[#DBDBDB] hover:bg-gray-50'
                  }`}
                >
                  <img src={ing.imageUrl} alt={ing.name} className="w-full h-14 rounded-lg object-cover" />
                  <span className="font-bold text-xs text-[#262626] truncate">{ing.name}</span>
                  <span className="text-[10px] text-[#8E8E8E] truncate">{ing.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ingredient 2 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#8E8E8E] uppercase tracking-wider">
              Secondary Ingredient (Partner)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ingredients.map(ing => (
                <button
                  key={ing.id}
                  onClick={() => setSelectedB(ing)}
                  className={`p-2 rounded-xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    selectedB?.id === ing.id 
                      ? 'bg-blue-50/80 border-[#0095F6] ring-1 ring-[#0095F6]' 
                      : 'bg-white border-[#DBDBDB] hover:bg-gray-50'
                  }`}
                >
                  <img src={ing.imageUrl} alt={ing.name} className="w-full h-14 rounded-lg object-cover" />
                  <span className="font-bold text-xs text-[#262626] truncate">{ing.name}</span>
                  <span className="text-[10px] text-[#8E8E8E] truncate">{ing.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pairing Synergy Results Card */}
        {pairingAnalysis && selectedA && selectedB && (
          <div className="pt-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center gap-4">
                <img src={selectedA.imageUrl} alt={selectedA.name} className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm" />
                <span className="font-black text-xl text-[#0095F6]">+</span>
                <img src={selectedB.imageUrl} alt={selectedB.name} className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm" />
                <div className="flex flex-col">
                  <h3 className="font-extrabold text-base text-[#262626]">
                    {selectedA.name} & {selectedB.name}
                  </h3>
                  <span className="text-xs text-[#8E8E8E]">
                    {pairingAnalysis.scientificNotes}
                  </span>
                </div>
              </div>

              {/* Affinity Score Dial */}
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-blue-200 shadow-sm">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E8E]">
                    FlavorDB Affinity
                  </span>
                  <span className="text-2xl font-black text-[#0095F6]">
                    {pairingAnalysis.synergyIndex}%
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0095F6]">
                  <Dna className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Shared Aromatic Volatile Compounds */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#262626] mb-2">
                Shared Aromatic Volatiles & Odor Compounds ({pairingAnalysis.totalShared})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {selectedA.compounds.map((comp, idx) => (
                  <div key={idx} className="border border-[#DBDBDB] rounded-xl p-3 bg-white flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#262626]">{comp.name}</span>
                      <span className="font-mono text-[10px] text-[#8E8E8E]">{comp.formula}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#0095F6]">{comp.flavorClass}</span>
                    <p className="text-[10px] text-[#8E8E8E] leading-normal">{comp.odorDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Discovered RecipeDB Dishes Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#262626]">
              RecipeDB Synergistic Dishes ({matchingRecipes.length})
            </h3>
            <p className="text-xs text-[#8E8E8E]">
              Real dishes incorporating these verified compound networks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchingRecipes.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => setActiveRecipeModal(recipe)}
              className="bg-white border border-[#DBDBDB] rounded-xl overflow-hidden hover:border-[#0095F6] transition-all cursor-pointer p-4 flex gap-4 shadow-2xs group"
            >
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title} 
                className="w-24 h-24 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col justify-between min-w-0 flex-1">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] uppercase font-bold text-[#0095F6] bg-blue-50 px-2 py-0.2 rounded">
                      {recipe.cuisine}
                    </span>
                    <span className="text-[10px] text-[#8E8E8E]">★ {recipe.rating}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#262626] line-clamp-1 group-hover:text-[#0095F6]">
                    {recipe.title}
                  </h4>
                  <p className="text-xs text-[#8E8E8E] line-clamp-2 mt-0.5">
                    {recipe.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8E8E8E] pt-2 border-t border-[#EFEFEF]">
                  <span>By {recipe.chefName}</span>
                  <span className="font-bold text-[#262626]">{recipe.cookTimeMinutes} mins</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
