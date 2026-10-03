import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import Lenis from 'lenis';
import { createScene, defaults } from './scene.js';
import { pillars, domains, divisions, formats, channels, membership, crew, crewFilters, countFor } from './data.js';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.innerWidth < 900;
const pad = (n, l = 2) => String(n).padStart(l, '0');
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·';

// ---------------------------------------------------------------------------
// Render content from data
// ---------------------------------------------------------------------------
function renderPillars() {
  $('[data-pillar-index]').innerHTML = pillars
    .map((p, i) => `<li class="label" data-i="${i}"><span>${pad(i + 1)}</span><span>${p.title}</span></li>`)
    .join('');
  $('[data-pillar-stage]').innerHTML = pillars
    .map(
      (p, i) => `
      <article class="pillar${i === 0 ? ' is-active' : ''}" data-i="${i}">
        <span class="label pillar__kicker">${p.id} · ${p.kicker}</span>
        <h3 class="headline pillar__title">${p.title}</h3>
        <p class="body pillar__body">${p.body}</p>
        <ul class="pillar__points">
          ${p.points.map((pt, j) => `<li><span class="label">${pad(j + 1)}</span><span>${pt}</span></li>`).join('')}
        </ul>
      </article>`
    )
    .join('');
}

function renderDomains() {
  $('[data-domains]').innerHTML = domains
    .map(
      (d) => `
      <article class="domain" data-reveal>
        <div class="domain__id label"><span>${d.id}</span><span>${d.tag}</span></div>
        <h3 class="domain__title">${d.title}</h3>
        <p class="domain__body">${d.body}</p>
        <div class="domain__stack">${d.stack.map((s) => `<span>${s}</span>`).join('')}</div>
      </article>`
    )
    .join('');
}

const divisionCount = (d) => [].concat(d.filter).reduce((n, k) => n + countFor(k), 0);

function renderDivisions() {
  $('[data-wheel]').innerHTML = divisions
    .map((d, i) => `<div class="wheel__item" data-i="${i}" data-cursor="Select"><small>${pad(i + 1)}</small>${d.name}</div>`)
    .join('');
  $('[data-wheel-detail]').innerHTML = divisions
    .map(
      (d, i) => `
      <article class="division${i === 0 ? ' is-active' : ''}" data-i="${i}">
        <span class="division__code">${d.code}</span>
        <span class="label division__name">${d.name}</span>
        <p class="body division__body">${d.body}</p>
        <div class="division__meta label">
          <span>${pad(divisionCount(d))} crew</span>
          <a href="#crew" data-filter-link="${[].concat(d.filter).join('|')}" data-cursor="Roster">View roster <i>→</i></a>
        </div>
      </article>`
    )
    .join('');
}

