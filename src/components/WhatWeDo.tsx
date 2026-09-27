import React from 'react';
import Icon from '@hackclub/icons';

export const WhatWeDo: React.FC = () => {
  const pillars: {
    num: string;
    glyph: 'event-code' | 'cpu' | 'game-controller' | 'slack';
    color: string;
    bgColor: string;
    title: string;
    tagline: string;
    description: string;
  }[] = [
    {
      num: '01',
      glyph: 'event-code',
      color: 'text-[#EC3750]',
      bgColor: 'bg-[#EC3750]/15',
      title: 'Saturday Build Nights',
      tagline: 'Bring your laptop, leave with a shipped project.',
      description:
        'Every couple of weeks, 20+ high schoolers meet up in Nagpur. Someone puts on lo-fi beats, we open our code editors, and build for 4 straight hours. At the end, everybody has 3 minutes on the projector to demo what they made.',
    },
    {
      num: '02',
      glyph: 'cpu',
      color: 'text-[#FF8C37]',
      bgColor: 'bg-[#FF8C37]/15',
      title: 'Hardware Kits, Websites & Everything Between',
      tagline: 'Real electronics — and real repos — for free.',
      description:
        'Tired of pure theory? We keep a club bin of ESP32s, Raspberry Pi Picos, sensors, and soldering irons — and we build websites, games, and bots alongside the hardware. Through Hack Club HQ grants, members can even get custom circuit boards manufactured and shipped to Nagpur.',
    },
    {
      num: '03',
      glyph: 'game-controller',
      color: 'text-[#33D6A6]',
      bgColor: 'bg-[#33D6A6]/15',
      title: 'Stupid Hackathons',
      tagline: 'The antidote to serious corporate pitch events.',
      description:
        'No business plans. No monetization models. No venture capital buzzwords. Our mini-hackathons are about making the most hilarious, chaotic, or technically impressive experiments — like an automatic homework screamer or a game controlled by yelling.',
    },
    {
      num: '04',
      glyph: 'slack',
      color: 'text-[#338EDA]',
      bgColor: 'bg-[#338EDA]/15',
      title: 'The Global Hack Club Network',
      tagline: 'Nagpur plugged into 156,000+ teen builders worldwide.',
      description:
        'Being a teenager who loves code in Nagpur can feel lonely. Joining our club connects you to the worldwide Hack Club Slack — where you can get code reviews from a 16-year-old in Tokyo, ship open source with someone in Toronto, and receive free stickers in your mailbox.',
    },
  ];

  return (
    <section id="activities" className="py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="mb-8 pb-3 border-b border-slate-200 dark:border-white/10">
        <h2 className="text-3xl sm:text-4xl text-slate-900 dark:text-white flex items-center gap-3 font-semibold font-display">
          <span>⚡</span>
          <span>What We Actually Do</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          No corporate sponsorships, no boring lectures. Just pure building.
        </p>
      </div>

      {/* Grid of 4 rounded cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {pillars.map((pillar) => (
          <div
            key={pillar.num}
            className="hc-card p-6 sm:p-8 flex flex-col justify-between border border-slate-200 dark:border-white/10"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-2xl ${pillar.bgColor} ${pillar.color} flex items-center justify-center shrink-0`}>
                  <Icon glyph={pillar.glyph} size={24} />
                </div>
                <div>
                  <h3 className="text-xl text-slate-900 dark:text-white font-medium font-accent">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#EC3750]">
                    {pillar.tagline}
                  </div>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Free for all high schoolers</span>
              <span className="text-[#33D6A6] font-bold flex items-center gap-1">
                <Icon glyph="checkmark" size={14} />
                <span>100% Student-Run</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
