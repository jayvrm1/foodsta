import React, { useState } from 'react';
import { X, Sparkles, Upload, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

interface SubmitDishModalProps {
  battleId: string;
  onClose: () => void;
}

export const SubmitDishModal: React.FC<SubmitDishModalProps> = ({ battleId, onClose }) => {
  const { submitDishToBattle, competitions, currentUser } = useApp();
  const battle = competitions.find(c => c.id === battleId);

  const [dishName, setDishName] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80');
  const [inspiration, setInspiration] = useState('');
  const [cookingTime, setCookingTime] = useState(45);
  const [ingredients, setIngredients] = useState('Fresh Wild Porcini & Maitake\nClarified Brown Butter\nFermented Koji Paste\nFleur de Sel de Guérande');
  const [instructions, setInstructions] = useState('Sear wild mushrooms in hot smoking skillet.\nEmulsify pan drippings with brown butter.\nPlate with tableside aromatic cedar smoke.');
  const [compounds, setCompounds] = useState('1-Octen-3-ol, Lentinan, Methional');
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;
       
    submitDishToBattle(battleId, {
      dishName: dishName.trim(),
      imageUrl: imageUrl.trim(),
      inspiration: inspiration.trim(),
      cookingTimeMinutes: Number(cookingTime) || 40,
      ingredients,
      instructions,
      compoundsIdentified: compounds.split(',').map(c => c.trim()).filter(Boolean)
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="h-[56px] border-b border-[#DBDBDB] px-6 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-[#262626]">
              {isPreview ? 'Preview Submission' : 'Submit Dish to Battle'}
            </span>
            {battle && (
              <span className="text-xs text-[#0095F6] font-semibold bg-blue-50 px-2 py-0.5 rounded">
                {battle.title}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1 text-[#8E8E8E] hover:text-[#262626] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 no-scrollbar">
          {!isPreview ? (
            <form onSubmit={(e) => { e.preventDefault(); setIsPreview(true); }} className="flex flex-col gap-4 text-xs">
              <div>
                <label className="font-bold text-[#262626] block mb-1">Dish Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g., Chanterelle & Birch Sap Tartlet with Cloudberry Garum"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  className="w-full border border-[#DBDBDB] rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-[#0095F6]"
                />
              </div>

              <div>
                <label className="font-bold text-[#262626] block mb-1">Dish Photography URL</label>
                <div className="flex gap-2">
                  <input 
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 border border-[#DBDBDB] rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-[#0095F6]"
                  />
                  <button 
                    type="button" 
                    onClick={() => setImageUrl('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80')}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-[#262626] cursor-pointer"
                  >
                    Preset Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#262626] block mb-1">Cooking Time (minutes)</label>
                  <input 
                    type="number"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(Number(e.target.value))}
                    className="w-full border border-[#DBDBDB] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#262626] block mb-1">Flavor Compounds Identified</label>
                  <input 
                    type="text"
                    value={compounds}
                    onChange={(e) => setCompounds(e.target.value)}
                    placeholder="e.g. 1-Octen-3-ol, Lentinan"
                    className="w-full border border-[#DBDBDB] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#262626] block mb-1">Culinary Inspiration & Science</label>
                <textarea 
                  rows={2}
                  value={inspiration}
                  onChange={(e) => setInspiration(e.target.value)}
                  placeholder="Explain your culinary concept, volatile compound harmonization, or technique."
                  className="w-full border border-[#DBDBDB] rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-[#0095F6]"
                />
              </div>

              <div>
                <label className="font-bold text-[#262626] block mb-1">Ingredients (1 per line)</label>
                <textarea 
                  rows={3}
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full border border-[#DBDBDB] rounded-lg px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-[#262626] block mb-1">Instructions (1 step per line)</label>
                <textarea 
                  rows={3}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full border border-[#DBDBDB] rounded-lg px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#8E8E8E] hover:text-[#262626] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!dishName.trim()}
                  className="px-5 py-2 rounded-lg bg-[#0095F6] hover:bg-[#1877F2] text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  Preview Submission →
                </button>
              </div>
            </form>
          ) : (
            /* Preview State */
            <div className="flex flex-col gap-4 text-xs">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-black">
                <img src={imageUrl} alt={dishName} className="w-full h-full object-cover" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#0095F6]">Dish Title</span>
                <h3 className="text-xl font-bold text-[#262626]">{dishName}</h3>
                <span className="text-[#8E8E8E]">By {currentUser.name} • {currentUser.restaurant}</span>
              </div>

              <div className="bg-[#FAFAFA] border border-[#DBDBDB] rounded-lg p-3">
                <span className="font-bold text-[#262626] block mb-1">Inspiration:</span>
                <p className="text-[#3F4752] leading-relaxed">{inspiration || 'No description provided.'}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-[#262626]">Identified Compounds:</span>
                <span className="font-mono bg-blue-50 text-[#0095F6] px-2 py-0.5 rounded border border-blue-200">
                  {compounds}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#DBDBDB]">
                <button
                  onClick={() => setIsPreview(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#262626] text-xs font-bold cursor-pointer"
                >
                  ← Edit Details
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg bg-[#0095F6] hover:bg-[#1877F2] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Confirm & Submit Dish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
