import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  // SITE INFO ///////////////////////////////////////////////////////////////////////////////////////////
  site: {
    website: 'https://satyam.cv/', // Site domain
    title: 'Satyam', // Site title
    author: 'Satyam', // Author name
    description:
      'Backend & Infrastructure Engineer. Thoughts on fintech systems, cloud infrastructure, blockchain, and reliability.', // Site description
    language: 'en-US', // Default language
    defaultOgImage: '/og/default.png'
  },

  // PROFILE INFO FOR APIS / JSON-LD ///////////////////////////////////////////////////////////////////
  profile: {
    preferredName: 'Satyam',
    headline: 'Backend & Infrastructure Engineer',
    shortBio: 'Backend and infrastructure engineer with experience building fintech, cloud, and blockchain systems.',
    defaultOgImage: '/og/default.png',
    sameAs: {
      github: 'https://github.com/satyvm',
      linkedin: 'https://www.linkedin.com/in/satyvm/',
      x: 'https://x.com/satyvm'
    },
    knowsAbout: [
      'Cloud Infrastructure',
      'Site Reliability Engineering (SRE)',
      'Backend Engineering',
      'Fintech Systems',
      'Blockchain Infrastructure',
      'Solana',
      'Ethereum & EVM',
      'Terraform & Docker',
      'Observability & Networking'
    ]
  },

  // GENERAL SETTINGS ////////////////////////////////////////////////////////////////////////////////////
  general: {
    contentWidth: '36rem', // Content area width
    centeredLayout: true, // Use centered layout (false for left-aligned)
    themeToggle: true, // Show theme toggle button (uses system theme by default)
    postListDottedDivider: false, // Show dotted divider in post list
    footer: true, // Show footer
    fadeAnimation: true // Enable fade animations
  },

  // DATE SETTINGS ///////////////////////////////////////////////////////////////////////////////////////
  date: {
    dateFormat: 'DD-MM-YYYY', // Date format: YYYY-MM-DD, MM-DD-YYYY, DD-MM-YYYY, MONTH DAY YYYY, DAY MONTH YYYY
    dateSeparator: '.', // Date separator: . - / (except for MONTH DAY YYYY and DAY MONTH YYYY)
    dateOnRight: true // Date position in post list (true for right, false for left)
  },

  // POST SETTINGS ///////////////////////////////////////////////////////////////////////////////////////
  post: {
    readingTime: true, // Show reading time in posts
    toc: true, // Show table of contents (when there is enough page width)
    imageViewer: true, // Enable image viewer
    copyCode: true, // Enable copy button in code blocks
    linkCard: true, // Enable link card
    katex: true // Enable KaTeX support
  }
}
