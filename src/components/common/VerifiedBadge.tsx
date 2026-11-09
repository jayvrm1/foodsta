import React from 'react';
import { Award, Check } from 'lucide-react';

interface VerifiedBadgeProps {
  isMasterChef?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ isMasterChef = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5 text-[9px]',
    md: 'w-4 h-4 text-[10px]',
    lg: 'w-5 h-5 text-xs'
  }[size];

  if (isMasterChef) {
    return (
      <span 
        title="Verified Master Chef • Gold Tier" 
        className={`inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-stone-900 shadow-xs font-bold ${sizeClasses}`}
      >
        <Award className="w-2.5 h-2.5" />
      </span>
    );
  }

  return (
    <span 
      title="Verified Culinary Professional" 
      className={`inline-flex items-center justify-center rounded-full bg-[#0095F6] text-white font-bold ${sizeClasses}`}
    >
      <Check className="w-2.5 h-2.5 stroke-[3]" />
    </span>
  );
};
