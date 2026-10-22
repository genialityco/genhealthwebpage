/** Datos estructurados schema.org para que Google entienda cada página. */
import type { Faq, Pillar, Product } from '@/data/catalog';

const abs = (path: string, site: URL) => new URL(path, site).href;

export function breadcrumbLd(items: { name: string; href: string }[], site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href, site) })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function serviceLd(p: Product, pillar: Pillar, site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.name,
    serviceType: p.kicker,
    description: p.description,
    url: abs(`/${p.pillar}/${p.slug}/`, site),
    category: pillar.name,
    provider: { '@id': abs('/#organizacion', site) },
    areaServed: [{ '@type': 'Country', name: 'Colombia' }, { '@type': 'Place', name: 'Latinoamérica' }],
    audience: p.audiences.map((a) => ({ '@type': 'Audience', audienceType: a })),
    keywords: p.keywords.join(', '),
    inLanguage: 'es-CO',
  };
}

export function collectionLd(pillar: Pillar, products: Product[], site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pillar.name,
    description: pillar.description,
    url: abs(`/${pillar.slug}/`, site),
    inLanguage: 'es-CO',
    about: pillar.keywords,
    hasPart: products.map((p) => ({ '@type': 'Service', name: p.name, url: abs(`/${p.pillar}/${p.slug}/`, site) })),
  };
}
