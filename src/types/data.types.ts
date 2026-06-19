// Data module types

export interface ExperienceEntry {
  period: string
  title: string
  organization?: string
  description?: string
  url?: string
  meta?: string
}

export interface LibraryItem {
  title: string
  url: string
}

export interface LibraryCategory {
  label: string
  items: LibraryItem[]
  divider?: boolean
}

export interface VideoEntry {
  title: string
  url: string
  date: Date
}


