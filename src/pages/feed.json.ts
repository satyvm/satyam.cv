import type { APIContext } from 'astro'
import { themeConfig } from '@/config'
import { getSortedPublicPosts, getPostCanonicalUrl } from '@/utils/public-content'
import { renderPostContentHtml } from '@/utils/feed'

export const prerender = true

export async function GET(context: APIContext) {
  const siteUrl = (context.site?.toString() || themeConfig.site.website).replace(/\/$/, '')
  const posts = await getSortedPublicPosts()

  const items = await Promise.all(
    posts.map(async (post) => {
      const url = getPostCanonicalUrl(post.id)
      const contentHtml = await renderPostContentHtml(post, siteUrl)

      return {
        id: url,
        url: url,
        title: post.data.title,
        summary: post.data.description,
        content_html: contentHtml,
        date_published: post.data.pubDate.toISOString(),
        ...(post.data.updatedDate ? { date_modified: post.data.updatedDate.toISOString() } : {}),
        tags: post.data.tags || []
      }
    })
  )

  const feedJson = {
    version: 'https://jsonfeed.org/version/1.1',
    title: themeConfig.site.title,
    home_page_url: `${siteUrl}/`,
    feed_url: `${siteUrl}/feed.json`,
    description: themeConfig.site.description,
    authors: [
      {
        name: themeConfig.site.author,
        url: `${siteUrl}/`
      }
    ],
    items
  }

  return new Response(JSON.stringify(feedJson, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8'
    }
  })
}
