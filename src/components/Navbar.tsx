import React, { useState } from 'react';
import Icon from '@hackclub/icons';
import { PageId } from '../types';

export type { PageId };

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events & Sprints', badge: 'SOON' },
    { id: 'projects', label: 'Projects' },
    { id: 'ysws', label: 'YSWS Perks', badge: 'BOBA' },
    { id: 'manifesto', label: 'Manifesto' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <>
      {/* Authentic Hack Club Hanging Flag from top-left */}
      <a
        href="https://hackclub.com"
        target="_blank"
        rel="noreferrer"
        className="hackclub-flag"
        title="Hack Club - A global network of high school makers"
      >
        <img
          src="https://assets.hackclub.com/flag-orpheus-top.svg"
          alt="Hack Club Flag"
          className="w-full"
        />
      </a>

      {/* Full-Width Header Bar exactly like hackclub.com */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#121217]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left clearance for the hanging flag */}
          <div className="w-36 sm:w-52 lg:w-60 shrink-0 pointer-events-none" />

          {/* Desktop Navigation Links aligned to the right (like hackclub.com) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-[15px] font-bold transition-colors cursor-pointer select-none relative py-1 ${
                    isActive
                      ? 'text-[#EC3750] dark:text-white font-extrabold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[#FF8C37] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme Toggle & 'Join the community' Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Contrast / Theme Toggle Circle Icon (Identical to hackclub.com) */}
            <button
              onClick={onToggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white hover:opacity-80 transition-all cursor-pointer shadow-xs border border-slate-200 dark:border-white/10"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              <Icon glyph="contrast" size={20} />
            </button>

            {/* Pill Button: 'Join the community' (Identical to hackclub.com screenshot) */}
            <button
              onClick={() => onNavigate('join')}
              className="hidden sm:inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-accent font-semibold text-sm sm:text-[15px] tracking-normal transition-all cursor-pointer shadow-sm select-none bg-slate-900 text-white hover:bg-black dark:bg-[#FAF6EF] dark:text-[#121217] dark:hover:bg-white hover:scale-103 active:scale-97 border border-slate-900/10 dark:border-transparent"
            >
              Join the community
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <Icon glyph="view-close" size={20} /> : <Icon glyph="menu" size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pb-6 pt-3 bg-white/95 dark:bg-[#121217]/95 backdrop-blur-lg border-b border-slate-200 dark:border-white/10 space-y-2 animate-in fade-in duration-150 shadow-xl">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-base font-bold flex items-center justify-between cursor-pointer transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#EC3750] text-white'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FF8C37] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Social Row inside Mobile Drawer */}
            <div className="pt-2 flex items-center justify-around border-t border-slate-100 dark:border-white/10 text-xs font-mono">
              <a
                href="https://github.com/HackClubNagpur"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-700 dark:text-slate-300 hover:text-[#EC3750] flex items-center gap-1.5"
              >
                <Icon glyph="github" size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://discord.gg/hackclub"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-700 dark:text-slate-300 hover:text-[#EC3750] flex items-center gap-1.5"
              >
                <Icon glyph="discord" size={16} />
                <span>Discord</span>
              </a>
              <a
                href="https://instagram.com/hackclubnagpur"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-700 dark:text-slate-300 hover:text-[#EC3750] flex items-center gap-1.5"
              >
                <Icon glyph="instagram" size={16} />
                <span>Insta</span>
              </a>
            </div>

            <div className="pt-1">
              <button
                onClick={() => {
                  onNavigate('join');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-full text-center font-bold text-sm bg-slate-900 text-white dark:bg-[#FAF6EF] dark:text-[#121217] shadow-sm cursor-pointer hover:scale-102 transition-transform"
              >
                Join the community ↗
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
