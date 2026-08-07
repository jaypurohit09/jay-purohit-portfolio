function PipelineDiagram() {
  const sources = [
    { label: "Search Console", y: 40, color: "var(--accent-2)" },
    { label: "GA4", y: 96, color: "var(--accent-2)" },
    { label: "Ubersuggest", y: 152, color: "var(--accent-2)" },
    { label: "Webflow", y: 208, color: "var(--accent-2)" },
  ];
  const centerX = 380;
  const centerY = 124;
  const outX = 660;

  return (
    <svg
      viewBox="0 0 720 248"
      role="img"
      aria-label="Diagram: Search Console, GA4, Ubersuggest and Webflow connect via MCP into Claude, which outputs programmatic SEO pages shipped at scale"
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        <marker id="dot" markerWidth="6" markerHeight="6" refX="3" refY="3">
          <circle cx="3" cy="3" r="2.4" fill="var(--accent)" />
        </marker>
      </defs>

      {sources.map((s, i) => (
        <g key={s.label}>
          <line
            x1="150"
            y1={s.y}
            x2={centerX - 34}
            y2={centerY}
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <line
            x1="150"
            y1={s.y}
            x2={centerX - 34}
            y2={centerY}
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
          <circle cx="150" cy={s.y} r="4.5" fill="var(--accent-2)" />
          <text x="132" y={s.y - 12} textAnchor="end" className="pipe-label">
            {s.label}
          </text>
        </g>
      ))}

      <circle cx={centerX} cy={centerY} r="38" fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="1.6" />
      <text x={centerX} y={centerY - 3} textAnchor="middle" className="pipe-center-label">
        Claude
      </text>
      <text x={centerX} y={centerY + 14} textAnchor="middle" className="pipe-center-sub">
        via MCP
      </text>

      <line x1={centerX + 38} y1={centerY} x2={outX - 6} y2={centerY} stroke="var(--border)" strokeWidth="1.6" />
      <line
        x1={centerX + 38}
        y1={centerY}
        x2={outX - 6}
        y2={centerY}
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeDasharray="4 8"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2.6s" repeatCount="indefinite" />
      </line>
      <circle cx={outX} cy={centerY} r="4.5" fill="var(--accent)" />
      <text x={outX + 12} y={centerY - 12} textAnchor="start" className="pipe-label pipe-label-out">
        pSEO pages, live
      </text>
      <text x={outX + 12} y={centerY + 6} textAnchor="start" className="pipe-sub-out">
        research to deploy: ~2 days
      </text>

      <style>{`
        .pipe-label { font-family: var(--font-mono); font-size: 12px; fill: var(--text-dim); }
        .pipe-label-out { fill: var(--text); }
        .pipe-sub-out { font-family: var(--font-mono); font-size: 11px; fill: var(--text-faint); }
        .pipe-center-label { font-family: var(--font-display); font-size: 14px; font-weight: 600; fill: var(--text); }
        .pipe-center-sub { font-family: var(--font-mono); font-size: 10px; fill: var(--accent); }
      `}</style>
    </svg>
  );
}

const proofStats = [
  { num: "0→30", unit: "", label: "paying customers at nRev, sub-3-month CAC payback, zero paid media" },
  { num: "~100", unit: "x", label: "organic session growth, nRev (101 to 10,501/month)" },
  { num: "24,811", unit: "", label: "AI citations in 9 months, 93% non-branded" },
  { num: "25", unit: "%", label: "conversion-rate lift from a website relaunch at MarkovML" },
];

const cases = [
  {
    company: "nRev (NurtureV)",
    role: "Founding Growth Marketer · Jul 2025 – Present",
    meta: "0 → 1 GTM function",
    body: "First and only marketing hire at an AI-native GTM automation platform. Built the entire function from scratch: website, SEO/AEO, events, email execution, LinkedIn, and the company's first CAC and payback reporting, while learning GTM engineering on the job.",
    stats: [
      { b: "$300K ARR", s: "supported, 145% NRR" },
      { b: "18 events", s: "in 7 months, 3-person team" },
      { b: "4,792", s: "LinkedIn followers, +67%" },
    ],
  },
  {
    company: "MarkovML",
    role: "Growth Marketing Lead (promoted from Content Marketer) · Aug 2023 – Jul 2025",
    meta: "Website relaunch + SEO moat",
    body: "Led a full website relaunch (IA, UX, SEO, copy, positioning) repositioning the platform for an agentic-AI GTM audience. Built a 100+ page SEO moat and stood up paid acquisition to test CAC payback against organic.",
    stats: [
      { b: "30%", s: "organic pipeline growth in 90 days" },
      { b: "100+", s: "page SEO moat, Page 1 ranking" },
      { b: "+40%", s: "non-branded traffic lift" },
    ],
  },
  {
    company: "Samespace",
    role: "Senior Marketing Associate · Aug 2021 – Jan 2022",
    meta: "6 months, CX blog + backlinks",
    body: "Hired by the CEO to market a new product line; researched the space, found it crowded, and helped make the call not to pursue it. Redirected onto the existing CX product's Cobrowsing feature: link building, copywriting, and a CX blog built from scratch.",
    stats: [
      { b: "50+", s: "backlinks, top-3 SERP position" },
      { b: "10+", s: "CX influencers in an executed campaign" },
      { b: "6 mo", s: "role ended in a layoff tied to the shelved product" },
    ],
  },
];

