export interface VideoEntry {
    title: string
    url: string
    date: Date
}

export const videos: VideoEntry[] = [
    { title: "My interview at IITB", url: "https://www.youtube.com/watch?v=Z65lGOBt4AA", date: new Date("2024-06-24") },
]
