import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { phyllotaxisField } from './phyllo';
import { harmonograph } from './harmonograph';
import { organicBlobs } from './blobs';
import { cursor } from './cursor';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

let lenis: Lenis | null = null;

function smoothScroll() {
  if (reduce) return;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

function header() {
  const hdr = document.querySelector<HTMLElement>('[data-hdr]');
  if (!hdr) return;
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    hdr.classList.toggle('is-scrolled', y > 40);
    hdr.classList.toggle('is-hidden', y > 400 && y > last && !document.documentElement.classList.contains('menu-open'));
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function menu() {
  const btn = document.querySelector<HTMLButtonElement>('[data-burger]');
  const panel = document.querySelector<HTMLElement>('[data-menu]');
  if (!btn || !panel) return;
  const items = $$('.menu-item', panel);
  const tl = gsap.timeline({ paused: true })
    .set(panel, { visibility: 'visible' })
    .to(panel, { clipPath: 'circle(150% at calc(100% - 40px) 36px)', duration: 0.9, ease: 'expo.inOut' })
    .from(items, { yPercent: 40, opacity: 0, stagger: 0.05, duration: 0.7, ease: 'expo.out' }, '-=0.35');
  const setOpen = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('menu-open', open);
    panel.hidden = false;
    if (open) { lenis?.stop(); tl.timeScale(1).play(); }
    else { lenis?.start(); tl.timeScale(1.6).reverse(); }
  };
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') setOpen(false); });
}

/** Telón orgánico entre páginas: la tinta sube, la página cambia, la tinta baja. */
function curtain() {
  const path = document.querySelector<SVGPathElement>('.curtain-path');
  const mark = document.querySelector<HTMLElement>('.curtain-mark');
  if (!path || reduce) return;
  const covered = 'M0 0 C 30 0 70 0 100 0 L100 100 L0 100Z';
  const bulge = 'M0 40 C 30 0 70 0 100 40 L100 100 L0 100Z';
  const flat = 'M0 100 C 30 100 70 100 100 100 L100 100 L0 100Z';
  const arrived = sessionStorage.getItem('gh-curtain') === '1';
  if (arrived) {
    sessionStorage.removeItem('gh-curtain');
    gsap.set(path, { attr: { d: covered } });
    gsap.timeline()
      .to(path, { attr: { d: 'M0 0 C 30 60 70 60 100 0 L100 0 L0 0Z' }, duration: 0.5, ease: 'power2.in', delay: 0.05 })
      .to(path, { attr: { d: 'M0 0 C 30 0 70 0 100 0 L100 0 L0 0Z' }, duration: 0.4, ease: 'power2.out' });
  }
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest('a');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname || a.hasAttribute('download')) return;
    e.preventDefault();
    sessionStorage.setItem('gh-curtain', '1');
    gsap.timeline({ onComplete: () => { location.href = url.href; } })
      .set(path, { attr: { d: flat } })
      .to(path, { attr: { d: bulge }, duration: 0.4, ease: 'power2.in' })
      .to(path, { attr: { d: covered }, duration: 0.35, ease: 'power2.out' })
      .to(mark, { opacity: 1, duration: 0.2 }, '-=0.2');
  });
  // Al volver con el botón atrás desde la caché, el telón no debe quedar puesto.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) { gsap.set(path, { attr: { d: flat } }); gsap.set(mark, { opacity: 0 }); }
  });
}

