import type { ExperienceEntry } from '@/types'

export const workExperience: ExperienceEntry[] = [
  {
    period: 'Aug 2026 – Present',
    title: 'Software Engineer',
    organization: 'Golden Hills Capital India Pvt Ltd, Hyderabad',
    description: 'Full-time, on-site role in Hyderabad, Telangana, India.',
    startDate: '2026-08'
  },
  {
    period: 'May 2025 – Dec 2025',
    title: 'Founding Engineer — Backend & Infrastructure',
    organization: '2Cents Group · Valura.AI, Remote / Bengaluru',
    description: 'Built production backend systems, AWS infrastructure, and CI/CD for an AI-finance platform.',
    url: 'https://valura.ai',
    startDate: '2025-05',
    endDate: '2025-12'
  },
  {
    period: 'Aug 2024 – May 2025',
    title: 'Quant Developer — Crypto',
    organization: '2Cents Group · 2Cents Capital, Remote / Bengaluru',
    description: 'Built crypto fund for an early-stage hedge fund.',
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
    description:
      'One-command Ethereum node deployment on AWS with health monitoring, metrics, dashboards, and alerting.',
    meta: 'AWS · Terraform · Docker · Prometheus · Grafana',
    url: 'https://github.com/satyvm/node'
  },
  {
    period: 'Dec 2023 – Jan 2024',
    title: 'FluXtream.co',
    organization: 'Aptos Winter School 2023, IIT Bombay',
    description:
      'Developed a decentralized crypto-streaming platform on Aptos during the IIT Bombay Aptos Winter School.',
    meta: 'Next.js · Tailwind CSS · Aptos · Move',
    url: 'https://github.com/orgs/FluXtream-Move/repositories',
    startDate: '2023-12',
    endDate: '2024-01'
  },
  {
    period: '',
    title: 'NFTRokz',
    organization: 'Starknet Hackathon 2022, Bengaluru',
    description:
      'Designed the frontend and user experience for a dApp that bridges L2 NFTs to Starknet as collateral for instant loans.',
    meta: 'React.js · JavaScript · Starknet',
    url: 'https://devfolio.co/projects/nftrokz-347c'
  },
  {
    period: '',
    title: 'Optimaz.me',
    organization: 'Finalist, Metaverse Hackathon by Encode, Online',
    description:
      'Built the Vue.js frontend and designed the user experience for a token-gated metaverse maze scavenger hunt supporting charities and AI image generation.',
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

export const certifications: ExperienceEntry[] = [
  {
    period: 'Issued May 2026',
    title: 'FinTech Industry Professional (FTIP®)',
    organization: 'Corporate Finance Institute® (CFI)',
    startDate: '2026-05'
  }
]
