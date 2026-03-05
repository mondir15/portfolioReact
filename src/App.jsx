import { useState, useEffect, useRef, useCallback } from "react";

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
  linkedin: "https://linkedin.com/in/mondir",
  words: ["fast.", "clean.", "scalable.", "impactful."],
  about: "Full-stack developer based in Montréal. I craft end-to-end digital experiences — from pixel-perfect interfaces to rock-solid APIs.",
  stack: {
    Frontend:  { icon:"⬡", items:["React","Next.js","AngularJS","TypeScript","JavaScript","HTML5","CSS3","Tailwind","SASS","jQuery"] },
    Backend:   { icon:"⬡", items:["PHP","Laravel","Symfony","Node.js","Express","REST API","GraphQL"] },
    Database:  { icon:"⬡", items:["MySQL","PostgreSQL","MongoDB","Redis","Prisma","Eloquent ORM"] },
    DevOps:    { icon:"⬡", items:["Git","GitHub","Docker","CI/CD","Linux","Nginx","Apache","Vercel","AWS S3"] },
    CMS:       { icon:"⬡", items:["WordPress","Drupal","Headless CMS","WooCommerce"] },
    Other:     { icon:"⬡", items:["SEO","Google Analytics","Figma","Postman","Jest","PHPUnit","Agile/Scrum"] },
  },
  exp: [
    {
      role: "Full-Stack Dev",
      co: "Freelance",
      period: "2024 — Now",
      tags: ["React","Laravel","PHP","MySQL"],
      pts: [
        "Custom web solutions for Quebec businesses",
        "Client consulting & technical architecture",
        "Performance optimization & SEO",
        "Training & technical documentation",
      ],
    },
    {
      role: "Full-Stack Dev",
      co: "BDH Collective Inc",
      period: "2023 — 2024",
      tags: ["Angular","PHP","jQuery","SEO"],
      pts: [
        "Built company website & responsive mobile version",
        "Custom PHP, Angular & jQuery features",
        "SEO optimization & Google Analytics setup",
        "Internal dev workshops & tech watch",
      ],
    },
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      desc: "Full-stack online store with cart, auth, Stripe payments & admin dashboard.",
      tech: ["React","Laravel","MySQL","Stripe"],
      live: "https://example.com",
      gh: "https://github.com",
      color: "#64ffa0",
      year: "2024",
    },
    {
      title: "Corporate CMS",
      desc: "Custom WordPress theme & plugin suite for a Montréal creative agency.",
      tech: ["WordPress","PHP","JavaScript","ACF"],
      live: "https://example.com",
      gh: "https://github.com",
      color: "#78c1ff",
      year: "2024",
    },
    {
      title: "Analytics Dashboard",
      desc: "Real-time KPI dashboard with live charts, role-based access & export features.",
      tech: ["React","Node.js","MongoDB","Chart.js"],
      live: "https://example.com",
      gh: "https://github.com",
      color: "#ffb347",
      year: "2023",
    },
    {
      title: "REST API Microservice",
      desc: "Scalable Symfony API with JWT auth, Redis caching & auto-generated OpenAPI docs.",
      tech: ["Symfony","MySQL","JWT","Redis"],
      live: null,
      gh: "https://github.com",
      color: "#c778ff",
      year: "2023",
    },
    {
      title: "Social Media App",
      desc: "Full-stack social platform with real-time notifications, posts & messaging via WebSockets.",
      tech: ["React","Node.js","Socket.io","MongoDB"],
      live: "https://example.com",
      gh: "https://github.com",
      color: "#ff6b9d",
      year: "2024",
    },
    {
      title: "DevOps CI/CD Pipeline",
      desc: "Automated Docker-based deployment pipeline with GitHub Actions, staging & rollback.",
      tech: ["Docker","GitHub Actions","Nginx","Linux"],
      live: null,
      gh: "https://github.com",
      color: "#00d4ff",
      year: "2024",
    },
  ],
  edu: [
    { year: "2022–23", deg: "Diplôme Dev Web", school: "Collège Maisonneuve", loc: "Montréal" },
    { year: "2018–20", deg: "Diplôme Soutien IT", school: "Collège St-Michel", loc: "Montréal" },
    { year: "2013–17", deg: "Licence Informatique", school: "Univ. Constantine 2", loc: "Algérie" },
  ],
  interests: ["Cybersecurity","Digital Art","Cloud Architecture","Open Source","Tech Conferences","UI/UX Design"],
  stats: [["2+","Years Exp"],["6+","Projects"],["3","Frameworks"],["∞","Coffee"]],
};

