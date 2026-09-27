import React from 'react';
import Icon from '@hackclub/icons';
import { EVENTS } from '../data/clubData';
import { ClubEvent } from '../types';

interface EventsSectionProps {
  onRSVP: (event: ClubEvent) => void;
  isStandalonePage?: boolean;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onRSVP }) => {
  const buildNight = EVENTS.find((e) => e.id === 'event-buildnight') ?? EVENTS[0];

  return (
    <section id="events" className="py-6 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-3 font-semibold font-display">
          Build Nights & Sprints
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
          In-person meetups and build sprints around Nagpur. The calendar is
          filling up — starting with hardware.
        </p>
      </div>

      {/* Coming soon panel */}
      <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#181822] shadow-xs p-8 sm:p-12 text-center">
        <span className="inline-block -rotate-3 px-4 py-1.5 rounded-lg border-2 border-[#EC3750] text-[#EC3750] font-mono font-bold text-xs tracking-[0.2em] mb-7 select-none">
          COMING SOON
        </span>

        <div className="w-14 h-14 rounded-2xl bg-[#EC3750]/15 text-[#EC3750] flex items-center justify-center mx-auto mb-6">
          <Icon glyph="event-code" size={28} />
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-semibold text-slate-900 dark:text-white leading-tight mb-4">
          Nothing on the calendar yet.
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
          We&rsquo;re still locking the venue and date for our first build
          night in Shankar Nagar. Leave your name and we&rsquo;ll send one
          message when it&rsquo;s announced — no spam, just the date.
        </p>

        <p className="font-mono text-[11px] tracking-wider text-slate-500 dark:text-slate-400 mb-8">
          FIRST UP &nbsp;&middot;&nbsp; BUILD NIGHT #01 &nbsp;&middot;&nbsp;
          SHANKAR NAGAR &nbsp;&middot;&nbsp; DATE TBA
        </p>

        <button
          onClick={() => onRSVP(buildNight)}
          className="hc-cta-btn text-sm py-3.5 px-8"
        >
          <span>Notify me</span>
          <Icon glyph="send" size={16} />
        </button>
      </div>

    </section>
  );
};
