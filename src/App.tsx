import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Sidebar } from './components/layout/Sidebar.tsx';
import { MobileNav } from './components/layout/MobileNav.tsx';
import { TopHeader } from './components/layout/TopHeader.tsx';
import { StoryModal } from './components/feed/StoryModal.tsx';
import { RecipeDetailModal } from './components/recipes/RecipeDetailModal.tsx';
import { CreatePostModal } from './components/CreatePostModal.tsx';

// Pages
import { Home } from './pages/Home.tsx';
import { Explore } from './pages/Explore.tsx';
import { Reels } from './pages/Reels.tsx';
import { DiscoverChefs } from './pages/DiscoverChefs.tsx';
import { ChefBattles } from './pages/ChefBattles.tsx';
import { FlavourLab } from './pages/FlavourLab.tsx';
import { Leaderboard } from './pages/Leaderboard.tsx';
import { CareerConnect } from './pages/CareerConnect.tsx';
import { ChefProfile } from './pages/ChefProfile.tsx';
import { Notifications } from './pages/Notifications.tsx';
import { Messages } from './pages/Messages.tsx';

const AppLayout: React.FC = () => {
  const { 
    isCreatePostOpen, 
    setIsCreatePostOpen, 
    activeRecipeModal, 
    setActiveRecipeModal 
  } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row font-sans text-[#262626]">
      {/* Mobile Top Header (Height 44px) */}
      <TopHeader />

      {/* Desktop & Tablet Sidebar (244px on desktop, 72px on tablet) */}
      <Sidebar onOpenCreatePost={() => setIsCreatePostOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-[72px] lg:pl-[244px] min-h-screen flex flex-col overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/chefs" element={<DiscoverChefs />} />
          <Route path="/battles" element={<ChefBattles />} />
          <Route path="/flavour-lab" element={<FlavourLab />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/career" element={<CareerConnect />} />
          <Route path="/chef/:id" element={<ChefProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>

      {/* Mobile Bottom Navigation (Height 48px) */}
      <MobileNav onOpenCreatePost={() => setIsCreatePostOpen(true)} />

      {/* Global Modals */}
      <StoryModal />
      <RecipeDetailModal 
        recipe={activeRecipeModal} 
        onClose={() => setActiveRecipeModal(null)} 
      />
      <CreatePostModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
