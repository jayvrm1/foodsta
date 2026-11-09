import React, { useState } from 'react';
import { X, Award, CheckCircle, Scale } from 'lucide-react';
import { BattleSubmission } from '../../types/index.ts';
import { useApp } from '../../context/AppContext.tsx';
import { calculateJudgeScore } from '../../services/gastronomyLogic.ts';

interface JudgeEvaluationModalProps {
  battleId: string;
  submission: BattleSubmission;
  onClose: () => void;
}

export const JudgeEvaluationModal: React.FC<JudgeEvaluationModalProps> = ({
  battleId,
  submission,
  onClose
}) => {
  const { evaluateSubmissionAsJudge, currentUser } = useApp();

  const [scores, setScores] = useState({
    creativity: 92,
    tasteAndFlavor: 95,
    presentation: 94,
    cookingTechnique: 90,
    ingredientUtilisation: 90
  });

  const [feedback, setFeedback] = useState(
    'Sensational harmony of textures. The interplay of roasted aromatic notes and crispness kinetics demonstrates world-class mastery.'
  );

  const compositeScore = calculateJudgeScore(scores);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    evaluateSubmissionAsJudge(battleId, submission.id, scores, feedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="h-[56px] border-b border-[#DBDBDB] px-6 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-extrabold text-sm sm:text-base">
              Expert Judging Dashboard
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-white/70 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 no-scrollbar text-xs">
          {/* Target Dish Preview */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-[#FAFAFA] border border-[#DBDBDB] mb-5">
            <img 
              src={submission.imageUrl} 
              alt={submission.dishName} 
              className="w-16 h-16 rounded-lg object-cover border border-[#DBDBDB]"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#8E8E8E]">Evaluating Submission</span>
              <span className="font-bold text-sm text-[#262626] truncate">{submission.dishName}</span>
              <span className="text-[#8E8E8E]">By {submission.chefName} • {submission.chefRestaurant}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Real-time composite score HUD */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-4 flex items-center justify-between shadow-md">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase font-bold tracking-wider text-blue-200">
                  Calculated Composite Score
                </span>
                <span className="text-3xl font-black">
                  {compositeScore} <span className="text-sm font-normal text-blue-200">/ 100</span>
                </span>
              </div>
              <div className="text-right text-[11px] text-blue-100 max-w-[160px] leading-tight">
                Official FOODSTA 5-point weighted algorithm
              </div>
            </div>

            {/* Criteria 1: Creativity (25%) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#262626]">1. Creativity & Innovation (25%)</span>
                <span className="font-bold text-[#0095F6]">{scores.creativity}/100</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={scores.creativity}
                onChange={(e) => setScores({ ...scores, creativity: Number(e.target.value) })}
                className="w-full accent-[#0095F6]"
              />
            </div>

            {/* Criteria 2: Taste & Flavour (25%) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#262626]">2. Taste & Flavour Balance (25%)</span>
                <span className="font-bold text-[#0095F6]">{scores.tasteAndFlavor}/100</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={scores.tasteAndFlavor}
                onChange={(e) => setScores({ ...scores, tasteAndFlavor: Number(e.target.value) })}
                className="w-full accent-[#0095F6]"
              />
            </div>

            {/* Criteria 3: Presentation (20%) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#262626]">3. Presentation & Plating (20%)</span>
                <span className="font-bold text-[#0095F6]">{scores.presentation}/100</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={scores.presentation}
                onChange={(e) => setScores({ ...scores, presentation: Number(e.target.value) })}
                className="w-full accent-[#0095F6]"
              />
            </div>

            {/* Criteria 4: Cooking Technique (20%) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#262626]">4. Cooking Technique & Execution (20%)</span>
                <span className="font-bold text-[#0095F6]">{scores.cookingTechnique}/100</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={scores.cookingTechnique}
                onChange={(e) => setScores({ ...scores, cookingTechnique: Number(e.target.value) })}
                className="w-full accent-[#0095F6]"
              />
            </div>

            {/* Criteria 5: Ingredient Utilisation (10%) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#262626]">5. Ingredient Utilisation (10%)</span>
                <span className="font-bold text-[#0095F6]">{scores.ingredientUtilisation}/100</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={scores.ingredientUtilisation}
                onChange={(e) => setScores({ ...scores, ingredientUtilisation: Number(e.target.value) })}
                className="w-full accent-[#0095F6]"
              />
            </div>

            {/* Written Judge Feedback */}
            <div>
              <label className="font-bold text-[#262626] block mb-1">Official Written Critique *</label>
              <textarea 
                rows={3}
                required
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide constructive, professional critique regarding balance, texture, temperature, and innovation."
                className="w-full border border-[#DBDBDB] rounded-lg p-2.5 text-xs focus:outline-hidden focus:border-[#0095F6]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#DBDBDB]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#8E8E8E] hover:text-[#262626] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#0095F6] hover:bg-[#1877F2] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Official Judge Evaluation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
