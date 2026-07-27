import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

const posts = defineCollection({
  // Load Markdown and MDX files in the `src/content/posts/` directory.
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z
      .object({
        title: z.string(),
        description: z.string().min(20).max(300),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        imageAlt: z.string().optional()
      })
      .refine(
        (data) => {
          if (data.image && !data.imageAlt) {
            return false
          }
          return true
        },
        {
          message: 'imageAlt is required when image is provided',
          path: ['imageAlt']
        }
      )
})

const home = defineCollection({
  // Load Markdown files in the `src/content/home/` directory.
  loader: glob({ base: './src/content/home', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({})
})

const about = defineCollection({
  // Load Markdown files in the `src/content/about/` directory.
  loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({})
})

const notes = defineCollection({
  // Load Markdown files in the `src/content/notes/` directory.
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    date: z.coerce.date()
  })
})

export const collections = { posts, home, about, notes }