/* ═══════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } },
      { threshold }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wIdx];
    if (!deleting && charIdx < word.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === word.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWIdx(w => (w + 1) % words.length);
    }
  }, [charIdx, deleting, wIdx, words, speed, pause]);
  useEffect(() => { setDisplay(words[wIdx].slice(0, charIdx)); }, [charIdx, wIdx, words]);
  return display;
}

/* ═══════════════════════════════════════════════════════════
   FADE-IN WRAPPER
═══════════════════════════════════════════════════════════ */
function Fade({ children, d = 0, y = 40, x = 0 }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px) translateX(${x}px)`,
      transition: `opacity .9s ${d}s cubic-bezier(.16,1,.3,1), transform .9s ${d}s cubic-bezier(.16,1,.3,1)`,
    }}>{children}</div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PARTICLE CANVAS
═══════════════════════════════════════════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,255,160,${p.alpha})`;
        ctx.fill();
      });
      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100,255,160,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ═══════════════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════════════ */
function CountUp({ target, suffix = "" }) {
  const [ref, v] = useInView(0.5);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!v) return;
    const num = parseInt(target) || 0;
    if (!num) { setCount(target); return; }
    let start = 0;
    const step = Math.ceil(num / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(id); }
      else setCount(start);
    }, 30);
    return () => clearInterval(id);
  }, [v, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════
   SKILL BAR
═══════════════════════════════════════════════════════════ */
function SkillBar({ name, pct, color }) {
  const [ref, v] = useInView(0.3);
  return (
    <div ref={ref} style={{ marginBottom: ".7rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".25rem" }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: "#888" }}>{name}</span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".6rem", color: color }}>{pct}%</span>
      </div>
      <div style={{ height: 2, background: "#111", borderRadius: 1, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 1,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          width: v ? `${pct}%` : "0%",
          transition: "width 1.2s cubic-bezier(.16,1,.3,1)",
          boxShadow: v ? `0 0 8px ${color}55` : "none",
        }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════════════════════ */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let id;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (dotRef.current) { dotRef.current.style.left = pos.current.x + "px"; dotRef.current.style.top = pos.current.y + "px"; }
      if (ringRef.current) { ringRef.current.style.left = ring.current.x + "px"; ringRef.current.style.top = ring.current.y + "px"; }
      id = requestAnimationFrame(animate);
    };
    animate();
    const hover = () => { if (ringRef.current) { ringRef.current.style.width = "50px"; ringRef.current.style.height = "50px"; ringRef.current.style.borderColor = "#64ffa0"; } };
    const unhover = () => { if (ringRef.current) { ringRef.current.style.width = "32px"; ringRef.current.style.height = "32px"; ringRef.current.style.borderColor = "rgba(100,255,160,.5)"; } };
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", hover); el.addEventListener("mouseleave", unhover); });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(id); };
  }, []);
  return (
    <>
      <div ref={dotRef} style={{ position: "fixed", width: 6, height: 6, background: "#64ffa0", borderRadius: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference" }} />
      <div ref={ringRef} style={{ position: "fixed", width: 32, height: 32, border: "1px solid rgba(100,255,160,.5)", borderRadius: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 9998, transition: "width .3s, height .3s, border-color .3s" }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   GLITCH TEXT
═══════════════════════════════════════════════════════════ */
function Glitch({ text }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }} className="glitch-wrap">
      <span data-text={text} className="glitch">{text}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileNav, setMobileNav] = useState(false);
  const typed = useTypewriter(ME.words);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouse = e => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  const navSolid = scrollY > 80;
  const navItems = ["about","experience","projects","skills","contact"];

  return (
    <div style={{ background: "#050507", color: "#ccc", fontFamily: "'Syne',sans-serif", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      <GlobalStyles />
      <Cursor />
      <ParticleCanvas />

      {/* ambient mouse glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(100,255,160,0.035) 0%, transparent 70%)` }} />

      {/* ─────────── NAV ─────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: navSolid ? ".9rem 4rem" : "1.4rem 4rem",
        background: navSolid ? "rgba(5,5,7,.95)" : "transparent",
        backdropFilter: navSolid ? "blur(24px)" : "none",
        borderBottom: navSolid ? "1px solid rgba(255,255,255,.05)" : "1px solid transparent",
        transition: "all .4s cubic-bezier(.16,1,.3,1)" }}>
        <button onClick={() => scrollTo("hero")}
          style={{ background: "none", border: "none", cursor: "none", fontFamily: "'Syne',sans-serif", fontSize: "1.5rem", fontWeight: 900, color: "#fff", letterSpacing: "-.04em" }}>
          M<span style={{ color: "#64ffa0" }}>.</span>
        </button>
        <div style={{ display: "flex", gap: ".1rem" }}>
          {navItems.map((s, i) => (
            <button key={s} onClick={() => scrollTo(s)} style={{
              background: "none", border: "none", cursor: "none", fontFamily: "'Space Mono',monospace",
              fontSize: ".65rem", color: "#444", padding: ".45rem .85rem",
              textTransform: "uppercase", letterSpacing: ".1em", transition: "color .2s",
              animation: `navFadeIn .6s ${i * .08}s both`
            }}
              onMouseEnter={e => e.target.style.color = "#64ffa0"}
              onMouseLeave={e => e.target.style.color = "#444"}>
              {s}
            </button>
          ))}
        </div>
        <a href={ME.url} target="_blank" rel="noreferrer" style={{
          fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: "#64ffa0",
          border: "1px solid rgba(100,255,160,.3)", padding: ".5rem 1.2rem",
          textDecoration: "none", letterSpacing: ".08em", transition: "all .25s",
          position: "relative", overflow: "hidden"
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#64ffa0"; e.currentTarget.style.color = "#000"; e.currentTarget.style.boxShadow = "0 0 30px rgba(100,255,160,.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64ffa0"; e.currentTarget.style.boxShadow = "none"; }}>
          Hire me ↗
        </a>
      </nav>

      {/* ─────────── HERO ─────────── */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 4rem", position: "relative", overflow: "hidden" }}>
        {/* animated grid */}
        <div style={{ position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px", transform: `translateY(${scrollY * .25}px)`,
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)" }} />

        {/* huge ghost name parallax */}
        <div style={{ position: "absolute", right: "-5rem", top: "50%", transform: `translateY(calc(-50% + ${scrollY * .15}px))`,
          fontSize: "clamp(10rem,22vw,26rem)", fontWeight: 900, color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,.03)", letterSpacing: "-.05em",
          userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap",
          animation: "ghostPulse 6s ease-in-out infinite" }}>
          {ME.name}
        </div>

        {/* green diagonal accent */}
        <div style={{ position: "absolute", top: "15%", right: "12%", width: 2, height: "40vh",
          background: "linear-gradient(to bottom, transparent, #64ffa0, transparent)",
          animation: "lineSlide 3s ease-in-out infinite", opacity: .4 }} />
        <div style={{ position: "absolute", top: "30%", right: "18%", width: 2, height: "25vh",
          background: "linear-gradient(to bottom, transparent, #78c1ff, transparent)",
          animation: "lineSlide 3s 1s ease-in-out infinite", opacity: .25 }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          {/* status badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".6rem",
            fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: "#64ffa0",
            marginBottom: "2.5rem", letterSpacing: ".14em", animation: "fadeUp .8s .2s both" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#64ffa0", boxShadow: "0 0 14px #64ffa0", display: "inline-block", animation: "blink 2s ease-in-out infinite" }} />
            AVAILABLE FOR WORK · {ME.city}
          </div>

          {/* headline */}
          <div style={{ animation: "fadeUp .9s .35s both" }}>
            <h1 style={{ lineHeight: 1, marginBottom: "2rem" }}>
              <span style={{ display: "block", fontSize: "clamp(1rem,2vw,1.35rem)", fontWeight: 500, color: "#3a3a50", marginBottom: ".4em", fontFamily: "'Space Mono',monospace", letterSpacing: ".08em" }}>
                I build
              </span>
              <span style={{ display: "block", fontSize: "clamp(4rem,9.5vw,9rem)", fontWeight: 900, letterSpacing: "-.05em", lineHeight: .88,
                background: "linear-gradient(150deg,#fff 30%,#64ffa0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                minHeight: "1em" }}>
                {typed}<span style={{ color: "#64ffa0", animation: "cursorBlink 1s step-end infinite", WebkitTextFillColor: "#64ffa0" }}>|</span>
              </span>
              <span style={{ display: "block", fontSize: "clamp(1rem,2vw,1.35rem)", fontWeight: 500, color: "#3a3a50", marginTop: ".4em", fontFamily: "'Space Mono',monospace", letterSpacing: ".08em" }}>
                web products.
              </span>
            </h1>
          </div>

          <p style={{ fontSize: "1rem", color: "#555", maxWidth: 480, lineHeight: 1.8, marginBottom: "3rem", animation: "fadeUp .9s .5s both" }}>
            {ME.about}
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp .9s .65s both" }}>
            <PBtn onClick={() => scrollTo("projects")}>View work →</PBtn>
            <GBtn onClick={() => scrollTo("contact")}>Get in touch</GBtn>
            <a href={ME.github} target="_blank" rel="noreferrer" style={{
              fontFamily: "'Space Mono',monospace", fontSize: ".7rem", color: "#444",
              border: "1px solid #1a1a22", padding: ".9rem 1.5rem", textDecoration: "none",
              letterSpacing: ".06em", transition: "color .2s, border-color .2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "#444"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#444"; e.currentTarget.style.borderColor = "#1a1a22"; }}>
              GitHub ↗
            </a>
          </div>
        </div>

        {/* floating tech tags */}
        {["React","Node.js","Laravel","PHP","MySQL","Docker","TypeScript"].map((t, i) => (
          <div key={t} style={{
            position: "absolute", right: `${4 + (i % 3) * 7}%`, top: `${18 + i * 10}%`,
            fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: `rgba(100,255,160,${.15 + i * .04})`,
            border: `1px solid rgba(100,255,160,${.07 + i * .02})`, padding: ".28rem .65rem",
            animation: `floatY ${3.5 + i * .4}s ${i * .5}s ease-in-out infinite`, pointerEvents: "none",
            backdropFilter: "blur(4px)"
          }}>{t}</div>
        ))}

        {/* scroll cue */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".4rem", animation: "fadeUp 1s 1.2s both" }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".48rem", color: "#2a2a35", letterSpacing: ".2em" }}>SCROLL</span>
          <div style={{ width: 1, height: 52, background: "linear-gradient(#2a2a35, transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ─────────── ABOUT ─────────── */}
      <section id="about" style={{ padding: "9rem 4rem", maxWidth: 1200, margin: "0 auto" }}>
        <Fade><SLabel n="01" t="About" /></Fade>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <div>
            <Fade d={.05}>
              <h2 style={H2}>Turning ideas into<br /><span style={{ color: "#64ffa0" }}>real products.</span></h2>
              <p style={{ color: "#666", lineHeight: 1.9, fontSize: ".98rem", marginBottom: "2.5rem" }}>
                From Algeria to Montréal, I've built a career at the crossroads of solid engineering and user-focused design. I ship products, not just write code — with clean architecture, great DX, and a sharp eye for detail.
              </p>
            </Fade>
            {/* stats */}
            <Fade d={.1}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {ME.stats.map(([n, l]) => (
                  <div key={l} style={{ border: "1px solid #111", padding: "1.2rem 1rem", textAlign: "center",
                    transition: "border-color .2s, transform .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(100,255,160,.2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#64ffa0", lineHeight: 1 }}>{n}</div>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#333", letterSpacing: ".1em", marginTop: ".3rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </Fade>
            <Fade d={.15}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <a href={ME.github} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: "#64ffa0", border: "1px solid rgba(100,255,160,.25)", padding: ".5rem 1rem", textDecoration: "none", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(100,255,160,.07)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  GitHub ↗
                </a>
                <a href={ME.linkedin} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: "#78c1ff", border: "1px solid rgba(120,193,255,.25)", padding: ".5rem 1rem", textDecoration: "none", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(120,193,255,.07)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  LinkedIn ↗
                </a>
              </div>
            </Fade>
          </div>

          <div>
            <Fade d={.1}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#64ffa0", letterSpacing: ".2em", marginBottom: "1rem" }}>INTERESTS & PASSIONS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                {ME.interests.map((item, i) => (
                  <div key={item} style={{
                    display: "flex", alignItems: "center", gap: ".9rem", padding: ".9rem 1.1rem",
                    border: "1px solid #0e0e14", transition: "all .25s", cursor: "default",
                    animation: `fadeUp .6s ${.1 + i * .06}s both`
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(100,255,160,.15)"; e.currentTarget.style.background = "rgba(100,255,160,.02)"; e.currentTarget.style.paddingLeft = "1.4rem"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#0e0e14"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "1.1rem"; }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#64ffa0", flexShrink: 0, boxShadow: "0 0 6px #64ffa055" }} />
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".72rem", color: "#666" }}>{item}</span>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ─────────── EXPERIENCE ─────────── */}
      <section id="experience" style={{ background: "#030305", padding: "9rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 4rem" }}>
          <Fade><SLabel n="02" t="Experience" /></Fade>
          <Fade d={.05}><h2 style={H2}>Where I've worked.</h2></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {ME.exp.map((e, i) => (
              <Fade key={i} d={i * .1}><ExpCard e={e} /></Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── PROJECTS ─────────── */}
      <section id="projects" style={{ padding: "9rem 4rem", maxWidth: 1200, margin: "0 auto" }}>
        <Fade><SLabel n="03" t="Projects" /></Fade>
        <Fade d={.05}><h2 style={H2}>Selected work.</h2></Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {ME.projects.map((p, i) => (
            <Fade key={i} d={i * .07}><ProjectCard p={p} idx={i} /></Fade>
          ))}
        </div>
      </section>

      {/* ─────────── SKILLS ─────────── */}
      <section id="skills" style={{ background: "#030305", padding: "9rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 4rem" }}>
          <Fade><SLabel n="04" t="Skills & Stack" /></Fade>
          <Fade d={.05}><h2 style={H2}>My toolkit.</h2></Fade>

          {/* skill categories grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#0f0f14", border: "1px solid #0f0f14", marginBottom: "4rem" }}>
            {Object.entries(ME.stack).map(([cat, { icon, items }], i) => (
              <Fade key={cat} d={i * .06}>
                <div style={{ background: "#030305", padding: "2rem", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#07070c"}
                  onMouseLeave={e => e.currentTarget.style.background = "#030305"}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#64ffa0", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "1.2rem" }}>{cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                    {items.map((sk, j) => (
                      <span key={sk} style={{
                        fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: "#555",
                        border: "1px solid #131320", padding: ".22rem .55rem",
                        transition: "all .2s", cursor: "default",
                        animationDelay: `${j * .04}s`
                      }}
                        onMouseEnter={e => { e.target.style.color = "#ccc"; e.target.style.borderColor = "#444"; e.target.style.background = "#0e0e14"; }}
                        onMouseLeave={e => { e.target.style.color = "#555"; e.target.style.borderColor = "#131320"; e.target.style.background = "transparent"; }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* proficiency bars */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            <Fade d={.1}>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#64ffa0", letterSpacing: ".2em", marginBottom: "1.5rem" }}>PROFICIENCY</div>
                {[["React / Next.js",92,"#64ffa0"],["PHP / Laravel",88,"#64ffa0"],["JavaScript",90,"#78c1ff"],["Node.js",80,"#78c1ff"],["MySQL / MongoDB",85,"#ffb347"]].map(([n, p, c]) => (
                  <SkillBar key={n} name={n} pct={p} color={c} />
                ))}
              </div>
            </Fade>
            <Fade d={.15}>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#64ffa0", letterSpacing: ".2em", marginBottom: "1.5rem" }}>ALSO SKILLED IN</div>
                {[["Symfony",75,"#c778ff"],["TypeScript",70,"#c778ff"],["Docker / CI-CD",68,"#ff6b9d"],["WordPress / Drupal",85,"#ff6b9d"],["SEO / Analytics",82,"#00d4ff"]].map(([n, p, c]) => (
                  <SkillBar key={n} name={n} pct={p} color={c} />
                ))}
              </div>
            </Fade>
          </div>

          {/* scrolling marquee */}
          <Fade d={.2}>
            <div style={{ marginTop: "3rem", overflow: "hidden", borderTop: "1px solid #0f0f14", borderBottom: "1px solid #0f0f14", padding: ".9rem 0" }}>
              <div style={{ display: "flex", gap: "2.5rem", animation: "marquee 25s linear infinite", whiteSpace: "nowrap" }}>
                {[...Object.values(ME.stack).flatMap(s => s.items), ...Object.values(ME.stack).flatMap(s => s.items)].map((sk, i) => (
                  <span key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: "#1e1e28", letterSpacing: ".08em", flexShrink: 0 }}>
                    {sk} <span style={{ color: "#64ffa015" }}>◆</span>
                  </span>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ─────────── EDUCATION ─────────── */}
      <section style={{ padding: "9rem 4rem", maxWidth: 1200, margin: "0 auto" }}>
        <Fade><SLabel n="05" t="Education" /></Fade>
        <Fade d={.05}><h2 style={H2}>Background.</h2></Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {ME.edu.map((e, i) => (
            <Fade key={i} d={i * .1}>
              <div style={{ border: "1px solid #0e0e14", padding: "2.5rem", position: "relative", overflow: "hidden", transition: "border-color .3s, transform .3s" }}
                onMouseEnter={el => { el.currentTarget.style.borderColor = "#333"; el.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={el => { el.currentTarget.style.borderColor = "#0e0e14"; el.currentTarget.style.transform = "none"; }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#64ffa0,#78c1ff,transparent)" }} />
                <div style={{ position: "absolute", bottom: "-1rem", right: "-1rem", fontSize: "5rem", fontWeight: 900, color: "rgba(255,255,255,.015)", lineHeight: 1, userSelect: "none" }}>{e.year.slice(-2)}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".6rem", color: "#64ffa0", letterSpacing: ".12em", marginBottom: "1rem" }}>{e.year}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-.02em", marginBottom: ".4rem" }}>{e.deg}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".68rem", color: "#555", marginBottom: ".25rem" }}>{e.school}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: "#333" }}>{e.loc}</div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ─────────── CONTACT ─────────── */}
      <section id="contact" style={{ padding: "10rem 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 100%, rgba(100,255,160,.04) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.012) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Fade><SLabel n="06" t="Contact" style={{ justifyContent: "center" }} /></Fade>
          <Fade d={.08}>
            <h2 style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)", fontWeight: 900, letterSpacing: "-.04em", marginBottom: "1.2rem", lineHeight: 1 }}>
              Let's build<br /><span style={{ color: "#64ffa0" }}>something great.</span>
            </h2>
          </Fade>
          <Fade d={.15}>
            <p style={{ color: "#555", fontSize: "1rem", marginBottom: "3.5rem", maxWidth: 440, margin: "0 auto 3.5rem" }}>
              Open to freelance, collaborations & full-time opportunities.
            </p>
          </Fade>
          <Fade d={.2}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
              <a href={`mailto:${ME.email}`} style={{
                fontFamily: "'Space Mono',monospace", fontSize: ".75rem", background: "#64ffa0", color: "#000",
                padding: "1rem 2.5rem", textDecoration: "none", letterSpacing: ".05em", display: "inline-flex",
                clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)", transition: "transform .2s, box-shadow .2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(100,255,160,.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                Send Email ↗
              </a>
              <a href={ME.linkedin} target="_blank" rel="noreferrer" style={{
                fontFamily: "'Space Mono',monospace", fontSize: ".75rem", color: "#78c1ff",
                border: "1px solid rgba(120,193,255,.3)", padding: "1rem 2.5rem", textDecoration: "none",
                letterSpacing: ".05em", display: "inline-flex", transition: "all .2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(120,193,255,.07)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; }}>
                LinkedIn ↗
              </a>
              <a href={ME.github} target="_blank" rel="noreferrer" style={{
                fontFamily: "'Space Mono',monospace", fontSize: ".75rem", color: "#555",
                border: "1px solid #1a1a22", padding: "1rem 2.5rem", textDecoration: "none",
                letterSpacing: ".05em", display: "inline-flex", transition: "all .2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#1a1a22"; e.currentTarget.style.transform = "none"; }}>
                GitHub ↗
              </a>
            </div>
          </Fade>

          {/* big email display */}
          <Fade d={.25}>
            <a href={`mailto:${ME.email}`} style={{
              fontFamily: "'Syne',sans-serif", fontSize: "clamp(1rem,2.5vw,1.6rem)", fontWeight: 700,
              color: "#2a2a35", textDecoration: "none", letterSpacing: "-.02em",
              transition: "color .3s", display: "block"
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#64ffa0"}
              onMouseLeave={e => e.currentTarget.style.color = "#2a2a35"}>
              {ME.email}
            </a>
          </Fade>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer style={{ padding: "1.5rem 4rem", borderTop: "1px solid #0a0a0f", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: "#222" }}>© 2025 · {ME.name} · {ME.city}</span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: "#64ffa0", animation: "blink 3s ease-in-out infinite" }}>OPEN TO WORK</span>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════ */
function ExpCard({ e }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ border: `1px solid ${hov ? "rgba(100,255,160,.15)" : "#0e0e14"}`, padding: "2.5rem",
      position: "relative", overflow: "hidden", transition: "border-color .3s, transform .3s",
      transform: hov ? "translateY(-4px)" : "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg,#64ffa0,#78c1ff,transparent)",
        transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform .5s cubic-bezier(.16,1,.3,1)" }} />
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: "#64ffa0", letterSpacing: ".1em", marginBottom: ".5rem" }}>{e.period}</div>
      <div style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-.025em", marginBottom: ".25rem" }}>{e.role}</div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".68rem", color: "#555", marginBottom: "1.5rem" }}>{e.co}</div>
      <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {e.tags.map(t => <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#555", border: "1px solid #181824", padding: ".2rem .55rem" }}>{t}</span>)}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".55rem" }}>
        {e.pts.map((p, j) => (
          <li key={j} style={{ display: "flex", gap: ".6rem", color: "#666", fontSize: ".83rem", lineHeight: 1.55 }}>
            <span style={{ color: "#64ffa0", flexShrink: 0, transition: "transform .2s", transform: hov ? "translateX(3px)" : "none" }}>›</span>{p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ p, idx }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ border: `1px solid ${hov ? p.color + "30" : "#0e0e14"}`, padding: "2rem", position: "relative",
      overflow: "hidden", transition: "border-color .3s, transform .3s, box-shadow .3s",
      transform: hov ? "translateY(-6px)" : "none",
      boxShadow: hov ? `0 20px 50px ${p.color}10` : "none", cursor: "default" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* glow bg */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 70% at 50% 130%, ${p.color}0a 0%, transparent 70%)`,
        opacity: hov ? 1 : 0, transition: "opacity .4s", pointerEvents: "none" }} />
      {/* top line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${p.color}, transparent)`,
        transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform .45s cubic-bezier(.16,1,.3,1)" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#222" }}>0{idx + 1}</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".55rem", color: "#333" }}>{p.year}</div>
        </div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-.025em", marginBottom: ".55rem", color: hov ? "#fff" : "#ccc", transition: "color .25s" }}>{p.title}</h3>
        <p style={{ color: "#555", fontSize: ".82rem", lineHeight: 1.65, marginBottom: "1.3rem" }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: "1.5rem" }}>
          {p.tech.map(t => <span key={t} style={{
            fontFamily: "'Space Mono',monospace", fontSize: ".58rem",
            color: hov ? p.color : "#444", border: `1px solid ${hov ? p.color + "45" : "#181824"}`,
            padding: ".18rem .5rem", transition: "color .25s, border-color .25s"
          }}>{t}</span>)}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer"
            style={{ fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: p.color, textDecoration: "none", letterSpacing: ".04em", transition: "opacity .2s" }}
            onMouseEnter={e => e.target.style.opacity = ".7"} onMouseLeave={e => e.target.style.opacity = "1"}>
            Live ↗
          </a>}
          <a href={p.gh} target="_blank" rel="noreferrer"
            style={{ fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: "#444", textDecoration: "none", letterSpacing: ".04em", transition: "color .2s" }}
            onMouseEnter={e => e.target.style.color = "#888"} onMouseLeave={e => e.target.style.color = "#444"}>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function PBtn({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} style={{
      fontFamily: "'Space Mono',monospace", fontSize: ".75rem", fontWeight: 500,
      background: "#64ffa0", color: "#000", border: "none", cursor: "none",
      padding: "1rem 2rem", letterSpacing: ".05em",
      transform: h ? "translateY(-4px)" : "none",
      boxShadow: h ? "0 16px 40px rgba(100,255,160,.35)" : "none",
      transition: "transform .25s, box-shadow .25s",
      clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)"
    }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{children}</button>
  );
}

function GBtn({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} style={{
      fontFamily: "'Space Mono',monospace", fontSize: ".75rem", background: "none",
      color: h ? "#ccc" : "#555", border: `1px solid ${h ? "#555" : "#1a1a22"}`,
      cursor: "none", padding: "1rem 2rem", letterSpacing: ".05em",
      transition: "color .2s, border-color .2s, transform .2s",
      transform: h ? "translateY(-4px)" : "none"
    }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{children}</button>
  );
}

function SLabel({ n, t, style: ex }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".9rem", ...ex }}>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".52rem", color: "#64ffa025", letterSpacing: ".1em" }}>{n}</span>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: "#64ffa0", letterSpacing: ".22em", textTransform: "uppercase" }}>{t}</span>
    </div>
  );
}

const H2 = { fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "3rem" };

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES & KEYFRAMES
═══════════════════════════════════════════════════════════ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800;900&family=Space+Mono:wght@400;700&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth}
      body{background:#050507;cursor:none}
      ::-webkit-scrollbar{width:3px}
      ::-webkit-scrollbar-track{background:#050507}
      ::-webkit-scrollbar-thumb{background:#64ffa0;border-radius:2px}
      ::selection{background:rgba(100,255,160,.2)}

      @keyframes blink      { 0%,100%{opacity:1;box-shadow:0 0 14px #64ffa0} 50%{opacity:.2;box-shadow:none} }
      @keyframes cursorBlink{ 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
      @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes scrollPulse{ 0%,100%{opacity:0;transform:scaleY(.4) translateY(-10px)} 50%{opacity:1;transform:scaleY(1) translateY(0)} }
      @keyframes fadeUp     { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
      @keyframes ghostPulse { 0%,100%{opacity:1} 50%{opacity:.5} }
      @keyframes lineSlide  { 0%,100%{transform:scaleY(1) translateY(0);opacity:.3} 50%{transform:scaleY(1.15) translateY(-8px);opacity:.6} }
      @keyframes navFadeIn  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }

      .glitch { position:relative; }
      .glitch::before, .glitch::after {
        content: attr(data-text);
        position: absolute; left:0; top:0;
        width:100%; height:100%;
        background: transparent;
      }
      .glitch::before {
        left:2px; text-shadow:-1px 0 #ff6b9d;
        animation: glitch1 3s infinite linear;
        clip-path: polygon(0 0,100% 0,100% 35%,0 35%);
      }
      .glitch::after {
        left:-2px; text-shadow:1px 0 #78c1ff;
        animation: glitch2 3s infinite linear;
        clip-path: polygon(0 65%,100% 65%,100% 100%,0 100%);
      }
      @keyframes glitch1 { 0%,90%,100%{transform:none;opacity:0} 92%{transform:translateX(-3px);opacity:.7} 96%{transform:translateX(3px);opacity:.7} }
      @keyframes glitch2 { 0%,90%,100%{transform:none;opacity:0} 94%{transform:translateX(3px);opacity:.7} 98%{transform:translateX(-3px);opacity:.7} }
    `}</style>
  );
}
