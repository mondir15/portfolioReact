import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const ME = {
  name: "Mondir",
  role: "Full-Stack Developer",
  city: "Montréal, QC",
  url: "https://mondir15.github.io/",
  email: "mondirbenz18@email.com",
  github: "https://github.com/mondir15",
  linkedin: "www.linkedin.com/in/moundhir-benz",
  words: ["fast.", "clean.", "scalable.", "impactful."],
  about: "Full-stack developer based in Montréal. I craft end-to-end digital experiences — from pixel-perfect interfaces to rock-solid APIs.",
  stack: {
    Frontend:  { items: ["React","Next.js","AngularJS","TypeScript","JavaScript","HTML5","CSS3","Tailwind","SASS","jQuery"] },
    Backend:   { items: ["PHP","Laravel","Symfony","Node.js","Express","REST API","GraphQL"] },
    Database:  { items: ["MySQL","PostgreSQL","MongoDB","Redis","Prisma","Eloquent ORM"] },
    DevOps:    { items: ["Git","GitHub","Docker","CI/CD","Linux","Nginx","Apache","Vercel","AWS S3"] },
    CMS:       { items: ["WordPress","Drupal","Headless CMS","WooCommerce"] },
    Other:     { items: ["SEO","Google Analytics","Figma","Postman","Jest","PHPUnit","Agile/Scrum"] },
  },
  exp: [
    {
      role: "Full-Stack Dev", co: "Freelance", period: "2024 — Now",
      tags: ["React","Laravel","PHP","MySQL"],
      pts: ["Custom web solutions for QC businesses","Client consulting & technical architecture","Performance optimization & SEO","Training & technical documentation"],
    },
    {
      role: "Full-Stack Dev", co: "BDH Collective Inc", period: "2023 — 2024",
      tags: ["Angular","PHP","jQuery","SEO"],
      pts: ["Built company website & responsive mobile version","Custom PHP, Angular & jQuery features","SEO optimization & Google Analytics","Internal dev workshops & tech watch"],
    },
  ],
  projects: [
    { title:"E-Commerce Platform", desc:"Full-stack store with cart, auth & Stripe payments.", tech:["React","Laravel","MySQL","Stripe"], live:"https://example.com", gh:"https://github.com", color:"#64ffa0", year:"2024" },
    { title:"Corporate CMS", desc:"Custom WordPress theme & plugin for a Montréal agency.", tech:["WordPress","PHP","JavaScript","ACF"], live:"https://example.com", gh:"https://github.com", color:"#78c1ff", year:"2024" },
    { title:"Analytics Dashboard", desc:"Real-time KPI dashboard with live charts & role-based access.", tech:["React","Node.js","MongoDB","Chart.js"], live:"https://example.com", gh:"https://github.com", color:"#ffb347", year:"2023" },
    { title:"REST API Microservice", desc:"Scalable Symfony API with JWT auth & Redis caching.", tech:["Symfony","MySQL","JWT","Redis"], live:null, gh:"https://github.com", color:"#c778ff", year:"2023" },
    { title:"Social Media App", desc:"Real-time social platform with WebSocket notifications.", tech:["React","Node.js","Socket.io","MongoDB"], live:"https://example.com", gh:"https://github.com", color:"#ff6b9d", year:"2024" },
    { title:"DevOps CI/CD Pipeline", desc:"Automated Docker deployment with GitHub Actions & rollback.", tech:["Docker","GitHub Actions","Nginx","Linux"], live:null, gh:"https://github.com", color:"#00d4ff", year:"2024" },
  ],
  edu: [
    { year:"2022–23", deg:"Diplôme Dev Web", school:"Collège Maisonneuve", loc:"Montréal" },
    { year:"2018–20", deg:"Diplôme Soutien IT", school:"Collège St-Michel", loc:"Montréal" },
    { year:"2013–17", deg:"Licence Informatique", school:"Univ. Constantine 2", loc:"Algérie" },
  ],
  interests: ["Cybersecurity","Digital Art","Cloud Architecture","Open Source","Tech Conferences","UI/UX Design"],
  stats: [["2+","Years"],["6+","Projects"],["3","Frameworks"],["∞","Coffee"]],
};

