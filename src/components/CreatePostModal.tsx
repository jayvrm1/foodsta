import React, { useState } from 'react';
import { X, Image, ChefHat, Sparkles, Plus, Check } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { CuisineType } from '../types/index.ts';

const PRESET_CULINARY_IMAGES = [
  { label: 'Scallop Crudo & Citrus', url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Wild Mushroom Tart', url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Aged Duck & Red Fruit', url: 'https://images.unsplash.com/photo-1514944298352-78d120a1db4b?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Truffle Potato Mille-Feuille', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Modern Mexican Mole', url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Artisanal Viennoiserie', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80' }
];

export const CreatePostModal: React.FC = () => {
  const { isCreatePostOpen, setIsCreatePostOpen, addPost, currentUser } = useApp();

  const [mode, setMode] = useState<'quick' | 'recipe'>('quick');
  const [imageUrl, setImageUrl] = useState(PRESET_CULINARY_IMAGES[0].url);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('#FoodstaChef #CulinaryArt #HauteCuisine');
  const [locationTag, setLocationTag] = useState(`${currentUser.restaurant} • Kitchen Lab`);
  
  // Recipe-specific fields
  const [recipeTitle, setRecipeTitle] = useState('');
  const [cuisine, setCuisine] = useState<CuisineType>('Modernist');
  const [calories, setCalories] = useState(420);
  const [protein, setProtein] = useState(32);

  if (!isCreatePostOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim() && !recipeTitle.trim()) return;

    addPost({
      imageUrl,
      mediaType: 'image',
      caption: caption.trim() || (recipeTitle ? `${recipeTitle}. Crafted with precision.` : 'New culinary creation.'),
      hashtags: hashtags.split(' ').map(t => t.trim()).filter(Boolean),
      locationTag,
      recipeTitle: mode === 'recipe' ? recipeTitle : undefined,
      nutritionPreview: mode === 'recipe' ? {
        calories: Number(calories) || 350,
        protein: Number(protein) || 25
      } : undefined
    });

    setIsCreatePostOpen(false);
    setCaption('');
    setRecipeTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="h-[54px] border-b border-[#DBDBDB] px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#262626]">Create New Culinary Post</span>
          </div>
          <button 
            onClick={() => setIsCreatePostOpen(false)} 
            className="p-1 text-[#8E8E8E] hover:text-[#262626] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Type Selector */}
        <div className="grid grid-cols-2 border-b border-[#DBDBDB] text-xs font-bold text-center">
          <button
            onClick={() => setMode('quick')}
            className={`py-3 transition-colors cursor-pointer ${
              mode === 'quick' ? 'border-b-2 border-[#0095F6] text-[#0095F6]' : 'text-[#8E8E8E] hover:bg-gray-50'
            }`}
          >
            📸 Quick Food Snapshot
          </button>
          <button
            onClick={() => setMode('recipe')}
            className={`py-3 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'recipe' ? 'border-b-2 border-[#0095F6] text-[#0095F6]' : 'text-[#8E8E8E] hover:bg-gray-50'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Full Recipe Post</span>
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 no-scrollbar flex flex-col gap-4 text-xs">
          {/* Image Selection & Presets */}
          <div>
            <label className="font-bold text-[#262626] block mb-1.5">Food Photograph</label>
            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black mb-2">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-2">
              {PRESET_CULINARY_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                    imageUrl === preset.url 
                      ? 'bg-blue-50 border-[#0095F6] text-[#0095F6] font-bold' 
                      : 'bg-white border-[#DBDBDB] text-[#262626] hover:bg-gray-50'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <input 
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or paste external high-res food image URL..."
              className="w-full border border-[#DBDBDB] rounded-lg px-3 py-1.5 text-xs focus:outline-hidden focus:border-[#0095F6]"
            />
          </div>

          {/* Recipe fields if in recipe mode */}
          {mode === 'recipe' && (
            <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-3 flex flex-col gap-3">
              <div>
                <label className="font-bold text-[#002B4D] block mb-1">Recipe Title *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Dry-Aged Challans Duck with Shiitake Guanylate Reduction"
                  value={recipeTitle}
                  onChange={(e) => setRecipeTitle(e.target.value)}
                  className="w-full bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-xs focus:outline-hidden focus:border-[#0095F6]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-[#002B4D] block mb-1">Cuisine</label>
                  <select 
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value as CuisineType)}
                    className="w-full bg-white border border-blue-200 rounded-lg px-2 py-1.5 text-xs"
                  >
                    <option value="Modernist">Modernist</option>
                    <option value="French">French</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Italian">Italian</option>
                    <option value="Nordic">Nordic</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#002B4D] block mb-1">Est. Calories</label>
                  <input 
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-full bg-white border border-blue-200 rounded-lg px-2 py-1.5 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#002B4D] block mb-1">Est. Protein (g)</label>
                  <input 
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                    className="w-full bg-white border border-blue-200 rounded-lg px-2 py-1.5 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Caption */}
          <div>
            <label className="font-bold text-[#262626] block mb-1">Caption & Technique Notes *</label>
            <textarea 
              rows={3}
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe your dish, sensory highlights, texture kinetics, or cooking temperature..."
              className="w-full border border-[#DBDBDB] rounded-lg p-2.5 text-xs focus:outline-hidden focus:border-[#0095F6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#262626] block mb-1">Hashtags</label>
              <input 
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="w-full border border-[#DBDBDB] rounded-lg px-3 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-[#262626] block mb-1">Location Tag</label>
              <input 
                type="text"
                value={locationTag}
                onChange={(e) => setLocationTag(e.target.value)}
                className="w-full border border-[#DBDBDB] rounded-lg px-3 py-1.5 text-xs"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-3 border-t border-[#DBDBDB]">
            <button
              type="button"
              onClick={() => setIsCreatePostOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#8E8E8E] hover:text-[#262626] cursor-pointer"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#0095F6] hover:bg-[#1877F2] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
