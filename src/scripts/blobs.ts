import { gsap } from 'gsap';

/**
 * Máscaras celulares: el contorno de cada imagen es una membrana que respira.
 * r(θ) = 0.5 + Σ aₖ sin(kθ + φₖ(t)) en coordenadas objectBoundingBox (0–1).
 */
export function organicBlobs() {
  const blobs = Array.from(document.querySelectorAll<HTMLElement>('[data-blob]'));
  if (!blobs.length) return;
  const items = blobs.map((el) => {
    const path = document.querySelector<SVGPathElement>(`#${el.dataset.blob} path`)!;
    const seed = parseFloat(el.dataset.seed || '1');
    return { el, path, seed, visible: false };
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const it = items.find((i) => i.el === e.target);
      if (it) it.visible = e.isIntersecting;
    });
  });
  items.forEach((i) => io.observe(i.el));

  const N = 64;
  const shape = (seed: number, t: number) => {
    const pts: string[] = [];
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2;
      const r = 0.46
        + 0.028 * Math.sin(3 * a + t * 0.9 + seed)
        + 0.018 * Math.sin(5 * a - t * 0.7 + seed * 2)
        + 0.01 * Math.sin(8 * a + t * 1.3 + seed * 3);
      // superelipse: más cuadrada que un círculo para no perder imagen
      const c = Math.cos(a), s = Math.sin(a);
      const sx = Math.sign(c) * Math.pow(Math.abs(c), 0.55);
      const sy = Math.sign(s) * Math.pow(Math.abs(s), 0.55);
      pts.push(`${(0.5 + r * sx * 1.06).toFixed(4)} ${(0.5 + r * sy * 1.06).toFixed(4)}`);
    }
    return `M${pts.join('L')}Z`;
  };

  items.forEach((i) => i.path.setAttribute('d', shape(i.seed, 0)));
  gsap.ticker.add((time) => {
    for (const i of items) if (i.visible) i.path.setAttribute('d', shape(i.seed, time));
  });
}
