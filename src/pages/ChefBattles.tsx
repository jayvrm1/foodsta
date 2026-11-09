import React, { useState } from 'react';
import { 
  Swords, Trophy, Clock, Award, Users, PlusCircle, 
  Sparkles, CheckCircle2, ChevronRight, Star, Heart, 
  Flame, Filter, Scale
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Competition, BattleSubmission } from '../types/index.ts';
import { SubmitDishModal } from '../components/battles/SubmitDishModal.tsx';
import { JudgeEvaluationModal } from '../components/battles/JudgeEvaluationModal.tsx';
import { VerifiedBadge } from '../components/common/VerifiedBadge.tsx';

export const ChefBattles: React.FC = () => {
  const { 
    competitions, 
    voteSubmission, 
    currentUser, 
    setActiveRecipeModal,
    activeBattleSubmitId,
    setActiveBattleSubmitId,
    activeJudgeSubmission,
    setActiveJudgeSubmission
  } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [selectedBattleId, setSelectedBattleId] = useState<string>(competitions[0]?.id || 'battle-mushroom');
  const [isJudgeMode, setIsJudgeMode] = useState(false);

  const currentBattle = competitions.find(c => c.id === selectedBattleId) || competitions[0];
  const filteredBattles = competitions.filter(c => c.status === activeTab);

  return (
    <div className="w-full max-w-[1020px] mx-auto pt-4 pb-20 px-3 sm:px-4">
      {/* Header Banner */}
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-900 via-sky-900 to-indigo-950 text-white p-6 sm:p-8 mb-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0095F6] text-white">
              <Swords className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-sky-300">
              Global Culinary Competition System
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            CHEF BATTLES
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
            Where world-class chefs compete through original dishes, computational gastronomy (FlavorDB & RecipeDB), and rigorous blind judging by 3-star Michelin masters.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveBattleSubmitId(currentBattle.id)}
              className="px-5 py-2.5 rounded-xl bg-[#0095F6] hover:bg-[#1877F2] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Original Dish</span>
            </button>

            {/* Judge Mode Switch */}
            <button
              onClick={() => setIsJudgeMode(!isJudgeMode)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                isJudgeMode 
                  ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md' 
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isJudgeMode ? 'Active: Judge Mode' : 'Toggle Judge Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Active, Upcoming, Completed */}
      <div className="flex items-center justify-between border-b border-[#DBDBDB] mb-6">
        <div className="flex gap-6 text-sm font-semibold">
          {[
            { id: 'active', label: 'Active Battles', count: competitions.filter(c => c.status === 'active').length },
            { id: 'upcoming', label: 'Upcoming', count: competitions.filter(c => c.status === 'upcoming').length },
            { id: 'completed', label: 'Hall of Fame (Completed)', count: competitions.filter(c => c.status === 'completed').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                const first = competitions.find(c => c.status === tab.id);
                if (first) setSelectedBattleId(first.id);
              }}
              className={`pb-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id 
                  ? 'border-[#0095F6] text-[#0095F6] font-bold' 
                  : 'border-transparent text-[#8E8E8E] hover:text-[#262626]'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-gray-100 text-[#8E8E8E]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Competition Selectors List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {filteredBattles.map(battle => (
          <div
            key={battle.id}
            onClick={() => setSelectedBattleId(battle.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedBattleId === battle.id 
                ? 'bg-blue-50/50 border-[#0095F6] ring-1 ring-[#0095F6]' 
                : 'bg-white border-[#DBDBDB] hover:border-gray-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  battle.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : battle.status === 'upcoming' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-stone-100 text-stone-700'
                }`}>
                  {battle.status}
                </span>
                <span className="text-xs text-[#8E8E8E] flex items-center gap-1">
                  <Users className="w-3 h-3" /> {battle.participantsCount} Chefs
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#262626] leading-tight mb-1">
                {battle.title}
              </h3>
              <p className="text-xs text-[#8E8E8E] line-clamp-2">
                {battle.theme}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-600">{battle.prizePool}</span>
              <span className="text-[11px] text-[#8E8E8E]">{battle.submissionDeadline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Battle Main Details Card */}
      {currentBattle && (
        <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6 mb-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0095F6]">
                Challenge Theme & Brief
              </span>
              <h2 className="text-2xl font-extrabold text-[#262626]">
                {currentBattle.title}
              </h2>
              <p className="text-sm text-[#3F4752] leading-relaxed">
                {currentBattle.description}
              </p>

              {/* Required Ingredients */}
              <div className="bg-[#FAFAFA] border border-[#DBDBDB] rounded-xl p-3.5 mt-2">
                <span className="font-bold text-xs text-[#262626] block mb-2">
                  Required Ingredients & Volatile Markers:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentBattle.requiredIngredients.map((ing, i) => (
                    <span key={i} className="text-xs bg-white border border-[#DBDBDB] px-3 py-1 rounded-full font-medium text-[#262626]">
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Official Rules */}
              <div className="flex flex-col gap-1.5 text-xs text-[#3F4752] mt-2">
                <span className="font-bold text-[#262626]">Competition Rules & Criteria:</span>
                <ul className="list-disc pl-4 space-y-1 text-[#8E8E8E]">
                  {currentBattle.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Judges & Prizes */}
            <div className="flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-[#DBDBDB] pt-4 lg:pt-0 lg:pl-6">
              {/* Prize Summary */}
              <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase mb-1">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Prizes & Recognition</span>
                </div>
                <div className="text-lg font-black text-amber-950 mb-1">{currentBattle.prizePool}</div>
                <p className="text-xs text-amber-900 leading-snug">
                  1st: {currentBattle.prizeFirst}
                </p>
              </div>

              {/* Expert Judges Panel */}
              <div>
                <span className="text-xs font-bold text-[#262626] block mb-2">
                  Official Expert Judging Panel
                </span>
                <div className="flex flex-col gap-2">
                  {currentBattle.judges.map(judge => (
                    <div key={judge.id} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAFAFA] border border-[#EFEFEF]">
                      <img src={judge.avatar} alt={judge.name} className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs text-[#262626] truncate">{judge.name}</span>
                        <span className="text-[10px] text-[#8E8E8E] truncate">{judge.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submissions Gallery Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[#262626]">
              Submissions & Standings ({currentBattle.submissions.length})
            </h3>
            <p className="text-xs text-[#8E8E8E]">
              Evaluated with RecipeDB & FlavorDB computational compound overlap
            </p>
          </div>

          <button
            onClick={() => setActiveBattleSubmitId(currentBattle.id)}
            className="px-4 py-2 rounded-lg bg-[#0095F6] text-white font-bold text-xs hover:bg-[#1877F2] cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Your Dish</span>
          </button>
        </div>

        {/* Submissions Cards */}
        {currentBattle.submissions.length === 0 ? (
          <div className="bg-white border border-[#DBDBDB] rounded-xl p-8 text-center text-[#8E8E8E] text-sm">
            No submissions yet for this competition. Be the first chef to submit!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentBattle.submissions.map(sub => (
              <div 
                key={sub.id}
                className="bg-white border border-[#DBDBDB] rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative w-full h-48 bg-stone-900">
                    <img 
                      src={sub.imageUrl} 
                      alt={sub.dishName} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-black shadow-md">
                        #{sub.finalRank || 1} Rank
                      </span>
                      {sub.expertCompositeScore && (
                        <span className="px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-xs font-bold shadow-md">
                          Judge: {sub.expertCompositeScore}/100
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submission Info */}
                  <div className="p-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={sub.chefAvatar} 
                          alt={sub.chefName} 
                          className="w-7 h-7 rounded-full object-cover border border-[#DBDBDB]"
                        />
                        <div className="flex flex-col leading-tight">
                          <span className="font-bold text-xs text-[#262626]">{sub.chefName}</span>
                          <span className="text-[10px] text-[#8E8E8E]">{sub.chefRestaurant}</span>
                        </div>
                      </div>

                      {/* Community Vote Button */}
                      <button
                        onClick={() => voteSubmission(currentBattle.id, sub.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          sub.hasVoted 
                            ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                            : 'bg-gray-100 hover:bg-gray-200 text-[#262626]'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${sub.hasVoted ? 'fill-rose-600' : ''}`} />
                        <span>{sub.communityVotes} Votes</span>
                      </button>
                    </div>

                    <h4 className="font-extrabold text-sm text-[#262626] leading-tight">
                      {sub.dishName}
                    </h4>

                    <p className="text-xs text-[#3F4752] line-clamp-2 leading-relaxed">
                      {sub.inspiration}
                    </p>

                    {/* Computational Gastronomy Insights */}
                    <div className="bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg p-2.5 flex items-center justify-between text-xs">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-[#8E8E8E]">RecipeDB Synergy</span>
                        <span className="font-bold text-[#0095F6]">{sub.recipeDbSynergyIndex}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-[#8E8E8E]">FlavorDB Compounds</span>
                        <span className="font-bold text-emerald-600">{sub.flavorDbPairingScore}% Match</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] uppercase font-bold text-[#8E8E8E]">Time</span>
                        <span className="font-medium text-[#262626]">{sub.cookingTimeMinutes}m</span>
                      </div>
                    </div>

                    {/* Identified Aromatic Volatiles */}
                    <div className="flex flex-wrap gap-1">
                      {sub.flavorCompoundsIdentified.map((comp, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-100">
                          {comp}
                        </span>
                      ))}
                    </div>

                    {/* Judge Feedback Snippet */}
                    {sub.judgeEvaluations && sub.judgeEvaluations.length > 0 && (
                      <div className="border-t border-[#EFEFEF] pt-2 text-xs">
                        <span className="font-bold text-[#262626] text-[11px] block">
                          Judge Critique ({sub.judgeEvaluations[0].judgeName}):
                        </span>
                        <p className="italic text-[#8E8E8E] text-[11px] line-clamp-2 mt-0.5">
                          "{sub.judgeEvaluations[0].writtenFeedback}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action: Judge Scoring Trigger */}
                <div className="p-4 pt-0">
                  {isJudgeMode ? (
                    <button
                      onClick={() => setActiveJudgeSubmission({ battleId: currentBattle.id, submission: sub })}
                      className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Award className="w-4 h-4" />
                      <span>Evaluate as Verified Judge</span>
                    </button>
                  ) : (
                    <div className="text-[11px] text-center text-[#8E8E8E] pt-2 border-t border-[#EFEFEF]">
                      Official Foodsta Competition Entry
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {activeBattleSubmitId && (
        <SubmitDishModal 
          battleId={activeBattleSubmitId} 
          onClose={() => setActiveBattleSubmitId(null)} 
        />
      )}

      {activeJudgeSubmission && (
        <JudgeEvaluationModal 
          battleId={activeJudgeSubmission.battleId}
          submission={activeJudgeSubmission.submission}
          onClose={() => setActiveJudgeSubmission(null)}
        />
      )}
    </div>
  );
};