/* ═══════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wIdx];
    if (!deleting && charIdx < word.length) { const t = setTimeout(() => setCharIdx(c => c + 1), speed); return () => clearTimeout(t); }
    if (!deleting && charIdx === word.length) { const t = setTimeout(() => setDeleting(true), pause); return () => clearTimeout(t); }
    if (deleting && charIdx > 0) { const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2); return () => clearTimeout(t); }
    if (deleting && charIdx === 0) { setDeleting(false); setWIdx(w => (w + 1) % words.length); }
  }, [charIdx, deleting, wIdx, words, speed, pause]);
  useEffect(() => { setDisplay(words[wIdx].slice(0, charIdx)); }, [charIdx, wIdx, words]);
  return display;
}

/* ═══════════════════════════════════════════════════════════
   FADE WRAPPER
═══════════════════════════════════════════════════════════ */
function Fade({ children, d = 0, y = 30 }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : `translateY(${y}px)`, transition: `opacity .8s ${d}s cubic-bezier(.16,1,.3,1), transform .8s ${d}s cubic-bezier(.16,1,.3,1)` }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILL BAR
═══════════════════════════════════════════════════════════ */
function SkillBar({ name, pct, color }) {
  const [ref, v] = useInView(0.3);
  return (
    <div ref={ref} style={{ marginBottom: ".8rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".3rem" }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: "#888" }}>{name}</span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color }}>{pct}%</span>
      </div>
      <div style={{ height: 2, background: "#111", borderRadius: 1, overflow: "hidden" }}>
        <div style={{ height: "100%", background: `linear-gradient(90deg,${color},${color}88)`, width: v ? `${pct}%` : "0%", transition: "width 1.2s cubic-bezier(.16,1,.3,1)", boxShadow: v ? `0 0 8px ${color}55` : "none" }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PARTICLE CANVAS
═══════════════════════════════════════════════════════════ */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let id;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 40 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.2 + .3, a: Math.random() * .35 + .08 }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,255,160,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(100,255,160,${.05*(1-d/110)})`; ctx.lineWidth = .5; ctx.stroke(); }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const typed = useTypewriter(ME.words);
  const W = useWindowWidth();
  const isMobile = W < 768;
  const isTablet = W >= 768 && W < 1024;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fn = e => setMouse({ x: e.clientX, y: e.clientY });
    if (!isMobile) window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [isMobile]);

  // close menu on scroll
  useEffect(() => { setMenuOpen(false); }, [scrollY]);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const navSolid = scrollY > 60;
  const pad = isMobile ? "0 1.2rem" : isTablet ? "0 2.5rem" : "0 4rem";
  const secPad = isMobile ? "5rem 1.2rem" : isTablet ? "6rem 2.5rem" : "9rem 4rem";

  return (
    <div style={{ background: "#050507", color: "#ccc", fontFamily: "'Syne',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyles />
      <ParticleCanvas />

      {/* mouse glow — desktop only */}
      {!isMobile && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(100,255,160,0.035) 0%, transparent 70%)` }} />
      )}

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: navSolid ? ".8rem 1.5rem" : "1.2rem 1.5rem",
        background: navSolid || menuOpen ? "rgba(5,5,7,.97)" : "transparent",
        backdropFilter: navSolid || menuOpen ? "blur(24px)" : "none",
        borderBottom: navSolid || menuOpen ? "1px solid rgba(255,255,255,.05)" : "1px solid transparent",
        transition: "all .35s" }}>

        <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 900, color: "#fff", letterSpacing: "-.04em" }}>
          M<span style={{ color: "#64ffa0" }}>.</span>
        </button>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: ".1rem" }}>
            {["about","experience","projects","skills","contact"].map(s => (
              <button key={s} onClick={() => scrollTo(s)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: "#444", padding: ".4rem .8rem", textTransform: "uppercase", letterSpacing: ".1em", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = "#64ffa0"} onMouseLeave={e => e.target.style.color = "#444"}>{s}</button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {!isMobile && (
            <a href={ME.url} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: "#64ffa0", border: "1px solid rgba(100,255,160,.3)", padding: ".45rem 1rem", textDecoration: "none", letterSpacing: ".08em", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#64ffa0"; e.currentTarget.style.color = "#000"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64ffa0"; }}>
              Hire me ↗
            </a>
          )}

          {/* Hamburger — mobile only */}
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px" }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: menuOpen ? "#64ffa0" : "#888", transition: "all .3s", transform: menuOpen ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 1.5, background: menuOpen ? "#64ffa0" : "#888", transition: "all .3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 22, height: 1.5, background: menuOpen ? "#64ffa0" : "#888", transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {isMobile && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 190,
          background: "rgba(5,5,7,.98)", backdropFilter: "blur(24px)",
          padding: "5rem 2rem 2rem",
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform .4s cubic-bezier(.16,1,.3,1)",
          borderBottom: "1px solid #111" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}>
            {["about","experience","projects","skills","contact"].map((s, i) => (
              <button key={s} onClick={() => scrollTo(s)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Space Mono',monospace", fontSize: ".85rem", color: "#666",
                padding: "1rem 0", textTransform: "uppercase", letterSpacing: ".12em",
                textAlign: "left", borderBottom: "1px solid #0e0e14",
                transition: "color .2s",
                animationDelay: `${i * .05}s`
              }}
                onMouseEnter={e => e.target.style.color = "#64ffa0"}
                onMouseLeave={e => e.target.style.color = "#666"}>{s}</button>
            ))}
            <a href={ME.url} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".8rem", color: "#64ffa0", border: "1px solid rgba(100,255,160,.3)", padding: ".8rem 1.2rem", textDecoration: "none", textAlign: "center", marginTop: "1rem" }}>
              Hire me ↗
            </a>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "5rem 1.2rem 3rem" : isTablet ? "6rem 2.5rem 3rem" : "0 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)", backgroundSize: "70px 70px", transform: `translateY(${scrollY*.2}px)`, maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)" }} />

        {!isMobile && (
          <div style={{ position: "absolute", right: isMobile ? "-3rem" : "-2rem", top: "50%", transform: `translateY(calc(-50% + ${scrollY * .12}px))`, fontSize: "clamp(6rem,16vw,20rem)", fontWeight: 900, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.03)", letterSpacing: "-.05em", userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" }}>{ME.name}</div>
        )}

        <div style={{ position: "relative", zIndex: 2, maxWidth: 860 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontFamily: "'Space Mono',monospace", fontSize: isMobile ? ".6rem" : ".65rem", color: "#64ffa0", marginBottom: "2rem", letterSpacing: ".12em", animation: "fadeUp .8s .2s both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#64ffa0", boxShadow: "0 0 12px #64ffa0", display: "inline-block", animation: "blink 2s ease-in-out infinite" }} />
            AVAILABLE · {ME.city}
          </div>

          <h1 style={{ lineHeight: 1, marginBottom: "1.5rem", animation: "fadeUp .9s .35s both" }}>
            <span style={{ display: "block", fontSize: isMobile ? ".85rem" : "clamp(.9rem,2vw,1.3rem)", fontWeight: 500, color: "#3a3a50", marginBottom: ".4em", fontFamily: "'Space Mono',monospace", letterSpacing: ".08em" }}>I build</span>
            <span style={{ display: "block", fontSize: isMobile ? "clamp(3rem,14vw,5rem)" : "clamp(3.5rem,9vw,9rem)", fontWeight: 900, letterSpacing: "-.05em", lineHeight: .9, background: "linear-gradient(150deg,#fff 30%,#64ffa0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", minHeight: "1em" }}>
              {typed}<span style={{ color: "#64ffa0", animation: "cursorBlink 1s step-end infinite", WebkitTextFillColor: "#64ffa0" }}>|</span>
            </span>
            <span style={{ display: "block", fontSize: isMobile ? ".85rem" : "clamp(.9rem,2vw,1.3rem)", fontWeight: 500, color: "#3a3a50", marginTop: ".4em", fontFamily: "'Space Mono',monospace", letterSpacing: ".08em" }}>web products.</span>
          </h1>

          <p style={{ fontSize: isMobile ? ".9rem" : "1rem", color: "#555", maxWidth: 480, lineHeight: 1.8, marginBottom: "2.5rem", animation: "fadeUp .9s .5s both" }}>{ME.about}</p>

          <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap", animation: "fadeUp .9s .65s both" }}>
            <PBtn onClick={() => scrollTo("projects")} mobile={isMobile}>View work →</PBtn>
            <GBtn onClick={() => scrollTo("contact")} mobile={isMobile}>Contact</GBtn>
            <a href={ME.github} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: isMobile ? ".7rem" : ".72rem", color: "#444", border: "1px solid #1a1a22", padding: isMobile ? ".75rem 1.2rem" : ".85rem 1.5rem", textDecoration: "none", letterSpacing: ".06em", transition: "color .2s, border-color .2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "#444"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#444"; e.currentTarget.style.borderColor = "#1a1a22"; }}>
              GitHub ↗
            </a>
          </div>
        </div>

        {/* floating tags — hidden on mobile */}
        {!isMobile && ["React","Node.js","Laravel","PHP","MySQL","Docker"].map((t, i) => (
          <div key={t} style={{ position: "absolute", right: `${5 + (i % 3) * 7}%`, top: `${20 + i * 11}%`, fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: `rgba(100,255,160,${.12 + i * .04})`, border: `1px solid rgba(100,255,160,${.06 + i * .02})`, padding: ".28rem .65rem", animation: `floatY ${3.5 + i * .4}s ${i * .5}s ease-in-out infinite`, pointerEvents: "none" }}>{t}</div>
        ))}

        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".4rem", animation: "fadeUp 1s 1.2s both" }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".45rem", color: "#222", letterSpacing: ".2em" }}>SCROLL</span>
          <div style={{ width: 1, height: 44, background: "linear-gradient(#2a2a35,transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: secPad, maxWidth: 1200, margin: "0 auto" }}>
        <Fade><SLabel n="01" t="About" /></Fade>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1.1fr 1fr", gap: isMobile ? "3rem" : "5rem", alignItems: "start" }}>
          <div>
            <Fade d={.05}>
              <h2 style={{ ...H2, fontSize: isMobile ? "2rem" : "clamp(2rem,4vw,3.4rem)" }}>
                Turning ideas into<br /><span style={{ color: "#64ffa0" }}>real products.</span>
              </h2>
              <p style={{ color: "#666", lineHeight: 1.85, fontSize: ".95rem", marginBottom: "2rem" }}>
                From Algeria to Montréal, I've built a career at the crossroads of solid engineering and user-focused design. I ship products, not just code.
              </p>
            </Fade>
            <Fade d={.1}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: ".8rem", marginBottom: "2rem" }}>
                {ME.stats.map(([n, l]) => (
                  <div key={l} style={{ border: "1px solid #111", padding: isMobile ? ".8rem .5rem" : "1.2rem 1rem", textAlign: "center", transition: "border-color .2s, transform .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(100,255,160,.2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ fontSize: isMobile ? "1.6rem" : "2.2rem", fontWeight: 900, color: "#64ffa0", lineHeight: 1 }}>{n}</div>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".5rem", color: "#333", letterSpacing: ".1em", marginTop: ".3rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </Fade>
            <Fade d={.15}>
              <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
                <a href={ME.github} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: "#64ffa0", border: "1px solid rgba(100,255,160,.25)", padding: ".5rem 1rem", textDecoration: "none", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(100,255,160,.07)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>GitHub ↗</a>
                <a href={ME.linkedin} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: "#78c1ff", border: "1px solid rgba(120,193,255,.25)", padding: ".5rem 1rem", textDecoration: "none", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(120,193,255,.07)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>LinkedIn ↗</a>
              </div>
            </Fade>
          </div>

          <Fade d={.1}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#64ffa0", letterSpacing: ".2em", marginBottom: "1rem" }}>INTERESTS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
              {ME.interests.map((item, i) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: ".9rem", padding: ".85rem 1rem", border: "1px solid #0e0e14", transition: "all .25s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(100,255,160,.15)"; e.currentTarget.style.background = "rgba(100,255,160,.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#0e0e14"; e.currentTarget.style.background = "transparent"; }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#64ffa0", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".7rem", color: "#666" }}>{item}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ background: "#030305", padding: secPad }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade><SLabel n="02" t="Experience" /></Fade>
          <Fade d={.05}><h2 style={{ ...H2, fontSize: isMobile ? "2rem" : "clamp(2rem,4vw,3.4rem)" }}>Where I've worked.</h2></Fade>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.2rem" }}>
            {ME.exp.map((e, i) => (
              <Fade key={i} d={i * .1}><ExpCard e={e} /></Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: secPad, maxWidth: 1200, margin: "0 auto" }}>
        <Fade><SLabel n="03" t="Projects" /></Fade>
        <Fade d={.05}><h2 style={{ ...H2, fontSize: isMobile ? "2rem" : "clamp(2rem,4vw,3.4rem)" }}>Selected work.</h2></Fade>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: "1.2rem" }}>
          {ME.projects.map((p, i) => (
            <Fade key={i} d={i * .07}><ProjectCard p={p} idx={i} /></Fade>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background: "#030305", padding: secPad }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade><SLabel n="04" t="Skills" /></Fade>
          <Fade d={.05}><h2 style={{ ...H2, fontSize: isMobile ? "2rem" : "clamp(2rem,4vw,3.4rem)" }}>My toolkit.</h2></Fade>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(3,1fr)", gap: "1px", background: "#0f0f14", border: "1px solid #0f0f14", marginBottom: "3rem" }}>
            {Object.entries(ME.stack).map(([cat, { items }], i) => (
              <Fade key={cat} d={i * .06}>
                <div style={{ background: "#030305", padding: isMobile ? "1.2rem" : "1.8rem", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#07070c"}
                  onMouseLeave={e => e.currentTarget.style.background = "#030305"}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".52rem", color: "#64ffa0", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "1rem" }}>{cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem" }}>
                    {items.map(sk => (
                      <span key={sk} style={{ fontFamily: "'Space Mono',monospace", fontSize: isMobile ? ".55rem" : ".62rem", color: "#555", border: "1px solid #131320", padding: ".2rem .45rem", transition: "all .2s", cursor: "default" }}
                        onMouseEnter={e => { e.target.style.color = "#ccc"; e.target.style.borderColor = "#444"; }}
                        onMouseLeave={e => { e.target.style.color = "#555"; e.target.style.borderColor = "#131320"; }}>{sk}</span>
                    ))}
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Skill bars */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "3rem" }}>
            <Fade d={.1}>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".52rem", color: "#64ffa0", letterSpacing: ".2em", marginBottom: "1.3rem" }}>PROFICIENCY</div>
                {[["React / Next.js",92,"#64ffa0"],["PHP / Laravel",88,"#64ffa0"],["JavaScript",90,"#78c1ff"],["Node.js",80,"#78c1ff"],["MySQL / MongoDB",85,"#ffb347"]].map(([n,p,c]) => (
                  <SkillBar key={n} name={n} pct={p} color={c} />
                ))}
              </div>
            </Fade>
            <Fade d={.15}>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".52rem", color: "#64ffa0", letterSpacing: ".2em", marginBottom: "1.3rem" }}>ALSO SKILLED IN</div>
                {[["Symfony",75,"#c778ff"],["TypeScript",70,"#c778ff"],["Docker / CI-CD",68,"#ff6b9d"],["WordPress",85,"#ff6b9d"],["SEO / Analytics",82,"#00d4ff"]].map(([n,p,c]) => (
                  <SkillBar key={n} name={n} pct={p} color={c} />
                ))}
              </div>
            </Fade>
          </div>

          {/* Marquee */}
          <Fade d={.2}>
            <div style={{ marginTop: "3rem", overflow: "hidden", borderTop: "1px solid #0f0f14", borderBottom: "1px solid #0f0f14", padding: ".8rem 0" }}>
              <div style={{ display: "flex", gap: "2rem", animation: "marquee 25s linear infinite", whiteSpace: "nowrap" }}>
                {[...Object.values(ME.stack).flatMap(s => s.items), ...Object.values(ME.stack).flatMap(s => s.items)].map((sk, i) => (
                  <span key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".6rem", color: "#1e1e28", letterSpacing: ".08em", flexShrink: 0 }}>{sk} <span style={{ color: "#64ffa015" }}>◆</span></span>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section style={{ padding: secPad, maxWidth: 1200, margin: "0 auto" }}>
        <Fade><SLabel n="05" t="Education" /></Fade>
        <Fade d={.05}><h2 style={{ ...H2, fontSize: isMobile ? "2rem" : "clamp(2rem,4vw,3.4rem)" }}>Background.</h2></Fade>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1.2rem" }}>
          {ME.edu.map((e, i) => (
            <Fade key={i} d={i * .1}>
              <div style={{ border: "1px solid #0e0e14", padding: "2rem", position: "relative", overflow: "hidden", transition: "border-color .3s, transform .3s" }}
                onMouseEnter={el => { el.currentTarget.style.borderColor = "#333"; el.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseLeave={el => { el.currentTarget.style.borderColor = "#0e0e14"; el.currentTarget.style.transform = "none"; }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#64ffa0,#78c1ff,transparent)" }} />
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: "#64ffa0", letterSpacing: ".1em", marginBottom: ".8rem" }}>{e.year}</div>
                <div style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-.02em", marginBottom: ".35rem" }}>{e.deg}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: "#555", marginBottom: ".2rem" }}>{e.school}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#333" }}>{e.loc}</div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: isMobile ? "5rem 1.2rem 4rem" : secPad, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 100%,rgba(100,255,160,.04) 0%,transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Fade><SLabel n="06" t="Contact" style={{ justifyContent: "center" }} /></Fade>
          <Fade d={.08}>
            <h2 style={{ fontSize: isMobile ? "2.2rem" : "clamp(2.5rem,6vw,5rem)", fontWeight: 900, letterSpacing: "-.04em", marginBottom: "1rem", lineHeight: 1 }}>
              Let's build<br /><span style={{ color: "#64ffa0" }}>something great.</span>
            </h2>
          </Fade>
          <Fade d={.15}>
            <p style={{ color: "#555", fontSize: ".95rem", marginBottom: "2.5rem" }}>Open to freelance, collaborations & full-time roles.</p>
          </Fade>
          <Fade d={.2}>
            <div style={{ display: "flex", gap: ".8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
              <a href={`mailto:${ME.email}`} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".72rem", background: "#64ffa0", color: "#000", padding: ".95rem 2rem", textDecoration: "none", letterSpacing: ".05em", display: "inline-flex", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)", transition: "transform .2s, box-shadow .2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(100,255,160,.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                Email ↗
              </a>
              <a href={ME.linkedin} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".72rem", color: "#78c1ff", border: "1px solid rgba(120,193,255,.3)", padding: ".95rem 2rem", textDecoration: "none", letterSpacing: ".05em", display: "inline-flex", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(120,193,255,.07)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; }}>
                LinkedIn ↗
              </a>
              <a href={ME.github} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".72rem", color: "#555", border: "1px solid #1a1a22", padding: ".95rem 2rem", textDecoration: "none", letterSpacing: ".05em", display: "inline-flex", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#1a1a22"; e.currentTarget.style.transform = "none"; }}>
                GitHub ↗
              </a>
            </div>
          </Fade>
          <Fade d={.25}>
            <a href={`mailto:${ME.email}`} style={{ fontFamily: "'Syne',sans-serif", fontSize: isMobile ? "1rem" : "clamp(1rem,2.2vw,1.5rem)", fontWeight: 700, color: "#1e1e28", textDecoration: "none", transition: "color .3s", display: "block" }}
              onMouseEnter={e => e.currentTarget.style.color = "#64ffa0"}
              onMouseLeave={e => e.currentTarget.style.color = "#1e1e28"}>
              {ME.email}
            </a>
          </Fade>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "1.2rem 1.5rem", borderTop: "1px solid #0a0a0f", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".5rem" }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#1e1e28" }}>© 2025 · {ME.name} · {ME.city}</span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#64ffa0", animation: "blink 3s ease-in-out infinite" }}>OPEN TO WORK</span>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════ */
function ExpCard({ e }) {
  const [h, setH] = useState(false);
  return (
    <div style={{ border: `1px solid ${h ? "rgba(100,255,160,.15)" : "#0e0e14"}`, padding: "2rem", position: "relative", overflow: "hidden", transition: "border-color .3s, transform .3s", transform: h ? "translateY(-4px)" : "none" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#64ffa0,#78c1ff,transparent)", transform: h ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform .5s cubic-bezier(.16,1,.3,1)" }} />
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: "#64ffa0", letterSpacing: ".1em", marginBottom: ".4rem" }}>{e.period}</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-.02em", marginBottom: ".2rem" }}>{e.role}</div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: "#555", marginBottom: "1.2rem" }}>{e.co}</div>
      <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
        {e.tags.map(t => <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#555", border: "1px solid #181824", padding: ".18rem .5rem" }}>{t}</span>)}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".5rem" }}>
        {e.pts.map((p, j) => (
          <li key={j} style={{ display: "flex", gap: ".55rem", color: "#666", fontSize: ".82rem", lineHeight: 1.55 }}>
            <span style={{ color: "#64ffa0", flexShrink: 0 }}>›</span>{p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ p, idx }) {
  const [h, setH] = useState(false);
  return (
    <div style={{ border: `1px solid ${h ? p.color + "30" : "#0e0e14"}`, padding: "1.8rem", position: "relative", overflow: "hidden", transition: "border-color .3s, transform .3s, box-shadow .3s", transform: h ? "translateY(-5px)" : "none", boxShadow: h ? `0 20px 50px ${p.color}10` : "none", cursor: "default" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 70% at 50% 130%,${p.color}0a 0%,transparent 70%)`, opacity: h ? 1 : 0, transition: "opacity .4s", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.color},transparent)`, transform: h ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform .45s cubic-bezier(.16,1,.3,1)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".9rem" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".52rem", color: "#222" }}>0{idx + 1}</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".52rem", color: "#333" }}>{p.year}</div>
        </div>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-.02em", marginBottom: ".5rem", color: h ? "#fff" : "#ccc", transition: "color .25s" }}>{p.title}</h3>
        <p style={{ color: "#555", fontSize: ".8rem", lineHeight: 1.65, marginBottom: "1.1rem" }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginBottom: "1.3rem" }}>
          {p.tech.map(t => <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".57rem", color: h ? p.color : "#444", border: `1px solid ${h ? p.color + "45" : "#181824"}`, padding: ".18rem .45rem", transition: "color .25s, border-color .25s" }}>{t}</span>)}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: p.color, textDecoration: "none", letterSpacing: ".04em" }}>Live ↗</a>}
          <a href={p.gh} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: "#444", textDecoration: "none", transition: "color .2s" }}
            onMouseEnter={e => e.target.style.color = "#888"} onMouseLeave={e => e.target.style.color = "#444"}>GitHub</a>
        </div>
      </div>
    </div>
  );
}

function PBtn({ children, onClick, mobile }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} style={{ fontFamily: "'Space Mono',monospace", fontSize: mobile ? ".7rem" : ".75rem", background: "#64ffa0", color: "#000", border: "none", cursor: "pointer", padding: mobile ? ".8rem 1.5rem" : "1rem 2rem", letterSpacing: ".04em", transform: h ? "translateY(-3px)" : "none", boxShadow: h ? "0 14px 35px rgba(100,255,160,.3)" : "none", transition: "transform .2s, box-shadow .2s", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{children}</button>
  );
}

function GBtn({ children, onClick, mobile }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} style={{ fontFamily: "'Space Mono',monospace", fontSize: mobile ? ".7rem" : ".75rem", background: "none", color: h ? "#ccc" : "#555", border: `1px solid ${h ? "#555" : "#1a1a22"}`, cursor: "pointer", padding: mobile ? ".8rem 1.5rem" : "1rem 2rem", letterSpacing: ".04em", transition: "color .2s, border-color .2s, transform .2s", transform: h ? "translateY(-3px)" : "none" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{children}</button>
  );
}

function SLabel({ n, t, style: ex }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".8rem", ...ex }}>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".5rem", color: "#64ffa025", letterSpacing: ".1em" }}>{n}</span>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: "#64ffa0", letterSpacing: ".22em", textTransform: "uppercase" }}>{t}</span>
    </div>
  );
}

const H2 = { fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "2.5rem" };

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800;900&family=Space+Mono:wght@400;700&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth}
      body{background:#050507;overflow-x:hidden}
      ::-webkit-scrollbar{width:3px}
      ::-webkit-scrollbar-track{background:#050507}
      ::-webkit-scrollbar-thumb{background:#64ffa0;border-radius:2px}
      ::selection{background:rgba(100,255,160,.2)}
      img,video{max-width:100%;height:auto}

      @keyframes blink       { 0%,100%{opacity:1;box-shadow:0 0 12px #64ffa0} 50%{opacity:.2;box-shadow:none} }
      @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes floatY      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      @keyframes marquee     { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes scrollPulse { 0%,100%{opacity:0;transform:scaleY(.4) translateY(-8px)} 50%{opacity:1;transform:scaleY(1) translateY(0)} }
      @keyframes fadeUp      { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

      @media (max-width:767px){
        nav { padding: .8rem 1.2rem !important; }
      }
      @media (max-width:480px){
        h1 { word-break: break-word; }
      }
    `}</style>
  );
}
