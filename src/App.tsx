/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';import { Navbar, PageId } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventsSection } from './components/EventsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { YswsSection } from './components/YswsSection';
import { AboutSection } from './components/AboutSection';
import { ManifestoSection } from './components/ManifestoSection';
import { WhatWeDo } from './components/WhatWeDo';
import { FaqSection } from './components/FaqSection';
import { TeamSection } from './components/TeamSection';
import { JoinSlides } from './components/JoinSlides';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';
import { ClubEvent } from './types';
import Icon from '@hackclub/icons';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState<string | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync dark class on document.documentElement for Tailwind v4 custom-variant
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // Sync with browser hash routing for multi-page feel
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = ['home', 'events', 'projects', 'ysws', 'manifesto', 'activities', 'join', 'team', 'slides'];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenJoin = (eventTitle?: string) => {
    setSelectedEventTitle(eventTitle);
    setIsJoinModalOpen(true);
  };

  const handleRSVP = (event: ClubEvent) => {
    handleOpenJoin(event.title);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const hideChrome = currentPage === 'slides';

  return (
    <div
      className={`min-h-screen transition-colors duration-200 font-sans selection:bg-[#EC3750] selection:text-white ${
        isDarkMode ? 'dark bg-[#121217] text-[#F5F5F7]' : 'light bg-[#F9FAFC] text-[#0F172A]'
      }`}
    >
      {/* Top Bar with Hack Club Hanging Flag, Navigation, and Theme Toggle */}
      {!hideChrome && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Main Multi-Page Routed View */}
      <main className="min-h-[72vh]">
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <Hero onNavigate={handleNavigate} />

            {/* Quick Community Spotlight on Home */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="eyebrow text-[#FF8C37] block mb-2">
                    First meetup &middot; date to be confirmed
                  </span>
                  <h3 className="font-accent text-xl sm:text-2xl font-medium tracking-tight text-slate-900 dark:text-white">
                    Build night #01: websites, games & blinking lights
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 max-w-xl leading-relaxed">
                    We&rsquo;re kicking off with a bit of everything: ship a
                    tiny website, build a browser game, or blink your first
                    LED. Mentors on hand from two o&rsquo;clock at Shankar
                    Nagar. Bring a laptop, or bring nothing at all.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleOpenJoin('Nagpur Build Night #01')}
                    className="hc-cta-btn text-xs py-3 px-6"
                  >
                    <span>Save me a seat</span>
                    <Icon glyph="send" size={15} />
                  </button>
                  <button
                    onClick={() => handleNavigate('events')}
                    className="hc-secondary-btn text-xs py-3 px-5"
                  >
                    <span>All events</span>
                    <Icon glyph="right-caret" size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ on Home */}
            <FaqSection embedded />
          </div>
        )}

        {/* PAGE 2: EVENTS & HACKATHONS */}
        {currentPage === 'events' && (
          <div className="pt-4 animate-in fade-in duration-200">
            <EventsSection onRSVP={handleRSVP} isStandalonePage={true} />
          </div>
        )}

        {/* PAGE 3: PROJECTS */}
        {currentPage === 'projects' && (
          <div className="pt-4 animate-in fade-in duration-200">
            <ProjectsSection onNavigate={handleNavigate} />
          </div>
        )}

        {/* PAGE 4: YSWS PERKS (Boba, Bake & Build, Vibes, etc.) */}
        {currentPage === 'ysws' && (
          <div className="pt-4 animate-in fade-in duration-200">
            <YswsSection />
          </div>
        )}

        {/* PAGE 5: MANIFESTO & STORY */}
        {currentPage === 'manifesto' && (
          <div className="pt-4 space-y-6 animate-in fade-in duration-200">
            <AboutSection />
            <ManifestoSection />
          </div>
        )}

        {/* PAGE 6: WHAT WE DO */}
        {currentPage === 'activities' && (
          <div className="pt-4 animate-in fade-in duration-200">
            <WhatWeDo />
          </div>
        )}

        {/* PAGE 7: JOIN US */}
        {currentPage === 'join' && (
          <div className="animate-in fade-in duration-200">
            <JoinSlides onOpenJoin={() => handleOpenJoin()} onStart={() => handleNavigate('slides')} />
          </div>
        )}

        {/* PAGE 9: SLIDES */}
        {currentPage === 'slides' && (
          <div className="animate-in fade-in duration-200">
            <JoinSlides onOpenJoin={() => handleOpenJoin()} autoStart onExit={() => handleNavigate('join')} />
          </div>
        )}

        {/* PAGE 8: TEAM */}
        {currentPage === 'team' && (
          <div className="pt-4 animate-in fade-in duration-200">
            <TeamSection onNavigate={handleNavigate} />
          </div>
        )}
      </main>

      {/* Footer */}
      {!hideChrome && <Footer onNavigate={handleNavigate} />}

      {/* Join request modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        preselectedEventTitle={selectedEventTitle}
      />
    </div>
  );
}
