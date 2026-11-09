import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Story } from '../../types/index.ts';

export const StoryRail: React.FC = () => {
  const { stories, setActiveStory, currentUser } = useApp();

  return (
    <div className="bg-white border border-[#DBDBDB] rounded-xl p-3 mb-6 overflow-x-auto no-scrollbar shadow-2xs">
      <div className="flex items-center gap-4 min-w-max">
        {/* Your Story item */}
        <div 
          onClick={() => {
            const firstStory = stories[0];
            if (firstStory) setActiveStory(firstStory);
          }}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className="relative p-0.5 rounded-full ring-2 ring-gray-200">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-14 h-14 rounded-full object-cover border-2 border-white group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#0095F6] text-white rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white">
              +
            </span>
          </div>
          <span className="text-[11px] text-[#262626] font-medium truncate max-w-[64px]">
            Your Story
          </span>
        </div>

        {/* Other Chef Stories */}
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className={`p-0.5 rounded-full ${
              story.isMasterChef 
                ? 'chef-ring-gradient' 
                : story.hasUnread 
                  ? 'story-ring-gradient' 
                  : 'ring-1 ring-gray-300'
            }`}>
              <div className="p-0.5 bg-white rounded-full">
                <img 
                  src={story.chefAvatar} 
                  alt={story.chefName} 
                  className="w-14 h-14 rounded-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <span className="text-[11px] text-[#262626] font-medium truncate max-w-[64px]">
              {story.chefUsername.length > 8 ? `${story.chefUsername.slice(0, 8)}…` : story.chefUsername}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
