import React, { useEffect, useState } from 'react';
import { X, Heart, MessageCircle, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { VerifiedBadge } from '../common/VerifiedBadge.tsx';

export const StoryModal: React.FC = () => {
  const { activeStory, setActiveStory, stories } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!activeStory) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Advance to next story or close
          const currentIndex = stories.findIndex(s => s.id === activeStory.id);
          if (currentIndex < stories.length - 1) {
            setActiveStory(stories[currentIndex + 1]);
          } else {
            setActiveStory(null);
          }
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStory, stories, setActiveStory]);

  if (!activeStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <button 
        onClick={() => setActiveStory(null)}
        className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-50 cursor-pointer"
        aria-label="Close Story"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="relative w-full max-w-[420px] h-[85vh] max-h-[720px] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Progress Bar */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1">
          <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-100 ease-linear rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Story Header */}
        <div className="relative z-30 p-4 pt-6 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-2.5">
            <img 
              src={activeStory.chefAvatar} 
              alt={activeStory.chefName} 
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-sm font-semibold">{activeStory.chefUsername}</span>
                <VerifiedBadge isMasterChef={activeStory.isMasterChef} size="sm" />
                <span className="text-white/60 text-xs">• {activeStory.timestamp}</span>
              </div>
              {activeStory.dishName && (
                <span className="text-white/80 text-xs truncate max-w-[200px]">{activeStory.dishName}</span>
              )}
            </div>
          </div>
        </div>

        {/* Media Background */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <img 
            src={activeStory.mediaUrl} 
            alt={activeStory.caption} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Story Footer & Caption */}
        <div className="relative z-30 p-4 pb-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-3">
          <p className="text-white text-sm font-normal drop-shadow-md leading-relaxed">
            {activeStory.caption}
          </p>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder={`Reply to ${activeStory.chefUsername}...`} 
                className="w-full bg-white/20 text-white placeholder-white/60 text-xs px-3 py-2 rounded-full border border-white/30 focus:outline-hidden focus:border-white"
              />
            </div>
            <button className="p-2 text-white hover:text-red-400 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-2 text-white hover:text-blue-400 transition-colors">
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
