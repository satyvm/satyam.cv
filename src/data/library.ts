export interface LibraryItem {
  title: string
  url: string
}

export interface LibraryCategory {
  label: string
  items: LibraryItem[]
}

export const categories: LibraryCategory[] = [
  {
    label: 'Articles & Essays',
    items: [{ title: 'Vitalik Interview by Naval', url: 'https://nav.al/vitalik' }]
  },
  {
    label: 'Videos',
    items: [{ title: 'Dopamine by Dr. Anna Lembke', url: 'https://www.masterclass.com/classes/dopamine' }]
  },
  {
    label: 'Books',
    items: [
      {
        title: 'What is Mathematics?',
        url: 'https://app.thestorygraph.com/books/4f7b8299-1ebd-4788-a63a-f53c4fd84f41'
      },
      {
        title: "Man's Search for Meaning by Victor Frankl",
        url: 'https://app.thestorygraph.com/books/50f62c56-6b64-4308-8c4c-86a3b1f988a2'
      }
    ]
  }
]