// Deterministic line-art for each event format — imagery drawn, not photographed.
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
function formatVisual(code) {
  const r = rng(code.charCodeAt(0) * 31 + code.charCodeAt(1) * 7 + code.charCodeAt(2));
  const W = 400;
  const H = 200;
  let inner = '';
  if (code === 'OBS') {
    // star trails around the celestial pole
    for (let i = 0; i < 26; i++) {
      const rad = 14 + i * 9;
      const a0 = r() * Math.PI * 2;
      const len = 0.4 + r() * 1.1;
      const x0 = 200 + Math.cos(a0) * rad;
      const y0 = 190 + Math.sin(a0) * rad;
      const x1 = 200 + Math.cos(a0 + len) * rad;
      const y1 = 190 + Math.sin(a0 + len) * rad;
      inner += `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${rad} ${rad} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" opacity="${(0.25 + r() * 0.75).toFixed(2)}"/>`;
    }
    inner += `<line x1="0" y1="190" x2="${W}" y2="190"/>`;
  } else if (code === 'IMG') {
    for (let arm = 0; arm < 2; arm++) {
      for (let i = 0; i < 140; i++) {
        const t = i / 140;
        const a = t * Math.PI * 3.2 + arm * Math.PI;
        const rad = 6 + t * 120;
        const x = 200 + Math.cos(a) * rad * 1.35 + (r() - 0.5) * 14 * t;
        const y = 100 + Math.sin(a) * rad * 0.55 + (r() - 0.5) * 8 * t;
        inner += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.5 + r() * 1.2).toFixed(2)}" fill="currentColor" stroke="none" opacity="${(1 - t * 0.7).toFixed(2)}"/>`;
      }
    }
  } else if (code === 'HCK') {
    inner += `<path d="M60 30 L30 100 L60 170"/><path d="M340 30 L370 100 L340 170"/>`;
    for (let i = 0; i < 9; i++) {
      const x = 90 + (i % 3 === 0 ? 0 : 20 + r() * 20);
      const w = 60 + r() * 160;
      inner += `<line x1="${x.toFixed(1)}" y1="${38 + i * 16}" x2="${(x + w).toFixed(1)}" y2="${38 + i * 16}" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`;
    }
  } else if (code === 'SYM') {
    for (let i = 0; i < 80; i++) {
      const x = 10 + i * 4.8;
      const env = Math.sin((i / 80) * Math.PI);
      const h = (6 + r() * 80) * env + 2;
      inner += `<line x1="${x.toFixed(1)}" y1="${(100 - h).toFixed(1)}" x2="${x.toFixed(1)}" y2="${(100 + h).toFixed(1)}"/>`;
    }
  } else if (code === 'LAB') {
    for (let i = 0; i <= 8; i++) inner += `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="${H}" opacity="0.2"/>`;
    for (let i = 0; i <= 4; i++) inner += `<line x1="0" y1="${i * 50}" x2="${W}" y2="${i * 50}" opacity="0.2"/>`;
    const curve = (fn, op) => {
      let d = '';
      for (let x = 0; x <= W; x += 5) d += `${x === 0 ? 'M' : 'L'}${x} ${fn(x).toFixed(1)}`;
      return `<path d="${d}" opacity="${op}"/>`;
    };
    inner += curve((x) => 180 - Math.pow(x / W, 0.7) * 150 + Math.sin(x * 0.08) * 3, 1);
    inner += curve((x) => 40 + (x / W) * 120 + Math.sin(x * 0.05) * 6, 0.55);
  } else {
    // WGL — wireframe globe
    for (let i = 1; i < 8; i++) {
      const ry = Math.cos((i / 8) * Math.PI) * 88;
      const rx = Math.sin((i / 8) * Math.PI) * 88;
      inner += `<ellipse cx="200" cy="${(100 - ry).toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx * 0.22).toFixed(1)}" opacity="0.55"/>`;
    }
    for (let i = 0; i < 6; i++) {
      const rx = Math.abs(Math.cos((i / 6) * Math.PI)) * 88;
      inner += `<ellipse cx="200" cy="100" rx="${rx.toFixed(1)}" ry="88"/>`;
    }
  }
  return `<svg viewBox="0 0 ${W} ${H}" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${inner}</svg>`;
}

function renderFormats() {
  $('[data-track]').innerHTML = formats
    .map(
      (f, i) => `
      <article class="format">
        <div class="format__top label"><span>${f.code}</span><span>${pad(i + 1)} / ${pad(formats.length)}</span></div>
        <div class="format__visual">${formatVisual(f.code)}</div>
        <h3 class="format__title">${f.title}</h3>
        <p class="format__body">${f.body}</p>
      </article>`
    )
    .join('');
}

function renderMembership() {
  $('[data-join-pitch]').textContent = membership.pitch;
  $('[data-fee]').dataset.count = membership.fee;
  $('[data-perks]').innerHTML = membership.perks
    .map(
      (p, i) => `
      <li class="perk">
        <span class="label perk__n">${pad(i + 1)}</span>
        <h3 class="perk__title">${p.title}</h3>
        <p class="perk__body">${p.body}</p>
      </li>`
    )
    .join('');
}

function renderChannels() {
  $('[data-channels]').innerHTML = channels
    .map(
      (c) => `
      <li class="channel">
        <a href="${c.href}" target="_blank" rel="noopener" data-cursor="Open">
          <span class="label channel__label">${c.label}</span>
          <span><span class="channel__handle">${c.handle}</span><span class="channel__note">${c.note}</span></span>
          <span class="channel__arrow">↗</span>
        </a>
      </li>`
    )
    .join('');
}

// ---------------------------------------------------------------------------
// Crew manifest
// ---------------------------------------------------------------------------
const crewState = { keys: ['all'], expanded: false };
const COLLAPSED = 24;

