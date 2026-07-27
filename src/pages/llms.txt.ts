import type { APIContext } from 'astro'
import { themeConfig } from '@/config'
import { getSortedPublicPosts } from '@/utils/public-content'

export const prerender = true

export async function GET(context: APIContext) {
  const siteUrl = (context.site?.toString() || themeConfig.site.website).replace(/\/$/, '')
  const posts = await getSortedPublicPosts()

  const lines: string[] = [
    `# ${themeConfig.site.title}`,
    '',
    `> ${themeConfig.profile.shortBio}`,
    '',
    '## Profile & Primary Pages',
    '',
    `- [Homepage](${siteUrl}/): Personal portfolio and overview`,
    `- [About](${siteUrl}/about/): Background, beliefs, work experience, education, and projects`,
    `- [Content](${siteUrl}/content/): Writing, technical articles, videos, and short notes`,
    `- [Library](${siteUrl}/library/): Curated collection of articles, papers, and books`,
    `- [Resume](${siteUrl}/satyam_resume.pdf): Official Resume in PDF format`,
    '',
    '## Articles & Technical Writing',
    ''
  ]

  for (const post of posts) {
    const slug = post.id.replace(/\.[^/.]+$/, '')
    const postUrl = `${siteUrl}/${slug}/`
    lines.push(`- [${post.data.title}](${postUrl}): ${post.data.description}`)
  }

  lines.push(
    '',
    '## Machine-Readable Resources',
    '',
    `- [Sitemap](${siteUrl}/sitemap-index.xml)`,
    `- [RSS Feed](${siteUrl}/rss.xml)`,
    `- [Atom Feed](${siteUrl}/atom.xml)`,
    `- [JSON Feed 1.1](${siteUrl}/feed.json)`,
    `- [Consolidated Portfolio API](${siteUrl}/api/portfolio.json)`,
    ''
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}
