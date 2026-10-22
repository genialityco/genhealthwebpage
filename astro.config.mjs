// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio público del sitio. Cámbielo con la variable SITE_URL al desplegar.
const site = process.env.SITE_URL ?? 'https://genhealth.geniality.com.co';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-CO' } } })],
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  image: { responsiveStyles: true },
  vite: {
    build: { assetsInlineLimit: 2048 },
  },
});
