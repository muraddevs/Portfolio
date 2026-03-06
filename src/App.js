import { useEffect, useRef, useState } from "react";
import {
  motion, useInView, AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight, Github, Mail, Layers3, Award,
  GraduationCap, Briefcase, ExternalLink, ChevronDown,
  Zap, Database, Terminal, GitBranch, Play, CheckCircle2,
  Sparkles, FolderOpen, Server, Table2, Cpu, ChevronRight,
  Code2,
} from "lucide-react";

/* ══════════════════════════════════════════════════════
   LOGO
══════════════════════════════════════════════════════ */
const LOGO = "/icon.png"
/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const P = {
  name: "Murad Aghamirzayev",
  role: "Full Stack Developer",
  sub: "Software Engineer · Data Tools Builder",
  location: "Baku, Azerbaijan",
  email: "murad.aghamirzayevv@google.com",
  github: "https://github.com/muraddevs",
  linkedin: "https://www.linkedin.com/in/murad-aghamirzayev-964494265/",
  instagram: "https://www.instagram.com/agh_murad",
  reddit: "https://www.reddit.com/user/agh_murad/",
  bio: "I build polished software products across web, desktop, data, and systems — focused on real usability, clean engineering, and ambitious product thinking.",
  avatar: "/murad-avatar.jpeg",
  experience: [
    { role: "Junior Application Consultant", company: "Caspian Innovation Center, SOCAR", period: "2025 — Present", desc: "Built full-stack applications with emphasis on UX, maintainability, and product quality across frontend and backend." },
    { role: "Software Engineer", company: "SOCAR Geology and Geophysics Department", period: "2023 — 2025", desc: "Designed and shipped ambitious software: desktop apps, internal tools, academic systems, and data-heavy workflows." },
    { role: "Backend Developer Intern", company: "Caspian Innovation Center, SOCAR", period: "2024", desc: "Contributed to backend service development at one of Azerbaijan's largest enterprises — building APIs, working with databases, and shipping production-grade code in a professional team environment." },
    { role: "Cyber Security Intern", company: "Prosol", period: "2023", desc: "Conducted vulnerability assessments and security audits, gaining hands-on experience with threat analysis, network security, and defensive tooling in a professional environment." },

  ],
  education: { school: "ADA University", degree: "B.S. Computer Engineering", period: "2022 — Present" },
  projects: [
    { name: "Javeline", badge: "Personal Project - In Progress", desc: "A Java framework designed to build frontend web apps", stack: ["Java"], link: "https://github.com/muraddevs/Javeline" },
    { name: "Smart Parking", badge: "Senior Design", desc: "Intelligent parking combining CV recognition, embedded sensing, and a real-time management dashboard.", stack: ["React", "Java", "Computer Vision", "Embedded Systems"], link: "https://github.com/muraddevs/SDP-Smart-Parking-AI" },
    { name: "DineDash", badge: "Personal Project", desc: "A mobile app built for ordering food directly to your table even before you arrive", stack: ["React Native"], link: "https://github.com/muraddevs/DineDash" },
    { name: "Jungle", badge: "Personal Project", desc: "Web Social Media platfrom made for social interactions", stack: ["React", "Java Spring Boot", "MySQL"], link: "https://github.com/muraddevs/Social-Media-App" },

    { name: "Coming Soon", badge: "In Progress", desc: "Another ambitious project in the works. Replace this with your next big thing when it's ready.", stack: ["TBD"], link: "#" },
  ],
  awards: [
    {
      title: "Arduino Unrestricted Projects — Robotics Competition",
      meta: "Western Caspian University · Baku",
      desc: "2nd place. Designed and built an unrestricted Arduino-based robotics project competing against teams across the university.",
    },
    {
      title: "Scientists of Tomorrow — Science Competition",
      meta: "Ministry of Education · Baku",
      desc: "2nd place in a national-level science competition organised by Azerbaijan's Ministry of Education.",
    },
    {
      title: "Academic Research Competition — Nizami Ganjavi",
      meta: "Ministry of Education · Baku",
      desc: "2nd place in an academic research competition dedicated to Nizami Ganjavi, held under the Ministry of Education.",
    },
    {
      title: "Chemistry Olympiad",
      meta: "Ministry of Education · Baku",
      desc: "2nd place among 7th grade students in a national chemistry olympiad organised by the Ministry of Education.",
    },
    {
      title: "Eco Drawing Journal 2014 — IDEA",
      meta: "IDEA · Baku",
      desc: "Selected as a finalist among 20 candidates from across Azerbaijan in the Eco Drawing Journal competition organised by IDEA.",
    },
  ],
  skills: {
    Frontend: ["React", "JavaScript", "TypeScript", "Tailwind", "Vite"],
    Backend: ["Java", "Python", "C# .NET", "Node.js", "REST APIs", "SQL"],
    Data: ["DuckDB", "PostgreSQL", "MySQL", "Pandas", "Analytics"],
    Tools: ["Git/Github", "Electron", "Figma", "Linux"],
  },
};

