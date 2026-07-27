// Date format types
export type DateFormat = 'YYYY-MM-DD' | 'MM-DD-YYYY' | 'DD-MM-YYYY' | 'MONTH DAY YYYY' | 'DAY MONTH YYYY'

// Profile info type for JSON-LD and API exports
export interface ProfileInfo {
  preferredName: string
  headline: string
  shortBio: string
  defaultOgImage: string
  sameAs: {
    github: string
    linkedin: string
    x: string
  }
  knowsAbout: string[]
}

// Site info configuration type
export interface SiteInfo {
  website: string
  title: string
  author: string
  description: string
  language: string
  defaultOgImage: string
}

// General settings configuration type
export interface GeneralSettings {
  contentWidth: string
  centeredLayout: boolean
  themeToggle: boolean
  postListDottedDivider: boolean
  footer: boolean
  fadeAnimation: boolean
}

// Date settings configuration type
export interface DateSettings {
  dateFormat: DateFormat
  dateSeparator: string
  dateOnRight: boolean
}

// Post settings configuration type
export interface PostSettings {
  readingTime: boolean
  toc: boolean
  imageViewer: boolean
  copyCode: boolean
  katex: boolean
  linkCard: boolean
}

// Theme configuration type
export interface ThemeConfig {
  site: SiteInfo
  profile: ProfileInfo
  general: GeneralSettings
  date: DateSettings
  post: PostSettings
}
