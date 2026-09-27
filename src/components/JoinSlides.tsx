import React, { useState } from 'react';
import Icon from '@hackclub/icons';
import {
  isLoginConfigured,
  loadMember,
  loginWithDiscord,
  postToDiscord,
  saveMember,
  submitJoinEmail,
  type DiscordUser,
} from '../auth/discord';

interface JoinSlidesProps {
  onOpenJoin: () => void;
  onStart?: () => void;
  autoStart?: boolean;
  onExit?: () => void;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'working'; note: string }
  | { kind: 'error'; note: string };

const ERROR_NOTES: Record<string, string> = {  'popup-blocked': 'Your browser blocked the login popup. Allow popups for this site and try again.',
  cancelled: 'Login was closed before finishing — no worries, try again whenever.',
  denied: 'Discord access was denied, so we got nothing. The email form below still works.',
  timeout: 'Login timed out. Try again — or use the email form below.',
  'exchange-failed':
    'Discord refused the login handshake. The club needs a tiny server hookup — use the email form for now.',
  'profile-failed': 'Logged in, but Discord would not share the profile. Use the email form instead.',
  'submit-failed': 'Logged in, but forwarding to the inbox failed. Use the email form instead.',
  'discord-failed': 'Could not post to Discord — check your connection and try again.',
};

const SHIPPED_PRIZES = [  { src: '/slides/bambu.png', label: 'Bambu printer' },
  { src: '/slides/ipad.png', label: 'iPad' },
  { src: '/slides/framework.png', label: 'Framework laptop' },
  { src: '/slides/blahaj.png', label: 'Blåhaj' },
];

const HQ_PROJECTS: {
  img: string;
  name: string;
  by: string;
  pitch: string;
  demo: string;
  demoLabel: string;
  code?: string;
}[] = [
  {
    img: '/slides/hq/angel-keyboard-b850d653.14enni6d2a-so.png',
    name: 'Biblically Accurate Angel Keyboard',
    by: 'egg_splats',
    pitch: 'Custom 3D-printed keyboard shaped like a biblically accurate angel, powered by a Pico.',
    demo: 'https://www.youtube.com/watch?v=EbvpPsTKe3c',
    demoLabel: 'Demo',
    code: 'https://github.com/geg-tech/biblicallyaccuratekeyboard',
  },
  {
    img: '/slides/hq/CrookedRails.3dc7--b0nai2c.png',
    name: 'Crooked Rails',
    by: 'Raivo',
    pitch: 'Multiplayer game about defending cargo from monsters.',
    demo: 'https://github.com/AllInTw0/CrookedRailsPrototypeHDRP/releases/',
    demoLabel: 'Demo',
    code: 'https://github.com/AllInTw0/CrookedRailsPrototypeHDRP',
  },
  {
    img: '/slides/hq/qwave.25l9vgaesr_0m.png',
    name: 'qWave',
    by: 'qwik',
    pitch: 'Locally hosted media server for music.',
    demo: 'https://qwave.qwik.top',
    demoLabel: 'Demo',
    code: 'https://github.com/qwikster/qwave',
  },
  {
    img: '/slides/hq/sandFalling.3wr_zhb8-7vu1.png',
    name: 'Falling-sand sim',
    by: 'nmsoukmandjiev007',
    pitch: 'Gravity sand toy built in C with raylib.',
    demo: 'https://nikoi008.github.io/Falling-sand-sim/',
    demoLabel: 'Demo',
    code: 'https://github.com/nikoi008/Falling-sand-sim',
  },
  {
    img: '/slides/hq/hackatimeHeatmap.2ygz294chq5jm.png',
    name: 'Hackatime Heatmap',
    by: 'miggy',
    pitch: 'GitHub-style heatmap for your coding hours.',
    demo: 'https://hackatime-heatmap.shymike.dev',
    demoLabel: 'Demo',
    code: 'https://github.com/ImShyMike/hackatime-heatmap',
  },
  {
    img: '/slides/hq/vertsh.0s9lw6y_afiro.png',
    name: 'VERT.sh',
    by: 'maya + nullptr',
    pitch: 'Convert images, audio and docs on-device.',
    demo: 'https://vert.sh',
    demoLabel: 'Demo',
    code: 'https://github.com/VERT-sh/VERT',
  },
  {
    img: '/slides/hq/lightbound.2i-6t2af2wwc2.png',
    name: 'LIGHT//BOUND',
    by: 'fireentity',
    pitch: '2D rhythm game where movement is bound to light.',
    demo: 'https://fire-entity.itch.io/lightbound',
    demoLabel: 'Demo',
    code: 'https://github.com/FireEntity1/lightbound-demo',
  },
  {
    img: '/slides/hq/stash.0431ajqd1-jc6.png',
    name: 'Stash',
    by: 'rip_super',
    pitch: 'Share files fast, with encryption.',
    demo: 'https://stash.sahildash.dev',
    demoLabel: 'Demo',
    code: 'https://github.com/rip-super/stash',
  },
  {
    img: '/slides/hq/luma.0bbq9r7vdc4gi.jpg',
    name: 'Luma',
    by: 'NotARoomba',
    pitch: 'Minecraft-inspired lantern with bluetooth.',
    demo: 'https://github.com/notaroomba/luma',
    demoLabel: 'View project',
  },
  {
    img: '/slides/hq/hexecute.1t-c88r_p3bnr.png',
    name: 'Hexecute',
    by: 'andromeda',
    pitch: 'Wayland launcher you control by casting spells.',
    demo: 'https://github.com/m31-galaxy/Hexecute/releases',
    demoLabel: 'Demo',
    code: 'https://github.com/m31-galaxy/Hexecute',
  },
  {
    img: '/slides/hq/bob_the_gun.0-aavlc9vhhz4.png',
    name: 'Bob the Gun',
    by: 'Crazy Taxi',
    pitch: 'Sentry turret that detects and shoots threats.',
    demo: 'https://github.com/takshcpatel/automatic-turret',
    demoLabel: 'View project',
  },
  {
    img: '/slides/hq/cat_chef_restaurant.0-2o700uzv2ga.png',
    name: 'Cat Chef Restaurant',
    by: 'Kajmix',
    pitch: 'Cozy game about serving hungry customers.',
    demo: 'https://kajmix.itch.io/cat-chef-restaurant',
    demoLabel: 'Demo',
    code: 'https://github.com/Kajmix/Godot-Cat-Chef-Game',
  },
  {
    img: '/slides/hq/ultraportal.26-j8cdxka1kh.webp',
    name: 'UltraPortal',
    by: 'averyocean65',
    pitch: 'A portal gun mod for ULTRAKILL.',
    demo: 'https://thunderstore.io/c/ultrakill/p/averyocean65/UltraPortal/',
    demoLabel: 'Demo',
    code: 'https://github.com/averyocean65/UltraPortal',
  },
];