const VARAN = {
  tagline: "One workspace. Every dataset.",
  sub: "SQL. Python. Files. Databases. All sharing the same memory.",
  description: "Varan is a cross-platform desktop application that unifies data access, transformation, analysis, and scripting into a single high-performance workspace. Load a file, connect a database, query with SQL, analyze with Python — all without leaving the app, configuring environments, or writing boilerplate.",
  version: "0.1.0",
  pillars: [
    { icon: Database, title: "Unified Data Access", desc: "Connect CSV, Excel, MySQL, PostgreSQL. Every source becomes a session table — instantly queryable by name. No file paths, no boilerplate.", code: "SELECT region,\n  SUM(revenue) AS total,\n  COUNT(*) AS orders\nFROM sales_csv\nWHERE year = 2024\nGROUP BY region\nORDER BY total DESC", lang: "SQL" },
    { icon: Terminal, title: "Embedded Python Runtime", desc: "No pip install. No virtual envs. A full Python runtime ships inside Varan with essential analytics libraries pre-bundled and ready.", code: "df = sales_csv.copy()\nresult = (\n  df.groupby('region')\n    .agg(total=('revenue','sum'))\n    .sort_values('total', ascending=False)\n)\nresult.head(8)", lang: "Python" },
    { icon: GitBranch, title: "Bidirectional SQL ↔ Python", desc: "Every SQL table is instantly a DataFrame in Python. Every DataFrame can be queried in SQL. Zero serialization. One memory space.", code: "# SQL result → Python, instantly\nfiltered = _tables['query_result']\n\n# Python DataFrame → SQL queryable\nnew_df = filtered.assign(\n  score=filtered['val'] * 1.2\n)\nlist(_tables)  # see all session tables", lang: "Python" },
    { icon: Zap, title: "Zero Setup, Instant Start", desc: "Open Varan, load data, start working. No environment configuration, no dependency management, no connection boilerplate ever.", code: "# Typical: 10+ lines of boilerplate\nfrom sqlalchemy import create_engine\nengine = create_engine(\n  'postgresql+psycopg2://user:pw@host/db'\n)\n\n# Varan: connect once in UI, then:\norders = _tables['orders']\norders.describe()", lang: "Python" },
  ],
  workflow: [
    { n: "01", title: "Open a project", desc: "Create or restore a workspace. State — open files, connections, queries — is saved automatically between sessions." },
    { n: "02", title: "Load your data", desc: "Open local CSV/Excel files or connect to MySQL and PostgreSQL. Datasets register as session tables instantly." },
    { n: "03", title: "Query with SQL", desc: "Write SQL against any loaded table by name. Results persist as new session tables, ready for chaining." },
    { n: "04", title: "Analyze in Python", desc: "Every table is already a DataFrame in _tables. Transform, model, visualize — no loading code needed." },
    { n: "05", title: "Export results", desc: "Write session tables or DataFrames to CSV, Excel, or back to a database. Clean, independent outputs." },
  ],
  compare: [
    { task: "List loaded tables", before: "Scan globals(), filter by type — fragile, manual", after: "list(_tables)" },
    { task: "Read a CSV file", before: "pd.read_csv('C:/full/path/to/file.csv')", after: "df = sales_csv.copy()" },
    { task: "Connect to PostgreSQL", before: "sqlalchemy engine + 6 lines of boilerplate", after: "Connect in UI → _tables['orders']" },
    { task: "SQL result in Python", before: "Export CSV → re-import in Jupyter notebook", after: "result = _tables['query_result']" },
    { task: "Switch SQL → Python", before: "Copy data to file, reload in new environment", after: "Same session. Zero overhead." },
  ],
  specs: [
    { label: "Platform", value: "macOS · Windows · Linux" },
    { label: "Architecture", value: "Electron + React + DuckDB" },
    { label: "Python runtime", value: "Embedded — no install needed" },
    { label: "SQL engine", value: "DuckDB (local columnar)" },
    { label: "Databases", value: "MySQL, PostgreSQL" },
    { label: "File formats", value: "CSV, XLS, XLSX" },
    { label: "Version", value: "0.1.0 Beta" },
    { label: "License", value: "Private" },
  ],
};

/* ══════════════════════════════════════════════════════
   EASING
══════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1];

/* ══════════════════════════════════════════════════════
   REVEAL — uses Intersection Observer via useInView,
   NO layout-thrashing transforms on scroll
══════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
      <motion.div ref={ref} className={className}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, delay, ease: EASE }}>
        {children}
      </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════════════ */
const Tag = ({ children }) => (
    <span className="rounded-md border border-blue-400/20 bg-blue-400/[0.08] px-2.5 py-1 font-mono text-xs text-blue-200/75">{children}</span>
);

