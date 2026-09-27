import React from 'react';
import Icon from '@hackclub/icons';
import { MANIFESTO_POINTS } from '../data/clubData';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="mb-8 pb-3 border-b border-slate-200 dark:border-white/10">
        <h2 className="text-3xl sm:text-4xl text-slate-900 dark:text-white flex items-center gap-3 font-semibold font-display">
          <span>💡</span>
          <span>The Manifesto (Why We Hack)</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          If you want to pass exams, go to coaching. If you want to build things, come here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-[#181820] border border-slate-200 dark:border-white/10">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-bold">
            THE USUAL NAGPUR ROUTINE
          </div>
          <h3 className="text-xl sm:text-2xl text-slate-900 dark:text-white mb-6 font-medium font-accent">
            The Test-Prep Factory
          </h3>
          <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-400">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon glyph="view-close" size={12} />
              </span>
              <span>Endless 4-hour lectures on blackboard theory you forget by Tuesday.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon glyph="view-close" size={12} />
              </span>
              <span>&ldquo;Computers are only for after you crack JEE/CET.&rdquo;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon glyph="view-close" size={12} />
              </span>
              <span>Writing code on ruled notebook paper for school practical exams.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#222230] dark:to-[#1c1c26] border border-[#EC3750]/30 shadow-md relative overflow-hidden">
          <div className="text-xs font-mono text-[#EC3750] uppercase tracking-wider mb-2 font-bold">
            HOW TEENS ACTUALLY LEARN
          </div>
          <h3 className="text-xl sm:text-2xl text-slate-900 dark:text-white mb-6 font-medium font-accent">
            Hack Club Nagpur
          </h3>
          <ul className="space-y-4 text-sm text-slate-800 dark:text-slate-200">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#EC3750] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Icon glyph="checkmark" size={12} />
              </span>
              <span><strong>You build on Day 1:</strong> A retro game, custom LED circuit, or Telegram bot.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#EC3750] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Icon glyph="checkmark" size={12} />
              </span>
              <span><strong>No teachers or grades:</strong> Just other teenagers hacking together on laptops.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#EC3750] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Icon glyph="checkmark" size={12} />
              </span>
              <span><strong>Free hardware kits:</strong> ESP32s, sensors, OLEDs, and soldering bins for all.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MANIFESTO_POINTS.map((pt) => (
          <div
            key={pt.number}
            className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
          >
            <div className="text-xl font-black text-[#EC3750] mb-2 font-mono">
              {pt.number}
            </div>
            <h4 className="text-base text-slate-900 dark:text-white mb-2 font-medium font-accent">
              {pt.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {pt.text}
            </p>
          </div>
        ))}
      </div>

      {/* Nagpur × Global */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
        <div className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-2">
          One chapter of <span className="text-[#EC3750]">156,000</span> teenagers.
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Hack Club Nagpur is a local chapter of Hack Club, the global
          nonprofit community of teenage makers. Same worldwide Slack, same
          free hardware perks — meeting every other Saturday in Shankar Nagar.
        </p>
      </div>
    </section>
  );
};