function renderFilters() {
  $('[data-filters]').innerHTML = crewFilters
    .map(
      (f) => `<button class="chip" role="tab" data-key="${f.key}" aria-selected="${f.key === 'all'}">${f.label}<sup>${countFor(f.key)}</sup></button>`
    )
    .join('');
}

function renderCrew(animate = true) {
  const list = $('[data-crew]');
  const all = crewState.keys.includes('all');
  const people = all ? crew : crew.filter((c) => crewState.keys.includes(c.group));
  const shown = all && !crewState.expanded ? people.slice(0, COLLAPSED) : people;
  list.innerHTML = shown
    .map(
      (c, i) => `
      <li class="crew__row${c.role !== 'JC' ? ' is-lead' : ''}">
        <span class="label crew__n">${pad(i + 1, 3)}</span>
        <span class="crew__name"><span class="crew__initials">${c.initials}</span><span data-name>${c.name}</span></span>
        <span class="label crew__role" data-div="${c.division}">${c.role}</span>
        <span class="label crew__div">${c.division}</span>
        <span class="crew__arrow">→</span>
      </li>`
    )
    .join('');

  const count = $('[data-crew-count]');
  if (all && !crewState.expanded) {
    count.innerHTML = `Showing ${shown.length} of ${people.length} · <button class="label" data-expand style="text-decoration:underline;text-underline-offset:4px">Show full manifest</button>`;
  } else {
    count.textContent = `Showing ${shown.length} ${shown.length === 1 ? 'person' : 'people'} · 2026–27 roster`;
  }

  $$('.chip').forEach((c) => c.setAttribute('aria-selected', String(crewState.keys.includes(c.dataset.key))));

  if (animate && !reduced) {
    gsap.fromTo(
      $$('.crew__row', list),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.022, overwrite: true }
    );
  }
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function renderCommand() {
  $('[data-command]').innerHTML = crew
    .filter((c) => c.group === 'Executive Committee')
    .map(
      (c, i) => `
      <li class="command__cell">
        <span class="label command__n">${pad(i + 1)}</span>
        <span class="label command__role">${c.role}</span>
        <span class="command__name">${c.name}</span>
      </li>`
    )
    .join('');
  $('[data-crew-total]').dataset.count = crew.length;
}

function initCrew() {
  renderCommand();
  renderFilters();
  renderCrew(false);
  $('[data-filters]').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    crewState.keys = [chip.dataset.key];
    crewState.expanded = false;
    renderCrew();
  });
  $('[data-crew-count]').addEventListener('click', (e) => {
    if (!e.target.closest('[data-expand]')) return;
    crewState.expanded = true;
    renderCrew();
  });
  // Name scramble on hover — an instrument re-reading the manifest.
  $('[data-crew]').addEventListener('mouseover', (e) => {
    const row = e.target.closest('.crew__row');
    if (!row || row.contains(e.relatedTarget) || reduced) return;
    const el = $('[data-name]', row);
    gsap.to(el, { duration: 0.6, scrambleText: { text: el.textContent, chars: 'upperCase', speed: 0.6 }, overwrite: true });
  });
  $$('[data-filter-link]').forEach((a) =>
    a.addEventListener('click', () => {
      crewState.keys = a.dataset.filterLink.split('|');
      crewState.expanded = true;
      renderCrew();
    })
  );
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
renderPillars();
renderDomains();
renderDivisions();
renderFormats();
renderChannels();
renderMembership();
initCrew();
$$('.btn > span').forEach((s) => (s.dataset.text = s.textContent));

const canvas = $('#webgl');
let scene = null;
try {
  scene = createScene(canvas);
} catch (err) {
  console.warn('WebGL unavailable — continuing without the scene.', err);
  canvas.remove();
}

const lenis = reduced ? null : new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 });
if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
const scrollY = () => window.scrollY;
const scrollTo = (target, opts = {}) => {
  if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4), ...opts });
  else {
    const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'auto' });
  }
};

// ---------------------------------------------------------------------------
// Scroll-driven scene keyframes
// ---------------------------------------------------------------------------
const absTop = (el) => el.getBoundingClientRect().top + scrollY();
let frames = [];

