import React from 'react';
import Icon from '@hackclub/icons';
import { PageId } from '../types';

interface TeamSectionProps {
  onNavigate: (page: PageId) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onNavigate }) => {
  return (
    <section id="team" className="py-6 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
        <div className="font-mono text-xs font-bold text-[#EC3750] mb-2 uppercase tracking-wider">
          <span>// RUN BY STUDENTS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-3 font-semibold font-display">
          The team
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
          No staff, no teachers, no management. Just students who book the
          room, lug the parts bin, and stay late until everyone&rsquo;s build
          works.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 max-w-4xl">
        {/* Chapter leader */}
        <div className="md:col-span-3 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181822] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-6">
            <img
              src="/vishal.jpg"
              alt="Vishal Jadhav"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shrink-0 border border-slate-200 dark:border-white/10 ring-2 ring-[#EC3750]/30"
            />
            <div>
              <h2 className="font-accent font-medium text-2xl text-slate-900 dark:text-white leading-tight">
                Vishal Jadhav
              </h2>
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#EC3750] mt-1.5 mb-4">
                Leader
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Vishal is 15 and started the Nagpur chapter. He does backend
                and web dev, a bit of designing, and runs the build nights —
                venue, parts bin, and Slack questions included.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-5">
                <a
                  href="https://github.com/yupskew"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-[#EC3750] dark:hover:text-white transition-colors"
                >
                  <Icon glyph="github" size={15} />
                  <span>yupskew</span>
                </a>
                <a
                  href="https://www.instagram.com/n0t_vishal/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-[#EC3750] dark:hover:text-white transition-colors"
                >
                  <Icon glyph="instagram" size={15} />
                  <span>n0t_vishal</span>
                </a>
                <a
                  href="https://x.com/yepskew"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-[#EC3750] dark:hover:text-white transition-colors"
                >
                  <Icon glyph="twitterx" size={15} />
                  <span>yepskew</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Open seat */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/15 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-4">
              Seat open
            </div>
            <h2 className="font-accent font-medium text-xl text-slate-900 dark:text-white leading-tight mb-3">
              Co-organizer — could be you
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Want to help run sessions, teach a tool you love, or host a
              build night at your school? Join the club and say hi — that&rsquo;s
              the entire application process.
            </p>
          </div>
          <button
            onClick={() => onNavigate('join')}
            className="hc-secondary-btn text-xs py-3 px-5 self-start"
          >
            <span>Join the club</span>
            <Icon glyph="right-caret" size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
