import { getCollection, type CollectionEntry } from 'astro:content'
import { themeConfig } from '@/config'
import { videos } from '@/data/videos'

/**
 * Check if a post is a draft (filename starts with _)
 */
export function isDraftPost(post: CollectionEntry<'posts'>): boolean {
  return post.id.startsWith('_') || post.id.includes('/_')
}

/**
 * Check if a post is published in the future
 */
export function isFuturePost(post: CollectionEntry<'posts'>): boolean {
  if (import.meta.env.DEV) return false
  return post.data.pubDate.valueOf() > Date.now()
}

/**
 * Get all public published posts, filtering out drafts and future posts.
 */
export async function getPublicPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts')
  return posts.filter((post: CollectionEntry<'posts'>) => !isDraftPost(post) && !isFuturePost(post))
}

/**
 * Get all public posts sorted by publication date descending.
 */
export async function getSortedPublicPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getPublicPosts()
  return posts.sort(
    (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )
}

/**
 * Get canonical URL for a post slug or id with guaranteed trailing slash.
 */
export function getPostCanonicalUrl(postIdOrSlug: string): string {
  const cleanSlug = postIdOrSlug.replace(/\.(md|mdx)$/, '').replace(/^\//, '').replace(/\/$/, '')
  const baseUrl = themeConfig.site.website.endsWith('/')
    ? themeConfig.site.website
    : `${themeConfig.site.website}/`
  return `${baseUrl}${cleanSlug}/`
}

/**
 * Get the latest content date among public posts, notes, and videos.
 */
export async function getLatestContentDate(): Promise<Date> {
  const dates: Date[] = []

  const posts = await getPublicPosts()
  for (const post of posts) {
    if (post.data.updatedDate) dates.push(post.data.updatedDate)
    if (post.data.pubDate) dates.push(post.data.pubDate)
  }

  const notes = await getCollection('notes')
  for (const note of notes) {
    if (note.data.date) dates.push(note.data.date)
  }

  for (const video of videos) {
    if (video.date) dates.push(video.date)
  }

  if (dates.length === 0) return new Date()

  const maxTimestamp = Math.max(...dates.map((d) => d.valueOf()))
  return new Date(maxTimestamp)
}
