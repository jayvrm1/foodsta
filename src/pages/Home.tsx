import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { StoryRail } from '../components/feed/StoryRail.tsx';
import { PostCard } from '../components/feed/PostCard.tsx';
import { RightSidebar } from '../components/layout/RightSidebar.tsx';
import { CommentModal } from '../components/feed/CommentModal.tsx';
import { Post } from '../types/index.ts';

export const Home: React.FC = () => {
  const { posts } = useApp();
  const [activeCommentPost, setActiveCommentPost] = useState<Post | null>(null);

  return (
    <div className="w-full max-w-[975px] mx-auto flex justify-center gap-8 pt-4 pb-16 px-2 sm:px-4">
      {/* Central Feed Column (max-w 470px on desktop) */}
      <main className="w-full max-w-[470px] flex flex-col shrink-0">
        <StoryRail />

        <div className="flex flex-col">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post}
              onOpenComments={() => setActiveCommentPost(post)}
            />
          ))}
        </div>
      </main>

      {/* Right Discovery & Profile Column (Fixed 320px, visible on viewport > 1200px) */}
      <RightSidebar />

      {/* Comment Drawer Modal */}
      <CommentModal 
        post={activeCommentPost} 
        onClose={() => setActiveCommentPost(null)} 
      />
    </div>
  );
};
