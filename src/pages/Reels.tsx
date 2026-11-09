import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Send, Bookmark, Music, 
  ChevronUp, ChevronDown, ChefHat, Volume2, VolumeX, 
  X, Check
} from 'lucide-react';
import { REELS } from '../data/reels.ts';
import { Reel } from '../types/index.ts';
import { useApp } from '../context/AppContext.tsx';
import { VerifiedBadge } from '../components/common/VerifiedBadge.tsx';

export const Reels: React.FC = () => {
  const { toggleFollowChef, chefs } = useApp();
  const [reels, setReels] = useState<Reel[]>(REELS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showRecipeDrawer, setShowRecipeDrawer] = useState(false);

  const currentReel = reels[currentIndex];
  const chef = chefs.find(c => c.id === currentReel.chefId);

  const handleLike = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        const nextLiked = !r.isLiked;
        return {
          ...r,
          isLiked: nextLiked,
          likesCount: nextLiked ? r.likesCount + 1 : r.likesCount - 1
        };
      }
      return r;
    }));
  };

  const handleSave = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        return { ...r, isSaved: !r.isSaved };
      }
      return r;
    }));
  };

  const nextReel = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowRecipeDrawer(false);
    }
  };

  const prevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowRecipeDrawer(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-60px)] md:h-screen flex items-center justify-center py-2 px-2 overflow-hidden select-none">
      <div className="relative flex items-center gap-4">
        {/* Reel Player Container (Aspect 9:16) */}
        <div className="relative w-[360px] sm:w-[380px] h-[82vh] max-h-[720px] bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
          {/* Video / Background Media */}
          <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
            <img 
              src={currentReel.thumbnailUrl} 
              alt={currentReel.caption} 
              className="w-full h-full object-cover"
            />
            {/* Subtle dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85" />
          </div>

          {/* Top Bar (Audio state & Reel title) */}
          <div className="relative z-20 p-4 flex items-center justify-between text-white">
            <span className="font-extrabold text-sm tracking-wider uppercase text-white/90">
              FOODSTA REELS
            </span>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Right Action Tray (Floating Buttons) */}
          <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-5 text-white">
            {/* Like */}
            <div className="flex flex-col items-center gap-1">
              <button 
                onClick={() => handleLike(currentReel.id)}
                className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:scale-110 transition-transform cursor-pointer"
              >
                <Heart className={`w-6 h-6 ${currentReel.isLiked ? 'fill-[#ED4956] text-[#ED4956]' : 'text-white'}`} />
              </button>
              <span className="text-[11px] font-bold text-white shadow-xs">
                {currentReel.likesCount.toLocaleString()}
              </span>
            </div>

            {/* Comment */}
            <div className="flex flex-col items-center gap-1">
              <button 
                onClick={() => setShowRecipeDrawer(true)}
                className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:scale-110 transition-transform cursor-pointer"
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
              <span className="text-[11px] font-bold text-white shadow-xs">
                {currentReel.commentsCount}
              </span>
            </div>

            {/* Share */}
            <button 
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:scale-110 transition-transform cursor-pointer"
            >
              <Send className="w-6 h-6 text-white" />
            </button>

            {/* Save */}
            <button 
              onClick={() => handleSave(currentReel.id)}
              className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:scale-110 transition-transform cursor-pointer"
            >
              <Bookmark className={`w-6 h-6 ${currentReel.isSaved ? 'fill-white text-white' : 'text-white'}`} />
            </button>

            {/* View Recipe Drawer Trigger */}
            {currentReel.recipe && (
              <button
                onClick={() => setShowRecipeDrawer(true)}
                className="p-2.5 rounded-full bg-amber-500 text-stone-950 font-bold hover:scale-110 transition-transform shadow-lg cursor-pointer"
                title="View Full Recipe"
              >
                <ChefHat className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Info & Chef Attribution */}
          <div className="relative z-20 p-4 pr-16 text-white flex flex-col gap-2">
            {/* Chef info */}
            <div className="flex items-center gap-2.5">
              <img 
                src={currentReel.chefAvatar} 
                alt={currentReel.chefName} 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
              />
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-bold text-sm text-white truncate">{currentReel.chefUsername}</span>
                <VerifiedBadge isMasterChef={true} size="sm" />
              </div>
              {chef && (
                <button
                  onClick={() => toggleFollowChef(chef.id)}
                  className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    chef.isFollowing 
                      ? 'bg-white/20 text-white hover:bg-white/30' 
                      : 'bg-[#0095F6] text-white hover:bg-[#1877F2]'
                  }`}
                >
                  {chef.isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>

            {/* Caption */}
            <p className="text-xs text-white/95 leading-relaxed line-clamp-2">
              {currentReel.caption}
            </p>

            {/* Audio track label */}
            <div className="flex items-center gap-1.5 text-[11px] text-white/80">
              <Music className="w-3.5 h-3.5 animate-spin" />
              <span className="truncate">{currentReel.audioTrack}</span>
            </div>
          </div>

          {/* Recipe Drawer Drawer Overlay */}
          {showRecipeDrawer && currentReel.recipe && (
            <div className="absolute inset-0 z-30 bg-stone-950/95 backdrop-blur-md p-5 text-white flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-base text-white">{currentReel.recipe.title}</h3>
                  </div>
                  <button 
                    onClick={() => setShowRecipeDrawer(false)}
                    className="p-1 text-white/70 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-xs text-amber-300 font-semibold">
                  Timing: {currentReel.recipe.prepTime}
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white/70 mb-2">Key Ingredients</h4>
                  <ul className="flex flex-col gap-1.5 text-xs">
                    {currentReel.recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0095F6]"></span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white/70 mb-2">Technique Steps</h4>
                  <ol className="flex flex-col gap-2 text-xs">
                    {currentReel.recipe.steps.map((st, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/80 leading-relaxed">
                        <span className="font-bold text-[#0095F6] shrink-0">{i + 1}.</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <button
                onClick={() => setShowRecipeDrawer(false)}
                className="w-full mt-4 py-2.5 rounded-xl bg-[#0095F6] text-white font-bold text-xs cursor-pointer hover:bg-[#1877F2]"
              >
                Back to Video Demonstration
              </button>
            </div>
          )}
        </div>

        {/* Up / Down Navigation Controls */}
        <div className="hidden sm:flex flex-col gap-2">
          <button 
            onClick={prevReel}
            disabled={currentIndex === 0}
            className="p-2.5 rounded-full bg-white border border-[#DBDBDB] hover:bg-gray-100 disabled:opacity-30 cursor-pointer transition-transform hover:scale-105"
            aria-label="Previous Reel"
          >
            <ChevronUp className="w-5 h-5 text-[#262626]" />
          </button>
          <button 
            onClick={nextReel}
            disabled={currentIndex === reels.length - 1}
            className="p-2.5 rounded-full bg-white border border-[#DBDBDB] hover:bg-gray-100 disabled:opacity-30 cursor-pointer transition-transform hover:scale-105"
            aria-label="Next Reel"
          >
            <ChevronDown className="w-5 h-5 text-[#262626]" />
          </button>
        </div>
      </div>
    </div>
  );
};
