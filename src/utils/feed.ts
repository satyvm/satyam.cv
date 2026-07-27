import type { APIContext, ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'
import { Feed } from 'feed'
import MarkdownIt from 'markdown-it'
import { parse as htmlParser } from 'node-html-parser'
import sanitizeHtml from 'sanitize-html'
import { themeConfig } from '@/config'
import { getSortedPublicPosts, getLatestContentDate, getPostCanonicalUrl } from '@/utils/public-content'
import path from 'node:path'
import type { CollectionEntry } from 'astro:content'

const markdownParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/posts/_assets/**/*.{jpeg,jpg,png,gif,webp}'
)

async function fixRelativeImagePaths(htmlContent: string, baseUrl: string, postPath: string): Promise<string> {
  const root = htmlParser(htmlContent)
  const imageTags = root.querySelectorAll('img')
  const postDir = path.dirname(postPath)

  for (const img of imageTags) {
    const src = img.getAttribute('src')
    if (!src) continue

    if (/^(https?:\/\/|\/\/)/.test(src)) {
      continue
    }

    if (src.startsWith('./') || src.startsWith('../')) {
      let resolvedPath: string
      if (src.startsWith('./')) {
        resolvedPath = path.posix.join('/src/content/posts', postDir, src.slice(2))
      } else {
        resolvedPath = path.posix.resolve('/src/content/posts', postDir, src)
      }

      if (imagesGlob[resolvedPath]) {
        try {
          const imageModule = await imagesGlob[resolvedPath]()
          const metadata = imageModule.default

          if (import.meta.env.DEV) {
            const relativePath = resolvedPath.replace('/src/content/posts/', '/')
            const imageUrl = new URL(relativePath, baseUrl).toString()
            img.setAttribute('src', imageUrl)
          } else {
            const processedImage = await getImage({
              src: metadata,
              format: 'webp',
              width: 800
            })
            img.setAttribute('src', new URL(processedImage.src, baseUrl).toString())
          }
        } catch (error) {
          console.error(`[Feed] Image processing failed: ${src} -> ${resolvedPath}`, error)
          const relativePath = resolvedPath.replace('/src/content/posts/', '/')
          const imageUrl = new URL(relativePath, baseUrl).toString()
          img.setAttribute('src', imageUrl)
        }
      }
    } else if (src.startsWith('/')) {
      img.setAttribute('src', new URL(src, baseUrl).toString())
    }
  }

  return root.toString()
}

/**
 * Render and sanitize HTML content for a post
 */
export async function renderPostContentHtml(post: CollectionEntry<'posts'>, baseUrl: string): Promise<string> {
  const rawHtml = markdownParser.render(post.body || '')
  const processedHtml = await fixRelativeImagePaths(rawHtml, baseUrl, post.id)
  return sanitizeHtml(processedHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'div', 'span']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'id'],
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height']
    }
  })
}

/**
 * Generate a generic Feed instance
 */
async function generateFeedInstance(context: APIContext) {
  const siteUrl = (context.site?.toString() || themeConfig.site.website).replace(/\/$/, '')
  const { title = '', description = '', author = '', language = 'en-US' } = themeConfig.site

  const sortedPosts = await getSortedPublicPosts()

  // Feed updated date is max updatedDate/pubDate among included posts
  const postDates = sortedPosts.map((p) => p.data.updatedDate ?? p.data.pubDate)
  const maxFeedDate = postDates.length > 0 ? new Date(Math.max(...postDates.map((d) => d.valueOf()))) : await getLatestContentDate()

  const feed = new Feed({
    title: title,
    description: description,
    id: `${siteUrl}/`,
    link: `${siteUrl}/`,
    language: language,
    copyright: `Copyright © ${new Date().getFullYear()} ${author}`,
    updated: maxFeedDate,
    generator: 'Astro Chiri Feed Generator',
    feedLinks: {
      rss: `${siteUrl}/rss.xml`,
      atom: `${siteUrl}/atom.xml`,
      json: `${siteUrl}/feed.json`
    },
    author: {
      name: author,
      link: `${siteUrl}/`
    }
  })

  for (const post of sortedPosts) {
    const postUrl = getPostCanonicalUrl(post.id)
    const cleanHtml = await renderPostContentHtml(post, siteUrl)
    const postDescription = post.data.description || themeConfig.site.description

    feed.addItem({
      title: post.data.title,
      id: postUrl,
      link: postUrl,
      description: postDescription,
      content: cleanHtml,
      date: post.data.updatedDate ?? post.data.pubDate,
      published: post.data.pubDate
    })
  }

  return feed
}

/**
 * Generate RSS 2.0 feed
 */
export async function generateRSS(context: APIContext) {
  const feed = await generateFeedInstance(context)
  const rssXml = feed
    .rss2()
    .replace(
      '<?xml version="1.0" encoding="utf-8"?>',
      '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet type="text/xsl" href="/feeds/rss-style.xsl"?>'
    )
  return new Response(rssXml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  })
}

/**
 * Generate Atom 1.0 feed
 */
export async function generateAtom(context: APIContext) {
  const feed = await generateFeedInstance(context)
  const atomXml = feed
    .atom1()
    .replace(
      '<?xml version="1.0" encoding="utf-8"?>',
      '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet type="text/xsl" href="/feeds/atom-style.xsl"?>'
    )
  return new Response(atomXml, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' }
  })
}
