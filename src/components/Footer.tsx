import React from 'react';
import Icon from '@hackclub/icons';
import { CLUB_META } from '../data/clubData';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clubLinks: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Events & Sprints', page: 'events' },
    { label: 'Projects', page: 'projects' },
    { label: 'YSWS Perks', page: 'ysws' },
  ];

  const exploreLinks: { label: string; page: PageId }[] = [
    { label: 'Manifesto', page: 'manifesto' },
    { label: 'What we do', page: 'activities' },
    { label: 'Join', page: 'join' },
    { label: 'Team', page: 'team' },
  ];

  const communityLinks: { label: string; href: string; glyph: 'github' | 'discord' | 'instagram' | 'slack' | 'external' }[] = [
    { label: 'GitHub', href: CLUB_META.githubUrl, glyph: 'github' },
    { label: 'Discord', href: 'https://discord.gg/hackclub', glyph: 'discord' },
    { label: 'Instagram', href: 'https://instagram.com/hackclubnagpur', glyph: 'instagram' },
    { label: 'Slack', href: CLUB_META.slackInviteUrl, glyph: 'slack' },
    { label: 'Hack Club HQ', href: 'https://hackclub.com', glyph: 'external' },
  ];

  const hqLinks = [
    { label: 'Philosophy', href: 'https://hackclub.com/philosophy' },
    { label: 'Programs', href: 'https://hackclub.com/programs' },
    { label: 'Find a club', href: 'https://hackclub.com/clubs' },
    { label: 'Code of Conduct', href: 'https://hackclub.com/conduct' },
    { label: 'Donate', href: 'https://hackclub.com/philanthropy' },
  ];

  const colHeading =
    'text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-slate-500 mb-4';
  const linkCls =
    'text-sm text-slate-300 hover:text-white transition-colors cursor-pointer';
  const commitSha = typeof __COMMIT_SHA__ === 'string' ? __COMMIT_SHA__ : '';

  return (
    <footer className="mt-16 border-t border-white/10 bg-black text-slate-400 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Main grid: brand + link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-6 mb-12">

          {/* Brand block */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-2 lg:mb-0">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-[#EC3750] shrink-0 bg-[#EC3750]/10 flex items-center justify-center">
                <img src="/hc.png" alt="Hack Club Nagpur Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-accent font-semibold text-lg text-white">
                Hack Club <span className="text-[#EC3750]">Nagpur</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              For teens, by teens — in Nagpur. A student-run chapter of Hack
              Club for high schoolers aged 13–18.
            </p>
          </div>

          <div>
            <div className={colHeading}>Club</div>
            <ul className="space-y-2.5">
              {clubLinks.map((l) => (
                <li key={l.page}>
                  <button onClick={() => onNavigate(l.page)} className={linkCls}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={colHeading}>Explore</div>
            <ul className="space-y-2.5">
              {exploreLinks.map((l) => (
                <li key={l.page}>
                  <button onClick={() => onNavigate(l.page)} className={linkCls}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={colHeading}>Community</div>
            <ul className="space-y-2.5">
              {communityLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${linkCls} inline-flex items-center gap-1.5`}
                  >
                    <Icon glyph={l.glyph} size={14} />
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={colHeading}>Hack Club</div>
            <ul className="space-y-2.5">
              {hqLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={linkCls}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span className="text-center sm:text-left">
            © 2026 Hack Club Nagpur · A chapter of Hack Club, a 501(c)(3)
            nonprofit · 21.1458° N, 79.0882° E
          </span>
          <div className="flex items-center gap-4 shrink-0">
            {commitSha && (
              <a
                href={`https://github.com/HackClubNagpur/www/commit/${commitSha}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-slate-500 hover:text-white transition-colors"
                title="Latest commit on GitHub"
              >
                --o-- {commitSha}
              </a>
            )}
            <button
              onClick={scrollToTop}
              className="text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors shrink-0"
            >
              <span>Back to top</span>
              <Icon glyph="up-caret" size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
