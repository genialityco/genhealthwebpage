# Gen.Health · sitio web

Sitio de Gen.Health, la línea de salud de Geniality. Está construido con **Astro 5** (Vite incluido), **GSAP 3.13** (ScrollTrigger y SplitText) y **Lenis** para el scroll suave.

Concepto visual: **un taller neorrenacentista biológico**. Cada sección es una «lámina» de cuaderno científico, con geometría natural dibujada a pluma (filotaxis, espiral áurea, armonógrafo, Lissajous, flor de la vida, célula, vesica piscis y rosa de Grandi). Se apoya en tipografía grande de estudio suizo-noruego (*Schibsted Grotesk*) y en anotaciones en *Instrument Serif* e *IBM Plex Mono*, sobre una paleta de verdes de bosque, clorofila y papel.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/ estático
SITE_URL=https://dominio-final npm run build   # dominio para canonical, sitemap y OG
```

## Mapa del sitio (23 páginas)

| Ruta | Contenido |
|---|---|
| `/` | Hero con campo de filotaxis interactivo, «Lo que cambió», valor por actor, ciclo del conocimiento anclado (5 frentes), Gen.oma, armonógrafo guiado por el scroll, resultados 2026, galería horizontal de experiencias, casos, «¿Por dónde empezar?» y principios |
| `/congresos-y-eventos/` | Frente 01 · Donde se comparte |
| ├ `arquitectura-y-comercializacion/` · `gen-posters/` · `gen-networking/` · `experiencias-interactivas/` | Landings de producto |
| `/gen-oma/` | Frente 02 · Donde se guarda (landing propia) |
| `/educacion-medica-continua/` | Frente 03 · Donde se aprende, con la oportunidad de la Resolución 1644 |
| ├ `gen-live/` · `gen-campus/` · `gen-cert/` · `gen-on-adherencia-educacion/` · `medinars-latam/` | Landings de producto |
| `/practica-clinica/` | Frente 04 · Donde se aplica |
| ├ `gen-careflow/` · `gen-on-adherencia-pacientes/` | Landings de producto |
| `/comunicacion-y-audiencia-medica/` | Frente 05 · En todo el camino |
| ├ `comunicacion-cientifica/` · `audiencia-medica/` | Landings de producto |
| `/casos/` · `/nosotros/` · `/contacto/` · `404` | Casos con cifras, equipo y principios, contacto |

## Dónde se edita el contenido

- `src/data/catalog.ts`: frentes y productos (títulos, descripciones meta, beneficios, cifras, galería, preguntas frecuentes y palabras clave). Las landings de producto se generan solas a partir de este archivo.
- `src/data/cases.ts`: casos (ACN, ASCOFAME, CNQF, ACIS, COLFI, ACHO y ACE).
- `src/data/site.ts`: contacto, menú, resultados 2026, asociaciones, industria, principios y «por dónde empezar».
- `src/assets/img/`: imágenes extraídas de los documentos, que Astro optimiza a WebP responsive.

## SEO

- Un único `<h1>` por página, `title` y `meta description` propios, `canonical`, Open Graph y Twitter.
- JSON-LD: `Organization` y `WebSite`, `Service` en cada producto, `SoftwareApplication` en Gen.oma, `FAQPage`, `BreadcrumbList`, `CollectionPage` e `ItemList`.
- `sitemap-index.xml` automático, `robots.txt` y URLs semánticas en español.
- El contenido se renderiza en HTML estático. Las figuras generativas son SVG creados al compilar, así que no se necesita JavaScript para leerlas.

## Movimiento

`src/scripts/app.ts` orquesta todo:

- Títulos con SplitText y máscaras por línea.
- Láminas SVG que se dibujan como con pluma.
- Contadores animados, parallax y cinta de asociaciones acelerada por la velocidad del scroll.
- Ciclo del conocimiento con *pin* y rotor.
- Galería horizontal anclada (en móvil se convierte en un carrusel nativo con *scroll-snap*).
- Telón orgánico entre páginas, botones magnéticos y cursor de compás.

Los lienzos con física están en `phyllo.ts` (resortes y repulsión del puntero), `harmonograph.ts` (dos péndulos amortiguados) y `blobs.ts` (membranas celulares que respiran como máscara de las imágenes). El sitio respeta `prefers-reduced-motion`, y en móvil se reducen las partículas y se desactivan los *pins* horizontales.

## Pendientes antes de publicar

- [ ] Confirmar el dominio final y ajustar `SITE_URL` y `public/robots.txt`.
- [ ] Confirmar el cargo y el correo de contacto (el brochure dice «Cofundadora y directora de Conocimiento»).
- [ ] Confirmar el número de artículo del periodo de transición de la Resolución 1644 de 2026 antes de citarlo.
- [ ] Pedir autorización escrita para usar logos de asociaciones y laboratorios. Por ahora solo se muestran nombres en texto.
- [ ] Pepper, ESMOverse y The Pink Pulse aparecen como «Disponible». Si ya se ejecutaron en el ESMO Summit 2026, cambiarlos a «Realizado».
- [ ] Integrar el nuevo diseño de marca de Geniality (logotipo y colores) cuando esté disponible.
- [ ] Reemplazar las imágenes de referencia de diseño por fotos reales de eventos cuando existan.
