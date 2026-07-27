import type { CollectionEntry } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'
import { themeConfig } from '@/config'
import { getPublicPosts } from '@/utils/public-content'

export const prerender = true

const collectionEntries = await getPublicPosts()

// Map the array of public content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', pubDate: Date } }]
// to { 'post': { title: 'Example', pubDate: Date } }
const pages = Object.fromEntries(
  collectionEntries.map((entry: CollectionEntry<'posts'>) => [
    entry.id.replace(/\.(md|mdx)$/, ''),
    entry.data
  ])
)

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path: string, page: CollectionEntry<'posts'>['data']) => ({
    title: page.title,
    description: page.description || themeConfig.site.title,
    bgGradient: [[255, 255, 255]],
    padding: 64,
    font: {
      title: {
        color: [28, 28, 28],
        size: 68,
        weight: 'Bold',
        families: ['Inter Variable', 'Noto Sans SC']
      },
      description: {
        color: [180, 180, 180],
        size: 40,
        weight: 'Normal',
        families: ['Inter Variable', 'Noto Sans SC']
      }
    },
    fonts: ['public/fonts/Inter.woff2', 'public/fonts/NotoSansSC-Regular.otf', 'public/fonts/NotoSansSC-Bold.otf']
  })
})
