import React from 'react';
import Icon from '@hackclub/icons';
import DecryptedText from './DecryptedText';
import { CLUB_META } from '../data/clubData';
import { PageId } from '../types';

interface HeroProps {
  onNavigate: (page: PageId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const cards: {
    page: PageId;
    glyph: 'event-code' | 'code' | 'food' | 'like-fill';
    eyebrow: string;
    title: string;
    body: string;
    chips: [string, string];
    cta: string;
    text: string;
    bg: string;
    border: string;
  }[] = [
    {
      page: 'events',
      glyph: 'event-code',
      eyebrow: 'Every other Sat',
      title: 'Saturday build nights',
      body: 'We hand out ESP32s and breadboards, somebody explains what they do, and you build until it’s time to head home. Mentors float around when you’re stuck.',
      chips: ['Shankar Nagar', 'Beginners welcome'],
      cta: 'See next meetup',
      text: 'text-[#EC3750]',
      bg: 'bg-[#EC3750]/15',
      border: 'hover:border-[#EC3750] dark:hover:border-[#EC3750]',
    },
    {
      page: 'projects',
      glyph: 'code',
      eyebrow: 'Built by students',
      title: 'What Nagpur teens have made',
      body: 'A pocket arcade console, a bot that tracks metro interchange times at Sitabuldi, an air quality node by Ambazari Lake. All of it started with a parts bin or a blank page.',
      chips: ['RP2040', 'Telegram bots'],
      cta: 'Browse projects',
      text: 'text-[#FF8C37]',
      bg: 'bg-[#FF8C37]/15',
      border: 'hover:border-[#FF8C37] dark:hover:border-[#FF8C37]',
    },
    {
      page: 'ysws',
      glyph: 'food',
      eyebrow: 'Free gear',
      title: 'Perks you can actually claim',
      body: 'Put a project on GitHub and Hack Club will send you a boba voucher, money towards a custom PCB, or a pocket console. No essays, no applications.',
      chips: ['Boba vouchers', '$100 PCB grant'],
      cta: 'See the perks',
      text: 'text-[#33D6A6]',
      bg: 'bg-[#33D6A6]/15',
      border: 'hover:border-[#33D6A6] dark:hover:border-[#33D6A6]',
    },
    {
      page: 'manifesto',
      glyph: 'like-fill',
      eyebrow: 'Not tuition',
      title: 'Why we do this',
      body: 'School is set up for exams and this is set up for building. Come for the people and the parts bin. Stay because you made something.',
      chips: ['No lectures', 'Free'],
      cta: 'Read our story',
      text: 'text-[#338EDA]',
      bg: 'bg-[#338EDA]/15',
      border: 'hover:border-[#338EDA] dark:hover:border-[#338EDA]',
    },
  ];

  return (
    <section className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 text-center">
      <div className="max-w-5xl mx-auto flex flex-col items-center">

        <p className="font-hand font-medium text-xl sm:text-2xl text-slate-500 dark:text-slate-400 -rotate-2 mb-4 select-none">
          hey, we&rsquo;re the Nagpur chapter &mdash;
        </p>

        <h1 className="font-hero font-semibold tracking-[-0.01em] leading-[0.92] text-[clamp(3.5rem,11vw,8rem)] text-slate-900 dark:text-white">
          <span className="block">
            Hack Club
          </span>
          <span className="block font-pixel text-[#EC3750] text-[clamp(2rem,7vw,4.5rem)] mt-4">
            <DecryptedText
              text="Nagpur"
              animateOn="view"
              speed={45}
              maxIterations={12}
              encryptedClassName="opacity-50"
            />
          </span>
        </h1>

        <p className="font-accent text-lg sm:text-2xl font-medium leading-snug sm:leading-tight tracking-tight text-slate-900 dark:text-slate-100 max-w-2xl mt-7 sm:mt-9 mb-3">
          A student-run club where Nagpur teenagers build games, hardware, and
          websites together.
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-5">
          Turn up with a laptop, leave a few months later with something you
          actually made.
        </p>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-7 sm:mb-9">
          Ages 13&ndash;18 &nbsp;&middot;&nbsp; Free to join &nbsp;&middot;&nbsp;
          Saturdays in Shankar Nagar
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 w-full max-w-xs sm:max-w-none">
          <button
            onClick={() => onNavigate('join')}
            className="w-full sm:w-auto hc-cta-btn text-sm sm:text-base py-3.5 sm:py-4 px-8"
          >
            <span>JOIN THE CLUB</span>
            <Icon glyph="send" size={17} />
          </button>

          <button
            onClick={() => onNavigate('events')}
            className="w-full sm:w-auto text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-[#EC3750] dark:hover:text-white px-4 py-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>See upcoming events</span>
            <Icon glyph="down-caret" size={14} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400 mb-10 sm:mb-14">
          <a
            href={CLUB_META.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#EC3750] dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <Icon glyph="github" size={15} />
            <span>GitHub</span>
          </a>
          <a
            href="https://discord.gg/hackclub"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#EC3750] dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <Icon glyph="discord" size={15} />
            <span>Discord</span>
          </a>
          <a
            href="https://instagram.com/hackclubnagpur"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#EC3750] dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <Icon glyph="instagram" size={15} />
            <span>Instagram</span>
          </a>
          <a
            href={CLUB_META.slackInviteUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#EC3750] dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <Icon glyph="slack" size={15} />
            <span>Slack</span>
          </a>
        </div>

        {/* Four ways in */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {cards.map((card) => (
            <div
              key={card.page}
              onClick={() => onNavigate(card.page)}
              className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#181822] border border-slate-200 dark:border-white/10 ${card.border} transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${card.bg} ${card.text} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon glyph={card.glyph} size={22} />
                  </div>
                  <span className={`eyebrow ${card.text}`}>
                    {card.eyebrow}
                  </span>
                </div>

                <h3 className="font-accent font-semibold text-lg text-slate-900 dark:text-white mb-2">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {card.body}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold ${card.text}`}>
                <span>{card.cta}</span>
                <Icon glyph="right-caret" size={14} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
