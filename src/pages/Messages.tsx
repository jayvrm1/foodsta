import React, { useState } from 'react';
import { Send, MessageCircle, MoreVertical, Search, CheckCheck } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { VerifiedBadge } from '../components/common/VerifiedBadge.tsx';

export const Messages: React.FC = () => {
  const { conversations, sendMessage, currentUser } = useApp();
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');

  const currentConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeConvId, inputText);
    setInputText('');
  };

  return (
    <div className="w-full max-w-[975px] mx-auto pt-4 pb-20 px-3 sm:px-4">
      <div className="bg-white border border-[#DBDBDB] rounded-2xl overflow-hidden shadow-xs h-[78vh] flex">
        {/* Left Conversations Rail (Width 320px) */}
        <div className="w-full sm:w-[320px] border-r border-[#DBDBDB] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#DBDBDB] flex items-center justify-between">
            <span className="font-extrabold text-sm text-[#262626]">{currentUser.username}</span>
            <span className="text-xs text-[#0095F6] font-semibold">Direct Chat</span>
          </div>

          {/* Conversations List */}
          <div className="overflow-y-auto flex-1 no-scrollbar divide-y divide-[#EFEFEF]">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full p-3.5 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                  activeConvId === conv.id ? 'bg-[#FAFAFA]' : 'hover:bg-gray-50'
                }`}
              >
                <img 
                  src={conv.participant.avatar} 
                  alt={conv.participant.name} 
                  className="w-11 h-11 rounded-full object-cover shrink-0 border border-[#DBDBDB]"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#262626] truncate">{conv.participant.name}</span>
                    <span className="text-[10px] text-[#8E8E8E]">{conv.timestamp}</span>
                  </div>
                  <span className="text-xs text-[#8E8E8E] truncate mt-0.5">{conv.lastMessage}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        {currentConv ? (
          <div className="hidden sm:flex flex-col flex-1 bg-[#FAFAFA]">
            {/* Header */}
            <div className="h-[60px] bg-white border-b border-[#DBDBDB] px-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={currentConv.participant.avatar} 
                  alt={currentConv.participant.name} 
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-[#262626]">{currentConv.participant.name}</span>
                    <VerifiedBadge size="sm" />
                  </div>
                  <span className="text-[11px] text-[#8E8E8E]">{currentConv.participant.restaurant}</span>
                </div>
              </div>
            </div>

            {/* Messages Scroll View */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 no-scrollbar">
              {currentConv.messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`flex flex-col max-w-[70%] ${msg.isSelf ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.isSelf 
                      ? 'bg-[#0095F6] text-white rounded-br-xs' 
                      : 'bg-white text-[#262626] border border-[#DBDBDB] rounded-bl-xs'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#8E8E8E] mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#DBDBDB] flex items-center gap-2">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${currentConv.participant.name}...`}
                className="flex-1 bg-[#FAFAFA] border border-[#DBDBDB] rounded-full px-4 py-2 text-xs text-[#262626] focus:outline-hidden focus:border-[#0095F6]"
              />
              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 bg-[#0095F6] text-white rounded-full hover:bg-[#1877F2] disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#8E8E8E] text-xs">
            Select a conversation to start messaging.
          </div>
        )}
      </div>
    </div>
  );
};
