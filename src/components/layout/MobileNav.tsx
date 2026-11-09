import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Film, Swords, PlusSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

interface MobileNavProps {
  onOpenCreatePost: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenCreatePost }) => {
  const { currentUser } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#DBDBDB] h-[48px] px-4 flex items-center justify-around select-none">
      <NavLink 
        to="/" 
        className={({ isActive }) => `p-2 ${isActive ? 'text-black' : 'text-[#8E8E8E]'}`}
      >
        <Home className="w-6 h-6" />
      </NavLink>

      <NavLink 
        to="/explore" 
        className={({ isActive }) => `p-2 ${isActive ? 'text-black' : 'text-[#8E8E8E]'}`}
      >
        <Compass className="w-6 h-6" />
      </NavLink>

      <button 
        onClick={onOpenCreatePost} 
        className="p-2 text-black cursor-pointer"
        aria-label="Create Post"
      >
        <PlusSquare className="w-6 h-6" />
      </button>

      <NavLink 
        to="/battles" 
        className={({ isActive }) => `p-2 relative ${isActive ? 'text-[#0095F6]' : 'text-[#8E8E8E]'}`}
      >
        <Swords className="w-6 h-6" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0095F6]"></span>
      </NavLink>

      <NavLink 
        to="/reels" 
        className={({ isActive }) => `p-2 ${isActive ? 'text-black' : 'text-[#8E8E8E]'}`}
      >
        <Film className="w-6 h-6" />
      </NavLink>

      <NavLink 
        to={`/chef/${currentUser.id}`} 
        className="p-1"
      >
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          className="w-6 h-6 rounded-full object-cover border border-[#DBDBDB]"
        />
      </NavLink>
    </nav>
  );
};
