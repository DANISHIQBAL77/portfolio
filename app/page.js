"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";

// ── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// ── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Data Configurations ──────────────────────────────────────────────────────
const ambientLogos = [
  {
    name: "HTML5",
    viewBox: "0 0 512 512",
    path: "M64 32l36.4 408L256 480l155.6-40L448 32H64zm292 211H173.4l5.4 60H351l-18 201-77 21-77-21-5.2-58h50.6l3 34 28.6 7.6 28.6-7.6 9.2-104H139.6L123 54h276.4l-13 145z",
    color: "#e34c26",
    size: 90,
  },
  {
    name: "CSS3",
    viewBox: "0 0 512 512",
    path: "M64 32l36.4 408L256 480l155.6-40L448 32H64zm288.5 145.8H165.3l-5.4-61H363l-5.5 61zm-5.5 61.2H170.8l-5.4-61h197.4l-17.3 194.5-89.5 24.8-89.5-24.8-5.7-64.2h50.6l3 34 41.6 11.5 41.6-11.5 8.9-103.8z",
    color: "#264de4",
    size: 95,
  },
  {
    name: "JavaScript",
    viewBox: "0 0 448 512",
    path: "M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.1 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V231.6h41.4v150.2zm99.5-52c-.5 35.1-23.9 52-54.7 52-29.4 0-48.4-14.7-57.9-35.3l34.6-20.2c5.3 10.4 12.3 17.5 24 17.5 12.1 0 19.5-5.3 19.5-17.7 0-12.4-8.9-16.5-27.1-24.4-23.7-10.2-48.4-21.9-48.4-53.8 0-31.5 24.7-52.6 54.7-52.6 27.3 0 45.4 12.4 53.2 31.5l-32.5 19.5c-4.4-8.4-10.4-13.6-19.5-13.6-10.4 0-15.5 5.1-15.5 13.3 0 11.2 7.7 15.2 24.3 22.3 26 11.2 52.4 23.3 52.4 56.1V329.4z",
    color: "#f0db4f",
    size: 80,
  },
  {
    name: "React",
    viewBox: "0 0 24 24",
    path: "M23.32 10.44a1.2 1.2 0 0 0-.15-.44 11.22 11.22 0 0 0-1.83-2.5 12.21 12.21 0 0 0-3.3-2.43 11 11 0 0 0-4.14-1 10.9 10.9 0 0 0-4.14 1 12 12 0 0 0-3.3 2.42 11.08 11.08 0 0 0-1.83 2.5 1.12 1.12 0 0 0-.15.44 1.34 1.34 0 0 0 0 .56 11.22 11.22 0 0 0 1.83 2.5 12.21 12.21 0 0 0 3.3 2.43 11 11 0 0 0 4.14 1 10.9 10.9 0 0 0 4.14-1 12 12 0 0 0 3.3-2.42 11.08 11.08 0 0 0 1.83-2.5 1.24 1.24 0 0 0 .15-.44 1.34 1.34 0 0 0 0-.56zm-11.32 3.56a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm6.65-6.52a10.27 10.27 0 0 1 2.4 1.83 10.2 10.2 0 0 1-2.4 1.83 14 14 0 0 1-1.3-1.83 14.17 14.17 0 0 1 1.3-1.83zm-3.41-2a10.32 10.32 0 0 1 1.35 2.7 14.34 14.34 0 0 1-3.23.37 14.24 14.24 0 0 1-3.23-.37 10.42 10.42 0 0 1 1.35-2.7 10.15 10.15 0 0 1 3.76 0zm-7.65 3.84a10.27 10.27 0 0 1 2.4-1.83 14.17 14.17 0 0 1 1.3 1.83 14 14 0 0 1-1.3 1.83 10.2 10.2 0 0 1-2.4-1.83zm.76 5.3a10.3 10.3 0 0 1-2.4-1.83 10.27 10.27 0 0 1 2.4-1.83 14.17 14.17 0 0 1 1.3 1.83 14 14 0 0 1-1.3 1.83zm3.41 2a10.42 10.42 0 0 1-1.35-2.7 14.12 14.12 0 0 1 6.46 0 10.32 10.32 0 0 1-1.35 2.7 10.15 10.15 0 0 1-3.76 0zm4.24-3.84a14 14 0 0 1-1.3-1.83 14.17 14.17 0 0 1 1.3-1.83 10.2 10.2 0 0 1 2.4 1.83 10.27 10.27 0 0 1-2.4 1.83z",
    color: "#61dbfb",
    size: 100,
  },
  {
    name: "TypeScript",
    viewBox: "0 0 24 24",
    path: "M2 2h20v20H2V2zm12.59 13.78c.19.68.78 1.25 1.64 1.25.96 0 1.5-.53 1.5-1.57v-6.2h2.02v6.2c0 2.22-1.3 3.54-3.5 3.54-2.02 0-3.32-1.12-3.72-2.58l2.06-.64zm-8.86-1.52c.28 1.41 1.58 2.37 3.48 2.37 2 0 3.32-.98 3.32-2.34 0-3.23-4.7-2.3-4.7-4.14 0-.58.5-.94 1.29-.94.83 0 1.33.37 1.58 1.05l1.92-.76c-.53-1.41-1.74-2.18-3.48-2.18-1.9 0-3.22.99-3.22 2.34 0 3.03 4.7 2.19 4.7 4.17 0 .68-.58 1.03-1.46 1.03-1.04 0-1.68-.53-1.95-1.41l-1.98.82z",
    color: "#007acc",
    size: 80,
  },
  {
    name: "Git",
    viewBox: "0 0 24 24",
    path: "M23.546 10.93L13.07.455a1.793 1.793 0 0 0-2.534 0L8.513 2.478l3.12 3.12a2.69 2.69 0 0 1 3.504 3.504l3.13 3.13a2.686 2.686 0 1 1-1.272 1.273l-3.119-3.12a2.69 2.69 0 0 1-3.52-3.503L7.25 12.015a2.69 2.69 0 1 1-1.273-1.273l3.111-3.111L7.065 5.608 1.15 11.522a1.793 1.793 0 0 0 0 2.534l10.476 10.476a1.793 1.793 0 0 0 2.534 0l10.476-10.476a1.793 1.793 0 0 0 0-2.534z",
    color: "#f05032",
    size: 85,
  }
];

