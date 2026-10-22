/**
 * Láminas generativas: geometría natural y principios físicos dibujados como SVG
 * en tiempo de compilación (sin JavaScript en el cliente). Todas viven en un
 * lienzo de 1000 × 1000 y el cliente sólo anima el trazo.
 */
import type { FigureKind } from '@/data/catalog';

export interface Shape {
  d?: string;
  circle?: [number, number, number];
  /** 0 = tinta principal, 1 = construcción (sepia, fina), 2 = acento */
  tone: 0 | 1 | 2;
  fill?: boolean;
}

export interface Plate {
  shapes: Shape[];
  label: string;
  formula: string;
}

const C = 500;
const PHI = (1 + Math.sqrt(5)) / 2;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const f = (n: number) => Math.round(n * 10) / 10;

function polyline(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f(x)} ${f(y)}`).join('');
}

/** PRNG determinista para que cada compilación produzca la misma lámina. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function construction(r = 460): Shape[] {
  return [
    { circle: [C, C, r], tone: 1 },
    { d: `M${C - r - 30} ${C}H${C + r + 30}M${C} ${C - r - 30}V${C + r + 30}`, tone: 1 },
  ];
}

function phyllotaxis(): Plate {
  const shapes: Shape[] = construction();
  const n = 260;
  const c = 27;
  for (let i = 1; i <= n; i++) {
    const r = c * Math.sqrt(i);
    if (r > 440) break;
    const a = i * GOLDEN_ANGLE;
    const size = 2 + Math.sqrt(i) * 0.7;
    shapes.push({ circle: [C + r * Math.cos(a), C + r * Math.sin(a), size], tone: i % 21 === 0 ? 2 : 0, fill: i % 21 === 0 });
  }
  // espirales de Fibonacci (parastichies 13 y 21)
  for (const k of [13, 21]) {
    for (let s = 0; s < 3; s++) {
      const pts: [number, number][] = [];
      for (let i = s + 1; i <= n; i += k) {
        const r = c * Math.sqrt(i);
        if (r > 440) break;
        pts.push([C + r * Math.cos(i * GOLDEN_ANGLE), C + r * Math.sin(i * GOLDEN_ANGLE)]);
      }
      shapes.push({ d: polyline(pts), tone: 1 });
    }
  }
  return { shapes, label: 'Filotaxis de Vogel', formula: 'θ = n · 137,508°   r = c√n' };
}

function spiral(): Plate {
  const shapes: Shape[] = [];
  // rectángulos áureos anidados: cada corte retira un cuadrado
  let x = 90, y = 247, w = 820, h = w / PHI;
  for (let i = 0; i < 9; i++) {
    shapes.push({ d: `M${f(x)} ${f(y)}h${f(w)}v${f(h)}h${f(-w)}Z`, tone: 1 });
    const s = Math.min(w, h);
    switch (i % 4) {
      case 0: x += s; w -= s; break;
      case 1: y += s; h -= s; break;
      case 2: w -= s; break;
      case 3: h -= s; break;
    }
  }
  // el ojo de la espiral: límite de la subdivisión
  for (let i = 9; i < 60; i++) {
    const s = Math.min(w, h);
    switch (i % 4) {
      case 0: x += s; w -= s; break;
      case 1: y += s; h -= s; break;
      case 2: w -= s; break;
      case 3: h -= s; break;
    }
  }
  const ex = x, ey = y;
  // espiral logarítmica continua que pasa por las esquinas de los cuadrados
  const pts: [number, number][] = [];
  const b = Math.log(PHI) / (Math.PI / 2);
  const r0 = Math.hypot(90 - ex, 247 + 506.8 - ey);
  const t0 = Math.atan2(247 + 506.8 - ey, 90 - ex);
  for (let t = -16; t <= 0; t += 0.03) {
    const r = r0 * Math.exp(b * t);
    pts.push([ex + r * Math.cos(t0 - t), ey + r * Math.sin(t0 - t)]);
  }
  shapes.push({ d: polyline(pts), tone: 0 });
  shapes.push({ circle: [ex, ey, 6], tone: 2, fill: true });
  return { shapes, label: 'Espiral áurea', formula: 'r = a·e^(bθ)   φ = 1,618…' };
}

function harmonograph(seed = 7): Plate {
  const rand = rng(seed);
  const p = [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI, rand() * Math.PI];
  const pts: [number, number][] = [];
  for (let t = 0; t < 180; t += 0.045) {
    const x = 230 * Math.sin(2.01 * t + p[0]) * Math.exp(-0.012 * t) + 190 * Math.sin(3 * t + p[1]) * Math.exp(-0.016 * t);
    const y = 230 * Math.sin(3.003 * t + p[2]) * Math.exp(-0.013 * t) + 190 * Math.sin(2 * t + p[3]) * Math.exp(-0.011 * t);
    pts.push([C + x, C + y]);
  }
  return {
    shapes: [...construction(470), { d: polyline(pts), tone: 0 }],
    label: 'Armonógrafo · péndulo amortiguado',
    formula: 'x(t) = Σ Aᵢ sin(fᵢt + pᵢ) e^(−dᵢt)',
  };
}

function lissajous(): Plate {
  const shapes: Shape[] = construction(470);
  for (const [a, b, amp, tone] of [[3, 4, 400, 0], [5, 4, 300, 1], [1, 2, 200, 2]] as const) {
    const pts: [number, number][] = [];
    for (let t = 0; t <= Math.PI * 2 + 0.01; t += 0.01) pts.push([C + amp * Math.sin(a * t + Math.PI / 2), C + amp * Math.sin(b * t)]);
    shapes.push({ d: polyline(pts), tone: tone as 0 | 1 | 2 });
  }
  return { shapes, label: 'Curvas de Lissajous', formula: 'x = A sin(at + δ)   y = B sin(bt)' };
}

function orbit(): Plate {
  const shapes: Shape[] = [{ circle: [C, C, 70], tone: 2, fill: true }, { circle: [C, C, 110], tone: 1 }];
  const rand = rng(11);
  for (let i = 0; i < 5; i++) {
    const rot = (i * 36 * Math.PI) / 180;
    const rx = 420, ry = 150;
    const pts: [number, number][] = [];
    for (let t = 0; t <= Math.PI * 2 + 0.02; t += 0.02) {
      const x = rx * Math.cos(t), y = ry * Math.sin(t);
      pts.push([C + x * Math.cos(rot) - y * Math.sin(rot), C + x * Math.sin(rot) + y * Math.cos(rot)]);
    }
    shapes.push({ d: polyline(pts), tone: i % 2 ? 1 : 0 });
    const t = rand() * Math.PI * 2;
    const x = rx * Math.cos(t), y = ry * Math.sin(t);
    shapes.push({ circle: [C + x * Math.cos(rot) - y * Math.sin(rot), C + x * Math.sin(rot) + y * Math.cos(rot), 14], tone: 0, fill: true });
  }
  return { shapes, label: 'Órbitas de conocimiento', formula: 'x²/a² + y²/b² = 1' };
}

function flower(): Plate {
  const r = 120;
  const shapes: Shape[] = [{ circle: [C, C, r * 3], tone: 1 }, { circle: [C, C, r * 3 + 24], tone: 1 }];
  const centers: [number, number][] = [[C, C]];
  for (let ring = 1; ring <= 2; ring++) {
    for (let k = 0; k < 6 * ring; k++) {
      const side = Math.floor(k / ring), step = k % ring;
      const a0 = (side * Math.PI) / 3, a1 = ((side + 1) * Math.PI) / 3;
      const x0 = ring * r * Math.cos(a0), y0 = ring * r * Math.sin(a0);
      const x1 = ring * r * Math.cos(a1), y1 = ring * r * Math.sin(a1);
      centers.push([C + x0 + ((x1 - x0) * step) / ring, C + y0 + ((y1 - y0) * step) / ring]);
    }
  }
  centers.forEach(([x, y], i) => shapes.push({ circle: [x, y, r], tone: i < 7 ? 0 : 1 }));
  shapes.push({ circle: [C, C, 10], tone: 2, fill: true });
  return { shapes, label: 'Flor de la vida', formula: '19 círculos · r constante · simetría hexagonal' };
}

function cell(seed = 3): Plate {
  const rand = rng(seed);
  const shapes: Shape[] = [];
  const ph = [rand() * 6, rand() * 6, rand() * 6];
  for (let layer = 0; layer < 4; layer++) {
    const base = 430 - layer * 26;
    const pts: [number, number][] = [];
    for (let t = 0; t <= Math.PI * 2 + 0.02; t += 0.02) {
      const r = base + 14 * Math.sin(3 * t + ph[0] + layer * 0.3) + 9 * Math.sin(5 * t + ph[1]) + 5 * Math.sin(8 * t + ph[2]);
      pts.push([C + r * Math.cos(t), C + r * Math.sin(t)]);
    }
    shapes.push({ d: polyline(pts) + 'Z', tone: layer === 0 ? 0 : 1 });
  }
  // núcleo
  for (let k = 0; k < 3; k++) shapes.push({ circle: [C + 30, C - 20, 120 - k * 34], tone: k === 2 ? 2 : 0, fill: k === 2 });
  // organelos: retículo en ondas y vesículas
  for (let i = 0; i < 26; i++) {
    const a = rand() * Math.PI * 2, r = 190 + rand() * 170;
    shapes.push({ circle: [C + r * Math.cos(a), C + r * Math.sin(a), 6 + rand() * 18], tone: i % 6 === 0 ? 2 : 0, fill: i % 3 === 0 });
  }
  for (let i = 0; i < 4; i++) {
    const pts: [number, number][] = [];
    const r0 = 200 + i * 22;
    for (let t = -0.9; t <= 0.9; t += 0.02) {
      const r = r0 + 10 * Math.sin(t * 22);
      pts.push([C + r * Math.cos(t + 2.4), C + r * Math.sin(t + 2.4)]);
    }
    shapes.push({ d: polyline(pts), tone: 1 });
  }
  return { shapes, label: 'Célula · membrana y núcleo', formula: 'r(θ) = r₀ + Σ aₖ sin(kθ + φₖ)' };
}

function wave(): Plate {
  const shapes: Shape[] = [];
  for (let i = 0; i < 16; i++) {
    const pts: [number, number][] = [];
    const y0 = 160 + i * 45;
    for (let x = 60; x <= 940; x += 6) {
      const u = (x - C) / 440;
      const env = Math.exp(-u * u * 2.2);
      pts.push([x, y0 + Math.sin(u * 9 + i * 0.45) * 70 * env * Math.sin((i / 15) * Math.PI)]);
    }
    shapes.push({ d: polyline(pts), tone: i === 7 ? 2 : i % 3 ? 1 : 0 });
  }
  return { shapes, label: 'Interferencia de ondas', formula: 'y = A e^(−kx²) sin(ωx + φ)' };
}

function vesica(): Plate {
  const r = 260;
  const shapes: Shape[] = [
    { circle: [C - r / 2, C, r], tone: 0 },
    { circle: [C + r / 2, C, r], tone: 0 },
    { circle: [C, C - (r * Math.sqrt(3)) / 2, r], tone: 1 },
    { circle: [C, C + (r * Math.sqrt(3)) / 2, r], tone: 1 },
  ];
  const h = (r * Math.sqrt(3)) / 2;
  shapes.push({ d: `M${C} ${f(C - h)}L${f(C - r / 2)} ${C}L${C} ${f(C + h)}L${f(C + r / 2)} ${C}Z`, tone: 1 });
  shapes.push({ d: `M${C} ${f(C - h)}V${f(C + h)}M${f(C - r / 2)} ${C}H${f(C + r / 2)}`, tone: 1 });
  shapes.push({ circle: [C, C, 9], tone: 2, fill: true });
  return { shapes, label: 'Vesica piscis', formula: 'altura / ancho = √3' };
}

function rose(): Plate {
  const shapes: Shape[] = construction(450);
  const pts: [number, number][] = [];
  const k = 7 / 4;
  for (let t = 0; t <= Math.PI * 8 + 0.01; t += 0.01) {
    const r = 420 * Math.cos(k * t);
    pts.push([C + r * Math.cos(t), C + r * Math.sin(t)]);
  }
  shapes.push({ d: polyline(pts), tone: 0 });
  shapes.push({ circle: [C, C, 8], tone: 2, fill: true });
  return { shapes, label: 'Rosa de Grandi', formula: 'r = cos(7θ / 4)' };
}

export function plate(kind: FigureKind, seed?: number): Plate {
  switch (kind) {
    case 'phyllotaxis': return phyllotaxis();
    case 'spiral': return spiral();
    case 'harmonograph': return harmonograph(seed);
    case 'lissajous': return lissajous();
    case 'orbit': return orbit();
    case 'flower': return flower();
    case 'cell': return cell(seed);
    case 'wave': return wave();
    case 'vesica': return vesica();
    case 'rose': return rose();
  }
}
