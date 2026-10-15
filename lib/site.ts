export const site = {
  name: "Dumto Imoh",
  title: "Senior Frontend Engineer",
  location: "Lagos, Nigeria",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dums.vercel.app",
  resumeViewUrl:
    "https://docs.google.com/document/d/19VF8N0SxEwk0GQoDpLBZODbBxF1IDeSu6amVJUXFprE/preview",
  resumeDownloadUrl:
    "https://docs.google.com/document/d/19VF8N0SxEwk0GQoDpLBZODbBxF1IDeSu6amVJUXFprE/export?format=pdf",
  description:
    "Bilingual Senior Frontend Engineer (English & French) specializing in React and Next.js — building thoughtful interfaces with a passion for user experience.",
  bio: "I am a frontend engineer with a passion for user experience and smart front-end solutions using modern technologies. When I am not shipping product, I am either refining my French, practising algorithms, or listening to music.",
  focus:
    "Open to full-time and remote opportunities. Currently focused on React, Next.js, TypeScript, and bilingual product work.",
  availability: "Available for work",
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
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Experience = {
  role: string;
  company: string;
  dates: string;
  summary: string;
  highlights?: string[];
};

export const experience: Experience[] = [
  {
    role: "Senior Frontend Engineer",
    company: "Nigerian Police Force (NPF)",
    dates: "Mar 2026 — Aug 2026",
    summary:
      "Built and maintained the frontend ecosystem powering the Nigeria Police Force's public-facing digital platform and administrative CMS.",
    highlights: [
      "Built public-facing digital services for citizens to report crimes, report police misconduct, submit complaints, and track reports online.",
      "Developed Report a Crime and Report Police Conduct portals with multi-step flows, validation, API integrations, and status tracking.",
      "Developed and maintained a full-featured CMS with 60+ administrative modules; refactored shared components across website, CMS, and portals.",
    ],
  },
  {
    role: "Senior Frontend Engineer",
    company: "Bayse Markets (formerly Gowagr)",
    dates: "Jun 2025 — Nov 2025",
    summary:
      "Helped ship and optimise a prediction-market web experience for African audiences, including a full rebrand and relaunch.",
    highlights: [
      "Improved performance and UX that contributed to higher engagement and web-based revenue growth.",
      "Led rebrand and relaunch work aligned to new brand guidelines while hardening security with CSP to reduce XSS risk.",
      "Developed and launched product features that strengthened the core trading experience.",
    ],
  },
  {
    role: "Software Engineer, Frontend",
    company: "Evolve Credit",
    dates: "Feb 2024 — Feb 2025",
    summary:
      "Built frontend surfaces for a lending suite that helps financial institutions create, launch, and manage credit products end to end.",
  },
  {
    role: "Frontend Engineer (React)",
    company: "ABI Smartly",
    dates: "Personal project",
    summary:
      "React frontend engineering on a personal product build — focused on polished UI and practical feature delivery.",
  },
  {
    role: "Lead Frontend Engineer",
    company: "Octosoft Technologies",
    dates: "Jul 2021 — Sep 2023",
    summary:
      "Led a small frontend team building health-tech products spanning insurance, care delivery, and payments.",
    highlights: [
      "Led a team of three on Octo-Hive, streamlining communication between HR managers and over 20 HMOs.",
      "Built and refined the Employee module for hospital information systems — registration and shift scheduling across departments.",
      "Set code quality standards through reviews, debugging, and modern React patterns.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Intelligent Innovations",
    dates: "Jan 2020 — Jul 2021",
    summary:
      "Designed and developed technology solutions that help enterprises automate businesses for partners including 9mobile, Airtel, MTN, and UBA.",
  },
  {
    role: "Frontend Engineer",
    company: "Deveote",
    dates: "Mar 2021 — Apr 2021",
    summary:
      "Built scalable websites and mobile applications for businesses focused on measurable ROI.",
  },
  {
    role: "Frontend Engineer",
    company: "AirSynQ IO",
    dates: "Nov 2020 — Feb 2021",
    summary:
      "Worked on AI-assisted aerial surveillance interfaces for real-time monitoring, event detection, and analytics.",
  },
];

export type Project = {
  title: string;
  href?: string;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    title: "Nigerian Police Force",
    href: "https://www.npf.gov.ng/",
    description:
      "Built and maintained the frontend ecosystem powering the Nigeria Police Force's public-facing digital platform and administrative CMS — crime/misconduct reporting portals, station search, and a 60+ module CMS.",
    stack: ["React", "TypeScript"],
  },
  {
    title: "Bayse Markets",
    href: "https://www.bayse.markets/",
    description:
      "Prediction-market web experience for African audiences — performance, UX, and a full rebrand/relaunch from Gowagr to Bayse.",
    stack: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Squads Market",
    href: "https://squads.game/market",
    description:
      "Prediction-market trading experience shipped while at Bayse — live markets for trading outcomes across sports, culture, and real-world events.",
    stack: ["React", "TypeScript"],
  },
  {
    title: "Octosoft",
    href: "https://www.octodoc.com/",
    description:
      "Affordable health plans and telemedicine — an all-in-one platform to talk to a doctor, access health plans, and manage care online.",
    stack: ["React", "TypeScript"],
  },
  {
    title: "ABI Smartly",
    href: "https://abismartly.com",
    description:
      "Web3 learning startup waitlist and product frontend — monorepo migration for reusable packages and smoother CI/CD across projects.",
    stack: ["React", "TypeScript"],
  },
  {
    title: "DevMeet",
    href: "https://meets.sh",
    description:
      "Community site for weekly developer knowledge-sharing — upcoming and past DevMeet events in one place.",
    stack: ["React", "TypeScript"],
  },
];

export const skills = {
  core: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  styling: ["Tailwind CSS", "Chakra UI", "Sass"],
  data: ["REST", "Apollo / GraphQL", "Redux"],
  tooling: ["GitHub", "GitLab", "Jira", "Trello"],
  languages: ["English — Full professional", "French — DELF B1"],
} as const;

/** Most recent roles for the home selected-work index */
export const featuredExperience = experience.slice(0, 3);
