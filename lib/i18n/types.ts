export type ExperienceCopy = {
  role: string;
  dates: string;
  summary: string;
  highlights?: string[];
};

export type Messages = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    home: string;
    projects: string;
    resume: string;
    contact: string;
  };
  chrome: {
    menu: string;
    close: string;
    language: string;
    copyright: string;
  };
  home: {
    hello: string;
    viewProjects: string;
    contactMe: string;
    status: string;
    focus: string;
    languages: string;
    basedIn: string;
    aboutKicker: string;
    aboutTitle: string;
    learnMore: string;
    stackTitle: string;
    stackSubtitle: string;
    selectedWorkKicker: string;
    selectedWorkTitle: string;
    seeAllWork: string;
    preferLongForm: string;
    readFullResume: string;
    bio: string;
    description: string;
    focusBlurb: string;
    availability: string;
    jobTitle: string;
    location: string;
  };
  projectsPage: {
    kicker: string;
    title: string;
    description: string;
    professionalWork: string;
    fullResume: string;
    selectedBuilds: string;
    selectedBuildsBlurb: string;
    live: string;
    archive: string;
    moreOnGithub: string;
    metaDescription: string;
  };
  resumePage: {
    kicker: string;
    title: string;
    description: string;
    viewResume: string;
    downloadPdf: string;
    pdfNote: string;
    contact: string;
    experience: string;
    openToWork: string;
    sayHello: string;
    skillGroups: {
      core: string;
      styling: string;
      data: string;
      tooling: string;
      languages: string;
    };
    languageLines: string[];
    metaDescription: string;
  };
  contactPage: {
    kicker: string;
    title: string;
    description: string;
    elsewhere: string;
    elsewhereBlurb: string;
    sendNote: string;
    metaDescription: string;
  };
  contactForm: {
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
  };
  contactErrors: {
    required: string;
    invalidEmail: string;
    messageShort: string;
    notConfigured: string;
    sendFailed: string;
    network: string;
    success: string;
  };
  experience: Record<string, ExperienceCopy>;
  projects: Record<string, { description: string }>;
};