const stack = [
  {
    title: "// data access",
    body: "Claude connected directly to Search Console and GA4 via MCP for live performance data, plus Ubersuggest via MCP for keyword research. No exporting CSVs, no waiting on a dashboard refresh.",
  },
  {
    title: "// deployment",
    body: "Webflow connected the same way, so research and content decisions turn into shipped pages in the same session, not a separate publishing step days later.",
  },
  {
    title: "// what it replaced",
    body: "A programmatic SEO batch, research through live deployment, used to take over a week. The same batch now runs in about two days, same quality bar, same review discipline.",
  },
  {
    title: "// the edge",
    body: "MCA-trained, so the automation isn't a black box. Comfortable building the workflow, not just briefing someone else to build it.",
  },
];

const samples = [
  {
    title: "SEO audit: PriceLabs",
    tag: "Take-home assignment, SEO Manager interview",
    body: "Full on-page, technical, and off-page SEO audit for PriceLabs' homepage: core web vitals issues, meta title/description rewrites, internal linking gaps, and a prioritized keyword table with volume, difficulty, and current position.",
    url: "/priceLabs-seo-audit-assignment.pdf",
  },
  {
    title: "Customer support: PriceLabs",
    tag: "Take-home assignment, SEO Manager interview",
    body: "Sample customer support responses to real billing and pricing disputes, translating technical pricing logic into clear, empathetic replies.",
    url: "/priceLabs-customer-support-assignment.pdf",
  },
];

const ghostwriting = [
  {
    title: "5 Ideas For Using Session Replay To Ensure Customer Satisfaction",
    tag: "ghostwritten, published under a house byline",
    url: "https://capturly.com/blog/5-ideas-for-using-session-replay-to-ensure-customer-satisfaction/",
  },
  {
    title: "Digital Insurance: Achieving Digital Transformation (whitepaper)",
    tag: "ghostwritten, PDF sample",
    url: "/writing-sample-digital-insurance-whitepaper.pdf",
  },
  {
    title: "Hyperautomation: A Practical Guide",
    tag: "ghostwritten, PDF sample",
    url: "/writing-sample-hyperautomation-guide.pdf",
  },
];

const writing = [
  { title: "HackerNoon · author profile", url: "https://hackernoon.com/about/jay-purohit", tag: "profile" },
  {
    title: "Make.com · Automated Customer Service: Leverage Technology to Provide Exceptional Customer Support",
    url: "https://www.make.com/en/blog/automated-customer-service",
    tag: "2020",
  },
  {
    title: "CustomerThink · Top 6 Tools for Exceptional Customer Service",
    url: "https://customerthink.com/author/jaypurohit/",
    tag: "2021",
  },
  { title: "WebEngage · author profile", url: "https://webengage.com/author/jaypurohit/", tag: "profile" },
  {
    title: "Determ · 5 Types of Customer Service Software",
    url: "https://determ.com/blog/5-types-of-customer-service-software-that-enhance-support-quality/",
    tag: "2021",
  },
];

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-mark">
            <strong>Jay Purohit</strong> / growth
          </span>
          <ul className="nav-links">
            <li><a href="#work">Work</a></li>
            <li><a href="#samples">Samples</a></li>
            <li><a href="#writing">Writing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section className="hero wrap">
          <p className="eyebrow">OPEN TO GROWTH / DEMAND-GEN ROLES</p>
          <h1>
            Growth marketer who <em>builds the systems</em> he markets with.
          </h1>
          <p className="hero-sub">
            9+ years taking B2B SaaS marketing functions from zero: nRev, MarkovML, Firework.
            MCA-trained, so the AI workflows underneath the campaigns are built, not just briefed.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="mailto:jaypurohit9294@gmail.com">
              Email me
            </a>
            <a className="btn btn-ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Download resume ↓
            </a>
            <a className="btn btn-ghost" href="https://linkedin.com/in/jaypurohitgrowth" target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </section>

        <section className="pipeline-section wrap-wide">
          <div className="pipeline">
            <PipelineDiagram />
          </div>
          <p className="pipeline-caption">the actual stack behind nRev&rsquo;s pSEO program, live today</p>
        </section>

        <section className="proof wrap">
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
        </section>

        <section id="work" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// work</span>
            <h2>Selected roles</h2>
          </div>
          {cases.map((c) => (
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
        </section>

        <section id="how" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// how i work</span>
            <h2>The stack behind the strategy</h2>
          </div>
          <div className="stack-grid">
            {stack.map((s) => (
              <div className="stack-card" key={s.title}>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="samples" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// work samples</span>
            <h2>How I actually work a problem</h2>
          </div>
          {samples.map((s) => (
            <article className="case" key={s.title}>
              <div className="case-head">
                <h3>{s.title}</h3>
                <span className="case-meta">{s.tag}</span>
              </div>
              <p>{s.body}</p>
              <p className="case-role" style={{ marginTop: 14, marginBottom: 0 }}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  View PDF ↓
                </a>
              </p>
            </article>
          ))}
        </section>

        <section id="writing" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// writing, bylined</span>
            <h2>Published under my name</h2>
          </div>
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

        <section id="ghostwriting" className="section wrap">
          <div className="section-head">
            <span className="section-tag">// writing, ghostwritten</span>
            <h2>Written by me, published under other names</h2>
          </div>
          <ul className="writing-list">
            {ghostwriting.map((w) => (
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
          <h2>Let&rsquo;s talk growth.</h2>
          <p>
            Based in Pune, working async with teams anywhere. Open to founding, senior, and
            managerial growth roles, remote or Pune on-site.
          </p>
          <div className="footer-actions">
            <a className="btn btn-primary" href="mailto:jaypurohit9294@gmail.com">
              jaypurohit9294@gmail.com
            </a>
            <a className="btn btn-ghost" href="tel:+917990264350">
              +91 7990264350
            </a>
          </div>
          <p className="footer-meta">Pune, India · Updated 2026</p>
        </section>
      </main>
    </>
  );
}
