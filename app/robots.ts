import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', disallow: ['/_next/', '/admin/'] },
    ],
    sitemap: 'https://www.trucoytrufa.es/sitemap.xml',
    host: 'https://www.trucoytrufa.es',
  };
}
