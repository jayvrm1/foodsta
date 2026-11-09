import React, { useState } from 'react';
import { X, Heart, Send } from 'lucide-react';
import { Post } from '../../types/index.ts';
import { useApp } from '../../context/AppContext.tsx';
import { VerifiedBadge } from '../common/VerifiedBadge.tsx';

interface CommentModalProps {
  post: Post | null;
  onClose: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ post, onClose }) => {
  const { addCommentToPost, currentUser } = useApp();
  const [commentText, setCommentText] = useState('');

  if (!post) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addCommentToPost(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl overflow-hidden w-full max-w-[500px] max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="h-[50px] border-b border-[#DBDBDB] px-4 flex items-center justify-between">
          <span className="font-bold text-[14px] text-[#262626]">Comments</span>
          <button onClick={onClose} className="p-1 text-[#8E8E8E] hover:text-[#262626] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Caption & Comments List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
          {/* Post Author Caption */}
          <div className="flex items-start gap-3 pb-3 border-b border-[#EFEFEF]">
            <img 
              src={post.chefAvatar} 
              alt={post.chefName} 
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col text-[13px] leading-relaxed">
              <div>
                <span className="font-bold mr-1.5 text-[#262626]">{post.chefUsername}</span>
                <span className="text-[#262626]">{post.caption}</span>
              </div>
              <span className="text-[11px] text-[#8E8E8E] mt-1">{post.timestamp}</span>
            </div>
          </div>

          {/* Comments */}
          {post.comments.length === 0 ? (
            <div className="py-8 text-center text-[#8E8E8E] text-xs">
              No comments yet. Start the conversation!
            </div>
          ) : (
            post.comments.map(c => (
              <div key={c.id} className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img 
                    src={c.userAvatar} 
                    alt={c.username} 
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col text-[13px] leading-snug">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#262626]">{c.username}</span>
                      {c.isVerified && <VerifiedBadge size="sm" />}
                      {c.userTitle && <span className="text-[10px] text-[#8E8E8E]">({c.userTitle})</span>}
                    </div>
                    <span className="text-[#3F4752] mt-0.5">{c.content}</span>
                    <div className="flex items-center gap-3 text-[11px] text-[#8E8E8E] mt-1">
                      <span>{c.timestamp}</span>
                      {c.likesCount > 0 && <span>{c.likesCount} likes</span>}
                      <button className="font-semibold text-[#8E8E8E] hover:text-[#262626] cursor-pointer">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                <button className="text-[#8E8E8E] hover:text-[#ED4956] pt-1 cursor-pointer">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Input sticky footer */}
        <form onSubmit={handleSubmit} className="border-t border-[#DBDBDB] p-3 flex items-center gap-2 bg-[#FAFAFA]">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-7 h-7 rounded-full object-cover"
          />
          <input 
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={`Add a comment as ${currentUser.username}...`}
            className="flex-1 bg-white border border-[#DBDBDB] rounded-full px-3 py-1.5 text-xs text-[#262626] focus:outline-hidden focus:border-[#0095F6]"
          />
          <button 
            type="submit"
            disabled={!commentText.trim()}
            className="p-1.5 text-[#0095F6] disabled:opacity-40 hover:text-[#1877F2] cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
