import config from '$config';

/** Prerendered sitemap: the two pages, at the production URL from site.config.ts. */
export const prerender = true;

const pages = ['/', '/menu'];

export function GET() {
	const urls = pages
		.map((p) => `\t<url><loc>${config.url}${p === '/' ? '/' : p}</loc></url>`)
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
