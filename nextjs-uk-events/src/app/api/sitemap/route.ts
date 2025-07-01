import {NextResponse} from 'next/server'

export async function GET() {
  const staticPages = [
    '',
    'contact',
    'terms-and-conditions',
    'privacy-policy',
    'mobile-bar-packages',
    'master-class',
    'entertainment',
    'corporate-bar-hire',
    'cocktail-bar-hire',
    'about',
    '/',
  ]

  const baseUrl = 'https://www.sambabarevents.co.uk/'

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}/${page}</loc>
  </url>
  `,
    )
    .join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