const skills = [
  { name: "Next.js", icon: "▲" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Node.js", icon: "🟩" },
  { name: "Express", icon: "🚂" },
  { name: "SQLite", icon: "🗄️" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Framer Motion", icon: "✨" },
  { name: "Git", icon: "📦" },
];

const projects = [
  {
    title: "School Management System",
    tag: "Full-Stack",
    desc: "A MERN stack web application for managing students, teachers, attendance, and school records through a secure and user-friendly dashboard.",
    stack: ["Next.js", "Tailwind", "Firebase"],
    href: "https://management-app-bay.vercel.app/",
  },
  {
    title: "PulseBoard",
    tag: "Dashboard",
    desc: "Real-time analytics dashboard powered by WebSockets and D3.js. Handles 50k+ live events per minute with smooth chart transitions.",
    stack: ["React", "Node.js", "Redis"],
    href: "#",
  },
  {
    title: "ShipFast CLI",
    tag: "Dev Tool",
    desc: "An open-source CLI that scaffolds production-ready Next.js projects with auth, payments, and email in under 60 seconds.",
    stack: ["Node.js", "Commander"],
    href: "#",
  },
  {
    title: "Ephemeral Chat",
    tag: "Real-Time",
    desc: "End-to-end encrypted chat app with self-destructing messages, built with Socket.io and libsodium for client-side encryption.",
    stack: ["React", "Express", "Socket.io"],
    href: "#",
  },
];

const navLinks = ["About", "Skills", "Projects", "Contact"];

// ── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const typeText = useTypewriter([
    "Full-Stack Developer.",
    "Next.js Enthusiast.",
    "UI Craftsman.",
    "Problem Solver.",
  ]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const aquariumRef = useRef(null);

  // Form States
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const [aboutRef, aboutInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [projectsRef, projectsInView] = useInView();
  const [contactRef, contactInView] = useInView();

  // ── High-Performance Client Side Simulation Loop ───────────────────────────
  useEffect(() => {
    if (!aquariumRef.current) return;

    const elements = aquariumRef.current.querySelectorAll(".swimming-item");
    const physicsNodes = Array.from(elements).map((el) => {
      return {
        el: el,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        angle: Math.random() * 360,
        va: (Math.random() - 0.5) * 0.12,
        size: parseFloat(el.getAttribute("data-size") || "80"),
      };
    });

    let frameId;
    let lastScrollY = window.scrollY;

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      physicsNodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.angle += node.va;

        node.y -= deltaScroll * 0.15;

        const offset = node.size * 1.5;
        if (node.x < -offset) node.x = w + offset;
        if (node.x > w + offset) node.x = -offset;
        if (node.y < -offset) node.y = h + offset;
        if (node.y > h + offset) node.y = -offset;

        node.el.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) rotate(${node.angle}deg)`;
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    const handleResize = () => {
      physicsNodes.forEach((node) => {
        if (node.x > window.innerWidth) node.x = Math.random() * window.innerWidth;
        if (node.y > window.innerHeight) node.y = Math.random() * window.innerHeight;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // ── Contact Form Submit Handler (WhatsApp Silent Dispatch) ──────────────────
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus({
        loading: false,
        success: "Message sent. ✨",
        error: null,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <>
      <Head>
        <title>Danish — Web Developer</title>
        <meta name="description" content="Portfolio of Danish, full-stack web developer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        :root {
          --bg: #030712;
          --card-bg: rgba(255, 255, 255, 0.02);
          --card-border: rgba(255, 255, 255, 0.05);
          --card-hover: rgba(255, 255, 255, 0.08);
          --primary: #818cf8;
          --secondary: #2dd4bf;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --whatsapp: #25d366;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { 
          background: var(--bg); 
          color: var(--text-main); 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          overflow-x: hidden; 
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.08), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(45, 212, 191, 0.08), transparent 25%);
          position: relative;
        }
        h1, h2, h3, h4, .display { font-family: 'Outfit', sans-serif; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--primary); }

        .glass-panel {
          background: var(--card-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--card-border);
          border-radius: 24px;
        }

        .aquarium-container {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .swimming-item {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.035;
          will-change: transform;
        }

        .nav { 
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          padding: 1.5rem 2rem; 
        }
        .nav.scrolled { 
          padding: 1rem 2rem; 
          background: rgba(3, 7, 18, 0.8); 
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--card-border);
        }
        .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { 
          font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.5rem;
          background: linear-gradient(to right, var(--primary), var(--secondary)); 
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
          cursor: pointer; letter-spacing: -0.5px; 
        }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links button { 
          background: none; border: none; color: var(--text-muted); 
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 500;
          font-size: 0.95rem; cursor: pointer; transition: color 0.3s; 
        }
        .nav-links button:hover { color: var(--text-main); }
        .nav-cta { 
          background: var(--text-main); color: var(--bg); border: none; border-radius: 100px;
          padding: 0.6rem 1.5rem; font-family: 'Outfit', sans-serif; font-weight: 600;
          cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; 
        }
        .nav-cta:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 10px 25px rgba(248, 250, 252, 0.15); 
        }

        .hero { 
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          position: relative; padding: 8rem 2rem 4rem; text-align: center;
        }
        .hero-blob {
          position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);
          width: 60vw; height: 60vw; max-width: 800px; max-height: 800px;
          background: radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, transparent 60%);
          filter: blur(60px); z-index: -1; animation: float 10s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -55%) scale(1.05); }
        }
        .hero-badge { 
          display: inline-flex; align-items: center; gap: 0.6rem; 
          background: rgba(129, 140, 248, 0.1); border: 1px solid rgba(129, 140, 248, 0.2); 
          border-radius: 100px; padding: 0.5rem 1.25rem; font-size: 0.85rem; 
          color: var(--primary); font-weight: 600; margin-bottom: 2rem; 
          animation: fadeDown 0.8s ease-out forwards; opacity: 0;
        }
        .hero-badge-dot { 
          width: 8px; height: 8px; background: var(--secondary); border-radius: 50%;
          box-shadow: 0 0 10px var(--secondary); animation: pulse-dot 2s infinite; 
        }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        
        .hero-title { 
          font-size: clamp(3rem, 8vw, 6.5rem); font-weight: 800; line-height: 1.1;
          letter-spacing: -0.04em; margin-bottom: 1.5rem;
          animation: fadeUp 0.8s ease-out 0.2s forwards; opacity: 0;
        }
        .hero-title .name { color: var(--text-main); display: block; }
        .hero-title .role { 
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
        }
        .hero-title .cursor { 
          display: inline-block; width: 4px; height: 0.8em; background: var(--secondary);
          margin-left: 4px; animation: blink 1s step-end infinite; vertical-align: middle; 
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        
        .hero-sub { 
          color: var(--text-muted); font-size: clamp(1rem, 2vw, 1.25rem); line-height: 1.6; 
          max-width: 600px; margin: 0 auto 3rem;
          animation: fadeUp 0.8s ease-out 0.4s forwards; opacity: 0;
        }
        .hero-actions { 
          display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.8s ease-out 0.6s forwards; opacity: 0;
        }
        .btn-primary { 
          background: var(--text-main); color: var(--bg); border: none; border-radius: 100px;
          padding: 1rem 2.5rem; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 1.05rem;
          cursor: pointer; transition: all 0.3s ease; 
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(255,255,255,0.15); }
        .btn-outline { 
          background: transparent; color: var(--text-main); border: 1px solid var(--card-border); 
          border-radius: 100px; padding: 1rem 2.5rem; font-family: 'Outfit', sans-serif; font-weight: 600; 
          font-size: 1.05rem; cursor: pointer; transition: all 0.3s ease; 
        }
        .btn-outline:hover { border-color: var(--text-muted); background: rgba(255,255,255,0.03); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        section { position: relative; z-index: 1; padding: 8rem 2rem; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-label { 
          display: inline-block; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; 
          text-transform: uppercase; color: var(--secondary); background: rgba(45, 212, 191, 0.1);
          padding: 0.4rem 1rem; border-radius: 100px; margin-bottom: 1.5rem; 
        }
        .section-title { 
          font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; letter-spacing: -0.03em;
          color: var(--text-main); line-height: 1.1; margin-bottom: 4rem; 
        }

        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }

        .bento-grid { 
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; 
          grid-template-rows: auto auto;
        }
        .bento-item { 
          padding: 2.5rem; display: flex; flex-direction: column; justify-content: center;
          transition: transform 0.4s ease, border-color 0.4s ease;
        }
        .bento-item:hover { transform: translateY(-5px); border-color: rgba(129, 140, 248, 0.3); }
        .bento-avatar { grid-column: span 1; grid-row: span 2; align-items: center; text-align: center; }
        .avatar-emoji { font-size: 6rem; margin-bottom: 1rem; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)); }
        .bento-text { grid-column: span 2; }
        .bento-text p { color: var(--text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem; }
        .bento-stats { grid-column: span 2; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 1.5rem; }
        .stat-block { text-align: center; }
        .stat-num { font-size: 2.5rem; font-weight: 800; color: var(--text-main); font-family: 'Outfit'; }
        .stat-label { color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }

        .skills-container { 
          display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; max-width: 900px; margin: 0 auto;
        }
        .skill-pill {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 1rem 1.5rem; border-radius: 100px;
          background: var(--card-bg); border: 1px solid var(--card-border);
          font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default;
        }
        .skill-pill:hover {
          transform: translateY(-5px) scale(1.05);
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--primary);
          box-shadow: 0 10px 20px rgba(129, 140, 248, 0.15);
        }

        .projects-grid { 
          display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem; 
        }
        .project-card { 
          padding: 2.5rem; display: flex; flex-direction: column; height: 100%;
          position: relative; overflow: hidden; transition: all 0.5s ease;
        }
        .project-card:hover { transform: translateY(-10px); border-color: rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .project-content { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; }
        .project-tag { 
          align-self: flex-start; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--primary); background: rgba(129, 140, 248, 0.1);
          padding: 0.3rem 0.8rem; border-radius: 6px; margin-bottom: 1.5rem; 
        }
        .project-title { font-size: 1.75rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem; }
        .project-desc { color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 2rem; flex: 1; }
        .project-stack { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem; }
        .stack-pill { 
          background: rgba(255,255,255,0.03); border: 1px solid var(--card-border);
          border-radius: 100px; padding: 0.3rem 0.8rem; font-size: 0.8rem; color: #cbd5e1; 
        }
        .project-link { 
          display: inline-flex; align-items: center; gap: 0.5rem; font-family: 'Outfit', sans-serif;
          font-weight: 600; font-size: 1rem; color: var(--text-main); text-decoration: none;
          transition: gap 0.3s; 
        }
        .project-card:hover .project-link { gap: 0.8rem; color: var(--primary); }

        .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; }
        .contact-text { font-size: 1.2rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 2.5rem; }
        .social-links { display: flex; flex-direction: column; gap: 1rem; }
        .social-btn {
          display: flex; align-items: center; gap: 1.25rem; padding: 1.2rem;
          text-decoration: none; color: var(--text-main); font-weight: 500;
          transition: all 0.3s ease;
        }
        .social-btn:hover { background: var(--card-hover); transform: translateX(10px); border-color: rgba(255,255,255,0.1); }
        .social-icon { 
          width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
          color: var(--text-muted); transition: color 0.3s ease;
        }
        .social-btn:hover .social-icon { color: var(--primary); }
        
        .contact-form { padding: 3rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-family: 'Outfit'; font-size: 0.9rem; font-weight: 500; color: #cbd5e1; }
        .form-input {
          background: rgba(0,0,0,0.2); border: 1px solid var(--card-border);
          border-radius: 12px; padding: 1rem 1.2rem; color: var(--text-main);
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem;
          transition: all 0.3s ease; outline: none; resize: vertical;
        }
        .form-input:focus { border-color: var(--primary); background: rgba(0,0,0,0.4); box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1); }
        .form-submit {
          background: var(--text-main); color: var(--bg); border: none; border-radius: 12px;
          padding: 1.2rem; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 1rem;
          cursor: pointer; transition: all 0.3s ease; margin-top: 1rem;
        }
        .form-submit:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(255,255,255,0.1); }
        .form-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

        .status-msg { font-size: 0.9rem; font-weight: 600; margin-top: 0.5rem; }
        .status-msg.success { color: var(--secondary); }
        .status-msg.error { color: #f87171; }

        .whatsapp-float {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          background-color: var(--whatsapp);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
          z-index: 90;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .whatsapp-float:hover {
          transform: scale(1.1) translateY(-3px);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
        }
        .whatsapp-float svg { width: 28px; height: 28px; }

        footer { padding: 3rem 2rem; text-align: center; color: var(--text-muted); border-top: 1px solid var(--card-border); }

        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-avatar, .bento-text, .bento-stats { grid-column: span 1; }
          .contact-grid { grid-template-columns: 1fr; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { 
            display: flex; flex-direction: column; gap: 6px; background: none; border: none; cursor: pointer; z-index: 101; 
          }
          .hamburger span { display: block; width: 30px; height: 2px; background: var(--text-main); border-radius: 2px; }
          .aquarium-container { display: none !important; } 
        }
        @media (max-width: 600px) {
          section { padding: 5rem 1.25rem; }
          .hero { padding: 7rem 1.25rem 4rem; }
          .projects-grid { grid-template-columns: 1fr; }
          .stat-num { font-size: 2rem; }
          .contact-form { padding: 1.5rem; }
          .whatsapp-float { bottom: 1.5rem; right: 1.5rem; width: 50px; height: 50px; }
          .whatsapp-float svg { width: 24px; height: 24px; }
        }
      `}</style>

      {/* ── HIGH PERFORMANCE SIMULATION AQUARIUM CANVAS ── */}
      <div className="aquarium-container" ref={aquariumRef}>
        {ambientLogos.map((logo) => (
          <svg
            key={logo.name}
            className="swimming-item"
            data-size={logo.size}
            viewBox={logo.viewBox}
            style={{
              width: `${logo.size}px`,
              height: `${logo.size}px`,
              color: logo.color,
            }}
            fill="currentColor"
          >
            <path d={logo.path} />
          </svg>
        ))}
      </div>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo("hero")}>Danish.</div>
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l}><button onClick={() => scrollTo(l)}>{l}</button></li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => scrollTo("Contact")}>Let's Talk</button>
          
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero">
          <div className="hero-blob" />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
            <div className="hero-badge"><span className="hero-badge-dot" /> Open to work</div>
            <h1 className="hero-title">
              <span className="name">Hi, I'm Danish</span>
              <span className="role">{typeText}</span>
              <span className="cursor" />
            </h1>
            <p className="hero-sub">
              I build scalable, modern web applications. Obsessed with clean code, pixel-perfect UI, and seamless user experiences.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("Projects")}>Explore My Work</button>
              <button className="btn-outline" onClick={() => scrollTo("Contact")}>Contact Me</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="section-inner" ref={aboutRef}>
          <div className="section-label">About Me</div>
          <h2 className="section-title">Code that scales.<br/>Design that inspires.</h2>
          
          <div className={`bento-grid reveal ${aboutInView ? "in" : ""}`}>
            <div className="glass-panel bento-item bento-avatar delay-1">
              <div className="avatar-emoji">👨‍💻</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Based in PK</h3>
              <p style={{ color: "var(--text-muted)" }}>Coding from anywhere.</p>
            </div>
            
            <div className="glass-panel bento-item bento-text delay-2">
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>My Journey</h3>
              <p>
                I specialize in modern JavaScript frameworks, primarily building full-stack applications with Next.js, React, and robust database architectures.
              </p>
              <p>
                Whether it's wiring up complex backend logic or refining front-end animations, I care deeply about building products that are fast, accessible, and enjoyable to use.
              </p>
            </div>

            <div className="glass-panel bento-item bento-stats delay-3">
              <div className="stat-block">
                <div className="stat-num">3+</div>
                <div className="stat-label">Years Exp</div>
              </div>
              <div className="stat-block">
                <div className="stat-num">20+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-block">
                <div className="stat-num">∞</div>
                <div className="stat-label">Coffee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="section-inner" ref={skillsRef}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label">Expertise</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>My Tech Stack</h2>
          </div>
          
          <div className={`skills-container reveal ${skillsInView ? "in delay-1" : ""}`}>
            {skills.map((skill, i) => (
              <div key={skill.name} className="skill-pill" style={{ transitionDelay: `${i * 0.05}s` }}>
                <span>{skill.icon}</span> {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="section-inner" ref={projectsRef}>
          <div className="section-label">Selected Works</div>
          <h2 className="section-title">Featured Projects</h2>
          
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div key={p.title} className={`glass-panel project-card reveal ${projectsInView ? `in delay-${(i % 3) + 1}` : ""}`}>
                <div className="project-content">
                  <span className="project-tag">{p.tag}</span>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-stack">
                    {p.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
                  </div>
                  <a href={p.href} className="project-link" target="blank">View Live Project <span>→</span></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="section-inner" ref={contactRef}>
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">Let's build something<br/>extraordinary.</h2>
          
          <div className={`contact-grid reveal ${contactInView ? "in delay-1" : ""}`}>
            <div>
              <p className="contact-text">
                Got a project in mind, need a full-stack developer, or just want to chat about tech? I'm currently open to new opportunities.
              </p>
              <div className="social-links">
                <a href="https://github.com/DANISHIQBAL77" className="glass-panel social-btn" target="blank">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>

                <a href="#" className="glass-panel social-btn">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>

                <a href="mailto:hello@di411414155@gmail.com" className="glass-panel social-btn">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  hello@danish
                </a>
              </div>
            </div>

            {/* ── STATEFUL REFINED CONTACT FORM ── */}
            <form className="glass-panel contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input" 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="form-input" 
                  rows={5} 
                  placeholder="Tell me about your project..." 
                />
              </div>
              
              <button type="submit" className="form-submit" disabled={status.loading}>
                {status.loading ? "Sending..." : "Send Message ✨"}
              </button>

              {status.success && <p className="status-msg success">{status.success}</p>}
              {status.error && <p className="status-msg error">{status.error}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p>Designed & built by <span style={{ color: "var(--text-main)", fontWeight: 600 }}>Danish</span> © {new Date().getFullYear()}</p>
      </footer>

      {/* ── FLOATING PIXEL-PERFECT WHATSAPP CONTACT ── */}
      <a 
        href="https://wa.me/+923129455742" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.334.155 11.886c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.887a11.834 11.834 0 00-3.483-8.411" />
        </svg>
      </a>
    </>
  );
}