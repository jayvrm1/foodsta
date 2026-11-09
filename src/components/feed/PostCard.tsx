import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal, 
  ChefHat, Sparkles, Flame, Check, Share2
} from 'lucide-react';
import { Post } from '../../types/index.ts';
import { useApp } from '../../context/AppContext.tsx';
import { VerifiedBadge } from '../common/VerifiedBadge.tsx';

interface PostCardProps {
  post: Post;
  onOpenComments?: () => void;
  onOpenShare?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onOpenComments,
  onOpenShare 
}) => {
  const { toggleLikePost, toggleSavePost, addCommentToPost, setActiveRecipeModal, recipes, toggleFollowChef, chefs } = useApp();
  const [commentText, setCommentText] = useState('');
  const [showMoreCaption, setShowMoreCaption] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const chef = chefs.find(c => c.id === post.chefId);
  const linkedRecipe = recipes.find(r => r.id === post.recipeId);

  const handleLike = () => {
    setHeartAnim(true);
    toggleLikePost(post.id);
    setTimeout(() => setHeartAnim(false), 300);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addCommentToPost(post.id, commentText);
    setCommentText('');
  };

  const handleShareClick = () => {
    if (onOpenShare) {
      onOpenShare();
    } else {
      navigator.clipboard?.writeText(window.location.origin + `/explore?post=${post.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <article className="bg-white border border-[#DBDBDB] rounded-xl overflow-hidden mb-5 text-[#262626] shadow-2xs">
      {/* 1. Header (Height 56px) */}
      <div className="h-[56px] px-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link to={`/chef/${post.chefId}`} className="shrink-0 relative">
            <img 
              src={post.chefAvatar} 
              alt={post.chefName} 
              className="w-8 h-8 rounded-full object-cover border border-[#DBDBDB]"
            />
            {post.isVerified && (
              <span className="absolute -bottom-1 -right-1">
                <VerifiedBadge isMasterChef={post.isMasterChef} size="sm" />
              </span>
            )}
          </Link>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <Link 
                to={`/chef/${post.chefId}`} 
                className="font-bold text-[13px] text-[#262626] hover:underline truncate"
              >
                {post.chefUsername}
              </Link>
              <span className="text-[#8E8E8E] text-[11px]">• {post.timestamp}</span>
              {chef && !chef.isFollowing && post.chefId !== 'chef-4' && (
                <>
                  <span className="text-[#8E8E8E] text-[11px]">•</span>
                  <button
                    onClick={() => toggleFollowChef(post.chefId)}
                    className="text-[#0095F6] hover:text-[#1877F2] text-[12px] font-bold cursor-pointer"
                  >
                    Follow
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[11px] text-[#8E8E8E] truncate">
                {post.locationTag || post.chefRestaurant}
              </span>
              {post.battleId && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  ⚔️ Battle Entry
                </span>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowOptionsModal(!showOptionsModal)}
          className="p-1.5 text-[#262626] hover:text-[#8E8E8E] cursor-pointer"
          aria-label="Post Options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Options Dropdown */}
      {showOptionsModal && (
        <div className="bg-[#FAFAFA] border-y border-[#EFEFEF] px-4 py-2 flex items-center justify-between text-xs">
          <span className="text-[#8E8E8E]">Post Options</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShareClick}
              className="text-[#0095F6] font-semibold hover:underline cursor-pointer"
            >
              {copiedLink ? 'Link Copied!' : 'Copy Link'}
            </button>
            {linkedRecipe && (
              <button 
                onClick={() => {
                  setActiveRecipeModal(linkedRecipe);
                  setShowOptionsModal(false);
                }}
                className="text-[#0095F6] font-semibold hover:underline cursor-pointer"
              >
                View Recipe Details
              </button>
            )}
            <button 
              onClick={() => setShowOptionsModal(false)}
              className="text-[#8E8E8E] hover:text-black cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 2. Media Canvas */}
      <div 
        onDoubleClick={handleLike}
        className="relative w-full aspect-square bg-[#FAFAFA] overflow-hidden flex items-center justify-center cursor-pointer select-none"
      >
        <img 
          src={post.imageUrl} 
          alt={post.caption} 
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Double-tap Heart burst */}
        {heartAnim && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping">
            <Heart className="w-24 h-24 fill-[#ED4956] text-[#ED4956] drop-shadow-lg" />
          </div>
        )}

        {/* Recipe Tag Badge on Media */}
        {linkedRecipe && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveRecipeModal(linkedRecipe);
            }}
            className="absolute bottom-3 left-3 bg-black/75 hover:bg-black/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <ChefHat className="w-3.5 h-3.5 text-amber-400" />
            <span>View Full Recipe</span>
          </button>
        )}

        {/* Nutrition preview pill */}
        {post.nutritionPreview && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#262626] px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-sm flex items-center gap-1 border border-white/50">
            <Flame className="w-3 h-3 text-orange-500" />
            <span>{post.nutritionPreview.calories} kcal</span>
            <span className="text-[#8E8E8E] font-normal">• {post.nutritionPreview.protein}g protein</span>
          </div>
        )}
      </div>

      {/* 3. Action Tray (Height 40px) */}
      <div className="px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className={`cursor-pointer transition-transform duration-150 ${heartAnim ? 'scale-125' : 'hover:opacity-60'}`}
            aria-label={post.isLiked ? "Unlike post" : "Like post"}
          >
            <Heart 
              className={`w-6 h-6 ${post.isLiked ? 'fill-[#ED4956] text-[#ED4956]' : 'text-[#262626]'}`} 
            />
          </button>

          <button 
            onClick={onOpenComments}
            className="text-[#262626] hover:opacity-60 cursor-pointer"
            aria-label="Comment on post"
          >
            <MessageCircle className="w-6 h-6 stroke-[1.75]" />
          </button>

          <button 
            onClick={handleShareClick}
            className="text-[#262626] hover:opacity-60 cursor-pointer"
            aria-label="Share post"
          >
            <Send className="w-6 h-6 stroke-[1.75]" />
          </button>
        </div>

        <button 
          onClick={() => toggleSavePost(post.id)}
          className="text-[#262626] hover:opacity-60 cursor-pointer"
          aria-label={post.isSaved ? "Unsave post" : "Save post"}
        >
          <Bookmark 
            className={`w-6 h-6 ${post.isSaved ? 'fill-[#262626] text-[#262626]' : 'text-[#262626] stroke-[1.75]'}`} 
          />
        </button>
      </div>

      {/* 4. Likes Count */}
      <div className="px-3.5 pb-1">
        <span className="font-bold text-[13px] text-[#262626]">
          {post.likesCount.toLocaleString()} likes
        </span>
      </div>

      {/* 5. Caption Block (Inline handle + body) */}
      <div className="px-3.5 text-[13px] leading-relaxed text-[#262626]">
        <Link to={`/chef/${post.chefId}`} className="font-bold mr-1.5 hover:underline">
          {post.chefUsername}
        </Link>
        <span>
          {showMoreCaption || post.caption.length <= 110 
            ? post.caption 
            : `${post.caption.slice(0, 110)}...`
          }
        </span>
        {post.caption.length > 110 && !showMoreCaption && (
          <button 
            onClick={() => setShowMoreCaption(true)}
            className="text-[#8E8E8E] ml-1 font-medium hover:underline cursor-pointer"
          >
            more
          </button>
        )}

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1 text-[#00376B] text-[12px]">
            {post.hashtags.map((tag, idx) => (
              <span key={idx} className="hover:underline cursor-pointer">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* 6. Comments Summary */}
      {post.commentsCount > 0 && (
        <div className="px-3.5 pt-1">
          <button 
            onClick={onOpenComments}
            className="text-[#8E8E8E] text-[12px] hover:underline cursor-pointer"
          >
            View all {post.commentsCount} comments
          </button>
        </div>
      )}

      {/* Top 1 preview comment */}
      {post.comments.length > 0 && (
        <div className="px-3.5 pt-1 text-[12px]">
          <span className="font-semibold mr-1.5 text-[#262626]">{post.comments[0].username}</span>
          <span className="text-[#3F4752]">{post.comments[0].content}</span>
        </div>
      )}

      {/* 7. Inline Sticky Footer Comment Input */}
      <form onSubmit={handlePostComment} className="mt-2.5 border-t border-[#EFEFEF] px-3.5 py-2.5 flex items-center gap-2">
        <input 
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a culinary critique or comment..."
          className="flex-1 bg-transparent text-[13px] text-[#262626] placeholder-[#8E8E8E] focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={!commentText.trim()}
          className={`text-[13px] font-bold transition-opacity cursor-pointer ${
            commentText.trim() 
              ? 'text-[#0095F6] hover:text-[#1877F2] opacity-100' 
              : 'text-[#0095F6] opacity-40 cursor-not-allowed'
          }`}
        >
          Post
        </button>
      </form>
    </article>
  );
};