function splits() {
  $$('[data-split]').forEach((el) => {
    const chars = el.dataset.split === 'chars';
    const inHero = !!el.closest('[data-hero], .phero');
    const split = SplitText.create(el, {
      type: chars ? 'lines,words,chars' : 'lines,words',
      linesClass: 'split-line',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        const targets = chars ? self.chars : self.lines;
        return gsap.from(targets, {
          yPercent: 110,
          rotate: chars ? 6 : 2,
          transformOrigin: '0% 100%',
          duration: chars ? 1.1 : 1.2,
          ease: 'expo.out',
          stagger: chars ? 0.022 : 0.08,
          delay: inHero ? 0.25 : 0,
          scrollTrigger: inHero ? undefined : { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
    void split;
  });
}

function reveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  });
}

/** Las láminas se dibujan como con pluma: primero la construcción, luego la tinta. */
function plates() {
  $$<SVGSVGElement>('svg[data-draw]').forEach((svg) => {
    const strokes = $$<SVGGeometryElement>('.plate-body path, .plate-body circle:not(.f)', svg);
    const fills = $$<SVGElement>('.plate-body .f', svg);
    const annots = $$<SVGElement>('.annot-layer > *', svg);
    strokes.forEach((s) => {
      const len = s.getTotalLength();
      s.style.strokeDasharray = `${len}`;
      s.style.strokeDashoffset = `${len}`;
    });
    const tl = gsap.timeline({ paused: true });
    if (annots.length) {
      gsap.set(annots, { opacity: 0 });
      tl.to(annots, { opacity: 1, duration: 0.6, stagger: { each: 0.004, from: 'random' } }, 0);
    }
    tl.to(strokes, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', stagger: { each: Math.min(0.02, 1.6 / Math.max(1, strokes.length)) } }, 0.1);
    if (fills.length) {
      gsap.set(fills, { scale: 0, transformOrigin: 'center', transformBox: 'fill-box' });
      tl.to(fills, { scale: 1, duration: 0.8, ease: 'back.out(2)', stagger: { each: 0.01, from: 'center' } }, 0.8);
    }
    ScrollTrigger.create({ trigger: svg, start: 'top 85%', once: true, onEnter: () => tl.play() });
  });
  $$<SVGSVGElement>('svg[data-spin] .plate-body').forEach((g) => {
    gsap.to(g, { rotation: 360, svgOrigin: '500 500', duration: 240, ease: 'none', repeat: -1 });
  });
}

function counters() {
  $$('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count || '0');
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const obj = { v: 0 };
    const fmt = (v: number) => pre + v.toLocaleString('es-CO', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
    el.textContent = fmt(0);
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(obj, { v: end, duration: 2.2, ease: 'expo.out', onUpdate: () => { el.textContent = fmt(obj.v); } }),
    });
  });
}

function parallax() {
  $$('[data-speed]').forEach((el) => {
    const s = parseFloat(el.dataset.speed || '0.2');
    gsap.to(el, { yPercent: s * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('[data-parallax-img]').forEach((img) => {
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

function marquees() {
  $$('[data-marquee]').forEach((m) => {
    const track = m.querySelector<HTMLElement>('.marquee-track');
    if (!track) return;
    const tween = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
    // La velocidad del scroll acelera la cinta, como una correa de transmisión.
    ScrollTrigger.create({
      trigger: m, start: 'top bottom', end: 'bottom top',
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
        gsap.to(tween, { timeScale: (self.direction || 1) * (1 + Math.abs(v)), duration: 0.3, overwrite: true });
      },
    });
  });
}

function drawScrub() {
  $$<SVGPathElement>('[data-draw-scrub]').forEach((p) => {
    const len = p.getTotalLength();
    gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
      strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: p.closest('section'), start: 'top 70%', end: 'center 40%', scrub: 1 },
    });
  });
}

/** Ciclo del conocimiento: el rotor gira y cada frente toma la palabra. */
function cycle(mm: gsap.MatchMedia) {
  const sec = document.querySelector<HTMLElement>('[data-cycle]');
  if (!sec) return;
  const rotor = sec.querySelector<SVGGElement>('[data-rotor]');
  const nodes = $$<SVGGElement>('[data-node]', sec);
  const panels = $$('[data-panel]', sec);
  const n = panels.length;
  mm.add('(min-width: 1000px)', () => {
    const activate = (i: number) => {
      nodes.forEach((nd, k) => nd.classList.toggle('is-on', k === i));
      panels.forEach((p, k) => {
        gsap.to(p, { autoAlpha: k === i ? 1 : 0, y: k === i ? 0 : k < i ? -30 : 30, duration: 0.6, ease: 'expo.out', overwrite: true });
      });
    };
    activate(0);
    const st = ScrollTrigger.create({
      trigger: sec, start: 'top top', end: `+=${n * 80}%`, pin: sec.querySelector('.ciclo-stage') as HTMLElement, scrub: 1,
      onUpdate: (self) => {
        const i = Math.min(n - 1, Math.floor(self.progress * n));
        if (sec.dataset.active !== String(i)) { sec.dataset.active = String(i); activate(i); }
      },
      animation: gsap.timeline()
        .to(rotor, { rotation: (-360 * (n - 1)) / n, svgOrigin: '0 0', ease: 'none' })
        .to(nodes.map((nd) => nd.querySelector('text')), { rotation: (360 * (n - 1)) / n, transformOrigin: '50% 50%', ease: 'none' }, 0),
    });
    return () => st.kill();
  });
  mm.add('(max-width: 999px)', () => {
    nodes.forEach((nd) => nd.classList.add('is-on'));
    gsap.to(rotor, { rotation: 360, svgOrigin: '0 0', duration: 90, repeat: -1, ease: 'none' });
  });
}

/** Galería horizontal anclada en escritorio; en móvil, carrusel nativo con scroll-snap. */
function hscroll(mm: gsap.MatchMedia) {
  const sec = document.querySelector<HTMLElement>('[data-hscroll]');
  if (!sec) return;
  const track = sec.querySelector<HTMLElement>('[data-track]')!;
  mm.add('(min-width: 1000px)', () => {
    sec.classList.add('hs-active');
    const dist = () => track.scrollWidth - window.innerWidth + 64;
    const tween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: () => `+=${dist()}`, pin: sec.querySelector('.hscroll-pin') as HTMLElement, scrub: 1, invalidateOnRefresh: true },
    });
    $$('.hcard-img img', sec).forEach((img) => {
      gsap.fromTo(img, { scale: 1.25, xPercent: -8 }, { scale: 1.05, xPercent: 8, ease: 'none', scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
    });
    return () => sec.classList.remove('hs-active');
  });
}

function magnetic() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  $$('[data-magnetic], .btn').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
      if (!el.hasAttribute('data-magnetic')) return;
      xTo((e.clientX - r.left - r.width / 2) * 0.25);
      yTo((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}

function heroIntro() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  gsap.from($$('.hero-annots .annot', hero), { opacity: 0, x: -20, duration: 1, stagger: 0.15, delay: 0.8, ease: 'expo.out' });
  gsap.to(hero.querySelector('.hero-in'), {
    yPercent: -12, opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
}

export function boot() {
  header();
  menu();
  curtain();

  const canvas = document.querySelector<HTMLCanvasElement>('[data-phyllo]');
  if (canvas) phyllotaxisField(canvas, { reduce });
  const harmo = document.querySelector<HTMLCanvasElement>('[data-harmo]');
  if (harmo) harmonograph(harmo, { reduce });

  if (reduce) {
    document.documentElement.classList.add('reduced');
    $$('[data-reveal]').forEach((el) => (el.style.opacity = '1'));
    return;
  }

  smoothScroll();
  const mm = gsap.matchMedia();
  splits();
  reveals();
  plates();
  counters();
  parallax();
  marquees();
  drawScrub();
  cycle(mm);
  hscroll(mm);
  heroIntro();
  organicBlobs();
  magnetic();
  cursor();
  ScrollTrigger.sort();

  // Las fuentes cambian las métricas: recalcular disparadores cuando estén listas.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
