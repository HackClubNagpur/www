import React from 'react';
import Icon from '@hackclub/icons';

export const YswsSection: React.FC = () => {
  return (
    <section id="ysws" className="py-6 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF8C37] mb-2 uppercase tracking-wider">
          <span>// YSWS · YOU SHIP, WE SHIP</span>
          <span>·</span>
          <span>HACK CLUB GLOBAL PERKS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-3 font-semibold font-display">
          Perks for Shipping Real Projects
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
          Here&rsquo;s the deal: you build something real and publish it, Hack
          Club mails real things back — drinks, hardware, consoles. It&rsquo;s
          all funded by donations, so none of it costs you anything.
        </p>
      </div>

      {/* How YSWS works */}
      <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
        <h2 className="text-xl sm:text-2xl text-slate-900 dark:text-white mb-2 font-semibold font-display">
          How it works
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-6 max-w-xl">
          Hack Club is a nonprofit. This whole thing runs on donations from
          people who think teenagers should get free hardware. That&rsquo;s the
          entire business model.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#181822] border border-slate-200 dark:border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#EC3750] text-white flex items-center justify-center font-bold text-xs mb-3 font-mono">
              01
            </div>
            <h3 className="text-slate-900 dark:text-white text-sm mb-1 font-medium font-accent">
              Build something original
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A game, a synth, a scraper, a circuit board — anything you made
              yourself.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#181822] border border-slate-200 dark:border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#FF8C37] text-white flex items-center justify-center font-bold text-xs mb-3 font-mono">
              02
            </div>
            <h3 className="text-slate-900 dark:text-white text-sm mb-1 font-medium font-accent">
              Publish it open source
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Push the code to GitHub and send Hack Club a demo link or pull
              request.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#181822] border border-slate-200 dark:border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#33D6A6] text-white flex items-center justify-center font-bold text-xs mb-3 font-mono">
              03
            </div>
            <h3 className="text-slate-900 dark:text-white text-sm mb-1 font-medium font-accent">
              Get stuff in the mail
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Boba vouchers, custom PCBs, handheld consoles — shipped to your
              house.
            </p>
          </div>
        </div>
      </div>

      {/* Coming soon panel */}
      <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#181822] shadow-xs p-8 sm:p-12 text-center mb-12">
        <span className="inline-block -rotate-2 px-4 py-1.5 rounded-lg border-2 border-[#FF8C37] text-[#FF8C37] font-mono font-bold text-xs tracking-[0.2em] mb-7 select-none">
          COMING SOON
        </span>

        <div className="w-14 h-14 rounded-2xl bg-[#FF8C37]/15 text-[#FF8C37] flex items-center justify-center mx-auto mb-6">
          <Icon glyph="food" size={28} />
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-semibold text-slate-900 dark:text-white leading-tight mb-4">
          The good stuff is on its way.
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
          We&rsquo;re lining up Hack Club&rsquo;s global ship-and-earn
          programs for Nagpur — boba for shipped code, free PCBs, handheld
          consoles. They&rsquo;ll land here as soon as the first ones open up.
        </p>

        <p className="font-mono text-[11px] tracking-wider text-slate-500 dark:text-slate-400">
          ON THE WAY &nbsp;&middot;&nbsp; BOBA &nbsp;&middot;&nbsp; SPRIG
          &nbsp;&middot;&nbsp; ONBOARD
        </p>
      </div>

      {/* Global Slack Invite */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-xl text-slate-900 dark:text-white mb-1 font-medium font-accent">
            The Slack is where it happens
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg">
            156,000 teenagers, channels for every timezone and stack. Ask
            questions, get code reviews, and find the people near you in
            #india.
          </p>
        </div>
        <a
          href="https://hackclub.com/slack"
          target="_blank"
          rel="noreferrer"
          className="hc-cta-btn text-xs py-3 px-6 whitespace-nowrap shrink-0"
        >
          <span>Join Global Slack</span>
          <Icon glyph="slack" size={16} />
        </a>
      </div>
    </section>
  );
};