function measureFrames() {
  const vh = window.innerHeight;
  const m = isMobile();
  const top = (sel, off = 0) => absTop($(sel)) + off * vh;
  const sticky = (sel, f) => {
    const el = $(sel);
    return absTop(el) + f * (el.offsetHeight - vh);
  };
  const G = m ? { gx: 0, gy: 0.75, gs: 0.62 } : { gx: 2.35, gy: 0, gs: 1 };
  const list = [
    [0, m ? { px: 0.8, py: -4.85, pz: -1.5, ps: 3.4 } : {}],
    [top('#mission', -0.1), { px: m ? 1.6 : 4.0, py: m ? 2.2 : 0.3, pz: -2.5, ps: m ? 1.1 : 1.8, sx: -0.5, sy: 0.35, sz: 0.8 }],
    [top('#pillars', -0.75), { morph: 0, pop: 0.5, ...G }],
    [sticky('#pillars', 0), { px: G.gx, py: G.gy, pz: 0, ps: 0.78 * G.gs, po: 1, sx: 0.5, sy: 0.45, sz: 0.75, morph: 1, pop: 1 }],
    [sticky('#pillars', 0.24), {}],
    [sticky('#pillars', 0.42), { px: m ? -3 : 5, py: -2.8, pz: -3, po: 0, morph: 2, gx: G.gx + (m ? 0 : 0.15), gs: G.gs * 0.95 }],
    [sticky('#pillars', 0.58), {}],
    [sticky('#pillars', 0.76), { morph: 3, gs: G.gs * 0.66, gy: G.gy - 0.1, gz: m ? 0 : -0.5, gx: m ? 0 : 2.7 }],
    [sticky('#pillars', 1), {}],
    [top('#domains', 0.2), { morph: 3, gx: 0, gy: -2.2, gs: m ? 0.9 : 1.45, pop: 0.45 }],
    [sticky('#divisions', 0), { morph: 4, gx: 0, gy: 0, gs: 1, pop: 0.6 }],
    [sticky('#divisions', 1), { pop: 0.45 }],
    [sticky('#events', 0.5), { pop: 0.3 }],
    [top('#crew', 0), { pop: 0.14, stars: 0.6, px: 0, py: -9, pz: -1, ps: m ? 3.2 : 4.6, po: 0, sx: 0, sy: 0.3, sz: -1 }],
    [top('#contact', -0.85), {}], // hold the planet below frame through the membership section
    [top('#contact', -0.25), { pop: 0, stars: 1, py: m ? -4.1 : -5.55, po: 1, sunrise: 1 }],
    [top('#contact', 0.45), { py: m ? -5.2 : -7.6, sunrise: 0.8 }],
  ];
  let carry = { ...defaults };
  frames = list
    .map(([y, s]) => {
      carry = { ...carry, ...s };
      return { y, s: { ...carry } };
    })
    .sort((a, b) => a.y - b.y);
}

const smooth = (t) => t * t * (3 - 2 * t);
function sceneAt(y) {
  if (!frames.length) return frames[0]?.s;
  if (y <= frames[0].y) return frames[0].s;
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i];
    const b = frames[i + 1];
    if (y >= a.y && y <= b.y) {
      const t = smooth(clamp((y - a.y) / Math.max(1, b.y - a.y), 0, 1));
      const out = {};
      for (const k in a.s) out[k] = a.s[k] + (b.s[k] - a.s[k]) * t;
      return out;
    }
  }
  return frames[frames.length - 1].s;
}

// ---------------------------------------------------------------------------
// Text effects
// ---------------------------------------------------------------------------
function scramble(el, delay = 0) {
  if (reduced) return;
  const text = el.dataset.text || (el.dataset.text = el.textContent);
  gsap.fromTo(
    el,
    { scrambleText: { text: ' ', chars: SCRAMBLE } },
    { duration: 1.1, delay, ease: 'none', scrambleText: { text, chars: SCRAMBLE, speed: 0.5, revealDelay: 0.25 } }
  );
}

