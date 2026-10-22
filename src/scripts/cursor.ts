import { gsap } from 'gsap';

/** Retícula de compás que sigue al puntero y anota lo que se puede abrir. */
export function cursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const el = document.querySelector<HTMLElement>('.cursor');
  if (!el) return;
  const label = el.querySelector<HTMLElement>('.cursor-label')!;
  const ring = el.querySelector<SVGCircleElement>('.ring')!;
  const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); });
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('a, button, summary, [data-cursor]');
    const text = t?.dataset.cursor ?? '';
    label.textContent = text;
    gsap.to(ring, { attr: { r: t ? 26 : 18 }, duration: 0.4, ease: 'expo.out' });
    gsap.to(el.querySelector('svg'), { rotation: t ? 45 : 0, duration: 0.6, ease: 'expo.out' });
  });
}
