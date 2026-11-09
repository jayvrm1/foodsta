import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, ChefHat } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

export const TopHeader: React.FC = () => {
  const { notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="md:hidden sticky top-0 z-30 bg-white border-b border-[#DBDBDB] h-[44px] px-4 flex items-center justify-between select-none">
      <Link to="/" className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center">
          <ChefHat className="w-4 h-4 text-white" />
        </div>
        <span className="font-extrabold tracking-tight text-lg text-[#262626] font-sans">
          FOODSTA
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Link to="/notifications" className="relative p-1.5 text-[#262626]">
          <Heart className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ED4956]"></span>
          )}
        </Link>
        <Link to="/messages" className="relative p-1.5 text-[#262626]">
          <MessageCircle className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#0095F6]"></span>
        </Link>
      </div>
    </header>
  );
};
