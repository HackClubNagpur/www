import React, { useState } from 'react';
import Icon from '@hackclub/icons';
import { CLUB_META } from '../data/clubData';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedEventTitle?: string;
}

const INTEREST_LABELS: Record<string, string> = {
  games: 'Retro games & 2D browser games',
  hardware: 'Hardware, microcontrollers & soldering',
  web: 'Websites, portfolio pages & apps',
  bots: 'Discord bots, Telegram scrapers & scripts',
  beginner: 'Total beginner — teach me everything',
};

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  preselectedEventTitle,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('16');
  const [school, setSchool] = useState('');
  const [interests, setInterests] = useState('games');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Tell us your name first.');
      return;
    }
    const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
    const digits = number.replace(/\D/g, '');
    const numberOk = digits.length >= 10;
    if (!emailOk && !numberOk) {
      setError('Give us either a valid email or a 10-digit WhatsApp number so we can reply.');
      return;
    }

    const lines = [
      `Name: ${name.trim()}`,
      `Age: ${age}`,
      `School: ${school.trim() || '—'}`,
      `Email: ${email.trim() || '—'}`,
      `WhatsApp: ${number.trim() || '—'}`,
      `Interested in: ${INTEREST_LABELS[interests] ?? interests}`,
    ];
    if (preselectedEventTitle) {
      lines.push(`Event: ${preselectedEventTitle}`);
    }
    const subject = encodeURIComponent(`New join request: ${name.trim()} (Hack Club Nagpur)`);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${CLUB_META.contactEmail}?subject=${subject}&body=${body}`;
    setIsSent(true);
  };

  const handleDone = () => {
    setIsSent(false);
    setName('');
    setSchool('');
    setEmail('');
    setNumber('');
    setError('');
    onClose();
  };

  const inputCls =
    'w-full p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-[#EC3750] transition-colors';
  const labelCls =
    'block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1c1c26] text-slate-900 dark:text-white border border-slate-300 dark:border-white/15 rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto">

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md overflow-hidden border border-[#EC3750] shrink-0">
              <img src="/hc.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-accent font-medium text-slate-900 dark:text-white text-sm">
              Join Hack Club Nagpur
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <Icon glyph="view-close" size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!isSent ? (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl text-slate-900 dark:text-white mb-2 font-medium font-accent">
                  Come to a build night
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Fill this in and it lands straight in our inbox at{' '}
                  <span className="font-mono">{CLUB_META.contactEmail}</span>.
                  We reply within a couple of days with the next meetup details.
                </p>
                {preselectedEventTitle && (
                  <div className="mt-3 p-3 rounded-xl bg-[#EC3750]/10 border border-[#EC3750]/30 text-xs text-slate-900 dark:text-white">
                    <span className="font-bold text-[#EC3750]">RSVP EVENT:</span> {preselectedEventTitle}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className={labelCls}>
                    Your Name or Handle *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>
                      Age (13–18)
                    </label>
                    <select
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#252533] border border-slate-300 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-[#EC3750] cursor-pointer"
                    >
                      <option value="13">13 years</option>
                      <option value="14">14 years</option>
                      <option value="15">15 years</option>
                      <option value="16">16 years</option>
                      <option value="17">17 years</option>
                      <option value="18">18 years</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelCls}>
                      School in Nagpur
                    </label>
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="e.g. Somalwar, BVM, CPS..."
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>
                    What are you curious to build?
                  </label>
                  <select
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#252533] border border-slate-300 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-[#EC3750] cursor-pointer"
                  >
                    <option value="games">Making retro games & 2D browser games</option>
                    <option value="hardware">Hardware, microcontrollers & soldering</option>
                    <option value="web">Websites, portfolio pages & apps</option>
                    <option value="bots">Discord bots, Telegram scrapers & scripts</option>
                    <option value="beginner">I am a total beginner, teach me everything!</option>
                  </select>
                </div>

                {/* Email — separate */}
                <div>
                  <label className={labelCls}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. aarav@gmail.com"
                    className={inputCls}
                  />
                </div>

                {/* WhatsApp number — separate */}
                <div>
                  <label className={labelCls}>
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="e.g. 9823xxxxxx"
                    className={inputCls}
                  />
                </div>

                {error && (
                  <p className="text-xs font-semibold text-[#EC3750]">
                    {error}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full hc-cta-btn text-sm py-3.5 flex items-center justify-center gap-2"
                  >
                    <span>Send join request</span>
                    <Icon glyph="send" size={16} />
                  </button>
                  <p className="text-[11px] text-center text-slate-600 dark:text-slate-400 mt-2">
                    This opens your mail app with everything filled in — just hit send. Either email or number works.
                  </p>
                </div>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Rather just hang out first?
                </p>
                <a
                  href="https://discord.gg/hackclub"
                  target="_blank"
                  rel="noreferrer"
                  className="hc-pill-btn text-xs py-2.5 px-5 whitespace-nowrap"
                >
                  <Icon glyph="discord" size={15} />
                  <span>Join Discord</span>
                </a>
              </div>
            </div>
          ) : (
            /* Sent confirmation */
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5">
                <Icon glyph="checkmark" size={26} />
              </div>
              <h3 className="text-2xl text-slate-900 dark:text-white mb-2 font-medium font-accent">
                Request composed
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-sm mx-auto mb-6">
                Your mail app should have opened with everything addressed to{' '}
                <span className="font-mono">{CLUB_META.contactEmail}</span> —
                just hit send and you&rsquo;re on the list. Meanwhile, come say
                hi:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://discord.gg/hackclub"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto hc-cta-btn text-xs py-3 px-6"
                >
                  <Icon glyph="discord" size={16} />
                  <span>Join Discord</span>
                </a>
                <button
                  onClick={handleDone}
                  className="w-full sm:w-auto hc-pill-btn text-xs py-3 px-6 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
