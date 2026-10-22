/**
 * Campo de filotaxis (modelo de Vogel) con física de resortes:
 * cada semilla vuelve a su posición áurea y el puntero la empuja como un campo.
 */
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

interface Seed { hx: number; hy: number; x: number; y: number; vx: number; vy: number; r: number; i: number }

export function phyllotaxisField(canvas: HTMLCanvasElement, { reduce = false } = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const css = getComputedStyle(document.documentElement);
  const chloro = css.getPropertyValue('--chloro').trim() || '#9bcb4b';
  const spark = css.getPropertyValue('--spark').trim() || '#f08a24';
  const sepia = '#b99a6f';

  let w = 0, h = 0, dpr = 1, cx = 0, cy = 0, scale = 1;
  let seeds: Seed[] = [];
  const pointer = { x: -9999, y: -9999, active: false };
  let t0 = performance.now();
  let running = true;
  let raf = 0;

  function layout() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const mobile = w < 800;
    cx = mobile ? w * 0.62 : w * 0.7;
    cy = mobile ? h * 0.32 : h * 0.45;
    const radius = mobile ? Math.max(w, h) * 0.55 : Math.min(w, h) * 0.62;
    const n = mobile ? 420 : 900;
    scale = radius / Math.sqrt(n);
    seeds = Array.from({ length: n }, (_, k) => {
      const i = k + 1;
      const r = scale * Math.sqrt(i);
      const a = i * GOLDEN;
      const hx = cx + r * Math.cos(a), hy = cy + r * Math.sin(a);
      return { hx, hy, x: cx, y: cy, vx: 0, vy: 0, r: 0.6 + Math.sqrt(i) * (mobile ? 0.16 : 0.13), i };
    });
  }

  function frame(now: number) {
    const t = (now - t0) / 1000;
    const grow = reduce ? 1 : Math.min(1, t / 2.6);
    const ease = 1 - Math.pow(1 - grow, 4);
    const rot = reduce ? 0 : t * 0.025;
    const breathe = 1 + Math.sin(t * 0.6) * 0.012;
    ctx!.clearRect(0, 0, w, h);

    // círculos de construcción
    ctx!.lineWidth = 1;
    ctx!.strokeStyle = sepia;
    ctx!.globalAlpha = 0.28 * ease;
    const R = scale * Math.sqrt(seeds.length);
    for (const k of [0.382, 0.618, 1]) {
      ctx!.beginPath(); ctx!.arc(cx, cy, R * k * breathe, 0, Math.PI * 2); ctx!.stroke();
    }
    ctx!.setLineDash([2, 7]);
    ctx!.beginPath(); ctx!.moveTo(cx - R * 1.1, cy); ctx!.lineTo(cx + R * 1.1, cy); ctx!.moveTo(cx, cy - R * 1.1); ctx!.lineTo(cx, cy + R * 1.1); ctx!.stroke();
    ctx!.setLineDash([]);

    const cos = Math.cos(rot), sin = Math.sin(rot);
    const limit = Math.floor(seeds.length * ease);
    const R2 = 140 * 140;
    for (let k = 0; k < limit; k++) {
      const s = seeds[k];
      const dx0 = (s.hx - cx) * breathe, dy0 = (s.hy - cy) * breathe;
      const tx = cx + dx0 * cos - dy0 * sin;
      const ty = cy + dx0 * sin + dy0 * cos;
      // resorte hacia la posición áurea
      s.vx += (tx - s.x) * 0.045;
      s.vy += (ty - s.y) * 0.045;
      // repulsión del puntero (ley inversa, suavizada)
      if (pointer.active) {
        const dx = s.x - pointer.x, dy = s.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const f = (1 - d2 / R2) * 5.5;
          const d = Math.sqrt(d2) || 1;
          s.vx += (dx / d) * f; s.vy += (dy / d) * f;
        }
      }
      s.vx *= 0.82; s.vy *= 0.82;
      s.x += s.vx; s.y += s.vy;

      const hot = s.i % 34 === 0;
      const speed = Math.min(1, Math.hypot(s.vx, s.vy) / 6);
      ctx!.globalAlpha = hot ? 0.95 : 0.35 + 0.45 * (1 - s.i / seeds.length) + speed * 0.3;
      ctx!.fillStyle = hot ? spark : chloro;
      ctx!.beginPath();
      ctx!.arc(s.x, s.y, s.r * (1 + speed * 0.8), 0, Math.PI * 2);
      if (s.i % 8 === 0 && !hot) { ctx!.strokeStyle = chloro; ctx!.lineWidth = 0.8; ctx!.stroke(); }
      else ctx!.fill();
    }
    ctx!.globalAlpha = 1;
    if (running && !reduce) raf = requestAnimationFrame(frame);
  }

  layout();
  if (reduce) { t0 = performance.now() - 10000; frame(performance.now()); return; }

  const host = canvas.parentElement!;
  host.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
  });
  host.addEventListener('pointerleave', () => { pointer.active = false; });
  host.addEventListener('touchend', () => { pointer.active = false; });

  let rw = window.innerWidth;
  window.addEventListener('resize', () => {
    // en móvil la barra de direcciones cambia la altura: ignorar si sólo cambia el alto
    if (window.innerWidth === rw) return;
    rw = window.innerWidth; layout();
  });

  new IntersectionObserver(([e]) => {
    running = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (running) raf = requestAnimationFrame(frame);
  }).observe(canvas);
}
