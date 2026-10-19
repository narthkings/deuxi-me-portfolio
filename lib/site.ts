export const site = {
  name: "Dumto Imoh",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dums.vercel.app",
  resumeViewUrl:
    "https://docs.google.com/document/d/19VF8N0SxEwk0GQoDpLBZODbBxF1IDeSu6amVJUXFprE/preview",
  resumeDownloadUrl:
    "https://docs.google.com/document/d/19VF8N0SxEwk0GQoDpLBZODbBxF1IDeSu6amVJUXFprE/export?format=pdf",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/narthkings",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dumto-imoh/",
    },
    {
      label: "X",
      href: "https://twitter.com/narthcodes",
    },
  ],
} as const;

export type ExperienceRef = {
  id: string;
  company: string;
};

export const experience: ExperienceRef[] = [
  { id: "npf", company: "Nigerian Police Force (NPF)" },
  { id: "bayse", company: "Bayse Markets (formerly Gowagr)" },
  { id: "evolve", company: "Evolve Credit" },
  { id: "abi", company: "ABI Smartly" },
  { id: "octosoft", company: "Octosoft Technologies" },
  { id: "intelligent", company: "Intelligent Innovations" },
  { id: "deveote", company: "Deveote" },
  { id: "airsynq", company: "AirSynQ IO" },
];

export type ProjectRef = {
  id: string;
  title: string;
  href?: string;
  stack: string[];
};

export const projects: ProjectRef[] = [
  {
    id: "npf",
    title: "Nigerian Police Force",
    href: "https://www.npf.gov.ng/",
    stack: ["React", "TypeScript"],
  },
  {
    id: "bayse",
    title: "Bayse Markets",
    href: "https://www.bayse.markets/",
    stack: ["React", "Next.js", "TypeScript"],
  },
  {
    id: "squads",
    title: "Squads Market",
    href: "https://squads.game/market",
    stack: ["React", "TypeScript"],
  },
  {
    id: "octosoft",
    title: "Octosoft",
    href: "https://www.octodoc.com/",
    stack: ["React", "TypeScript"],
  },
  {
    id: "abi",
    title: "ABI Smartly",
    href: "https://abismartly.com",
    stack: ["React", "TypeScript"],
  },
  {
    id: "devmeet",
    title: "DevMeet",
    href: "https://meets.sh",
    stack: ["React", "TypeScript"],
  },
];

export const skills = {
  core: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  styling: ["Tailwind CSS", "Chakra UI", "Sass"],
  data: ["REST", "Apollo / GraphQL", "Redux"],
  tooling: ["GitHub", "GitLab", "Jira", "Trello"],
} as const;

/** Most recent roles for the home selected-work index */
export const featuredExperience = experience.slice(0, 3);

export const navItems = [
  { key: "home" as const, href: "/" },
  { key: "projects" as const, href: "/projects" },
  { key: "resume" as const, href: "/resume" },
  { key: "contact" as const, href: "/contact" },
];