export const JoinSlides: React.FC<JoinSlidesProps> = ({ onOpenJoin, onStart, autoStart = false, onExit }) => {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(autoStart);
  const [ageOk, setAgeOk] = useState(false);
  const [cocOk, setCocOk] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [member, setMember] = useState<{ username: string } | null>(() => loadMember());

  const total = 6;
  const last = step === total - 1;

  const handleLogin = async () => {
    if (member) return;
    setStatus({ kind: 'working', note: 'Waiting on Discord…' });
    try {
      const user: DiscordUser = await loginWithDiscord();
      setStatus({ kind: 'working', note: `Verified as @${user.username} — saving…` });
      try {
        await postToDiscord(user);
      } catch {
        setStatus({ kind: 'error', note: ERROR_NOTES['discord-failed'] });
        return;
      }
      try {
        await submitJoinEmail(user);
      } catch {
        /* inbox is best-effort — Discord already has the record */
      }
      saveMember(user);
      setMember({ username: user.username });
      setStatus({ kind: 'idle' });
    } catch (e) {
      const code = e instanceof Error ? e.message : 'cancelled';
      setStatus({ kind: 'error', note: ERROR_NOTES[code] ?? ERROR_NOTES.cancelled });
    }
  };

  const checkRow = (on: boolean, onToggle: () => void, label: React.ReactNode) => (
    <button
      type="button"
      onClick={onToggle}
      className="w-full max-w-md mx-auto flex items-center gap-3 p-4 rounded-2xl border border-slate-300 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:border-slate-400 dark:hover:border-white/25 transition-colors cursor-pointer text-left"
      aria-pressed={on}
    >
      <span
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
          on ? 'bg-[#EC3750] border-[#EC3750] text-white' : 'border-slate-400 dark:border-white/25 text-transparent'
        }`}
      >
        <Icon glyph="checkmark" size={14} />
      </span>
      <span className="text-sm sm:text-base text-slate-800 dark:text-slate-100">{label}</span>
    </button>
  );

  return (
    <section className="join-slides-bg relative overflow-hidden">
      {onExit && (
        <button
          onClick={onExit}
          aria-label="Back to join"
          className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full border border-slate-300 dark:border-white/15 text-slate-500 dark:text-slate-400 hover:text-[#EC3750] hover:border-[#EC3750] flex items-center justify-center transition-colors cursor-pointer"
        >
          <Icon glyph="view-close" size={18} />
        </button>
      )}
      {!started ? (
        <div className="min-h-[calc(100svh-12rem)] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20">
          <div className="w-full max-w-3xl mx-auto">
            <h1 className="font-accent font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-slate-900 dark:text-white mb-6">
              Join the club.
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto mb-8">
              Five quick screens — what the club is, where we hang out, and
              how login works. About a minute.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {['100% free forever', 'Ages 13–18', 'No experience needed', 'Nagpur meetups'].map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-[11px] sm:text-xs px-3 py-1.5 rounded-full border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                >
                  {chip}
                </span>
              ))}
            </div>
            <button
              onClick={() => (onStart ? onStart() : setStarted(true))}
              className="hc-cta-btn text-base py-4 px-10"
            >
              <span>Start</span>
              <Icon glyph="right-caret" size={18} />
            </button>
          </div>
        </div>
      ) : (
      <div className="min-h-[calc(100svh-12rem)] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="w-full max-w-3xl mx-auto">

          {/* Welcome */}
          {step === 0 && (
            <div>
              <h1 className="font-accent font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-slate-900 dark:text-white mb-6">
                Welcome to
                <br />
                Hack Club Nagpur!
              </h1>
              <img
                src="/slides/minions.gif"
                alt="Welcome to the club"
                className="w-full max-w-sm mx-auto mb-6"
              />
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
                A free, student-run club where Nagpur teenagers build games,
                hardware, and websites. No fees, no teachers, no entry test.
              </p>
            </div>
          )}

          {/* Discord */}
          {step === 1 && (
            <div>
              <h1 className="font-accent font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-slate-900 dark:text-white mb-6">
                Hang out
                <br />
                on Discord!
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto mb-8">
                That&rsquo;s where the club lives between meetups. Here&rsquo;s
                what actually happens in there:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left mb-8">
                {[
                  { glyph: 'game-controller', title: 'Game nights', text: 'Minecraft, movie nights, and other silly games.' },
                  { glyph: 'code', title: 'Build help', text: 'Stuck at midnight? Somebody in there is awake.' },
                  { glyph: 'like-fill', title: 'Demo days', text: 'Show off whatever you made, however unfinished.' },
                  { glyph: 'discord', title: 'Meetup pings', text: 'First to know when a build night drops.' },
                ].map((row) => (
                  <div
                    key={row.title}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/5"
                  >
                    <span className="w-9 h-9 rounded-xl bg-[#EC3750]/15 text-[#EC3750] flex items-center justify-center shrink-0">
                      <Icon glyph={row.glyph as 'game-controller' | 'code' | 'like-fill' | 'discord'} size={19} />
                    </span>
                    <span>
                      <span className="block font-accent font-medium text-sm sm:text-base text-slate-900 dark:text-white">
                        {row.title}
                      </span>
                      <span className="block text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                        {row.text}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://discord.gg/hackclub"
                target="_blank"
                rel="noreferrer"
                className="hc-cta-btn text-base py-4 px-10"
              >
                <Icon glyph="discord" size={20} />
                <span>Join Discord</span>
              </a>
            </div>
          )}

          {/* Prizes */}
          {step === 3 && (
            <div>
              <h1 className="font-accent font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-slate-900 dark:text-white mb-6">
                Ship stuff,
                <br />
                get stuff.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto mb-8">
                Teenagers shipped projects — and Hack Club mailed prizes back.
                Like these:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
                {SHIPPED_PRIZES.map((item) => (
                  <div key={item.src}>
                    <img
                      src={item.src}
                      alt={item.label}
                      loading="lazy"
                      className="w-full h-24 sm:h-28 object-cover rounded-xl border border-slate-300 dark:border-white/15"
                    />
                    <div className="font-mono text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {step === 2 && (
            <div>
              <h1 className="font-accent font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-slate-900 dark:text-white mb-6">
                Made by
                <br />
                teenagers.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto mb-10">
                From the global community — every one of these started as
                somebody&rsquo;s first version.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
                {HQ_PROJECTS.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-2xl border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/5 overflow-hidden flex flex-col"
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-1">
                      <div className="font-accent font-medium text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                        {p.name}
                      </div>
                      <div className="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 mb-2">
                        by @{p.by}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3 flex-1">
                        {p.pitch}
                      </p>
                      <div className="flex items-center gap-4">
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#EC3750] hover:underline"
                        >
                          <span>{p.demoLabel}</span>
                          <Icon glyph="external" size={11} />
                        </a>
                        {p.code && (
                          <a
                            href={p.code}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-[#EC3750] hover:underline"
                          >
                            <span>Code</span>
                            <Icon glyph="external" size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How joining works */}
          {step === 4 && (
            <div>
              <h1 className="font-accent font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-slate-900 dark:text-white mb-10">
                How joining
                <br />
                works
              </h1>
              <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                {[
                  { n: '01', color: '#EC3750', title: 'Log in', text: 'With Discord, on the next screen.' },
                  { n: '02', color: '#FF8C37', title: 'We get your email', text: 'From Discord — nothing else.' },
                  { n: '03', color: '#33D6A6', title: 'We reach out', text: 'With the next meetup details.' },
                ].map((s) => (
                  <li
                    key={s.n}
                    className="p-6 rounded-3xl border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/5"
                  >
                    <div className="font-display font-semibold text-5xl leading-none mb-4" style={{ color: s.color }}>
                      {s.n}
                    </div>
                    <div className="font-accent font-medium text-base sm:text-lg text-slate-900 dark:text-white mb-1">
                      {s.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {s.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Consent + login */}
          {step === 5 && (
            <div>
              <h1 className="font-accent font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-slate-900 dark:text-white mb-8">
                Ready to start?
              </h1>

              {member ? (
                <div className="py-2 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5">
                    <Icon glyph="checkmark" size={28} />
                  </div>
                  <p className="font-accent font-medium text-2xl sm:text-3xl text-slate-900 dark:text-white mb-3">
                    You&rsquo;re on the list!
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto mb-7">
                    We got your mail — we&rsquo;ll reach out ASAP.
                  </p>
                  <a
                    href="https://discord.gg/hackclub"
                    target="_blank"
                    rel="noreferrer"
                    className="hc-cta-btn text-sm sm:text-base py-4 px-10"
                  >
                    <Icon glyph="discord" size={19} />
                    <span>Join Discord</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-3 max-w-md mx-auto">
                  {checkRow(ageOk, () => setAgeOk(!ageOk), 'I am 13–18 years old')}
                  {checkRow(
                    cocOk,
                    () => setCocOk(!cocOk),
                    <span>
                      I&rsquo;ve read the{' '}
                      <a
                        href="https://hackclub.com/conduct"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#EC3750] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Code of Conduct
                      </a>
                    </span>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={handleLogin}
                      disabled={!ageOk || !cocOk || !isLoginConfigured || status.kind === 'working'}
                      className="w-full hc-cta-btn text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Icon glyph="discord" size={19} />
                      <span>
                        {status.kind === 'working' ? status.note : 'Login with Discord'}
                      </span>
                    </button>
                  </div>

                  {!isLoginConfigured && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Login unlocks once the club connects its Discord app — use the email form meanwhile.
                    </p>
                  )}

                  {status.kind === 'error' && (
                    <p className="text-sm font-semibold text-[#EC3750]">{status.note}</p>
                  )}

                  <div className="pt-1">
                    <button
                      onClick={onOpenJoin}
                      className="w-full hc-secondary-btn text-sm py-3.5"
                    >
                      <Icon glyph="send" size={16} />
                      <span>Prefer email? Send a join request</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === step ? 'w-8 bg-[#EC3750]' : 'w-2 bg-slate-400/50 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Back */}
          <div className="mt-6 h-6" aria-hidden="true" />
        </div>
      </div>
      )}

      {/* Fixed back arrow — mirrors the next arrow */}
      {started && step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          aria-label="Previous slide"
          className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-white/10 text-slate-900 dark:text-white border border-slate-300 dark:border-white/15 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <span className="inline-block rotate-180">
            <Icon glyph="right-caret" size={22} />
          </span>
        </button>
      )}

      {/* Fixed next arrow, HQ style */}
      {started && !last && (
        <button
          onClick={() => setStep(Math.min(total - 1, step + 1))}
          aria-label="Next slide"
          className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EC3750] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <Icon glyph="right-caret" size={22} />
        </button>
      )}
    </section>
  );
};
