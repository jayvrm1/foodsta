import React from 'react';
import { 
  Heart, MessageCircle, UserPlus, Trophy, 
  Briefcase, Award, CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-[#ED4956] fill-[#ED4956]" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-[#0095F6]" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-emerald-600" />;
      case 'battle_result':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'judge_score':
        return <Award className="w-4 h-4 text-indigo-600" />;
      case 'career_inquiry':
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
      default:
        return <Heart className="w-4 h-4 text-[#ED4956]" />;
    }
  };

  return (
    <div className="w-full max-w-[640px] mx-auto pt-4 pb-20 px-3 sm:px-4">
      <div className="bg-white border border-[#DBDBDB] rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-[#DBDBDB] flex items-center justify-between">
          <h1 className="text-base font-extrabold text-[#262626]">Notifications</h1>
          <span className="text-xs text-[#8E8E8E]">All Activities</span>
        </div>

        <div className="divide-y divide-[#EFEFEF]">
          {notifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-4 flex items-start gap-3.5 hover:bg-[#FAFAFA] transition-colors cursor-pointer ${
                !notif.isRead ? 'bg-blue-50/40' : ''
              }`}
            >
              <div className="relative shrink-0">
                <img 
                  src={notif.actorAvatar} 
                  alt={notif.actorName} 
                  className="w-10 h-10 rounded-full object-cover border border-[#DBDBDB]"
                />
                <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white shadow-xs">
                  {getIcon(notif.type)}
                </span>
              </div>

              <div className="flex-1 min-w-0 text-xs leading-relaxed text-[#262626]">
                <span className="font-bold mr-1">{notif.actorName}</span>
                <span>{notif.content}</span>
                <span className="text-[11px] text-[#8E8E8E] block mt-1">{notif.timestamp}</span>
              </div>

              {!notif.isRead && (
                <span className="w-2 h-2 rounded-full bg-[#0095F6] mt-2 shrink-0"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
