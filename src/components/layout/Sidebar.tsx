import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Compass, Film, Users, Swords, FlaskConical, 
  Trophy, Briefcase, Heart, MessageCircle, PlusSquare, 
  ChefHat
} from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { VerifiedBadge } from '../common/VerifiedBadge.tsx';

interface SidebarProps {
  onOpenCreatePost: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenCreatePost }) => {
  const { currentUser, notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Reels', path: '/reels', icon: Film },
    { name: 'Discover Chefs', path: '/chefs', icon: Users },
    { 
      name: 'Chef Battles', 
      path: '/battles', 
      icon: Swords, 
      highlight: true 
    },
    { 
      name: 'Flavour Lab', 
      path: '/flavour-lab', 
      icon: FlaskConical, 
      highlightBadge: 'Gastronomy' 
    },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Career Connect', path: '/career', icon: Briefcase },
    { 
      name: 'Notifications', 
      path: '/notifications', 
      icon: Heart, 
      badge: unreadCount > 0 ? unreadCount : undefined 
    },
    { name: 'Messages', path: '/messages', icon: MessageCircle, badge: 1 },
  ];

  return (
    <aside className="hidden md:flex fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-[#DBDBDB] flex-col justify-between py-6 px-3 lg:px-4 w-[72px] lg:w-[244px] transition-all select-none">
      <div className="flex flex-col gap-6">
        {/* Brand Logo & Wordmark */}
        <div className="px-2 lg:px-3 pt-2">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="font-extrabold tracking-tight text-xl leading-none font-sans text-[#262626]">
                FOODSTA
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-[#8E8E8E] mt-0.5">
                Global Culinary
              </span>
            </div>
          </NavLink>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  relative flex items-center gap-4 px-3 py-2.5 rounded-lg transition-colors group
                  ${isActive 
                    ? 'font-bold text-[#262626] bg-[#FAFAFA]' 
                    : 'text-[#262626] font-normal hover:bg-[#FAFAFA]'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="relative shrink-0 flex items-center justify-center">
                      <Icon className={`w-6 h-6 transition-transform group-hover:scale-105 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#ED4956] text-white text-[10px] font-bold flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="hidden lg:inline text-[14px] truncate">
                      {item.name}
                    </span>
                    {item.highlight && (
                      <span className="hidden lg:inline-block w-2 h-2 rounded-full bg-[#0095F6] animate-pulse"></span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Create Post Action Button */}
          <button
            onClick={onOpenCreatePost}
            className="flex items-center gap-4 px-3 py-2.5 rounded-lg transition-colors text-[#262626] hover:bg-[#FAFAFA] group text-left cursor-pointer"
          >
            <div className="shrink-0 flex items-center justify-center">
              <PlusSquare className="w-6 h-6 stroke-[1.75] group-hover:scale-105 transition-transform" />
            </div>
            <span className="hidden lg:inline text-[14px] font-medium truncate">
              Create
            </span>
          </button>
        </nav>
      </div>

      {/* User Profile Navigation */}
      <div className="pt-4 border-t border-[#EFEFEF] flex flex-col gap-2">
        <NavLink
          to={`/chef/${currentUser.id}`}
          className={({ isActive }) => `
            flex items-center gap-3 px-2 py-2 rounded-lg transition-colors
            ${isActive ? 'bg-[#FAFAFA] font-bold' : 'hover:bg-[#FAFAFA] font-medium'}
          `}
        >
          <div className="relative shrink-0">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-7 h-7 rounded-full object-cover border border-[#DBDBDB]"
            />
            {currentUser.isVerified && (
              <span className="absolute -bottom-1 -right-1">
                <VerifiedBadge isMasterChef={currentUser.isMasterChef} size="sm" />
              </span>
            )}
          </div>
          <div className="hidden lg:flex flex-col min-w-0 flex-1">
            <span className="text-[13px] text-[#262626] truncate leading-tight">
              {currentUser.username}
            </span>
            <span className="text-[11px] text-[#8E8E8E] truncate">
              {currentUser.title}
            </span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
