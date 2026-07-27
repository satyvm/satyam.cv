import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { themeConfig } from '@/config'
import { workExperience, education, projects } from '@/data/about'
import { videos } from '@/data/videos'
import { categories as libraryCategories } from '@/data/library'
import { getSortedPublicPosts, getLatestContentDate, getPostCanonicalUrl } from '@/utils/public-content'

export const prerender = true

export async function GET(context: APIContext) {
  const siteUrl = (context.site?.toString() || themeConfig.site.website).replace(/\/$/, '')
  const latestDate = await getLatestContentDate()
  const posts = await getSortedPublicPosts()

  const notesCollection = await getCollection('notes')
  const sortedNotes = notesCollection.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  const renderedNotes = sortedNotes.map((note) => ({
    date: note.data.date.toISOString(),
    body: note.body
  }))

  const payload = {
    schemaVersion: '1.0',
    generatedAt: new Date().toISOString(),
    lastModified: latestDate.toISOString(),
    canonicalUrl: `${siteUrl}/api/portfolio.json`,
    person: {
      name: themeConfig.profile.preferredName,
      headline: themeConfig.profile.headline,
      bio: themeConfig.profile.shortBio,
      url: `${siteUrl}/`,
      sameAs: themeConfig.profile.sameAs,
      knowsAbout: themeConfig.profile.knowsAbout,
      educationOrg: 'Indian Institute of Technology, Madras'
    },
    workExperience: workExperience.map((exp) => ({
      period: exp.period,
      title: exp.title,
      organization: exp.organization,
      description: exp.description,
      url: exp.url || null,
      startDate: exp.startDate || null,
      endDate: exp.endDate || null
    })),
    education: education.map((edu) => ({
      period: edu.period,
      title: edu.title,
      organization: edu.organization,
      description: edu.description,
      startDate: edu.startDate || null,
      endDate: edu.endDate || null
    })),
    projects: projects.map((proj) => ({
      title: proj.title,
      organization: proj.organization || null,
      description: proj.description,
      techStack: proj.meta || null,
      url: proj.url || null
    })),
    posts: posts.map((post) => {
      const slug = post.id.replace(/\.[^/.]+$/, '')
      const postUrl = getPostCanonicalUrl(post.id)
      return {
        id: slug,
        title: post.data.title,
        description: post.data.description,
        url: postUrl,
        publishedDate: post.data.pubDate.toISOString(),
        updatedDate: post.data.updatedDate ? post.data.updatedDate.toISOString() : null,
        tags: post.data.tags || []
      }
    }),
    videos: videos.map((v) => ({
      title: v.title,
      date: v.date ? v.date.toISOString() : null,
      url: v.url
    })),
    notes: renderedNotes,
    libraryCategories: libraryCategories.map((cat) => ({
      label: cat.label,
      items: cat.items.map((item) => ({
        title: item.title,
        url: item.url
      }))
    })),
    resources: {
      homepage: `${siteUrl}/`,
      about: `${siteUrl}/about/`,
      content: `${siteUrl}/content/`,
      library: `${siteUrl}/library/`,
      resumePdf: `${siteUrl}/satyam_resume.pdf`,
      sitemap: `${siteUrl}/sitemap-index.xml`,
      rssFeed: `${siteUrl}/rss.xml`,
      atomFeed: `${siteUrl}/atom.xml`,
      jsonFeed: `${siteUrl}/feed.json`,
      llmsTxt: `${siteUrl}/llms.txt`
    }
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
