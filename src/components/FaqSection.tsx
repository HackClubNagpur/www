import React, { useState } from 'react';
import Icon from '@hackclub/icons';
import { FAQS } from '../data/clubData';

interface FaqSectionProps {
  /** Renders a wider two-column layout for use inside the home page. */
  embedded?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ embedded = false }) => {
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const intro = (
    <div>
      <span className="eyebrow text-[#EC3750] block mb-3">Questions</span>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white leading-tight">
        Things people ask
        <br />
        before turning up
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-4 max-w-xs">
        Written by the students who run the sessions, because we get asked these
        on Slack every single week.
      </p>

      <div className="mt-6 p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
        <div className="eyebrow text-slate-500 dark:text-slate-400 mb-2">
          For parents
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
          Parents are welcome at the first half hour of any meetup to see the
          space and meet the students who organise it.
        </p>
        <a
          href="https://hackclub.com/philosophy"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EC3750] hover:underline"
        >
          <span>Read the global charter</span>
          <Icon glyph="external" size={13} />
        </a>
      </div>
    </div>
  );

  const list = (
    <div className="divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
      {FAQS.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              onClick={() => toggle(faq.id)}
              className="w-full py-5 text-left flex items-start justify-between gap-5 cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-accent font-medium text-base sm:text-lg leading-snug text-slate-900 dark:text-white">
                {faq.question}
              </span>
              <span
                className={`mt-0.5 w-6 h-6 shrink-0 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#EC3750]' : ''
                }`}
              >
                <Icon glyph="down-caret" size={16} />
              </span>
            </button>

            {isOpen && (
              <div className="pb-5 pr-10 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  if (embedded) {
    return (
      <section id="faq" className="px-4 sm:px-6 max-w-5xl mx-auto py-8 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] gap-10 md:gap-16">
          <div className="md:sticky md:top-24 md:self-start">{intro}</div>
          <div>{list}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-8 sm:py-12 px-4 sm:px-6 max-w-3xl mx-auto">
      {intro}
      <div className="mt-10">{list}</div>
    </section>
  );
};
