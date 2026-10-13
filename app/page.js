function FlowDiagram({ id, sources, hub, output }) {
  const gap = 52;
  const top = 36;
  const height = top * 2 + gap * (sources.length - 1);
  const cy = height / 2;
  const srcX = 170;
  const hubX = 400;
  const hubR = 44;
  const outX = 560;

  return (
    <svg
      viewBox={`0 0 760 ${height}`}
      role="img"
      aria-label={`Diagram: ${sources.map((s) => s).join(", ")} flow into ${hub.label}, which outputs ${output.label}`}
      className="flow-svg"
    >
      {sources.map((label, i) => {
        const y = top + i * gap;
        return (
          <g key={`${id}-${label}`}>
            <line x1={srcX} y1={y} x2={hubX - hubR} y2={cy} stroke="var(--border)" strokeWidth="1.4" />
            <line
              x1={srcX}
              y1={y}
              x2={hubX - hubR}
              y2={cy}
              stroke="var(--accent-2)"
              strokeWidth="1.4"
              strokeDasharray="3 7"
              opacity="0.85"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-40"
                dur="3.4s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
            <circle cx={srcX} cy={y} r="4.5" fill="var(--accent-2)" />
            <text x={srcX - 16} y={y + 4} textAnchor="end" className="flow-label">
              {label}
            </text>
          </g>
        );
      })}

      <circle cx={hubX} cy={cy} r={hubR} fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="1.6" />
      <text x={hubX} y={cy - 2} textAnchor="middle" className="flow-hub">
        {hub.label}
      </text>
      <text x={hubX} y={cy + 15} textAnchor="middle" className="flow-hub-sub">
        {hub.sub}
      </text>

      <line x1={hubX + hubR} y1={cy} x2={outX - 6} y2={cy} stroke="var(--border)" strokeWidth="1.6" />
      <line
        x1={hubX + hubR}
        y1={cy}
        x2={outX - 6}
        y2={cy}
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeDasharray="4 8"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2.6s" repeatCount="indefinite" />
      </line>
      <circle cx={outX} cy={cy} r="5" fill="var(--accent)" />
      <text x={outX + 14} y={cy - 6} textAnchor="start" className="flow-label flow-label-out">
        {output.label}
      </text>
      <text x={outX + 14} y={cy + 13} textAnchor="start" className="flow-sub-out">
        {output.sub}
      </text>
    </svg>
  );
}

const proofStats = [
  { num: "324", unit: "", label: "booked meetings fed at nRev" },
  { num: "30", unit: "", label: "paying customers, no paid ads" },
  { num: "33.5", unit: "K", label: "AI-answer citations earned" },
  { num: "26", unit: "x", label: "organic search sessions" },
];

