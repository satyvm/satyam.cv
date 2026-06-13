export interface ExperienceEntry {
  period: string
  title: string
  organization?: string
  description?: string
  url?: string
  meta?: string
}

export const workExperience: ExperienceEntry[] = [
  {
    period: 'Aug 2024 – Dec 2025',
    title: 'Infrastructure Lead',
    organization: '2Cents Group · Valura.AI & 2Cents Capital',
    description: 'Architecting and maintaining cloud infrastructure, deployments, and internal tooling for various web and blockchain projects.',
    url: 'https://valura.ai'
  },
  {
    period: 'Aug 2024 - May 2025',
    title: 'Crypto Analyst',
    organization: '2Cents Capital, Bengaluru',
    description: 'Bridging crypto fund to India.',
    url: 'https://2centscapital.com'
  },
  {
    period: '2021 – 2023',
    title: 'DevOps Coordinator',
    organization: 'Saarang, IIT Madras',
    description: "Managed infrastructure and CI/CD pipelines for one of India's largest student-run cultural festivals.",
  }
]

export const education: ExperienceEntry[] = [
  {
    period: '2020 – 2024',
    title: 'B.Tech, Naval Architecture',
    organization: 'Indian Institute of Technology, Madras',
    description: 'Specialized in building ships, while spending a lot of time studying CS and building on crypto.'
  },
  {
    period: '2023 Summer',
    title: 'Semester Exchange',
    organization: 'Seoul National University',
    description: 'AI Hardware Design, UI Design, Algorithms, History & Korean Language.'
  }
]

export const projects: ExperienceEntry[] = [
  {
    period: '',
    title: 'Blockchain SRE & Infrastructure Lab',
    description: 'One-click ethereum nodes deployment on AWS with an observability stack (Prometheus, Grafana).',
    meta: 'Docker · Terraform · AWS',
    url: 'https://github.com/satyvm/node'
  },
  {
    period: '',
    title: 'Home Network Infrastructure',
    description: 'A robust local network setup focusing on privacy and uptime monitoring with VPN.',
    meta: 'Pi-hole · Unbound · Uptime Kuma',
  },
  {
    period: '',
    title: 'FluXtream',
    organization: 'Aptos Winter School 2023, IIT Bombay',
    description: 'Architected a crypto streaming platform on the Aptos blockchain, enabling users to stream tokens over time through programmable payment flows.',
    meta: 'Crypto Streaming · Aptos',
    url: 'https://github.com/orgs/FluXtream-Move/repositories'
  },
  {
    period: '',
    title: 'NFTRokz',
    organization: 'Starknet Hackathon 2022, Bengaluru',
    description: 'Built an NFT-collateralized lending and borrowing platform on Starknet.',
    meta: 'Lending & Borrowing · Starknet',
    url: 'https://nftrokz.vercel.app'
  },
  {
    period: '',
    title: 'Optimaz.me',
    organization: 'Finalist, Metaverse Hackathon by Encode, Online',
    description: 'Developed a token-gated 3D metaverse game with Vue.js, integrating blockchain-based access control for in-game assets and dynamic UI interactions.',
    meta: 'Metaverse · Vue.js · Optimism',
    url: 'https://www.optimaz.me/'
  }
]
