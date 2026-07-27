import { themeConfig } from '@/config'
import { workExperience, projects } from '@/data/about'

export interface StructuredDataProps {
  pageType?: 'website' | 'article' | 'profile'
  title: string
  description: string
  publishedTime?: Date
  modifiedTime?: Date
  tags?: string[]
  ogImage?: string
  canonicalUrl?: string
}

export function safeJsonLdReplacer(_key: string, value: any): any {
  if (typeof value === 'string') {
    return value.replace(/</g, '\\u003c')
  }
  return value
}

export function generateStructuredData(props: StructuredDataProps): object[] {
  const { pageType = 'website', title, description, publishedTime, modifiedTime, tags, ogImage, canonicalUrl } = props
  const siteUrl = themeConfig.site.website.endsWith('/')
    ? themeConfig.site.website
    : `${themeConfig.site.website}/`

  const personNode = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}#person`,
    name: themeConfig.profile.preferredName,
    jobTitle: themeConfig.profile.headline,
    description: themeConfig.profile.shortBio,
    url: siteUrl,
    image: new URL('apple-touch-icon.png', siteUrl).href,
    sameAs: [
      themeConfig.profile.sameAs.github,
      themeConfig.profile.sameAs.linkedin,
      themeConfig.profile.sameAs.x
    ],
    knowsAbout: themeConfig.profile.knowsAbout,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Indian Institute of Technology, Madras',
      url: 'https://www.iitm.ac.in'
    }
  }

  const websiteNode = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: themeConfig.site.title,
    description: themeConfig.site.description,
    inLanguage: themeConfig.site.language,
    publisher: {
      '@id': `${siteUrl}#person`
    }
  }

  const schemas: object[] = [personNode, websiteNode]

  if (pageType === 'profile' || title.toLowerCase().includes('about')) {
    const profilePageNode = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${siteUrl}about/#profilepage`,
      url: `${siteUrl}about/`,
      name: `About - ${themeConfig.site.title}`,
      description: description,
      mainEntity: {
        '@id': `${siteUrl}#person`
      },
      hasOccupation: workExperience.map((work) => ({
        '@type': 'EmployeeRole',
        roleName: work.title,
        description: work.description,
        startDate: work.startDate,
        endDate: work.endDate,
        hasOccupation: {
          '@type': 'Occupation',
          name: work.title
        }
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Projects',
        itemListElement: projects.map((proj) => ({
          '@type': 'CreativeWork',
          name: proj.title,
          description: proj.description,
          url: proj.url
        }))
      }
    }
    schemas.push(profilePageNode)
  }

  if (pageType === 'article') {
    const postCanonical = canonicalUrl || siteUrl
    const blogPostingNode: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      author: {
        '@id': `${siteUrl}#person`
      },
      publisher: {
        '@id': `${siteUrl}#person`
      },
      inLanguage: themeConfig.site.language,
      mainEntityOfPage: postCanonical
    }

    if (publishedTime) {
      blogPostingNode.datePublished = publishedTime.toISOString()
    }
    if (modifiedTime) {
      blogPostingNode.dateModified = modifiedTime.toISOString()
    }
    if (ogImage) {
      blogPostingNode.image = ogImage
    }
    if (tags && tags.length > 0) {
      blogPostingNode.keywords = tags.join(', ')
    }

    schemas.push(blogPostingNode)
  }

  return schemas
}
