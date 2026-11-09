import React, { useState } from 'react';
import { 
  Briefcase, Building2, MapPin, DollarSign, Award, 
  CheckCircle2, Send, ExternalLink, ChevronRight, X, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { RESTAURANTS } from '../data/restaurants.ts';
import { JobPosition } from '../types/index.ts';

export const CareerConnect: React.FC = () => {
  const { jobs, applyToJob, currentUser } = useApp();
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [filterRole, setFilterRole] = useState<string>('All');

  const filteredJobs = jobs.filter(j => {
    if (filterRole === 'All') return true;
    if (filterRole === 'Sous Chef') return j.title.toLowerCase().includes('sous');
    if (filterRole === 'Pastry') return j.title.toLowerCase().includes('pastry');
    if (filterRole === 'Fine Dining') return (j.michelinStars || 0) > 0;
    return true;
  });

  return (
    <div className="w-full max-w-[1020px] mx-auto pt-4 pb-20 px-3 sm:px-4">
      {/* Header Banner */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white p-6 sm:p-8 mb-6 shadow-md">
        <div className="max-w-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500 text-stone-950 font-bold">
              <Briefcase className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-300">
              Global Hospitality Talent & Executive Search
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            CAREER CONNECT
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Connecting world-renowned culinary establishments with verified chefs based on actual competition performance, Battle medals, and culinary technique depth.
          </p>

          <p className="text-[11px] text-emerald-300/80 mt-1">
            * Note: Career Connect facilitates verified professional introductions; employment decisions are subject to formal brigade tastings and employer contracts.
          </p>
        </div>
      </div>

      {/* Featured Employers Carousel / Grid */}
      <div className="mb-8">
        <h3 className="font-bold text-sm text-[#262626] mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#0095F6]" />
          <span>Premier Partner Restaurants & Palaces ({RESTAURANTS.length})</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {RESTAURANTS.slice(0, 4).map(rest => (
            <div key={rest.id} className="bg-white border border-[#DBDBDB] rounded-xl p-3 flex flex-col gap-2 shadow-2xs">
              <img src={rest.logo} alt={rest.name} className="w-10 h-10 rounded-lg object-cover border border-[#DBDBDB]" />
              <div className="flex flex-col">
                <span className="font-bold text-xs text-[#262626] truncate">{rest.name}</span>
                <span className="text-[10px] text-[#8E8E8E] truncate">{rest.location}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit">
                {rest.openPositionsCount} Positions Open
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Job Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {['All', 'Sous Chef', 'Pastry', 'Fine Dining'].map(role => (
          <button
            key={role}
            onClick={() => setFilterRole(role)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filterRole === role 
                ? 'bg-[#0095F6] text-white' 
                : 'bg-white border border-[#DBDBDB] text-[#262626] hover:bg-gray-100'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Open Positions List */}
      <div className="flex flex-col gap-3">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="bg-white border border-[#DBDBDB] rounded-xl p-5 hover:border-[#0095F6] transition-all cursor-pointer shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-start gap-4">
              <img 
                src={job.restaurantLogo} 
                alt={job.restaurantName} 
                className="w-12 h-12 rounded-xl object-cover border border-[#DBDBDB] shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[#262626] group-hover:text-[#0095F6]">
                    {job.title}
                  </span>
                  {job.michelinStars && (
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                      ★ {job.michelinStars} Michelin
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold text-[#8E8E8E] mt-0.5">
                  {job.restaurantName} • {job.restaurantLocation}
                </span>

                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#3F4752]">
                  <span className="font-bold text-emerald-700">{job.salaryRange}</span>
                  <span>•</span>
                  <span>{job.employmentType}</span>
                  <span>•</span>
                  <span>Posted {job.postedDate}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  applyToJob(job.id);
                }}
                disabled={job.isApplied}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  job.isApplied 
                    ? 'bg-emerald-100 text-emerald-800 cursor-default' 
                    : 'bg-[#0095F6] hover:bg-[#1877F2] text-white shadow-xs'
                }`}
              >
                {job.isApplied ? '✓ Application Submitted' : '1-Click Apply with Portfolio'}
              </button>
              <span className="text-[10px] text-[#8E8E8E] flex items-center gap-1">
                View Requirements <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-[#DBDBDB] flex items-start justify-between bg-[#FAFAFA]">
              <div className="flex items-center gap-3">
                <img src={selectedJob.restaurantLogo} alt={selectedJob.restaurantName} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex flex-col">
                  <h3 className="font-extrabold text-base text-[#262626]">{selectedJob.title}</h3>
                  <span className="text-xs text-[#8E8E8E]">{selectedJob.restaurantName} • {selectedJob.restaurantLocation}</span>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-1 text-[#8E8E8E] hover:text-[#262626] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 no-scrollbar text-xs flex flex-col gap-4">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#0095F6] text-sm block">{selectedJob.salaryRange}</span>
                  <span className="text-[11px] text-[#8E8E8E]">Employment: {selectedJob.employmentType}</span>
                </div>
                <button
                  onClick={() => applyToJob(selectedJob.id)}
                  disabled={selectedJob.isApplied}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedJob.isApplied 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-[#0095F6] text-white hover:bg-[#1877F2]'
                  }`}
                >
                  {selectedJob.isApplied ? 'Applied ✓' : 'Submit My Foodsta Portfolio'}
                </button>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#262626] mb-1">Role Description</h4>
                <p className="text-[#3F4752] leading-relaxed">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#262626] mb-1">Brigade Requirements</h4>
                <ul className="list-disc pl-4 space-y-1 text-[#3F4752]">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#262626] mb-1">Culinary Perks & Relocation</h4>
                <ul className="list-disc pl-4 space-y-1 text-[#3F4752]">
                  {selectedJob.perks.map((perk, i) => (
                    <li key={i}>{perk}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAFAFA] border border-[#DBDBDB] rounded-xl p-3 text-[11px] text-[#8E8E8E]">
                <strong>Foodsta Verified Portfolio Includes:</strong> Your active certifications, {currentUser.battlesWon} Battle Medals, {currentUser.postsCount} published recipe breakdowns, and your verified expert sensory rating ({currentUser.expertRating}/5.0).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
