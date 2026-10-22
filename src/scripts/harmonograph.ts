import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Armonógrafo de dos péndulos amortiguados. El avance del scroll es el tiempo:
 * cuanto más se recorre, más trazo deja el péndulo.
 */
export function harmonograph(canvas: HTMLCanvasElement, { reduce = false } = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const section = canvas.closest<HTMLElement>('[data-harmo-section]')!;
  const stage = section.querySelector<HTMLElement>('.harmo-stage')!;
  const css = getComputedStyle(document.documentElement);
  const moss = css.getPropertyValue('--moss').trim() || '#1f4d35';
  const leaf = css.getPropertyValue('--leaf').trim() || '#3f7d4e';
  const sepia = css.getPropertyValue('--sepia').trim() || '#7a5a36';
  const spark = css.getPropertyValue('--spark').trim() || '#f08a24';

  let w = 0, h = 0, dpr = 1;
  let progress = reduce ? 1 : 0;
  let detune = 0, detuneTarget = 0;
  const N = 5200;
  const T = 210;

  function point(i: number, out: [number, number]) {
    const t = (i / N) * T;
    const A = Math.min(w, h) * (w < 800 ? 0.27 : 0.29);
    const x = A * Math.sin(2 * t + 0.6) * Math.exp(-0.009 * t) + A * 0.8 * Math.sin((3.004 + detune) * t + 1.7) * Math.exp(-0.012 * t);
    const y = A * Math.sin(3 * t + 0.2) * Math.exp(-0.01 * t) + A * 0.8 * Math.sin((2.003 - detune) * t) * Math.exp(-0.008 * t);
    out[0] = (w < 800 ? w * 0.5 : w * 0.7) + x;
    out[1] = (w < 800 ? h * 0.78 : h * 0.5) + y;
  }

  function layout() {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  const p: [number, number] = [0, 0];
  function draw() {
    ctx!.clearRect(0, 0, w, h);
    // ejes y marco del péndulo
    const cx = w < 800 ? w * 0.5 : w * 0.7, cy = w < 800 ? h * 0.78 : h * 0.5;
    const A = Math.min(w, h) * (w < 800 ? 0.27 : 0.29) * 1.85;
    ctx!.strokeStyle = sepia; ctx!.globalAlpha = 0.35; ctx!.lineWidth = 1;
    ctx!.setLineDash([2, 6]);
    ctx!.beginPath(); ctx!.arc(cx, cy, A, 0, Math.PI * 2); ctx!.stroke();
    ctx!.beginPath(); ctx!.moveTo(cx - A - 20, cy); ctx!.lineTo(cx + A + 20, cy); ctx!.moveTo(cx, cy - A - 20); ctx!.lineTo(cx, cy + A + 20); ctx!.stroke();
    ctx!.setLineDash([]);

    const end = Math.floor(N * progress);
    if (end < 2) return;
    const chunk = 260;
    for (let s = 0; s < end; s += chunk) {
      const k = s / N;
      ctx!.beginPath();
      point(s, p); ctx!.moveTo(p[0], p[1]);
      for (let i = s + 1; i <= Math.min(end, s + chunk); i++) { point(i, p); ctx!.lineTo(p[0], p[1]); }
      ctx!.strokeStyle = k < 0.5 ? moss : leaf;
      ctx!.globalAlpha = 0.85 - k * 0.45;
      ctx!.lineWidth = 1.25 - k * 0.6;
      ctx!.stroke();
    }
    // la punta de la pluma
    point(end, p);
    ctx!.globalAlpha = 1;
    ctx!.fillStyle = spark;
    ctx!.beginPath(); ctx!.arc(p[0], p[1], 5, 0, Math.PI * 2); ctx!.fill();
    ctx!.strokeStyle = spark; ctx!.globalAlpha = 0.4;
    ctx!.beginPath(); ctx!.arc(p[0], p[1], 14, 0, Math.PI * 2); ctx!.stroke();
    ctx!.globalAlpha = 1;
  }

  layout();
  let rw = window.innerWidth;
  window.addEventListener('resize', () => { if (window.innerWidth !== rw) { rw = window.innerWidth; layout(); } });
  if (reduce) return;

  ScrollTrigger.create({
    trigger: section, start: 'top top', end: '+=140%', pin: stage, scrub: 0.6,
    onUpdate: (self) => { progress = 0.04 + self.progress * 0.96; draw(); },
  });
  progress = 0.04;
  draw();

  // el puntero desafina levemente un péndulo: la figura respira
  section.addEventListener('pointermove', (e) => { detuneTarget = ((e.clientX / window.innerWidth) - 0.5) * 0.012; });
  gsap.ticker.add(() => {
    if (Math.abs(detuneTarget - detune) > 0.00002) { detune += (detuneTarget - detune) * 0.06; draw(); }
  });
}
