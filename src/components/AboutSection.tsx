import React from 'react';

export const AboutSection: React.FC = () => {
  const studentMakers = [
    {
      name: 'Aarav Deshmukh',
      age: 17,
      role: 'Hardware & Solar Hacker',
      school: 'CPS Wardhaman Nagar, Class 12',
      quote: 'I used to think hardware was something you only did in a 4th year college lab. In Hack Club, we ordered ESP32 chips, soldered them on my dining table, and built an AQI sensor on Ambazari lake in two weeks.',
    },
    {
      name: 'Tanvi Shinde',
      age: 16,
      role: 'Retro Arcade & MicroPython',
      school: 'Somalwar Ramdaspeth, Class 11',
      quote: 'School computer science was just writing SQL queries in a notebook. Here I coded my own Asteroid shooter for a handheld console I cut from acrylic sheet. Nobody told me I wasn&apos;t allowed to.',
    },
    {
      name: 'Devansh Kulkarni',
      age: 15,
      role: 'Go Backend & Telegram Bot Maker',
      school: 'BVM Civil Lines, Class 10',
      quote: 'My parents were nervous when I said I was spending Saturday building a transit bot instead of coaching. When 60 students started using it to catch the Sitabuldi metro, they finally got it.',
    },
  ];

  return (
    <section id="about" className="py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="mb-8 pb-3 border-b border-slate-200 dark:border-white/10">
        <h2 className="text-3xl sm:text-4xl text-slate-900 dark:text-white flex items-center gap-3 font-semibold font-display">
          <span>✨</span>
          <span>What is Hack Club Nagpur?</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          By high schoolers, for high schoolers. 100% free, forever.
        </p>
      </div>

      {/* Main Story Box */}
      <div className="hc-card p-6 sm:p-10 mb-8 border border-slate-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <h3 className="text-2xl sm:text-3xl text-slate-900 dark:text-white font-medium font-accent">
              Built by teenagers in Nagpur who refused to wait for college.
            </h3>
            <p>
              In Nagpur, the standard path is beaten into everyone from age 14: wake up early, go to school, rush to coaching classes in Sitabuldi or Dharampeth, solve formula sheets, repeat until 12th board exams.
            </p>
            <p>
              A few of us decided that was depressing. We wanted to build video games, write Telegram scrapers, solder microcontrollers, ship real websites to the internet, and actually <span className="text-[#EC3750] font-semibold">make things</span> with friends who share that curiosity.
            </p>
            <p>
              Hack Club Nagpur is part of Hack Club, a global 501(c)(3) nonprofit network with over 156,000 teenagers across the world. Everything we do is completely free: free hardware kits, free food, free venue access.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
              <div className="font-display text-3xl font-semibold text-[#EC3750] mb-1">156,000+</div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">Teens in global Hack Club network</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
              <div className="font-display text-3xl font-semibold text-[#33D6A6] mb-1">₹0</div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">Cost to join or attend any meetup</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
              <div className="font-display text-3xl font-semibold text-[#FF8C37] mb-1">13–18</div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">Age group for members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Teen Voices Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {studentMakers.map((maker, idx) => (
          <div key={idx} className="hc-card p-6 flex flex-col justify-between border border-slate-200 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#EC3750]/20 flex items-center justify-center text-[#EC3750] font-bold text-xs">
                  {maker.name[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{maker.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Age {maker.age} · {maker.school}</div>
                </div>
              </div>

              <div className="text-xs font-bold text-[#EC3750] mb-3">
                {maker.role}
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;{maker.quote}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
