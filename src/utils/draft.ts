import type { CollectionEntry } from 'astro:content'
import { getPublicPosts, getSortedPublicPosts } from './public-content'

/**
 * Get all posts, filtering out posts whose filenames start with _
 */
export async function getFilteredPosts(): Promise<CollectionEntry<'posts'>[]> {
  return getPublicPosts()
}

/**
 * Get all posts sorted by publication date, filtering out posts whose filenames start with _
 */
export async function getSortedFilteredPosts(): Promise<CollectionEntry<'posts'>[]> {
  return getSortedPublicPosts()
}
