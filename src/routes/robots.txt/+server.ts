import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const robots = `User-agent: *
Allow: /

# Disallow cart and admin pages
Disallow: /cart
Disallow: /admin
Disallow: /api

# Sitemap
Sitemap: https://tradeof.ru/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}; 