export const contentData = [
  {
    title: "Work Experience",
    items: [
      {
        title: "Crypto Analyst",
        subTitle: "Remote",
        date: "2024 August - Present",
        description: "Bringing the crypto fund to India.",
      },
      {
        title: "Front-End/Crypto Developer at Freelance",
        subTitle: "Remote",
        date: "2022 - 2024",
        description: "Working for clients around the world.",
      },
    ],
  },
  {
    title: "Education",
    items: [
      {
        title: "Bachelor of Technology in Naval Architecture",
        subTitle: "Indian Institute of Technology, Madras",
        date: "2020 - 2024",
        description: "Specialized in building ships.",
      },
      {
        title: "Semester Exchange",
        subTitle: "Seoul National University",
        date: "2023 Summer",
        description: "AI Hardware Design, UI Development, History, Korean Lang..",
      },
    ],
  }
];

export type Content = {
  title: string;
  items: {
    title: string;
    subTitle: string;
    date: string;
    description: string;
  }[];
};

export type ContentData = Content[];