function initReveals() {
  // headline line reveals
  $$('[data-split]').forEach((el) => {
    if (el.closest('.hero')) return;
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
    });
  });

  // labels decode as they enter
  $$('[data-scramble]').forEach((el) => {
    if (el.closest('.hero')) return;
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => scramble(el) });
  });

  // mission statement brightens word by word
  const statement = $('[data-words]');
  SplitText.create(statement, {
    type: 'words',
    wordsClass: 'word',
    autoSplit: true,
    onSplit: (self) =>
      gsap.to(self.words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: { trigger: statement, start: 'top 78%', end: 'bottom 45%', scrub: true },
      }),
  });

  // counters
  $$('[data-count]').forEach((el) => {
    const to = +el.dataset.count;
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(obj, { v: to, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = pad(Math.round(obj.v))) }),
    });
  });

  // generic fade-ups
  gsap.utils.toArray('.domain, .stat, .channel, .command__cell, .perk, .ticket, .contact__primary > *').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 1.1,
      ease: 'power3.out',
      delay: (i % 4) * 0.08,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // closing headline
  $$('[data-lines] > span').forEach((line) => {
    line.innerHTML = `<span class="line-inner">${line.innerHTML}</span>`;
  });
  gsap.from('[data-lines] .line-inner', {
    yPercent: 105,
    duration: 1.4,
    ease: 'expo.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '[data-lines]', start: 'top 80%', once: true },
  });
}

// ---------------------------------------------------------------------------
// Pillars — pinned chapters
// ---------------------------------------------------------------------------
function initPillars() {
  const items = $$('.pillar');
  const idx = $$('[data-pillar-index] li');
  const num = $('[data-pillar-num]');
  const bar = $('[data-pillar-progress]');
  let active = -1;

  const show = (i) => {
    if (i === active) return;
    const prev = items[active];
    const dir = i > active ? 1 : -1;
    active = i;
    idx.forEach((li, j) => li.classList.toggle('is-active', j === i));
    if (prev) {
      gsap.to(prev.children, {
        opacity: 0,
        y: -30 * dir,
        duration: 0.45,
        ease: 'power2.in',
        stagger: 0.03,
        onComplete: () => prev.classList.remove('is-active'),
        overwrite: true,
      });
    }
    const next = items[i];
    next.classList.add('is-active');
    gsap.fromTo(
      next.children,
      { opacity: 0, y: 40 * dir },
      { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07, delay: prev ? 0.25 : 0, overwrite: true }
    );
    num.textContent = pad(i + 1);
    gsap.fromTo(num, { yPercent: 100 * dir }, { yPercent: 0, duration: 0.9, ease: 'expo.out', overwrite: true });
  };
  show(0);

  ScrollTrigger.create({
    trigger: '.pillars',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      bar.style.transform = `scaleX(${self.progress})`;
      show(Math.min(pillars.length - 1, Math.floor(self.progress * pillars.length * 0.999)));
    },
  });

  idx.forEach((li, i) =>
    li.addEventListener('click', () => {
      const el = $('.pillars');
      scrollTo(absTop(el) + ((i + 0.15) / pillars.length) * (el.offsetHeight - window.innerHeight));
    })
  );
}

// ---------------------------------------------------------------------------
// Divisions — curved wheel
// ---------------------------------------------------------------------------
function initWheel() {
  const items = $$('.wheel__item');
  const details = $$('.division');
  const n = items.length;
  let active = -1;
  let pos = 0;
  let target = 0;

  const setActive = (i) => {
    if (i === active) return;
    const prev = details[active];
    active = i;
    if (prev) gsap.to(prev, { opacity: 0, duration: 0.3, onComplete: () => prev.classList.remove('is-active') });
    const next = details[i];
    next.classList.add('is-active');
    gsap.fromTo(next.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06, delay: prev ? 0.15 : 0, overwrite: true });
    gsap.set(next, { opacity: 1 });
  };

  const layout = () => {
    pos += (target - pos) * 0.14;
    const step = isMobile() ? 7 : 10.5;
    items.forEach((el, i) => {
      const d = i - pos;
      el.style.transform = `rotate(${d * step}deg)`;
      el.style.opacity = clamp(1 - Math.abs(d) * 0.42, 0.07, 1);
    });
  };
  gsap.ticker.add(layout);

  ScrollTrigger.create({
    trigger: '.divisions',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      target = self.progress * (n - 1);
      setActive(Math.round(target));
    },
  });
  setActive(0);

  items.forEach((el, i) =>
    el.addEventListener('click', () => {
      const sec = $('.divisions');
      scrollTo(absTop(sec) + (i / (n - 1)) * (sec.offsetHeight - window.innerHeight), { duration: 1.2 });
    })
  );
}