const systems = [
  {
    id: "seo",
    tag: "SEO · AEO · MCP",
    title: "An SEO and AEO engine that runs on Claude",
    outcome:
      "Organic search grew 26x, and nRev earned 33,525 AI-answer citations, 93% of them on non-branded category queries.",
    body: [
      "I built nrev-seo-mcp, a Python MCP server that gives Claude direct access to Search Console and GA4. Research, briefs and page fixes happen in one session, with no CSV exports in between.",
      "On top of it runs the Weekly SEO Brain: every Monday it reads Search Console, ranks the one move worth making that week, and stages the fix for approval. Nothing ships without a human yes. The Elite dashboard is where those findings get reviewed and approved, built on live nrev.ai data.",
    ],
    flow: {
      sources: ["Search Console", "GA4", "Firecrawl", "Webflow CMS"],
      hub: { label: "Claude", sub: "via MCP" },
      output: { label: "Move of the week", sub: "approve, then ship" },
    },
    stats: [
      { b: "26x", s: "organic search sessions, 56 to 1,452 a month" },
      { b: "33,525", s: "AI citations across Copilot, Bing and AI Overviews" },
      { b: "1,000+", s: "CMS pages: blog, glossary, jobs, tools, comparisons" },
    ],
    tags: ["Python MCP server", "Claude", "Next.js", "Webflow", "Bing Webmaster"],
    link: { label: "Open the Elite dashboard", url: "https://nrev-elite-dashboard.vercel.app" },
  },
  {
    id: "events",
    tag: "Event-led demand",
    title: "An event engine that turned rooms into customers",
    outcome:
      "25 GTM events in 10 months. PriceLabs and Spendflo came through the room and became paying customers.",
    body: [
      "I ran the program and the whole machine behind it: account lists built from buying signals and enriched in Apollo, personalized invites through Instantly and WhatsApp, an approval gate on Luma to keep every room ICP-only, and registrants routed into HubSpot for sales.",
      "The data changed how I judged events. The biggest webinar drew 97 registrations and 2 signups that day. Hands-on, in-person workshops ran 2 to 4x a normal week's signups. Registrations are applause; signups are the score.",
    ],
    flow: {
      sources: ["Buying signals", "Apollo enrichment", "Instantly invites", "WhatsApp nudges"],
      hub: { label: "Luma", sub: "approval gate" },
      output: { label: "HubSpot, then sales", sub: "workshop weeks: 2 to 4x signups" },
    },
    stats: [
      { b: "25", s: "GTM events run or represented, Sep 2025 to Jun 2026" },
      { b: "564", s: "approved registrations on nRev's event calendar" },
      { b: "3.7%", s: "reply rate on the signal-based invite, about 4x average" },
    ],
    tags: ["Luma", "Instantly", "Apollo", "HubSpot", "WhatsApp"],
  },
  {
    id: "outbound",
    tag: "Signal-based outbound",
    title: "An outbound lab that finds the winning signal before scaling",
    outcome:
      "Competitor-engagement signals replied at 2.1%, about 5x the hiring-signal and hands-on angles.",
    body: [
      "I ran a six-angle cold outbound test across about 3,000 leads. Each angle got a small pilot first. Winners scaled, losers were cut early to protect sender health, so bounce held at 2.3% across 49 campaigns.",
      "On LinkedIn, I handled every reply across 12 sender profiles, turning 150 to 200 replies a month into 20 to 25 booked meetings.",
    ],
    flow: {
      sources: ["Competitor signal", "Hiring signal", "Hands-on users", "Staffing / Tech"],
      hub: { label: "Pilot", sub: "small batch first" },
      output: { label: "Scale what replies", sub: "cut the rest early" },
    },
    stats: [
      { b: "2.1%", s: "replies on competitor signals, about 5x other angles" },
      { b: "24,763", s: "emails across 49 campaigns, 2.3% bounce" },
      { b: "20 to 25", s: "booked meetings a month from LinkedIn replies" },
    ],
    tags: ["Instantly", "Apollo", "LinkedIn", "Signal data"],
  },
];

const builds = [
  {
    title: "// video in code",
    body: "Product videos built in code with Remotion and Claude Code, so updating a video means editing a file, not booking a reshoot.",
  },
  {
    title: "// gtm jobs agent",
    body: "Ran nRev's jobs agent every week for 27 weeks to source GTM roles for the /gtm-jobs page and a weekly job-board post: 283 listings, 15.4K impressions.",
  },
  {
    title: "// content qa on autopilot",
    body: "Brand guidelines, a QA rubric and Claude skills that check pages and posts against them before they go live.",
  },
  {
    title: "// free tools + signals hub",
    body: "Co-built with the founders: 18 free GTM tools that drew 257 search clicks in about two months, plus a 48-signal library.",
  },
];

const calls = [
  {
    title: "Shut down paid search at MarkovML",
    body: "Ran a $10K a month Google Ads program for six months to test CAC payback. The data showed the target persona wasn't searching for the product as positioned, so I stopped it. The company changed its positioning soon after.",
  },
  {
    title: "Talked a CEO out of a product launch",
    body: "Hired at Samespace to market a new product. Researched the category, found it crowded and weak, and helped the CEO decide not to pursue it. Moved onto the core CX product instead.",
  },
  {
    title: "Judged events by signups, not seats",
    body: "Big open webinars filled up and barely moved signups. Hands-on workshops converted on the day. The KPI moved from registrations to ICP signups.",
  },
  {
    title: "Cut losing segments before they cost us",
    body: "Stopped the Staffing and Tech Services outbound angles after the pilot instead of scaling them, protecting sender reputation for the angles that worked.",
  },
];

