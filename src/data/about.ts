import type { ExperienceEntry } from '@/types'

export const workExperience: ExperienceEntry[] = [
  {
    period: 'May 2025 – Dec 2025',
    title: 'Founding Engineer — Backend & Infrastructure',
    organization: '2Cents Group · Valura.AI, Remote / Bengaluru',
    description:
      'Built production backend systems, AWS infrastructure, and CI/CD for an AI-finance platform.',
    url: 'https://valura.ai',
    startDate: '2025-05',
    endDate: '2025-12'
  },
  {
    period: 'Aug 2024 – May 2025',
    title: 'Quant Developer — Crypto',
    organization: '2Cents Group · 2Cents Capital, Remote / Bengaluru',
    description:
      'Built crypto fund for an early-stage hedge fund.',
    url: 'https://2centscapital.com',
    startDate: '2024-08',
    endDate: '2025-05'
  },
  {
    period: '2021 – 2023',
    title: 'DevOps Coordinator',
    organization: 'Saarang, IIT Madras',
    description: "Managed infrastructure for one of India's largest student-run cultural festivals.",
    startDate: '2021',
    endDate: '2023'
  }
]

export const education: ExperienceEntry[] = [
  {
    period: 'May 2020 – Jun 2024',
    title: 'B.Tech, Naval Architecture & Ocean Engineering',
    organization: 'Indian Institute of Technology Madras',
    description: 'Specialized in building ships, while spending a lot of time studying CS and building on crypto.',
    startDate: '2020',
    endDate: '2024'
  },
  {
    period: 'Feb 2023 – Jun 2023',
    title: 'Semester Exchange — Computer Science',
    organization: 'Seoul National University',
    description: 'AI Hardware Design, UI Design, Algorithms, History & Korean Language.',
    startDate: '2023-02',
    endDate: '2023-06'
  }
]

export const projects: ExperienceEntry[] = [
  {
    period: '',
    title: 'Blockchain SRE & Infrastructure Lab',
    description: 'One-command Ethereum node deployment on AWS with health monitoring, metrics, dashboards, and alerting.',
    meta: 'AWS · Terraform · Docker · Prometheus · Grafana',
    url: 'https://github.com/satyvm/node'
  },
  {
    period: '',
    title: 'FluXtream',
    organization: 'Aptos Winter School 2023, IIT Bombay',
    description: 'A token-streaming platform on Aptos for continuous token transfers over configurable periods.',
    meta: 'Aptos · Move · Smart Contracts',
    url: 'https://github.com/orgs/FluXtream-Move/repositories'
  },
  {
    period: '',
    title: 'NFTRokz',
    organization: 'Starknet Hackathon 2022, Bengaluru',
    description: 'A NFT-collateralized lending and borrowing platform on Starknet.',
    meta: 'Starknet · Cairo · Next.js',
    url: 'https://nftrokz.vercel.app'
  },
  {
    period: '',
    title: 'Optimaz.me',
    organization: 'Finalist, Metaverse Hackathon by Encode, Online',
    description: 'A token-gated 3D metaverse game with randomized blockchain-based assets.',
    meta: 'Optimism · Vue.js · Solidity',
    url: 'https://www.optimaz.me/'
  },
  {
    period: '',
    title: 'Personal Infrastructure',
    description: 'A robust local + VPS infra setup.',
    meta: 'Coolify · Caddy · Pi-hole · Unbound'
  }
]