// ---------------------------------------------------------------------------
// Events — horizontal track + marquee
// ---------------------------------------------------------------------------
function initEvents() {
  const track = $('[data-track]');
  gsap.to(track, {
    x: () => -Math.max(0, track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(track).paddingLeft)),
    ease: 'none',
    scrollTrigger: { trigger: '.events', start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
  });
  gsap.from('.format', {
    opacity: 0,
    x: 80,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.08,
    scrollTrigger: { trigger: '.events', start: 'top 60%', once: true },
  });

  const marquee = $('[data-marquee]');
  marquee.innerHTML += marquee.innerHTML;
  let x = 0;
  let dir = 1;
  gsap.ticker.add(() => {
    const v = lenis ? lenis.velocity : 0;
    if (Math.abs(v) > 0.1) dir = Math.sign(v);
    x -= (0.6 + Math.min(Math.abs(v) * 0.4, 18)) * dir;
    const half = marquee.scrollWidth / 2;
    if (x <= -half) x += half;
    if (x > 0) x -= half;
    marquee.style.transform = `translate3d(${x}px,0,0)`;
  });
}

// ---------------------------------------------------------------------------
// Chrome — nav, menu, rail, cursor, clock, copy
// ---------------------------------------------------------------------------
function initChrome() {
  const nav = $('[data-nav]');
  const navLinks = $$('.nav__links a');
  const rail = $('.rail');
  const railList = $('[data-rail]');
  const railFill = $('[data-rail-fill]');
  const altitude = $('[data-altitude]');

  // sectors (dedupe shared numbers)
  const seen = new Set();
  const sectors = $$('[data-sector]').filter((s) => !seen.has(s.dataset.sector) && seen.add(s.dataset.sector));
  railList.innerHTML = sectors.map((s) => `<li data-id="${s.id}"><span>${s.dataset.sectorName}</span>${s.dataset.sector}</li>`).join('');
  const railItems = $$('li', railList);

  let lastY = 0;
  const onScroll = () => {
    const y = scrollY();
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    nav.classList.toggle('is-scrolled', y > 40);
    if (!document.body.classList.contains('menu-open')) nav.classList.toggle('is-hidden', y > 200 && y > lastY + 2);
    if (y < lastY - 2) nav.classList.remove('is-hidden');
    lastY = y;
    railFill.style.transform = `scaleY(${clamp(y / max, 0, 1)})`;
    rail.classList.toggle('is-on', y > vh * 0.6 && y < max - vh * 0.5);
    altitude.textContent = `${(408 + y * 0.042).toFixed(1)} km`;

    // which sector holds the viewport centre?
    const mid = y + vh * 0.5;
    let current = sectors[0];
    for (const s of $$('[data-sector]')) if (absTop(s) <= mid) current = s;
    railItems.forEach((li) => li.classList.toggle('is-active', li.dataset.id === sectors.find((s) => s.dataset.sector === current.dataset.sector).id));
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${current.id}` || (current.id === 'domains' && a.getAttribute('href') === '#pillars')));

    if (scene) {
      scene.set(sceneAt(y));
      if (lenis) scene.nudge(lenis.velocity);
    }
  };
  if (lenis) lenis.on('scroll', onScroll);
  else window.addEventListener('scroll', onScroll, { passive: true });
  ScrollTrigger.addEventListener('refresh', () => {
    measureFrames();
    onScroll();
  });

  // anchor links
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = id === '#top' ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) toggleMenu(false);
    scrollTo(target);
  });

  // menu
  const menu = $('[data-menu]');
  const toggle = $('[data-menu-toggle]');
  const menuTl = gsap
    .timeline({ paused: true, defaults: { ease: 'expo.out' } })
    .set(menu, { visibility: 'visible' })
    .to(menu, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    .from('.menu__txt', { yPercent: 110, duration: 1, stagger: 0.05 }, 0.1)
    .from('.menu__idx', { opacity: 0, duration: 0.6, stagger: 0.05 }, 0.3)
    .from('.menu__foot', { opacity: 0, y: 20, duration: 0.8 }, 0.4);
  function toggleMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    $('.nav__menu-label').textContent = open ? 'Close' : 'Menu';
    if (open) {
      nav.classList.remove('is-hidden');
      lenis?.stop();
      menuTl.timeScale(1).play();
    } else {
      lenis?.start();
      menuTl.timeScale(1.8).reverse();
    }
  }
  toggle.addEventListener('click', () => toggleMenu(!document.body.classList.contains('menu-open')));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && document.body.classList.contains('menu-open') && toggleMenu(false));

  // UTC clock
  const utc = $('[data-utc]');
  const tickClock = () => {
    const d = new Date();
    utc.textContent = `UTC ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
  };
  tickClock();
  setInterval(tickClock, 1000);

  // copy email
  const copyBtn = $('[data-copy]');
  const hint = $('[data-copy-hint]');
  copyBtn.addEventListener('click', async () => {
    let msg = 'Copied to clipboard';
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copy);
    } catch {
      msg = 'Select & copy the address';
    }
    gsap.to(hint, { duration: 0.6, scrambleText: { text: msg, chars: SCRAMBLE } });
    clearTimeout(copyBtn._t);
    copyBtn._t = setTimeout(() => gsap.to(hint, { duration: 0.6, scrambleText: { text: 'Click to copy', chars: SCRAMBLE } }), 2200);
  });

  // cursor
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cursor = $('.cursor');
    const label = $('.cursor__label');
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('pointermove', (e) => {
      cursor.classList.add('is-on');
      xTo(e.clientX);
      yTo(e.clientY);
    });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('a, button, [data-cursor]');
      cursor.classList.toggle('is-hover', !!t);
      if (!t) return;
      let text = t.dataset.cursor;
      if (!text) {
        const href = t.getAttribute('href') || '';
        text = href.startsWith('mailto') ? 'Write' : t.hasAttribute('data-copy') ? 'Copy' : href.startsWith('http') ? 'Open' : href.startsWith('#') ? 'Go' : '';
      }
      label.textContent = text;
    });
  }

  return onScroll;
}