const roles = [
  {
    company: "nRev",
    role: "Founding Growth Marketer · Jul 2025 – Present",
    meta: "First marketing hire · team of 6",
    body: "First marketing hire at an AI-native GTM automation platform, half of a two-person GTM team with the CEO. Fed the pipeline behind 324 booked meetings and 30 paying customers with no paid ads, through SEO and AEO, events and signal-based outbound. Owned the 75-page site, the company's LinkedIn presence and the measurement behind every channel, and led six people across growth ops, GTM engineering, design and web.",
    stats: [
      { b: "1,200+", s: "signups, from under 10 a month to about 100" },
      { b: "+108%", s: "company LinkedIn followers, 2nd of 10 GTM peers" },
      { b: "150+", s: "member GTM operators community seeded" },
    ],
  },
  {
    company: "MarkovML",
    role: "Growth Marketing Lead (promoted from Content Marketer) · Aug 2023 – Jul 2025",
    meta: "Relaunch, SEO moat, paid test",
    body: "Led the website relaunch (IA, UX, SEO, copy and positioning) that repositioned the platform for GTM teams. Built a 100+ page SEO moat ranking on page 1 for \"AI workflow builder\", and ran the company's paid search test.",
    stats: [
      { b: "30%", s: "organic pipeline growth in 90 days" },
      { b: "25%", s: "conversion-rate lift after the relaunch" },
      { b: "+40%", s: "non-branded traffic" },
    ],
  },
  {
    company: "Firework",
    role: "Content Marketing Analyst, Global (Contract) · Jul 2022 – Jun 2023",
    meta: "SEO from zero, US team",
    body: "Built the SEO function from zero for a San Mateo video-commerce company, working async with the US team and directing an SEO agency on execution.",
    stats: [
      { b: "+160%", s: "branded traffic" },
      { b: "+65%", s: "non-branded traffic" },
      { b: "-30%", s: "bounce rate" },
    ],
  },
  {
    company: "Acquire.io",
    role: "Digital Marketing Executive, promoted to Community Manager · Jun 2019 – Aug 2021",
    meta: "SEO and community",
    body: "Built a CX content site and a community from scratch, and held a top-3 US Google ranking for \"co-browsing\", a core product keyword.",
    stats: [
      { b: "250+", s: "top-10 keywords in 3 months" },
      { b: "1,000+", s: "Twitter followers in 6 months" },
      { b: "500", s: "member LinkedIn group" },
    ],
  },
];

const toolkit = [
  { group: "build with", items: ["Claude", "Claude Code", "MCP servers", "Remotion", "Firecrawl", "Next.js"] },
  { group: "run demand", items: ["Instantly", "Apollo", "HubSpot", "Luma", "Brevo", "Webflow"] },
  { group: "measure", items: ["GA4", "Search Console", "Bing Webmaster", "Looker Studio", "Mixpanel", "Ahrefs"] },
];

const writing = [
  { title: "HackerNoon · author profile", url: "https://hackernoon.com/about/jay-purohit", tag: "bylined" },
  {
    title: "Make.com · Automated Customer Service",
    url: "https://www.make.com/en/blog/automated-customer-service",
    tag: "bylined, 2020",
  },
  { title: "CustomerThink · author profile", url: "https://customerthink.com/author/jaypurohit/", tag: "bylined" },
  { title: "WebEngage · author profile", url: "https://webengage.com/author/jaypurohit/", tag: "bylined" },
  {
    title: "Determ · 5 Types of Customer Service Software",
    url: "https://determ.com/blog/5-types-of-customer-service-software-that-enhance-support-quality/",
    tag: "bylined, 2021",
  },
  {
    title: "Capturly · Session Replay for Customer Satisfaction",
    url: "https://capturly.com/blog/5-ideas-for-using-session-replay-to-ensure-customer-satisfaction/",
    tag: "ghostwritten",
  },
  {
    title: "Digital Insurance whitepaper",
    url: "/writing-sample-digital-insurance-whitepaper.pdf",
    tag: "ghostwritten, PDF",
  },
  { title: "Hyperautomation: A Practical Guide", url: "/writing-sample-hyperautomation-guide.pdf", tag: "ghostwritten, PDF" },
];

