import React from 'react';
import Icon from '@hackclub/icons';
import { PageId } from '../types';

interface ProjectsSectionProps {
  onNavigate: (page: PageId) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  return (
    <section id="projects" className="py-6 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-3 font-semibold font-display">
          Projects by Nagpur Teens
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
          Hardware, games, and local tools — designed, soldered, and coded by
          high schoolers in Nagpur.
        </p>
      </div>

      {/* Coming soon panel */}
      <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#181822] shadow-xs p-8 sm:p-12 text-center">
        <span className="inline-block rotate-2 px-4 py-1.5 rounded-lg border-2 border-[#FF8C37] text-[#FF8C37] font-mono font-bold text-xs tracking-[0.2em] mb-7 select-none">
          COMING SOON
        </span>

        <div className="w-14 h-14 rounded-2xl bg-[#FF8C37]/15 text-[#FF8C37] flex items-center justify-center mx-auto mb-6">
          <Icon glyph="code" size={28} />
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-semibold text-slate-900 dark:text-white leading-tight mb-4">
          Still on the workbench.
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
          Nagpur teens haven&rsquo;t shipped anything yet — whatever gets
          built first goes up here. A bot, a game, a blinking LED, a
          website. First build night decides.
        </p>

        <p className="font-mono text-[11px] tracking-wider text-slate-500 dark:text-slate-400 mb-8">
          NOTHING SHIPPED YET &nbsp;&middot;&nbsp; FIRST BUILD NIGHT DECIDES
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('join')}
            className="w-full sm:w-auto hc-cta-btn text-sm py-3.5 px-8"
          >
            <span>Join the club</span>
            <Icon glyph="send" size={16} />
          </button>
          <button
            onClick={() => onNavigate('events')}
            className="w-full sm:w-auto hc-secondary-btn text-sm py-3 px-6"
          >
            <span>See events</span>
            <Icon glyph="right-caret" size={15} />
          </button>
        </div>
      </div>

    </section>
  );
};