function Pill({ label, color = "blue", pulse = false }) {
  const styles = {
    blue:  "border-blue-400/30 bg-blue-400/10 text-blue-300",
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    green: "border-green-400/30 bg-green-400/10 text-green-300",
    slate: "border-white/10 bg-white/[0.04] text-white/38",
  };
  const dots = { blue: "bg-blue-400", amber: "bg-amber-400", green: "bg-green-400", slate: "bg-white/30" };
  return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${styles[color]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dots[color]} ${pulse ? "animate-pulse" : ""}`} />
        {label}
    </span>
  );
}

const Label = ({ children }) => (
    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/28">{children}</p>
);

const HR = () => (
    <div className="my-16 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
);

function Card({ children, className = "", hover = false }) {
  return (
      <motion.div
          whileHover={hover ? { y: -4, borderColor: "rgba(99,102,241,0.18)" } : {}}
          transition={{ duration: 0.2 }}
          className={`rounded-2xl border border-white/[0.07] bg-white/[0.025] ${className}`}>
        {children}
      </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════════════ */
function Counter({ to, suffix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0; const step = to / 50;
    const t = setInterval(() => { n += step; if (n >= to) { setV(to); clearInterval(t); } else setV(Math.floor(n)); }, 28);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════
   SYNTAX-HIGHLIGHTED CODE BLOCK (no typewriter — perf)
══════════════════════════════════════════════════════ */
function CodeBlock({ code, lang }) {
  const hl = (line) =>
      line.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
          .replace(/(#.*)$/g,'<span style="color:#6b7280;font-style:italic">$1</span>')
          .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|BY|GROUP|SUM|COUNT|DESC|ASC|LIMIT|AND|OR)\b/g,'<span style="color:#93c5fd">$1</span>')
          .replace(/\b(import|from|def|class|return|if|else|for|in|as|with|True|False|None|and|or|not|copy|assign|head|describe)\b/g,'<span style="color:#c084fc">$1</span>')
          .replace(/(['"`][^'"`\n]*['"`])/g,'<span style="color:#86efac">$1</span>')
          .replace(/\b(\d+\.?\d*)\b/g,'<span style="color:#fbbf24">$1</span>');

  return (
      <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#0d1117]" style={{ fontFamily: "'DM Mono',monospace" }}>
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0d1117] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/20">{lang}</span>
          <span className="text-[10px] text-white/15">varan</span>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full border-collapse">
            <tbody>
            {code.split("\n").map((line, i) => (
                <tr key={i}>
                  <td className="w-8 select-none pr-4 text-right align-top font-mono text-[10px] leading-6 text-white/15">{i + 1}</td>
                  <td className="whitespace-pre font-mono text-[12px] leading-6 text-white/72"
                      dangerouslySetInnerHTML={{ __html: hl(line) || "\u00a0" }} />
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

/* ══════════════════════════════════════════════════════
   VARAN APP MOCKUP
══════════════════════════════════════════════════════ */
function VaranMockup() {
  const [tab, setTab] = useState(0);
  const tabs = ["SQL Editor", "Python REPL", "Data Explorer"];

  const sqlCode = `SELECT region,
  SUM(revenue) AS total,
  COUNT(*) AS orders
FROM sales_csv
WHERE year = 2024
GROUP BY region
ORDER BY total DESC`;

  const pyCode = `df = sales_csv.copy()
result = (
  df.groupby('region')
    .agg(total=('revenue','sum'))
    .sort_values('total', ascending=False)
)
result.head(8)`;

  const hlSQL = (s) => s.replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|SUM|COUNT|DESC|ASC)\b/g,'<span style="color:#93c5fd">$1</span>').replace(/('.*?')/g,'<span style="color:#86efac">$1</span>').replace(/\b(\d+)\b/g,'<span style="color:#fbbf24">$1</span>');
  const hlPY  = (s) => s.replace(/\b(import|from|def|copy|groupby|agg|sort_values|head|ascending)\b/g,'<span style="color:#c084fc">$1</span>').replace(/('.*?')/g,'<span style="color:#86efac">$1</span>').replace(/\b(\d+)\b/g,'<span style="color:#fbbf24">$1</span>');

  return (
      <div className="w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0d16] shadow-[0_32px_100px_rgba(0,0,0,0.65)]">
        {/* Titlebar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0d1117] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center justify-center gap-2">
            <img src={LOGO} alt="" className="h-4 w-4 rounded" />
            <span className="text-xs font-medium text-white/45">Varan — sales_analysis</span>
          </div>
          <Pill label="Beta" color="amber" />
        </div>

        {/* Body */}
        <div className="flex h-[370px]">
          {/* Sidebar */}
          <div className="w-44 shrink-0 border-r border-white/[0.05] bg-[#0a0c14] p-3">
            <div className="mb-3 flex items-center gap-2 text-white/22">
              <FolderOpen className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider">Project</span>
            </div>
            {["sales_csv","orders_db","customers_db","query_result_1"].map((name, i) => (
                <div key={name}
                     className={`mb-1 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] transition-colors ${i === 0 ? "bg-blue-500/15 text-blue-300" : "text-white/32 hover:bg-white/[0.04] hover:text-white/55"}`}
                     style={{ fontFamily: "'DM Mono',monospace" }}>
                  <Table2 className="h-3 w-3 shrink-0" />
                  <span className="truncate">{name}</span>
                </div>
            ))}
            <div className="mt-5 mb-2 flex items-center gap-2 text-white/18">
              <Server className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider">Connections</span>
            </div>
            {["postgres_main","mysql_reports"].map(name => (
                <div key={name} className="mb-1 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] text-white/22 hover:bg-white/[0.03]">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" />
                  <span className="truncate" style={{ fontFamily: "'DM Mono',monospace" }}>{name}</span>
                </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/[0.05] bg-[#0c0f1a] px-2">
              {tabs.map((t, i) => (
                  <button key={t} onClick={() => setTab(i)}
                          className={`relative px-4 py-2.5 text-[11px] font-medium transition-colors ${tab === i ? "text-blue-300" : "text-white/28 hover:text-white/50"}`}>
                    {t}
                    {tab === i && <motion.span layoutId="mockup-tab" className="absolute bottom-0 left-0 right-0 h-px bg-blue-400" />}
                  </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {tab === 0 && (
                  <>
                    <div className="flex-1 overflow-auto p-3" style={{ fontFamily: "'DM Mono',monospace" }}>
                      <table className="w-full">
                        <tbody>
                        {sqlCode.split("\n").map((line, i) => (
                            <tr key={i}>
                              <td className="w-6 select-none pr-3 text-right text-[10px] text-white/15">{i+1}</td>
                              <td className="whitespace-pre text-[11px] leading-5 text-white/65" dangerouslySetInnerHTML={{ __html: hlSQL(line) || "\u00a0" }} />
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="border-t border-white/[0.06] bg-[#080b12]">
                      <div className="flex items-center justify-between px-3 py-1.5">
                        <span className="text-[10px] text-white/22">Result — 4 rows · 3 cols</span>
                        <span className="flex items-center gap-1 text-[10px] text-green-400/65"><CheckCircle2 className="h-3 w-3" /> 12ms</span>
                      </div>
                      <div className="overflow-x-auto px-3 pb-2">
                        <table className="w-full text-[10px]" style={{ fontFamily: "'DM Mono',monospace" }}>
                          <thead><tr className="border-b border-white/[0.05] text-white/22">
                            {["region","total","orders"].map(h => <th key={h} className="py-1 pr-8 text-left font-medium">{h}</th>)}
                          </tr></thead>
                          <tbody>
                          {[["EMEA","2,847,391","1,204"],["APAC","2,103,847","988"],["AMER","1,924,103","847"],["LATAM","843,291","391"]].map(([r,t,o]) => (
                              <tr key={r} className="border-b border-white/[0.03] text-white/45">
                                <td className="py-1 pr-8">{r}</td>
                                <td className="py-1 pr-8 text-blue-300/65">{t}</td>
                                <td className="py-1 pr-8">{o}</td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
              )}
              {tab === 1 && (
                  <div className="flex flex-1 flex-col overflow-auto p-3 gap-2" style={{ fontFamily: "'DM Mono',monospace" }}>
                    <div className="text-[11px] text-white/35 mb-1">
                      <span className="text-blue-400/55 mr-2">{">>>"}</span>Python 3.11 · Varan runtime
                    </div>
                    <table className="w-full">
                      <tbody>
                      {pyCode.split("\n").map((line, i) => (
                          <tr key={i}>
                            <td className="w-6 select-none pr-3 text-right text-[10px] text-white/15">{i+1}</td>
                            <td className="whitespace-pre text-[11px] leading-5 text-white/65" dangerouslySetInnerHTML={{ __html: hlPY(line) || "\u00a0" }} />
                          </tr>
                      ))}
                      </tbody>
                    </table>
                    <div className="mt-2 rounded-lg border border-white/[0.05] bg-black/30 p-2.5">
                      <div className="text-[10px] text-white/18 mb-1.5">Output:</div>
                      {[["EMEA","2847391"],["APAC","2103847"],["AMER","1924103"]].map(([r,v]) => (
                          <div key={r} className="flex gap-6 text-[10px] text-white/42">
                            <span className="w-14">{r}</span><span className="text-blue-300/55">{v}</span>
                          </div>
                      ))}
                    </div>
                  </div>
              )}
              {tab === 2 && (
                  <div className="flex-1 overflow-auto p-3">
                    <div className="mb-3 flex items-center gap-4 text-[10px] text-white/25">
                      <span>4 tables in session</span>
                      <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> 128 MB RAM used</span>
                    </div>
                    {[
                      { name: "sales_csv", rows: "12,847", cols: 8, src: "CSV", mem: "4.2 MB" },
                      { name: "orders_db", rows: "89,201", cols: 14, src: "PostgreSQL", mem: "18.7 MB" },
                      { name: "customers_db", rows: "3,402", cols: 11, src: "PostgreSQL", mem: "2.1 MB" },
                      { name: "query_result_1", rows: "4", cols: 3, src: "SQL result", mem: "< 1 KB" },
                    ].map((t) => (
                        <div key={t.name} className="mb-2 flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.018] px-3 py-2">
                          <Table2 className="h-3.5 w-3.5 shrink-0 text-blue-400/45" />
                          <span className="w-36 truncate text-[11px] font-medium text-white/60" style={{ fontFamily: "'DM Mono',monospace" }}>{t.name}</span>
                          <span className="text-[10px] text-white/22 w-16">{t.rows} rows</span>
                          <span className="text-[10px] text-white/18 ml-auto">{t.src}</span>
                          <span className="text-[10px] text-blue-300/38">{t.mem}</span>
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/[0.05] bg-[#0a0c14] px-4 py-1.5">
          <div className="flex items-center gap-4 text-[9px] text-white/18" style={{ fontFamily: "'DM Mono',monospace" }}>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Connected</span>
            <span>4 tables</span>
            <span>DuckDB 0.9.2</span>
          </div>
          <div className="text-[9px] text-white/18" style={{ fontFamily: "'DM Mono',monospace" }}>Python 3.11 · 128 MB</div>
        </div>
      </div>
  );
}

/* ══════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
      <motion.header initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                     className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-[#06080f]/92 backdrop-blur-2xl border-b border-white/[0.05] shadow-2xl shadow-black/30" : ""}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#" className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-400/20 bg-[#10141f] transition group-hover:border-blue-400/35">
              <Layers3 className="h-4 w-4 text-blue-300" />
            </div>
            <span className="text-sm font-medium text-white/55 transition group-hover:text-white">{P.name.split(" ")[0]}</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/38 md:flex">
            {["About","Varan","Projects","Contact"].map(s => (
                <a key={s} href={`#${s.toLowerCase()}`} className="group relative transition hover:text-white">
                  {s}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-blue-400/70 transition-all group-hover:w-full" />
                </a>
            ))}
          </nav>
          <a href={`mailto:${P.email}`}
             className="hidden items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/50 transition hover:bg-white/[0.08] hover:text-white md:flex">
            <Mail className="h-3 w-3" /> Email me
          </a>
        </div>
      </motion.header>
  );
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  return (
      <section className="hero-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Pure CSS aurora — no JS, GPU-composited */}
        <div className="aurora-bg" />

        <div className="relative z-10 max-w-4xl w-full">
          <AnimatePresence>
            {ready && (<>
              {/* Avatar */}
              <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="mb-8 flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-white/[0.12] shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                    <img src={P.avatar} alt={P.name}
                         className="h-full w-full object-cover"
                         onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                    {/* Fallback initials */}
                    <div className="hidden h-full w-full items-center justify-center bg-blue-500/20 text-xl font-semibold text-blue-300">
                      MA
                    </div>
                  </div>
                  {/* Online dot */}
                  <span className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-[#06080f] bg-green-400" />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Pill label={P.location} color="blue" />
                  <Pill label="ADA University · BSCE" color="slate" />
                </div>
              </motion.div>

              {/* Name */}
              {P.name.split(" ").map((word, i) => (
                  <div key={word} className="overflow-visible" style={{ marginTop: i === 0 ? "1.5rem" : 0 }}>
                    <motion.span
                        initial={{ y: "105%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.0, delay: 0.12 + i * 0.13, ease: EASE }}
                        className={`block text-[clamp(2.6rem,8vw,6.8rem)] font-semibold leading-[1.15] tracking-tighter ${i === 1 ? "gradient-text" : "text-white"}`}>                      {word}
                    </motion.span>
                  </div>
              ))}

              <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.9, delay: 0.48, ease: EASE }} style={{ originX: 0.5 }}
                          className="mx-auto my-6 h-px w-28 divider-line" />

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.54 }}
                        className="mb-2.5 text-base font-light tracking-wide text-white/36 md:text-lg">
                {P.role} <span className="px-1 text-white/16">·</span> {P.sub}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.62 }}
                        className="mx-auto mb-9 max-w-lg text-base leading-7 text-white/42">
                {P.bio}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.70 }}
                          className="flex flex-wrap items-center justify-center gap-3">
                <a href={`mailto:${P.email}`}
                   className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  <Mail className="h-4 w-4" /> Get in touch
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-30 transition group-hover:opacity-100 group-hover:translate-x-px group-hover:-translate-y-px" />
                </a>
                <a href={P.github}
                   className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-7 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.09] hover:text-white">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/murad-aghamirzayev-964494265/"
                   className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-7 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.09] hover:text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="#varan"
                   className="inline-flex items-center gap-2 rounded-full border border-blue-400/22 bg-blue-500/[0.08] px-7 py-3 text-sm font-medium text-blue-300 transition hover:bg-blue-500/[0.16]">
                  See Varan <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            </>)}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/18">
          <div className="scroll-bounce"><ChevronDown className="h-5 w-5" /></div>
        </motion.div>
      </section>
  );
}

/* ══════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════ */
function About() {
  return (
      <section id="about" className="relative px-6 py-28 md:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Label>About</Label>
            <h2 className="mb-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Engineering depth meets<br />product thinking.
            </h2>
            <p className="mb-16 max-w-xl text-base leading-7 text-white/40">I care about the full stack: pixels to pipelines, interfaces to infrastructure. I ship things that feel good to use.</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[{n:3,s:"+",l:"Years building"},{n:10,s:"+",l:"Projects shipped"},{n:4,s:"",l:"Core stacks"},{n:1,s:"",l:"Flagship product"}].map(item => (
                  <Card key={item.l} className="p-5 text-center">
                    <div className="text-3xl font-semibold tracking-tight text-white"><Counter to={item.n} suffix={item.s} /></div>
                    <div className="mt-1.5 text-xs text-white/26">{item.l}</div>
                  </Card>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="mb-6 flex items-center gap-2 text-white/30">
                <Briefcase className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-[0.25em]">Experience</span>
              </div>
              <div className="space-y-5">
                {P.experience.map((item, i) => (
                    <div key={i} className="group relative border-l border-white/[0.08] pl-5 transition-colors hover:border-blue-400/30">
                      <span className="absolute -left-[3px] top-2 h-1.5 w-1.5 rounded-full bg-blue-400/50 transition-colors group-hover:bg-blue-400" />
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-white/90">{item.role}</h4>
                          <p className="text-sm text-blue-300/60">{item.company}</p>
                        </div>
                        <span className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/24">{item.period}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/38">{item.desc}</p>
                    </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mb-6 flex items-center gap-2 text-white/30">
                <GraduationCap className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-[0.25em]">Education</span>
              </div>
              <div className="group relative border-l border-white/[0.08] pl-5 mb-10 hover:border-blue-400/30 transition-colors">
                <span className="absolute -left-[3px] top-2 h-1.5 w-1.5 rounded-full bg-blue-400/50" />
                <h4 className="font-semibold text-white/90">{P.education.school}</h4>
                <p className="text-sm text-blue-300/60">{P.education.degree}</p>
                <span className="text-xs text-white/24">{P.education.period}</span>
              </div>

              <div className="mb-6 flex items-center gap-2 text-white/30">
                <Code2 className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-[0.25em]">Skills</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(P.skills).map(([cat, items]) => (
                    <div key={cat} className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3.5">
                      <p className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-white/20">{cat}</p>
                      <div className="flex flex-wrap gap-1.5">{items.slice(0,4).map(s => <Tag key={s}>{s}</Tag>)}</div>
                    </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
  );
}

/* ══════════════════════════════════════════════════════
   VARAN
══════════════════════════════════════════════════════ */
function VaranSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  return (
      <section id="varan" className="relative overflow-hidden">

        {/* ─── Billboard ─── */}
        <div ref={heroRef} className="varan-hero relative flex flex-col items-center justify-center overflow-hidden py-44 px-6 text-center">
          <div className="varan-aurora" />
          {[650, 900, 1160].map((sz, i) => (
              <div key={sz} className={`ring-anim ring-anim-${i}`} style={{ width: sz, height: sz }} />
          ))}
          <div className="center-glow" />

          <div className="relative z-10 max-w-5xl">
            <Reveal>
              <p className="mb-14 font-mono text-[11px] uppercase tracking-[0.38em] text-blue-400/55">Flagship Project · v{VARAN.version} Beta</p>
            </Reveal>

            <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                        className="mx-auto mb-10 flex justify-center">
              <img src={LOGO} alt="Varan" className="h-[120px] w-[120px] rounded-2xl object-cover" />
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2 initial={{ y: "100%", opacity: 0 }} animate={heroInView ? { y: 0, opacity: 1 } : {}}
                         transition={{ duration: 1.0, delay: 0.22, ease: EASE }}
                         className="text-[clamp(5rem,15vw,11rem)] font-semibold leading-none tracking-tighter text-white">
                Varan
              </motion.h2>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
                        className="mt-5 mb-3 flex flex-wrap items-center justify-center gap-3">
              <Pill label="Beta" color="amber" pulse />
              <span className="h-px w-6 bg-white/15" />
              <span className="font-mono text-sm text-white/28">v0.1.0 · Desktop · Cross-platform</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.46, ease: EASE }}
                      className="mt-7 text-2xl font-light leading-relaxed text-white/52 md:text-3xl">{VARAN.tagline}</motion.p>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.52, ease: EASE }}
                      className="mt-2 text-base text-white/30 md:text-lg">{VARAN.sub}</motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.60, ease: EASE }}
                        className="mt-10 mb-20">
              <p className="mx-auto mb-9 max-w-2xl text-base leading-8 text-white/45 md:text-lg">{VARAN.description}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="https://forms.gle/gtygZ1q4TfqtXixT8" className="group inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white btn-glow transition-all hover:bg-blue-400 hover:scale-105">
                  <Play className="h-3.5 w-3.5 fill-current" /> SignUp for Beta
                </a>
                <a href="https://docs.google.com/document/d/1fx3FBMWKLdiCfUIy3WdL9qJDT8GT5KlzzzNjqSNMuq0/edit?usp=sharing" className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white/55 transition hover:bg-white/[0.08] hover:text-white">
                  Read Documentation →
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Mockup ─── */}
        <div className="px-6 pb-24 md:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <Reveal><div className="mb-8 text-center">
              <Label>Interface</Label>
              <h3 className="text-2xl font-semibold text-white md:text-3xl">Built to feel fast.</h3>
              <p className="mt-2 text-white/32">Everything in one window. No context switching.</p>
            </div></Reveal>
            <Reveal delay={0.1}><VaranMockup /></Reveal>
          </div>
        </div>

        {/* ─── Four pillars ─── */}
        <div className="px-6 py-20 md:px-10 lg:px-20" style={{ background: "linear-gradient(180deg,transparent,rgba(9,14,30,0.45),transparent)" }}>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Label>Core capabilities</Label>
              <h3 className="mb-2 text-2xl font-semibold text-white md:text-4xl">Four pillars. Zero friction.</h3>
              <p className="mb-10 max-w-xl text-white/38">Each part of the workflow is tightly integrated. The whole is much more than the sum.</p>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mb-7 flex flex-wrap gap-2">
                {VARAN.pillars.map((f, i) => (
                    <button key={f.title} onClick={() => setActiveFeature(i)}
                            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${activeFeature === i ? "border-blue-500/40 bg-blue-500/15 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.14)]" : "border-white/[0.07] bg-white/[0.02] text-white/36 hover:bg-white/[0.05] hover:text-white/60"}`}>
                      <f.icon className="h-3.5 w-3.5" /> {f.title}
                    </button>
                ))}
              </div>
            </Reveal>
            <AnimatePresence mode="wait">
              <motion.div key={activeFeature}
                          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.38, ease: EASE }}
                          className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
                <div className="flex flex-col justify-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/18 bg-blue-500/[0.1]">
                    {(() => { const Icon = VARAN.pillars[activeFeature].icon; return <Icon className="h-5 w-5 text-blue-300" />; })()}
                  </div>
                  <h4 className="mb-3 text-xl font-semibold text-white">{VARAN.pillars[activeFeature].title}</h4>
                  <p className="text-base leading-7 text-white/43">{VARAN.pillars[activeFeature].desc}</p>
                </div>
                <CodeBlock code={VARAN.pillars[activeFeature].code} lang={VARAN.pillars[activeFeature].lang} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── Workflow ─── */}
        <div className="px-6 py-20 md:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Label>How it works</Label>
              <h3 className="mb-12 text-2xl font-semibold text-white md:text-4xl">From zero to insight in five steps.</h3>
            </Reveal>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 hidden w-px bg-gradient-to-b from-blue-500/25 via-blue-500/08 to-transparent md:block" />
              <div className="space-y-5">
                {VARAN.workflow.map((step, i) => (
                    <Reveal key={step.n} delay={i * 0.07}>
                      <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.18 }} className="flex cursor-default items-start gap-6">
                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-400/22 bg-blue-500/9">
                          <span className="font-mono text-xs font-semibold text-blue-300">{step.n}</span>
                        </div>
                        <Card className="flex-1 p-5" hover>
                          <h4 className="mb-1.5 font-semibold text-white">{step.title}</h4>
                          <p className="text-sm leading-6 text-white/40">{step.desc}</p>
                        </Card>
                      </motion.div>
                    </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Before / After ─── */}
        <div className="px-6 py-20 md:px-10 lg:px-20" style={{ background: "linear-gradient(180deg,transparent,rgba(9,14,30,0.5),transparent)" }}>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Label>Why Varan</Label>
              <h3 className="mb-3 text-2xl font-semibold text-white md:text-4xl">Stop writing boilerplate.<br />Start doing analysis.</h3>
              <p className="mb-10 max-w-xl text-white/36">In typical workflows, most of the time goes to setup and plumbing — not the actual work. Varan removes it.</p>
            </Reveal>
            <Reveal delay={0.07}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
                <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/[0.07] bg-white/[0.025]">
                  <div className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-white/25">Task</div>
                  <div className="border-l border-white/[0.05] px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-red-400/55">Without Varan</div>
                  <div className="border-l border-white/[0.05] px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-green-400/55">With Varan</div>
                </div>
                {VARAN.compare.map((row, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.015]">
                      <div className="px-5 py-3.5 text-sm text-white/52">{row.task}</div>
                      <div className="border-l border-white/[0.04] px-5 py-3.5 font-mono text-[11px] leading-5 text-red-300/50">{row.before}</div>
                      <div className="border-l border-white/[0.04] px-5 py-3.5 font-mono text-[11px] leading-5 text-green-300/65">{row.after}</div>
                    </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { n: "~30", u: "min", l: "Typical Varan session", c: "text-green-300" },
                  { n: "45–60", u: "min", l: "Same task traditionally", c: "text-red-300/65" },
                  { n: "~50%", u: "", l: "Less setup & plumbing", c: "text-blue-300" },
                ].map(item => (
                    <Card key={item.l} className="p-5 text-center">
                      <div className={`text-3xl font-semibold tracking-tight ${item.c}`}>{item.n}<span className="text-lg">{item.u}</span></div>
                      <div className="mt-1.5 text-xs text-white/26">{item.l}</div>
                    </Card>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ─── Specs ─── */}
        <div className="px-6 py-16 md:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <Reveal><Label>Technical specs</Label><h3 className="mb-9 text-xl font-semibold text-white md:text-2xl">What's inside.</h3></Reveal>
            <Reveal delay={0.05}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {VARAN.specs.map((spec) => (
                    <motion.div key={spec.label} whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.16)" }}
                                transition={{ duration: 0.2 }}
                                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors">
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/20">{spec.label}</div>
                      <div className="text-sm font-medium text-white/72">{spec.value}</div>
                    </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ─── CTA strip ─── */}
        <Reveal>
          <div className="relative mx-6 mb-16 overflow-hidden rounded-3xl md:mx-10 lg:mx-20">
            <div className="cta-bg absolute inset-0" />
            <div className="absolute inset-0 rounded-3xl border border-white/[0.08]" />
            <div className="relative px-8 py-14 text-center md:px-14 md:py-16">
              <img src={LOGO} alt="" className="mx-auto mb-5 h-12 w-12 rounded-2xl" />
              <h3 className="mb-3 text-2xl font-semibold text-white md:text-3xl">Ready to try Varan?</h3>
              <p className="mx-auto mb-8 max-w-sm text-white/38">Beta is live. Join early, shape the product, and never write database boilerplate again.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  <Sparkles className="h-4 w-4" /> Request Beta Access
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-7 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.1] hover:text-white">
                  View Documentation
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════ */
function Projects() {
  return (
      <section id="projects" className="px-6 py-24 md:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <HR />
          <Reveal><Label>Other Work</Label><h2 className="mb-12 text-3xl font-semibold tracking-tight text-white md:text-4xl">More projects</h2></Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {P.projects.map((proj, i) => (
                <Reveal key={proj.name} delay={i * 0.09}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.22 }}
                              className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.022] p-7 transition-colors hover:border-white/[0.11]">
                    <div className="mb-5 flex items-start justify-between">
                      <Pill label={proj.badge} color={proj.badge === "Senior Design" ? "blue" : proj.badge === "Personal Project" ? "green" : "amber"} />                      <a href={proj.link} className="rounded-full border border-white/[0.07] p-2 text-white/15 opacity-0 transition group-hover:opacity-100 group-hover:text-white/55 hover:bg-white/[0.05]">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <h3 className="mb-2.5 text-xl font-semibold text-white">{proj.name}</h3>
                    <p className="mb-5 text-sm leading-6 text-white/37">{proj.desc}</p>
                    <div className="flex flex-wrap gap-1.5">{proj.stack.map(s => <Tag key={s}>{s}</Tag>)}</div>
                  </motion.div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
}

/* ══════════════════════════════════════════════════════
   AWARDS
══════════════════════════════════════════════════════ */
function Awards() {
  return (
      <section className="px-6 py-24 md:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <HR />
          <Reveal><Label>Recognition</Label><h2 className="mb-12 text-3xl font-semibold tracking-tight text-white md:text-4xl">Awards</h2></Reveal>
          <div className="space-y-4">
            {P.awards.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.1}>
                  <Card className="flex items-start gap-5 p-6" hover>
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] text-white/26">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{a.title}</h4>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-white/20">{a.meta}</p>
                      <p className="mt-2.5 text-sm leading-6 text-white/37">{a.desc}</p>
                    </div>
                  </Card>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
}

/* ══════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════ */
function Contact() {
  return (
      <section id="contact" className="relative overflow-hidden px-6 py-44 md:px-10 lg:px-20">
        <div className="contact-aurora" />
        <div className="relative mx-auto max-w-6xl text-center">
          <Reveal>
            <Label>Let's build together</Label>
            <h2 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              Open to strong<br />
              <span className="gradient-text">opportunities.</span>
            </h2>
            <p className="mx-auto mb-12 max-w-md text-base leading-7 text-white/37">
              If you're working on something ambitious — a product, a hard problem, or a team building tools people love — I'd love to connect.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${P.email}`}
                 className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_60px_rgba(255,255,255,0.22)] hover:scale-105">
                <Mail className="h-4 w-4" /> Email me
                <ArrowUpRight className="h-3.5 w-3.5 opacity-30 transition group-hover:opacity-100 group-hover:translate-x-px group-hover:-translate-y-px" />
              </a>
              <a href={P.github}
                 className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white/55 transition hover:bg-white/[0.09] hover:text-white">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={P.linkedin}
                 className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white/55 transition hover:bg-white/[0.09] hover:text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href={P.instagram}
                 className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white/55 transition hover:bg-white/[0.09] hover:text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
              </a>
              <a href={P.reddit}
                 className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white/55 transition hover:bg-white/[0.09] hover:text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                Reddit
              </a>
            </div>
          </Reveal>
          <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.05] pt-8 text-xs text-white/16">
            <span className="font-mono">{P.name}</span>
            <div className="flex items-center gap-3 text-white/12">
              <span>Full Stack Developer</span><span>·</span><span>Baku, Azerbaijan</span><span>·</span><span>2025</span>
            </div>
          </div>
        </div>
      </section>
  );
}

/* ══════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════ */
export default function App() {
  return (
      <div className="min-h-screen bg-[#06080f] text-white antialiased selection:bg-blue-500/20">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif; }
        body { background: #06080f; overflow-x: hidden; margin: 0; }
        .font-mono, code, [class*="font-mono"] { font-family: 'DM Mono', ui-monospace, monospace !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #06080f; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 999px; }

        /* ── Gradient text ── */
        .gradient-text {
          background: linear-gradient(135deg, #93c5fd 10%, #818cf8 55%, #38bdf8 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Divider ── */
        .divider-line {
          background: linear-gradient(90deg, transparent, rgba(147,197,253,0.4), transparent);
        }

        /* ── Hero aurora — pure CSS, composited on GPU ── */
        .hero-section { isolation: isolate; }
        .aurora-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 60% 55% at 20% 30%, rgba(59,130,246,0.1), transparent 65%),
            radial-gradient(ellipse 50% 45% at 75% 18%, rgba(67,56,202,0.09), transparent 60%),
            radial-gradient(ellipse 45% 40% at 48% 68%, rgba(14,165,233,0.08), transparent 58%);
          animation: aurora-drift 20s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes aurora-drift {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(15px,-12px) scale(1.03); }
          66%  { transform: translate(-10px,18px) scale(0.98); }
          100% { transform: translate(8px,-8px) scale(1.02); }
        }

        /* ── Varan hero bg ── */
        .varan-hero { background: linear-gradient(180deg, #06080f 0%, #090f22 45%, #06080f 100%); }
        .varan-aurora {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 65% 60% at 15% 25%, rgba(29,78,216,0.2), transparent 60%),
            radial-gradient(ellipse 55% 50% at 72% 30%, rgba(55,48,163,0.18), transparent 58%),
            radial-gradient(ellipse 50% 45% at 45% 68%, rgba(3,105,161,0.12), transparent 55%);
          animation: aurora-drift 22s ease-in-out infinite alternate;
          will-change: transform;
        }

        /* ── Rings (no JS, pure CSS) ── */
        .ring-anim {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(96,165,250,0.055);
          animation: ring-pulse 6s ease-in-out infinite;
          will-change: transform, opacity;
          pointer-events: none;
        }
        .ring-anim-0 { animation-duration: 5s; }
        .ring-anim-1 { animation-duration: 7s; animation-delay: 1.5s; }
        .ring-anim-2 { animation-duration: 9s; animation-delay: 3s; }
        @keyframes ring-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.45; }
          50% { transform: translate(-50%,-50%) scale(1.035); opacity: 0.85; }
        }

        /* ── Center glow ── */
        .center-glow {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%,-50%);
          width: 800px; height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 65%);
          animation: glow-breathe 8s ease-in-out infinite;
          pointer-events: none;
          will-change: transform;
        }
        @keyframes glow-breathe {
          0%, 100% { transform: translate(-50%,-50%) scale(1); }
          50% { transform: translate(-50%,-50%) scale(1.07); }
        }

        /* ── Logo card ── */
        .logo-card {
          background: #10141f;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 0 80px rgba(59,130,246,0.28), 0 30px 80px rgba(0,0,0,0.55);
        }

        /* ── Blue button glow ── */
        .btn-glow { box-shadow: 0 0 50px rgba(59,130,246,0.38); }
        .btn-glow:hover { box-shadow: 0 0 80px rgba(59,130,246,0.58); }

        /* ── CTA background ── */
        .cta-bg {
          background: linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.14) 50%, rgba(14,165,233,0.16) 100%);
        }

        /* ── Contact aurora ── */
        .contact-aurora {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 55% at 10% 25%, rgba(30,64,175,0.14), transparent 58%),
            radial-gradient(ellipse 55% 50% at 68% 15%, rgba(49,46,129,0.13), transparent 55%);
          animation: aurora-drift 18s ease-in-out infinite alternate;
        }

        /* ── Scroll bounce ── */
        .scroll-bounce { animation: bounce-y 1.9s ease-in-out infinite; }
        @keyframes bounce-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(7px); }
        }

        /* ── Grain ── */
        body::after {
          content: '';
          position: fixed; inset: 0; z-index: 999;
          pointer-events: none;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px;
        }
      `}</style>
        <Nav />
        <Hero />
        <About />
        <VaranSection />
        <Projects />
        <Awards />
        <Contact />
      </div>
  );
}