const LINKEDIN = "https://www.linkedin.com/in/jaypurohit-growth/";
const EMAIL = "mailto:jaypurohit9294@gmail.com";

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="nav-mark">
            <strong>Jay Purohit</strong> / gtm + demand
          </a>
          <ul className="nav-links">
            <li><a href="#systems">Systems</a></li>
            <li><a href="#calls">Calls</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main id="top">
        <section className="hero wrap">
          <p className="eyebrow">GTM ENGINEERING · DEMAND GENERATION · B2B SAAS</p>
          <h1>
            I build the <em>GTM engine</em> that fills your pipeline.
          </h1>
          <p className="hero-sub">
            9+ years building B2B SaaS demand from zero, three times over. At nRev, I fed the pipeline
            behind 324 booked meetings and 30 paying customers with no paid ads, and built the systems
            behind it myself with Claude and Claude Code.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={EMAIL}>
              Email me
            </a>
            <a className="btn btn-ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Download resume ↓
            </a>
            <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </section>

        <section className="proof wrap" aria-label="Headline results">
          <div className="proof-grid">
            {proofStats.map((s) => (
              <div key={s.label}>
                <div className="stat-num">
                  {s.num}
                  <span className="unit">{s.unit}</span>
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="proof-note">
            Company results during my tenure. Every number traces to Search Console, GA4, Bing Webmaster,
            Supabase or the CRM.
          </p>
        </section>

        <section id="systems" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// systems i built</span>
            <h2>The engines behind the numbers</h2>
          </div>
          {systems.map((s) => (
            <article className="case system" key={s.id} id={`system-${s.id}`}>
              <div className="case-head">
                <h3>{s.title}</h3>
                <span className="case-meta">{s.tag}</span>
              </div>
              <p className="system-outcome">{s.outcome}</p>
              <div className="flow">
                <FlowDiagram id={s.id} {...s.flow} />
              </div>
              {s.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <div className="build-tags">
                {s.tags.map((t) => (
                  <span className="build-tag" key={t}>{t}</span>
                ))}
              </div>
              <div className="case-stats">
                {s.stats.map((st) => (
                  <div className="case-stat" key={st.b}>
                    <b>{st.b}</b>
                    <span>{st.s}</span>
                  </div>
                ))}
              </div>
              {s.link && (
                <p className="case-link">
                  <a href={s.link.url} target="_blank" rel="noopener noreferrer">
                    {s.link.label} ↗
                  </a>
                </p>
              )}
            </article>
          ))}

          <div className="stack-grid builds-grid">
            {builds.map((b) => (
              <div className="stack-card" key={b.title}>
                <h4>{b.title}</h4>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-band wrap" aria-label="Get in touch">
          <div className="cta-inner">
            <p>Want this engine built for your team?</p>
            <a className="btn btn-primary" href={EMAIL}>
              Let&rsquo;s talk
            </a>
          </div>
        </section>

        <section id="calls" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// calls i made</span>
            <h2>Judgment, with the data that drove it</h2>
          </div>
          <div className="calls-grid">
            {calls.map((c) => (
              <div className="call-card" key={c.title}>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// work</span>
            <h2>Three 0-to-1 builds, and where they started</h2>
          </div>
          {roles.map((c) => (
            <article className="case" key={c.company}>
              <div className="case-head">
                <h3>{c.company}</h3>
                <span className="case-meta">{c.meta}</span>
              </div>
              <p className="case-role">{c.role}</p>
              <p>{c.body}</p>
              <div className="case-stats">
                {c.stats.map((st) => (
                  <div className="case-stat" key={st.b}>
                    <b>{st.b}</b>
                    <span>{st.s}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
          <p className="earlier">
            <span>Earlier</span> Samespace (Senior Marketing Associate) · Decathlon Sports India (events and
            community) · BitWise Ventures (first role: SEO and outbound) · Independent SEO and GTM consulting
            for Baroque Group (Dubai), Cogneesol and La Forêt
          </p>
        </section>

        <section id="toolkit" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// toolkit</span>
            <h2>What I work in every day</h2>
          </div>
          <div className="tool-groups">
            {toolkit.map((g) => (
              <div className="tool-group" key={g.group}>
                <h4>// {g.group}</h4>
                <div className="build-tags">
                  {g.items.map((t) => (
                    <span className="build-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="tool-note">MCA-trained. I build with Claude and Claude Code, so automation is something I ship, not a ticket I file.</p>
        </section>

        <section id="samples" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// samples + writing</span>
            <h2>How I work a problem on paper</h2>
          </div>
          <article className="case">
            <div className="case-head">
              <h3>SEO audit: PriceLabs</h3>
              <span className="case-meta">Take-home, SEO Manager interview</span>
            </div>
            <p>
              Full on-page, technical and off-page audit of PriceLabs&rsquo; homepage: Core Web Vitals issues,
              title and meta rewrites, internal linking gaps, and a prioritized keyword table with volume,
              difficulty and current position.
            </p>
            <p className="case-link">
              <a href="/priceLabs-seo-audit-assignment.pdf" target="_blank" rel="noopener noreferrer">
                View PDF ↓
              </a>
            </p>
          </article>
          <ul className="writing-list">
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

        <section id="contact" className="footer wrap">
          <h2>Let&rsquo;s build your pipeline engine.</h2>
          <p>
            Open to senior growth, demand generation and GTM engineering roles. Based in Pune, open to
            remote and relocation.
          </p>
          <div className="footer-actions">
            <a className="btn btn-primary" href={EMAIL}>
              jaypurohit9294@gmail.com
            </a>
            <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn btn-ghost" href="tel:+917990264350">
              +91 7990264350
            </a>
          </div>
          <p className="footer-meta">Pune, India · Updated Oct 2026</p>
        </section>
      </main>
    </>
  );
}
