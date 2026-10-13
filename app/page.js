// Booking link: set this to your Cal.com event URL (e.g. "https://cal.com/jaypurohit/intro").
// While it is empty, the primary button falls back to email.
const BOOKING_URL = "https://cal.com/jaypurohit-growth/intro";

const EMAIL = "jaypurohit9294@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Hello%20Jay`;
const LINKEDIN = "https://www.linkedin.com/in/jaypurohit-growth/";
const PRIMARY = BOOKING_URL
  ? { label: "Book a 20-min call", href: BOOKING_URL, external: true }
  : { label: "Email me", href: MAILTO, external: false };

/* ---------- Signup chart (Supabase auth export, external signups, by month) ---------- */
const signups = [
  ["Jul", 7], ["Aug", 15], ["Sep", 46], ["Oct", 40], ["Nov", 93], ["Dec", 102],
  ["Jan", 87], ["Feb", 109], ["Mar", 59], ["Apr", 126], ["May", 128], ["Jun", 110],
  ["Jul", 91], ["Aug", 98], ["Sep", 108],
];

function SignupChart({ compact = false }) {
  const W = compact ? 420 : 860;
  const H = compact ? 300 : 340;
  const L = compact ? 34 : 52;
  const R = compact ? 40 : 64;
  const T = 48;
  const B = 44;
  const pw = W - L - R;
  const ph = H - T - B;
  const max = 140;
  const x = (i) => L + (i * pw) / (signups.length - 1);
  const y = (v) => T + ph * (1 - v / max);
  const pts = signups.map(([, v], i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
  const line = `M${pts.join(" L")}`;
  const area = `${line} L${x(signups.length - 1).toFixed(1)},${y(0)} L${x(0)},${y(0)} Z`;
  const ticks = compact
    ? [[0, "Jul 2025"], [6, "Jan 2026"], [14, "Sep 2026"]]
    : [[0, "Jul 2025"], [3, "Oct"], [6, "Jan 2026"], [9, "Apr"], [12, "Jul"], [14, "Sep 2026"]];
  const fillId = compact ? "signupFillS" : "signupFillL";
  const fs = compact ? 16 : 13;
  const fv = compact ? 18 : 15;
  const emphasis = new Set([0, 10, 14]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={compact ? "chart-svg chart-compact" : "chart-svg chart-full"}
      role="img"
      aria-label="Area chart of nRev monthly signups from July 2025 to September 2026: 7 in July 2025, rising past 90 by November, a peak of 128 in May 2026 and 108 in September 2026."
    >
      <defs>
        <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 50, 100].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#242d48" strokeWidth="1" />
          <text x={L - 12} y={y(v) + 5} textAnchor="end" fontSize={fs} fontWeight="600">
            {v}
          </text>
        </g>
      ))}

      <path d={area} fill={`url(#${fillId})`} />
      <path d={line} fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

      {/* Annotations */}
      <line x1={x(4)} x2={x(4)} y1={T - 18} y2={y(93) - 10} stroke="#c4b5fd" strokeWidth="1" strokeDasharray="3 4" />
      <line x1={x(5)} x2={x(5)} y1={T - 18} y2={y(102) - 10} stroke="#c4b5fd" strokeWidth="1" strokeDasharray="3 4" />
      <text x={(x(4) + x(5)) / 2} y={T - 24} textAnchor="middle" fontSize={fs} fontWeight="700">
        {compact ? "Workshops" : "In-person workshops"}
      </text>
      <line x1={x(9)} x2={x(9)} y1={T - 18} y2={y(126) - 10} stroke="#c4b5fd" strokeWidth="1" strokeDasharray="3 4" />
      <text x={x(9)} y={T - 24} textAnchor="middle" fontSize={fs} fontWeight="700">
        {compact ? "Product Hunt" : "Product Hunt launch"}
      </text>

      {signups.map(([, v], i) => (
        <circle
          key={i}
          cx={x(i)}
          cy={y(v)}
          r={emphasis.has(i) ? 6 : 4}
          fill={emphasis.has(i) ? "#a78bfa" : "#6366f1"}
          stroke="#0a0e17"
          strokeWidth="3"
        />
      ))}

      <text x={x(0) + 10} y={y(7) - 12} fontSize={fv} fontWeight="800">7</text>
      <text x={x(10) + 10} y={y(128) + 5} fontSize={fv} fontWeight="800">128</text>
      <text x={x(14) + 12} y={y(108) + 5} fontSize={fv} fontWeight="800">108</text>

      {ticks.map(([i, label]) => (
        <text
          key={label}
          x={x(i)}
          y={H - 14}
          textAnchor={i === 0 ? "start" : i === signups.length - 1 ? "end" : "middle"}
          fontSize={fs}
          fontWeight="600"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

/* ---------- System flow diagram ---------- */
function FlowDiagram({ id, sources, hub, output }) {
  const gap = 56;
  const top = 40;
  const height = top * 2 + gap * (sources.length - 1);
  const cy = height / 2;
  const srcX = 210;
  const hubX = 430;
  const r = 52;
  const outX = 590;

  return (
    <svg
      viewBox={`0 0 800 ${height}`}
      className="flow-svg"
      role="img"
      aria-label={`${sources.join(", ")} feed ${hub.label} (${hub.sub}), which produces ${output.label}`}
    >
      {sources.map((label, i) => {
        const sy = top + i * gap;
        return (
          <g key={`${id}-${label}`}>
            <line x1={srcX} y1={sy} x2={hubX - r} y2={cy} stroke="#242d48" strokeWidth="1.5" />
            <line
              x1={srcX}
              y1={sy}
              x2={hubX - r}
              y2={cy}
              stroke="#a78bfa"
              strokeWidth="1.5"
              strokeDasharray="3 8"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-44"
                dur="3.2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
            <circle cx={srcX} cy={sy} r="5" fill="#a78bfa" />
            <text x={srcX - 16} y={sy + 5} textAnchor="end" fontSize="15" fontWeight="600">
              {label}
            </text>
          </g>
        );
      })}

      <circle cx={hubX} cy={cy} r={r} fill="#161e33" stroke="#6366f1" strokeWidth="2" />
      <text x={hubX} y={cy + 1} textAnchor="middle" fontSize="18" fontWeight="800">
        {hub.label}
      </text>
      <text x={hubX} y={cy + 20} textAnchor="middle" fontSize="12" fontWeight="700" style={{ fill: "#c4b5fd" }}>
        {hub.sub}
      </text>

      <line x1={hubX + r} y1={cy} x2={outX - 7} y2={cy} stroke="#242d48" strokeWidth="2" />
      <line x1={hubX + r} y1={cy} x2={outX - 7} y2={cy} stroke="#6366f1" strokeWidth="2" strokeDasharray="5 8">
        <animate attributeName="stroke-dashoffset" from="0" to="-52" dur="2.4s" repeatCount="indefinite" />
      </line>
      <circle cx={outX} cy={cy} r="7" fill="#6366f1" />
      <text x={outX + 18} y={cy - 4} fontSize="16" fontWeight="800">
        {output.label}
      </text>
      <text x={outX + 18} y={cy + 17} fontSize="13" fontWeight="600">
        {output.sub}
      </text>
    </svg>
  );
}

function FlowStack({ sources, hub, output }) {
  return (
    <div className="flow-stack" aria-hidden="true">
      <ul className="tags">
        {sources.map((x) => (
          <li className="tag" key={x}>{x}</li>
        ))}
      </ul>
      <span className="flow-arrow">↓</span>
      <p className="flow-hub-pill">
        {hub.label} <span>{hub.sub}</span>
      </p>
      <span className="flow-arrow">↓</span>
      <p className="flow-out">
        {output.label} <span>{output.sub}</span>
      </p>
    </div>
  );
}

/* ---------- Content ---------- */
const proof = [
  { num: "324", unit: "", label: "booked meetings fed at nRev" },
  { num: "30", unit: "", label: "paying customers, no paid ads" },
  { num: "33.5", unit: "K", label: "AI-answer citations, 93% non-branded" },
  { num: "26", unit: "x", label: "organic search sessions in 13 months" },
];

const cases = [
  {
    id: "seo",
    kicker: "SEO and AEO",
    title: "A search engine that works the Monday shift",
    problem: (
      <>
        A seed-stage site getting <b>56 organic visits a month</b>, and no ad budget to buy the rest.
      </>
    ),
    flow: {
      sources: ["Search Console", "GA4", "Firecrawl", "Webflow CMS"],
      hub: { label: "Claude", sub: "via MCP" },
      output: { label: "Move of the week", sub: "approve, then ship" },
    },
    built: [
      "A Python MCP server that plugs Search Console and GA4 straight into Claude, so research, briefs and page fixes happen in one session.",
      "On top of it, the Weekly SEO Brain. Every Monday it reads the data, ranks the one move worth making and stages the fix. Nothing ships until I approve it in the Elite dashboard.",
    ],
    results: [
      { b: "26x", s: "organic search sessions, 56 to 1,452 a month" },
      { b: "33.5K", s: "AI-answer citations across Copilot, Bing and AI Overviews" },
      { b: "1,000+", s: "pages shipped on Webflow: blog, glossary, jobs, tools" },
    ],
    lesson:
      "Ranking isn't the same as being cited. AI builds its answer from whoever is easiest to quote, so I wrote pages to be quoted.",
    figure: {
      src: "/aeo-anatomy-card.png",
      alt: "Graphic titled The anatomy of a 13,650-citation AEO page, listing five steps: pick a best-of category, answer in the first 200 words, put your product first with specifics, back rankings with numbers, end with a real FAQ.",
      caption: "From my LinkedIn: the anatomy of nRev's most-cited page, and the five rules behind it.",
    },
    tags: ["Python MCP", "Claude", "Search Console", "Webflow", "Bing Webmaster"],
    link: { label: "Open the Elite dashboard", url: "https://nrev-elite-dashboard.vercel.app" },
  },
  {
    id: "events",
    kicker: "Event-led demand",
    title: "An event machine that turned rooms into customers",
    problem: (
      <>
        A new category that buyers had to <b>see working</b> before they would sign up.
      </>
    ),
    flow: {
      sources: ["Buying signals", "Apollo enrichment", "Instantly invites", "WhatsApp nudges"],
      hub: { label: "Luma", sub: "approval gate" },
      output: { label: "HubSpot, then sales", sub: "ICP-only rooms" },
    },
    built: [
      "Account lists built from buying signals and enriched in Apollo, personalized invites through Instantly and WhatsApp, an approval gate on Luma so every room stayed ICP-only, and registrants routed to sales in HubSpot.",
      "The founders ran the rooms. I built the machine that filled them.",
    ],
    results: [
      { b: "25", s: "GTM events run or represented in 10 months" },
      { b: "564", s: "approved registrations on nRev's event calendar" },
      { b: "3.7%", s: "replies on signal-based invites, about 4x our average" },
    ],
    lesson:
      "Our biggest webinar drew 97 registrations and 2 signups that day. Hands-on workshops ran 2 to 4x a normal week. Seats are applause. Signups are the score.",
    tags: ["Luma", "Instantly", "Apollo", "HubSpot", "WhatsApp"],
  },
  {
    id: "outbound",
    kicker: "Signal-based outbound",
    title: "An outbound lab that finds the signal before it scales",
    problem: (
      <>
        Cold email to people who had <b>never heard of the category</b>.
      </>
    ),
    flow: {
      sources: ["Competitor signal", "Hiring signal", "Hands-on users", "Staffing, Tech"],
      hub: { label: "Pilot", sub: "small batch" },
      output: { label: "Scale what replies", sub: "cut the rest early" },
    },
    built: [
      "Six message angles across about 3,000 leads, each piloted on a small batch first. Winners scaled. Losers were cut early to protect sender health.",
      "On LinkedIn, I worked every reply across 12 sender profiles and turned them into meetings.",
    ],
    results: [
      { b: "2.1%", s: "replies on competitor signals, about 5x the other angles" },
      { b: "2.3%", s: "bounce across 49 campaigns and 24,763 emails" },
      { b: "20 to 25", s: "booked meetings a month from LinkedIn replies" },
    ],
    lesson:
      "Timing beat targeting. People engaging with a competitor that week replied 5x more than people picked by hiring signals.",
    tags: ["Instantly", "Apollo", "LinkedIn", "Signal data"],
  },
];

const minis = [
  {
    title: "Product videos written in code",
    body: "Built with Remotion and Claude Code, so updating a video means editing a file, not booking a reshoot.",
  },
  {
    title: "A jobs agent that posts every week",
    body: "Ran nRev's jobs agent for 27 weeks to source GTM roles: 283 listings and a weekly job-board post with 15.4K impressions.",
  },
  {
    title: "Brand QA that runs before I do",
    body: "Brand guidelines, a QA rubric and Claude skills that check pages and posts before they go live.",
  },
  {
    title: "Free tools that pull search traffic",
    body: "Co-built with the founders: 18 free GTM tools that drew 257 search clicks in about two months, plus a 48-signal library.",
  },
];

const calls = [
  {
    title: "Shut down paid search at MarkovML",
    body: "Ran a $10K a month Google Ads program for six months to test CAC payback. The data showed our persona wasn't searching for the product as positioned, so I stopped it. The company changed its positioning soon after.",
  },
  {
    title: "Helped a CEO walk away from a launch",
    body: "Hired at Samespace to market a new product, I researched the category, found it crowded and weak, and helped the CEO decide not to pursue it.",
  },
  {
    title: "Moved the KPI from seats to signups",
    body: "Open webinars filled up and barely moved signups. Hands-on workshops converted on the day. Marketing's single KPI became ICP signups.",
  },
  {
    title: "Cut losing segments before they cost us",
    body: "Stopped the Staffing and Tech Services outbound angles after the pilot, which kept sender reputation intact for the angles that worked.",
  },
];

const career = [
  {
    years: "2025–Now",
    co: "nRev",
    role: "Founding Growth Marketer",
    win: "First marketing hire. Led a team of six. Grew company LinkedIn followers 108%, second of ten GTM peers.",
  },
  {
    years: "2023–25",
    co: "MarkovML",
    role: "Growth Marketing Lead, promoted from Content Marketer",
    win: "Relaunched the website for 30% organic pipeline growth in 90 days and a 25% conversion lift.",
  },
  {
    years: "2022–23",
    co: "Firework",
    role: "Content Marketing Analyst, Global",
    win: "Built SEO from zero for a US team: branded traffic up 160%, non-branded up 65%.",
  },
  {
    years: "2019–21",
    co: "Acquire.io",
    role: "Digital Marketing Executive, promoted to Community Manager",
    win: "250+ top-10 keywords in 3 months and a top-3 US ranking for \"co-browsing\".",
  },
  {
    years: "2017–22",
    co: "Earlier",
    role: "Samespace, Decathlon, BitWise",
    win: "Plus SEO and GTM consulting for Baroque Group in Dubai, Cogneesol and La Forêt.",
  },
];

const toolkit = [
  { group: "Build with", items: ["Claude", "Claude Code", "MCP servers", "Remotion", "Firecrawl", "Next.js"] },
  { group: "Run demand", items: ["Instantly", "Apollo", "HubSpot", "Luma", "Brevo", "Webflow"] },
  { group: "Measure", items: ["GA4", "Search Console", "Bing Webmaster", "Looker Studio", "Mixpanel", "Ahrefs"] },
];

const writing = [
  { title: "SEO audit for PriceLabs", tag: "Work sample, PDF", url: "/priceLabs-seo-audit-assignment.pdf" },
  { title: "HackerNoon", tag: "Author page", url: "https://hackernoon.com/about/jay-purohit" },
  { title: "Make.com: Automated customer service", tag: "Bylined, 2020", url: "https://www.make.com/en/blog/automated-customer-service" },
  { title: "CustomerThink", tag: "Author page", url: "https://customerthink.com/author/jaypurohit/" },
  { title: "WebEngage", tag: "Author page", url: "https://webengage.com/author/jaypurohit/" },
  {
    title: "Determ: 5 types of customer service software",
    tag: "Bylined, 2021",
    url: "https://determ.com/blog/5-types-of-customer-service-software-that-enhance-support-quality/",
  },
  {
    title: "Capturly: Session replay and customer satisfaction",
    tag: "Ghostwritten",
    url: "https://capturly.com/blog/5-ideas-for-using-session-replay-to-ensure-customer-satisfaction/",
  },
  { title: "Digital insurance whitepaper", tag: "Ghostwritten, PDF", url: "/writing-sample-digital-insurance-whitepaper.pdf" },
  { title: "Hyperautomation: a practical guide", tag: "Ghostwritten, PDF", url: "/writing-sample-hyperautomation-guide.pdf" },
];

function PrimaryButton({ className = "btn btn-primary" }) {
  return (
    <a
      className={className}
      href={PRIMARY.href}
      {...(PRIMARY.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {PRIMARY.label}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner wrap-wide">
          <a href="#top" className="wordmark">
            Jay Purohit<span>.</span>
          </a>
          <ul className="nav-links">
            <li className="nav-hide"><a href="#work">Work</a></li>
            <li className="nav-hide"><a href="#calls">Calls</a></li>
            <li className="nav-hide"><a href="#career">Career</a></li>
            <li>
              <PrimaryButton className="btn btn-primary btn-sm" />
            </li>
          </ul>
        </div>
      </nav>

      <main id="top">
        <header className="hero wrap-wide">
          <p className="eyebrow">GTM engineering · Demand generation · B2B SaaS</p>
          <h1>
            I build the <em>GTM engine</em> that fills your pipeline.
          </h1>
          <p className="hero-sub">
            Last build: 324 booked meetings and 30 paying customers at nRev, with no paid ads.
          </p>
          <div className="hero-actions">
            <PrimaryButton />
            <a className="btn btn-ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Download resume
            </a>
            <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
          <div className="hero-meta">
            <img src="/jay-profile.jpeg" alt="Jay Purohit" width="44" height="44" className="avatar" />
            <span>9+ years in B2B SaaS · Three 0-to-1 builds · Pune, open to remote</span>
          </div>
        </header>

        <section className="proof wrap-wide" aria-label="Headline results">
          <div className="proof-grid">
            {proof.map((s) => (
              <div key={s.label}>
                <div className="stat-num">
                  {s.num}
                  <span className="unit">{s.unit}</span>
                </div>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap-wide" aria-label="Signup growth">
          <div className="chart-card">
            <div className="chart-head">
              <p className="kicker">Monthly signups at nRev, during my tenure</p>
              <h2>1,200+ signups, from under 10 a month to about 100. No paid ads.</h2>
            </div>
            <SignupChart />
            <SignupChart compact />
            <p className="chart-source">
              Source: nRev Supabase auth export, external signups only (internal and test accounts removed),
              Jul 2025 to Sep 2026. Company results; I led growth.
            </p>
            <div className="customers">
              <p>Accounts that came through the event program I ran, then became paying customers:</p>
              <ul className="customer-names">
                <li>PriceLabs</li>
                <li>Spendflo</li>
                <li>Zuddl</li>
                <li>Mysa</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="work" className="section wrap-wide">
          <div className="section-head">
            <p className="kicker">Systems I built</p>
            <h2>Three engines behind the numbers.</h2>
            <p>Each one starts with a problem and ends with a number.</p>
          </div>

          {cases.map((c) => (
            <article className="case" key={c.id} id={`case-${c.id}`}>
              <p className="case-kicker">{c.kicker}</p>
              <h3>{c.title}</h3>
              <p className="case-problem">{c.problem}</p>
              <div className="flow">
                <FlowDiagram id={c.id} {...c.flow} />
                <FlowStack {...c.flow} />
              </div>
              <div className="case-body">
                <div className="case-built">
                  <p className="case-label">What I built</p>
                  {c.built.map((p) => (
                    <p key={p.slice(0, 30)}>{p}</p>
                  ))}
                </div>
                <div>
                  <p className="case-label">What it did</p>
                  <ul className="results">
                    {c.results.map((r) => (
                      <li key={r.b}>
                        <b>{r.b}</b>
                        <span>{r.s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={c.figure ? "lesson-row" : undefined}>
                <div className="lesson">
                  <p className="case-label">What I learned</p>
                  <p>{c.lesson}</p>
                </div>
                {c.figure && (
                  <figure className="case-figure">
                    <img src={c.figure.src} alt={c.figure.alt} width="720" height="900" loading="lazy" />
                    <figcaption>{c.figure.caption}</figcaption>
                  </figure>
                )}
              </div>
              <div className="case-foot">
                <ul className="tags">
                  {c.tags.map((t) => (
                    <li className="tag" key={t}>{t}</li>
                  ))}
                </ul>
                {c.link && (
                  <a className="text-link" href={c.link.url} target="_blank" rel="noopener noreferrer">
                    {c.link.label} ↗
                  </a>
                )}
              </div>
            </article>
          ))}

          <h3 className="mini-head">Smaller builds</h3>
          <div className="mini-grid">
            {minis.map((m) => (
              <div className="mini" key={m.title}>
                <h4>{m.title}</h4>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="calls" className="section wrap-wide">
          <div className="section-head">
            <p className="kicker">Calls I made</p>
            <h2>Good growth is mostly knowing what to stop.</h2>
          </div>
          <div className="calls">
            {calls.map((c) => (
              <div className="call" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="career" className="section wrap-wide">
          <div className="section-head">
            <p className="kicker">Career</p>
            <h2>Three 0-to-1 builds, nine years in.</h2>
          </div>
          <ul className="timeline">
            {career.map((r) => (
              <li key={r.co}>
                <span className="tl-years">{r.years}</span>
                <div>
                  <span className="tl-co">{r.co}</span>
                  <span className="tl-role">{r.role}</span>
                </div>
                <p className="tl-win">{r.win}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="toolkit" className="section wrap-wide">
          <div className="section-head">
            <p className="kicker">Toolkit</p>
            <h2>What I work in every day.</h2>
          </div>
          <div className="toolkit">
            {toolkit.map((g) => (
              <div key={g.group}>
                <h3>{g.group}</h3>
                <ul className="tags">
                  {g.items.map((t) => (
                    <li className="tag" key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="toolkit-note">
            MCA-trained. I build with Claude and Claude Code, so automation is something I ship myself.
          </p>
        </section>

        <section id="writing" className="section wrap-wide">
          <div className="section-head">
            <p className="kicker">Samples and writing</p>
            <h2>How I think on paper.</h2>
          </div>
          <ul className="link-list">
            {writing.map((w) => (
              <li key={w.url}>
                <a href={w.url} target="_blank" rel="noopener noreferrer">
                  {w.title}
                  <span>{w.tag} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="contact wrap-wide">
          <div className="contact-card">
            <img src="/jay-profile.jpeg" alt="Jay Purohit" width="88" height="88" className="avatar avatar-lg" />
            <p className="kicker">Next step</p>
            <h2>Let&rsquo;s build your pipeline engine.</h2>
            <p>
              Open to senior growth, demand generation and GTM engineering roles. Based in Pune, open to remote
              and relocation.
            </p>
            <div className="contact-actions">
              <PrimaryButton />
              <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </div>
            <div className="contact-lines">
              <span>{EMAIL}</span>
              <span>+91 79902 64350</span>
            </div>
          </div>
          <p className="footer-meta">Jay Purohit · Pune, India · Updated October 2026</p>
        </section>
      </main>
    </>
  );
}
