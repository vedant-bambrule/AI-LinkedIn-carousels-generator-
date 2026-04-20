import { Carousel, CarouselSlide, FormData } from '../types';
import { sendToZapier } from './zapier';

// ─────────────────────────────────────────────────────────────────────────────
//  10 specialised carousel templates — each one maps to a distinct content
//  strategy so that slides are meaningfully different across all carousels.
// ─────────────────────────────────────────────────────────────────────────────

const carouselTemplates = [
  {
    type: '🎯 Curiosity Hook',
    color: 'from-violet-600 to-purple-700',
    buildTopic: (n: string, a: string) =>
      `The ${n} Secret That 99% of ${a} Don't Know`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `What if everything you know about ${n} is wrong?`,
        content: [
          `Most ${a} follow the same playbook — and wonder why results stall`,
          `There's a counter-intuitive truth hiding in plain sight`,
          `Swipe to see what the top 1% actually do differently →`,
        ],
        hasImage: true,
        imageEmoji: '🎯',
      },
      {
        title: `The common assumption that's killing your ${n} growth`,
        content: [
          `"Work harder → get better results" sounds logical`,
          `But in ${n}, volume without strategy leads to burnout — not growth`,
          `The most successful ${a} work on fewer things, not more`,
        ],
      },
      {
        title: `Here's what the data actually shows`,
        content: [
          `Top-performing ${a} spend 80% of their time on ONE core ${n} activity`,
          `The remaining 20%? Experimentation and learning`,
          `This isn't a hack — it's the compounding secret`,
        ],
      },
      {
        title: `The hidden lever nobody talks about`,
        content: [
          `In ${n}, your biggest leverage point isn't effort — it's positioning`,
          `${a} who nail positioning get 3× results with half the effort`,
          `Positioning = who you serve + the specific problem you solve`,
        ],
      },
      {
        title: `Why curiosity beats expertise every time`,
        content: [
          `Experts assume they already know the answer`,
          `Curious ${a} keep asking "what if we tried this instead?"`,
          `In fast-moving ${n} markets, curiosity is the real moat`,
        ],
      },
      {
        title: `The pattern I see in every successful ${n} story`,
        content: [
          `They found a counter-intuitive insight early`,
          `They bet on it while everyone else hesitated`,
          `Then they taught others — which compounded their authority`,
        ],
      },
      {
        title: `Your action step for this week`,
        content: [
          `Write down your #1 assumption about ${n}`,
          `Find one piece of data that challenges it`,
          `Run a small experiment to test the alternative`,
        ],
      },
      {
        title: `Drop a 🎯 if this opened your eyes`,
        content: [
          `Follow for more counter-intuitive ${n} insights`,
          `Share this with a fellow ${a} who needs to see it`,
          `What's YOUR biggest ${n} assumption? Comment below ↓`,
        ],
      },
    ],
  },

  {
    type: '😤 Pain Point',
    color: 'from-rose-500 to-red-700',
    buildTopic: (n: string, a: string) =>
      `Why ${a} Are Frustrated with ${n} (And How to Fix It)`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `You're doing everything "right" in ${n} — so why isn't it working?`,
        content: [
          `You post consistently. You engage. You follow all the advice.`,
          `Yet the needle barely moves for your ${n} efforts.`,
          `You're not the problem. The approach is. Swipe to see why →`,
        ],
        hasImage: true,
        imageEmoji: '😤',
      },
      {
        title: `Pain #1 — Generic ${n} advice designed for nobody`,
        content: [
          `"Post 3× a week" helps no ${a} grow a real business`,
          `Cookie-cutter tactics ignore your specific market context`,
          `Fix: Get hyper-specific about your ideal customer's #1 struggle`,
        ],
      },
      {
        title: `Pain #2 — Chasing vanity metrics instead of revenue signals`,
        content: [
          `Likes and reach feel good — but they don't pay the bills`,
          `Most ${a} optimise for impressions, not inbound leads`,
          `Fix: Track DMs, replies, and link clicks — not views`,
        ],
      },
      {
        title: `Pain #3 — ${n} strategy that doesn't match your stage`,
        content: [
          `What works for a Series B company won't work for an early-stage ${a}`,
          `Copying established players' ${n} playbook is a trap`,
          `Fix: Build the strategy that fits where YOU are right now`,
        ],
      },
      {
        title: `Pain #4 — No clear message, so nobody buys`,
        content: [
          `If a stranger can't explain what you do in one sentence, you're invisible`,
          `Most ${a} try to appeal to everyone — and reach no one`,
          `Fix: "I help [specific ${a}] achieve [specific result] without [main frustration]"`,
        ],
      },
      {
        title: `The real reason ${n} feels exhausting`,
        content: [
          `You're operating without a repeatable system`,
          `Every week starts from scratch — content, outreach, follow-ups`,
          `Once you build the system, ${n} becomes a compounding asset`,
        ],
      },
      {
        title: `Here's your 3-step reset`,
        content: [
          `① Audit: Which one ${n} activity drives 80% of your leads?`,
          `② Eliminate everything that doesn't support that activity`,
          `③ Build a repeatable weekly rhythm around your core lever`,
        ],
      },
      {
        title: `If this resonated, you're not alone`,
        content: [
          `Thousands of ${a} hit this exact wall`,
          `The fix is simpler than most think — start with one change`,
          `Save this to revisit when ${n} overwhelm hits again 📌`,
        ],
      },
    ],
  },

  {
    type: '📊 Data-Driven',
    color: 'from-cyan-500 to-blue-700',
    buildTopic: (n: string, a: string) =>
      `${n} by the Numbers: What the Data Says for ${a}`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `We analysed the top ${n} performers. Here's what the numbers revealed.`,
        content: [
          `500+ ${a} studied over 12 months`,
          `One clear pattern separates the top 10% from the rest`,
          `The results will surprise you → Swipe for the data`,
        ],
        hasImage: true,
        imageEmoji: '📊',
      },
      {
        title: `Stat #1 — 78% of ${a} have no documented ${n} strategy`,
        content: [
          `Yet those WITH a written strategy are 3.5× more likely to hit goals`,
          `The act of writing it down forces clarity`,
          `Takeaway: Document your ${n} playbook — even a one-pager works`,
        ],
      },
      {
        title: `Stat #2 — ${n} content with data gets 2× more shares`,
        content: [
          `Opinions are forgettable. Numbers are shareable.`,
          `${a} who cite stats in their content build authority 40% faster`,
          `Takeaway: Lead every post with a surprising number`,
        ],
      },
      {
        title: `Stat #3 — Consistency beats virality 9 times out of 10`,
        content: [
          `${a} who post 3× per week for 6 months outperform viral one-hit wonders`,
          `Compound growth in ${n} follows the same curve as compound interest`,
          `Takeaway: Show up reliably — the algorithm rewards it`,
        ],
      },
      {
        title: `Stat #4 — The first 60 minutes decide organic reach`,
        content: [
          `Posts that get comments in the first hour receive 65% more distribution`,
          `Top ${a} seed engagement by replying to every comment immediately`,
          `Takeaway: Stay online for 1 hour after posting — always`,
        ],
      },
      {
        title: `Stat #5 — Niche accounts grow 3× faster than generalists`,
        content: [
          `${a} who own a micro-niche in ${n} attract hyper-qualified audiences`,
          `A smaller, loyal audience converts at 8× the rate of a broad one`,
          `Takeaway: Go narrower than you think is reasonable`,
        ],
      },
      {
        title: `What the top 10% of ${a} all have in common`,
        content: [
          `Written goals + documented ${n} strategy`,
          `Data-informed decisions — not gut-feel`,
          `Consistent execution over 90+ days before expecting results`,
        ],
      },
      {
        title: `Save this data for your next ${n} planning session`,
        content: [
          `Which stat surprised you most? Comment below ↓`,
          `Follow for weekly ${n} insights backed by real data`,
          `Tag a ${a} who needs to see these numbers`,
        ],
      },
    ],
  },

  {
    type: '❌ Common Mistakes',
    color: 'from-orange-500 to-amber-600',
    buildTopic: (n: string, a: string) =>
      `5 Costly ${n} Mistakes ${a} Keep Making in 2025`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `These ${n} mistakes are silently costing ${a} thousands every month`,
        content: [
          `I've seen the same 5 errors repeat across hundreds of ${n} strategies`,
          `The scary part? Most ${a} don't even realise they're making them`,
          `Swipe to do a quick self-audit →`,
        ],
        hasImage: true,
        imageEmoji: '❌',
      },
      {
        title: `Mistake #1 — Starting with tactics, not strategy`,
        content: [
          `Jumping to "what should I post?" before defining "who am I talking to?"`,
          `Tactics without strategy are just random acts of ${n}`,
          `Fix: Write your positioning statement BEFORE creating any content`,
        ],
      },
      {
        title: `Mistake #2 — Copying competitors instead of differentiating`,
        content: [
          `If your ${n} approach looks like everyone else's, you're invisible`,
          `${a} who imitiate leaders compete on their terms — and lose`,
          `Fix: Find the one angle your competitors are ignoring and own it`,
        ],
      },
      {
        title: `Mistake #3 — Treating ${n} as a one-time project`,
        content: [
          `"We did a ${n} push last quarter" — and then went quiet`,
          `Markets change, audiences evolve, algorithms shift`,
          `Fix: Build ${n} into your weekly operating rhythm, not a campaign`,
        ],
      },
      {
        title: `Mistake #4 — Ignoring distribution`,
        content: [
          `Great ${n} content that nobody sees is worthless`,
          `Most ${a} spend 90% on creation and 10% on distribution — it should be 50/50`,
          `Fix: Every piece of content needs a distribution plan before you hit publish`,
        ],
      },
      {
        title: `Mistake #5 — Measuring the wrong things`,
        content: [
          `Watching follower counts instead of pipeline growth`,
          `Celebrating reach instead of conversations started`,
          `Fix: Define your North Star metric for ${n} and track it weekly`,
        ],
      },
      {
        title: `Which mistake hit closest to home?`,
        content: [
          `Comment the number: 1, 2, 3, 4, or 5`,
          `No judgement — we've all been there`,
          `Awareness is the first step to fixing it`,
        ],
      },
      {
        title: `Ready to do ${n} the right way?`,
        content: [
          `Follow for practical ${n} playbooks for ${a}`,
          `Save this carousel for your next strategy review`,
          `Share with a fellow ${a} who might need to hear this`,
        ],
      },
    ],
  },

  {
    type: '🔥 Bold Opinion',
    color: 'from-red-500 to-pink-700',
    buildTopic: (n: string, a: string) =>
      `Unpopular Opinion: Most ${n} Advice for ${a} Is Wrong`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `Hot take: The standard ${n} advice is actively hurting ${a}.`,
        content: [
          `I'll probably get pushback for saying this out loud`,
          `But after years in ${n}, I can't stay quiet anymore`,
          `Here's what I actually believe → Swipe with an open mind`,
        ],
        hasImage: true,
        imageEmoji: '🔥',
      },
      {
        title: `Bold take #1 — Consistency is overrated`,
        content: [
          `Everyone preaches "post every day" — but daily posting of mediocre ${n} content hurts you`,
          `One exceptional piece beats seven forgettable ones every time`,
          `${a} should post less — and make each post undeniable`,
        ],
      },
      {
        title: `Bold take #2 — Community isn't your growth strategy`,
        content: [
          `"Build a community!" is the fastest path to unpaid work`,
          `Unless community IS your ${n} product, it's a distraction`,
          `${a} grow faster by serving a small audience incredibly well`,
        ],
      },
      {
        title: `Bold take #3 — Authenticity without value is just noise`,
        content: [
          `"Be authentic" has become an excuse to publish anything`,
          `Your audience doesn't owe you attention because you're being "real"`,
          `Authentic ${n} content that doesn't solve a real problem still fails`,
        ],
      },
      {
        title: `Bold take #4 — ${n} growth isn't linear — and that's fine`,
        content: [
          `Most ${a} panic when growth plateaus after 90 days`,
          `But every ${n} curve has stagnation phases before it compounds`,
          `The winners are those who don't quit during the silence`,
        ],
      },
      {
        title: `Why I'm sharing opinions that might lose me followers`,
        content: [
          `Because watered-down advice doesn't serve ${a} who need real growth`,
          `The people who disagree aren't my audience anyway`,
          `Polarising content builds a loyal audience — not a large one`,
        ],
      },
      {
        title: `Disagree? Good. Let's debate.`,
        content: [
          `Which take did you push back on most? Comment below ↓`,
          `Healthy disagreement makes everyone's ${n} thinking sharper`,
          `I reply to every comment — come at me 😄`,
        ],
      },
      {
        title: `If even one take challenged your thinking…`,
        content: [
          `Follow for more first-principles ${n} thinking`,
          `Share with a ${a} who you think will disagree`,
          `Save this as a reminder to question the default playbook`,
        ],
      },
    ],
  },

  {
    type: '✨ Before / After',
    color: 'from-emerald-500 to-teal-700',
    buildTopic: (n: string, a: string) =>
      `How I Transformed My ${n} Results in 90 Days (Before vs After)`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `90 days ago, my ${n} was stalled. Today, everything is different.`,
        content: [
          `I'm sharing the exact steps that changed the outcome for me as a ${a}`,
          `No hacks. No secret tools. Just a different approach.`,
          `Swipe to see the before/after breakdown →`,
        ],
        hasImage: true,
        imageEmoji: '✨',
      },
      {
        title: `BEFORE — The ${n} struggle was real`,
        content: [
          `Posting about ${n} with zero strategy and hoping something sticks`,
          `Getting likes from peers, not potential clients`,
          `Feeling like ${n} is a blackhole for time with no ROI`,
        ],
      },
      {
        title: `The turning point — One shift changed everything`,
        content: [
          `I stopped asking "What should I post about ${n}?"`,
          `And started asking "What does my ${a} audience need to believe to hire me?"`,
          `That reframe changed my entire ${n} content strategy overnight`,
        ],
      },
      {
        title: `AFTER — Week 1 to Week 4`,
        content: [
          `Defined my single ${n} niche instead of being a generalist`,
          `Wrote content around my audience's top 3 objections`,
          `First inbound inquiry arrived in week 3 — from someone who saved slide 2`,
        ],
      },
      {
        title: `AFTER — Month 2 Results`,
        content: [
          `5× more meaningful DM conversations from ${a} ready to buy`,
          `Organic ${n} leads without spending on ads`,
          `Email list grew from 200 to 800 subscribers`,
        ],
      },
      {
        title: `AFTER — Month 3 Reality Check`,
        content: [
          `Not every week is a win — some content still flops`,
          `But the system is now bigger than any single piece`,
          `Revenue from ${n}-driven leads: up 40% vs. same period last year`,
        ],
      },
      {
        title: `The 3 decisions that made the difference`,
        content: [
          `① Niched down to ONE ${n} topic I could be known for`,
          `② Posted with a distribution plan, not just a publish button`,
          `③ Treated every comment as a relationship — not a metric`,
        ],
      },
      {
        title: `Your 90-day before/after starts today`,
        content: [
          `Save this as your benchmark and revisit in 90 days`,
          `DM me "${n}" and I'll share the exact template I used`,
          `What's YOUR current biggest ${n} obstacle? Comment below ↓`,
        ],
      },
    ],
  },

  {
    type: '💡 Pro Tips',
    color: 'from-yellow-400 to-orange-500',
    buildTopic: (n: string, a: string) =>
      `7 Pro ${n} Tips That Took Me Years to Learn (${a} Edition)`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `7 ${n} tips I wish someone had told me when I started`,
        content: [
          `These took years of trial, failure, and expensive mistakes to discover`,
          `Saving you the learning curve as a ${a}`,
          `Bookmark this now, thank me later →`,
        ],
        hasImage: true,
        imageEmoji: '💡',
      },
      {
        title: `Tip #1 — Write your CTA before your headline`,
        content: [
          `Know what action you want readers to take before anything else`,
          `It forces every slide in the ${n} carousel to build toward that outcome`,
          `Result: content that converts, not just content that entertains`,
        ],
      },
      {
        title: `Tip #2 — Steal structure, never substance`,
        content: [
          `Study how top ${a} in ${n} format their content — not what they say`,
          `Adapt the skeleton, fill it with your unique POV and examples`,
          `This is the ethical shortcut every great creator uses`,
        ],
      },
      {
        title: `Tip #3 — Your hook is 80% of your ${n} results`,
        content: [
          `If the first line doesn't stop the scroll, nothing else matters`,
          `Spend 30% of your writing time on the first sentence alone`,
          `Patterns that work: number + bold claim, question, or shocking stat`,
        ],
      },
      {
        title: `Tip #4 — Repurpose everything before creating anything new`,
        content: [
          `Your best ${n} ideas are already in your past content`,
          `One insight → thread → carousel → newsletter → short video`,
          `${a} who repurpose effectively publish 5× the content at 20% the effort`,
        ],
      },
      {
        title: `Tip #5 — Comment strategy beats posting strategy`,
        content: [
          `Leaving 10 thoughtful comments on peers' posts beats posting once`,
          `You borrow authority and reach from established ${n} creators`,
          `The best ${a} I know spend 30 min/day commenting, not creating`,
        ],
      },
      {
        title: `Tip #6 — End every piece with a micro-commitment`,
        content: [
          `"Comment 🙋 if you agree" is not a CTA — it's decoration`,
          `Ask for ONE specific action tied to your ${n} goal`,
          `"DM me 'PLAYBOOK' for the full ${n} template" converts 10× better`,
        ],
      },
      {
        title: `Tip #7 — Ship before you're ready`,
        content: [
          `The perfect ${n} strategy you never publish helps nobody`,
          `Your worst published content teaches you more than your best draft`,
          `${a} who ship consistently improve 10× faster than perfectionists`,
        ],
      },
      {
        title: `Which tip are you implementing first?`,
        content: [
          `Drop the tip number in the comments ↓`,
          `Follow for weekly ${n} pro tips for ${a}`,
          `Save this so you can revisit when you get stuck`,
        ],
      },
    ],
  },

  {
    type: '📖 Personal Story',
    color: 'from-indigo-500 to-blue-800',
    buildTopic: (n: string, a: string) =>
      `My Honest ${n} Journey as a ${a}: What Nobody Shows You`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `I almost gave up on ${n} 6 months in. Here's the story I never told.`,
        content: [
          `Everyone shares the highlight reel — I'm sharing the full picture`,
          `This is for every ${a} who's feeling invisible right now`,
          `Swipe for the unfiltered truth →`,
        ],
        hasImage: true,
        imageEmoji: '📖',
      },
      {
        title: `Chapter 1 — Why I started with ${n}`,
        content: [
          `I became a ${a} because I believed I had something valuable to offer`,
          `But I had zero idea how to get the right people to find me`,
          `${n} seemed like the answer — in theory`,
        ],
      },
      {
        title: `Chapter 2 — The first 90 days: humbling`,
        content: [
          `I posted consistently for 3 months. My audience was mostly other ${a}s.`,
          `I was learning ${n} in public — which felt like failure at the time`,
          `Zero inbound leads. Lots of self-doubt.`,
        ],
      },
      {
        title: `Chapter 3 — The moment things started to click`,
        content: [
          `I stopped trying to sound like a ${n} expert and started sharing real stories`,
          `One personal post about a ${n} failure got more engagement than 20 polished posts combined`,
          `Lesson: People connect with honesty, not perfection`,
        ],
      },
      {
        title: `Chapter 4 — Building momentum`,
        content: [
          `Once I found my authentic ${n} voice, growth followed naturally`,
          `Not viral growth — steady, compounding growth of the right audience`,
          `${a}s started reaching out: "This is exactly my situation too"`,
        ],
      },
      {
        title: `Chapter 5 — What ${n} really taught me`,
        content: [
          `${n} isn't a traffic strategy — it's a trust-building strategy`,
          `Every piece of content is either depositing or withdrawing from your credibility bank`,
          `The ${a}s who win long-term are the ones who deposit consistently`,
        ],
      },
      {
        title: `Where I am today`,
        content: [
          `Building with intention, not anxiety`,
          `${n} that attracts clients who already trust me before the first call`,
          `Grateful I didn't quit in month 3`,
        ],
      },
      {
        title: `Your story matters too`,
        content: [
          `What's the hardest thing about being a ${a} that nobody talks about?`,
          `Share in the comments — let's normalise the real journey`,
          `Follow for more honest ${n} stories, not just tutorials`,
        ],
      },
    ],
  },

  {
    type: '🗂️ Framework',
    color: 'from-slate-600 to-gray-800',
    buildTopic: (n: string, a: string) =>
      `The GROW Framework: The Only ${n} System ${a} Need`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `Stop winging ${n}. Here's the exact framework I use every week.`,
        content: [
          `I call it the GROW Framework — built for ${a} doing ${n}`,
          `It replaces 10 ad-hoc decisions with one repeatable system`,
          `Swipe to get the full system →`,
        ],
        hasImage: true,
        imageEmoji: '🗂️',
      },
      {
        title: `G — Goal (Set a single North Star for the week)`,
        content: [
          `Before any ${n} activity: "What's the ONE outcome I want this week?"`,
          `Examples: 5 qualified DMs, 1 new case study, 50 email signups`,
          `Every piece of ${n} content should ladder up to this goal`,
        ],
      },
      {
        title: `R — Research (Know your audience better than they know themselves)`,
        content: [
          `Spend 20 min/week reading what your ${a} audience posts, complains about, and celebrates`,
          `Mine LinkedIn comments, Reddit threads, and DMs for real language`,
          `The best ${n} ideas come from your audience — not your own head`,
        ],
      },
      {
        title: `O — Output (Create with constraint)`,
        content: [
          `Choose ONE format this week: carousel, long post, or short hook`,
          `Constraint kills perfectionism and speeds up ${n} execution`,
          `Better to nail one format than produce five mediocre pieces`,
        ],
      },
      {
        title: `W — Win (Define what success looks like before you start)`,
        content: [
          `"Winning" at ${n} means hitting your pre-defined outcome — not going viral`,
          `Did you get 5 qualified DMs? That's a win, even with 200 views`,
          `Redefining success protects your motivation and ${n} consistency`,
        ],
      },
      {
        title: `How to run the GROW cycle weekly`,
        content: [
          `Monday: Set G (Goal) + R (Research) — 30 min`,
          `Tuesday–Wednesday: O (Output) — create your ${n} content`,
          `Friday: W (Win review) — what worked? What to repeat?`,
        ],
      },
      {
        title: `What ${a}s say after 4 weeks with GROW`,
        content: [
          `"I finally feel like my ${n} has a direction"`,
          `"I stopped second-guessing and just executed"`,
          `"My first warm lead came through ${n} in week 3"`,
        ],
      },
      {
        title: `Save this framework. Start Monday.`,
        content: [
          `DM me "GROW" and I'll send you the full worksheet`,
          `Tag a ${a} who needs a ${n} system in their life`,
          `Follow for frameworks that make ${n} simple and systematic`,
        ],
      },
    ],
  },

  {
    type: '🗳️ Interactive Poll',
    color: 'from-fuchsia-500 to-purple-700',
    buildTopic: (n: string, a: string) =>
      `${a} Edition: What's Your Biggest ${n} Challenge Right Now?`,
    buildSlides: (n: string, a: string): CarouselSlide[] => [
      {
        title: `Quick survey — what's holding ${a}s back from ${n} success?`,
        content: [
          `I asked 200+ ${a}s and the answers shocked me`,
          `The #1 answer was NOT what the gurus talk about`,
          `Comment your answer at the end — let's see if you match the trend →`,
        ],
        hasImage: true,
        imageEmoji: '🗳️',
      },
      {
        title: `Challenge A — "I don't know what to create for ${n}"`,
        content: [
          `40% of ${a}s say content ideation is their biggest block`,
          `Sitting at a blank screen kills momentum fast`,
          `Fix: Run a monthly "30 ideas in 30 minutes" brainstorm using your audience's questions`,
        ],
      },
      {
        title: `Challenge B — "I create ${n} content but get no engagement"`,
        content: [
          `30% of ${a}s say distribution and reach is the wall`,
          `Great content without an audience strategy fails silently`,
          `Fix: 10 comments on others' posts every day before you publish your own`,
        ],
      },
      {
        title: `Challenge C — "I don't have time for consistent ${n}"`,
        content: [
          `20% say time is the binding constraint`,
          `Most ${a}s overestimate how much time great ${n} requires`,
          `Fix: One 2-hour content batching session per week handles everything`,
        ],
      },
      {
        title: `Challenge D — "I don't know if ${n} is actually working"`,
        content: [
          `10% have a measurement problem — they can't connect ${n} to results`,
          `If you can't measure it, you can't improve it`,
          `Fix: Track DMs, inbound calls, and saved posts — not likes`,
        ],
      },
      {
        title: `The surprise finding from 200+ ${a}s`,
        content: [
          `The #1 real bottleneck isn't any of the above`,
          `It's confidence — fear of judgment was the silent killer`,
          `${a}s who post despite imposter syndrome grow 5× faster than those who wait`,
        ],
      },
      {
        title: `What's YOUR letter? A, B, C, or D?`,
        content: [
          `Comment below — I respond to every single one`,
          `I'll share a tailored ${n} resource based on your answer`,
          `No wrong answers — just data to help the whole community`,
        ],
      },
      {
        title: `You're part of something bigger`,
        content: [
          `Every ${a} who answers helps us map the real challenges in ${n}`,
          `Follow to see the full results post next week`,
          `Share this with a ${a} who's quietly struggling — they'll thank you`,
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────────────────────────────────────

export async function generateCarousels(formData: FormData): Promise<Carousel[]> {
  const { businessNiche, targetAudience } = formData;

  try {
    const zapierResponse = await sendToZapier(formData);
    if (zapierResponse && (Array.isArray(zapierResponse) || zapierResponse.carousels)) {
      console.log('Using carousel data from Zapier');
      return Array.isArray(zapierResponse) ? zapierResponse : zapierResponse.carousels;
    }
    console.log('Zapier response did not contain carousels, using local generation.');
  } catch (error) {
    console.warn('Zapier integration failed, using local fallback:', error);
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return carouselTemplates.map((template, index) => ({
    id: index + 1,
    topic: template.buildTopic(businessNiche, targetAudience),
    carouselType: template.type,
    carouselColor: template.color,
    slides: template.buildSlides(businessNiche, targetAudience),
  }));
}

// Placeholder for OpenAI API configuration
export const OPENAI_CONFIG = {
  apiKey: 'YOUR_OPENAI_API_KEY_HERE',
  model: 'gpt-4',
};