// ---------------------------------------------------------------------------
// Loader → intro
// ---------------------------------------------------------------------------
async function intro(onScroll) {
  const countEl = $('[data-loader-count]');
  const status = $('[data-loader-status]');
  const bar = $('.loader__bar span');
  const counter = { v: 0 };

  const heroTitle = $('.hero__title');
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

  if (scene) {
    // begin with the planet sunk below frame so the intro can raise it
    const start = { ...frames[0]?.s, ...(frames[0] ? {} : defaults) };
    scene.jump({ ...start, py: start.py - 3.2, ps: start.ps * 1.15, stars: 0 });
    scene.start();
  }

  window.scrollTo(0, 0);
  lenis?.scrollTo(0, { immediate: true, force: true });

  const load = gsap.to(counter, {
    v: 100,
    duration: reduced ? 0.2 : 2.1,
    ease: 'power2.inOut',
    onUpdate: () => {
      countEl.textContent = pad(Math.round(counter.v), 3);
      bar.style.transform = `scaleX(${counter.v / 100})`;
    },
  });
  if (!reduced) {
    gsap.to(status, { duration: 1, delay: 1.2, scrambleText: { text: 'Uplink locked', chars: SCRAMBLE } });
  }
  await Promise.all([fontsReady, load.then()]);

  const split = SplitText.create(heroTitle, { type: 'lines,chars', mask: 'lines', linesClass: 'split-line' });
  ScrollTrigger.refresh();
  onScroll();

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to('.loader', { yPercent: -100, duration: reduced ? 0.01 : 1.2, ease: 'expo.inOut' })
    .add(() => {
      document.body.classList.remove('is-loading');
      lenis?.start();
      $('.loader').remove();
      if (scene) scene.set(sceneAt(scrollY()));
    }, '-=0.5')
    .from(split.chars, { yPercent: 110, duration: 1.3, stagger: 0.018 }, '-=0.55')
    .from('.hero [data-fade]', { opacity: 0, y: 28, duration: 1.2, stagger: 0.1 }, '-=1.0')
    .add(() => scramble($('.hero [data-scramble]')), '-=1.4')
    .from('.nav > *', { y: -24, opacity: 0, duration: 1.1, stagger: 0.08 }, '-=1.3');
}

// ---------------------------------------------------------------------------
// Go
// ---------------------------------------------------------------------------
measureFrames();
initPillars();
initWheel();
initEvents();
const onScroll = initChrome();
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
  initReveals();
  ScrollTrigger.refresh();
});
intro(onScroll);
