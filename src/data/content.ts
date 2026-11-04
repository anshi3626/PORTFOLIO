/*
 * ALL EDITABLE CONTENT LIVES HERE.
 * Source of truth: the supplied resume and the links you gave.
 * Nothing here is invented. Fields marked TODO need your input.
 */

export const personal = {
  name: 'Anshika Yadav',
  firstName: 'Anshika',
  lastName: 'Yadav',
  identity: 'BCA Cloud Security Student · Aspiring Tech & AI Professional · Creative Digital Creator',
  location: 'India',
  email: 'yanshika3626@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anshika-yadav-311367315/',
  // Taken from the GitHub account that owns your CHURN--ANALYSIS repository. Confirm this is your profile.
  github: 'https://github.com/anshi3626',
  education: {
    degree: 'Bachelor of Computer Applications (BCA), Cloud and Security',
    school: 'Amity University Online',
    period: 'January 2025 – January 2028',
  },
};

export const hero = {
  kicker: 'Portfolio · 2026',
  caption: 'Cloud Security · Data · AI · Design',
  lead: 'Building at the intersection of technology, AI & creativity.',
  description:
    'I am a BCA Cloud Security student exploring technology, developing practical solutions, experimenting with AI, and creating engaging digital experiences.',
  // Words revealed by the flashlight over the hero.
  revealWords: ['Cloud', 'Security', 'Data', 'AI', 'Design', 'Video'],
};

export const about = {
  background: [
    'I am currently pursuing my BCA in Cloud and Security from Amity University Online. My interests lie in understanding how technology works, exploring cybersecurity and cloud computing, working with data, and experimenting with artificial intelligence.',
    'Alongside my technical learning, I enjoy creating digital designs, editing videos, and exploring AI-powered creative workflows.',
  ],
  interests: [
    'Cybersecurity',
    'Cloud computing',
    'Python and data analytics',
    'Machine learning',
    'Prompt engineering',
    'Graphic design & video editing',
  ],
  approach:
    'I learn by building. I develop practical skills through projects and continuous learning, and I believe technology and creativity complement each other.',
};

export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming & Data',
    items: ['Python', 'SQL', 'SQLite', 'NumPy', 'Pandas', 'Seaborn', 'Data analysis', 'Machine learning'],
  },
  {
    title: 'Cloud & Cybersecurity',
    items: ['Cloud computing fundamentals', 'Cloud security fundamentals', 'AWS fundamentals', 'Identity & access management (IAM)'],
  },
  {
    title: 'AI & Prompt Engineering',
    items: ['Prompt engineering', 'ChatGPT', 'Google Gemini', 'Claude', 'DeepSeek', 'Grok', 'Perplexity', 'Google NotebookLM', 'Google Flow'],
  },
  {
    title: 'Creative Technology',
    items: ['Graphic design', 'Poster & thumbnail design', 'Advertisement creatives', 'Video & photo editing', 'Color grading', 'AI video generation', 'Motion control'],
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  /** Set only when the status is known. */
  status?: string;
  /** Set only when a real repository URL exists. */
  github?: string;
  /** Case study details you have not supplied yet. Shown as a marked TODO. */
  caseStudyTodo: boolean;
}

export const projects: Project[] = [
  {
    id: 'retail-demand',
    title: 'Retail Demand Forecasting & Product Clustering',
    category: 'Machine Learning · Data Analytics',
    description:
      'A machine learning project focused on analyzing online retail transaction data, forecasting product demand, and identifying product groups using clustering techniques.',
    tags: ['Python', 'Pandas', 'NumPy', 'Machine learning', 'Clustering'],
    caseStudyTodo: true,
  },
  {
    id: 'repeat-purchase',
    title: 'Customer Repeat Purchase Prediction',
    category: 'Machine Learning · Predictive Analytics',
    description:
      'A predictive analytics project focused on analyzing customer purchasing behaviour and identifying the likelihood of repeat purchases using machine learning models.',
    tags: ['Python', 'SQL', 'Machine learning', 'Predictive analytics'],
    github: 'https://github.com/anshi3626/CHURN--ANALYSIS',
    caseStudyTodo: true,
  },
  {
    id: 'isl',
    title: 'Indian Sign Language Recognition',
    category: 'AI · Computer Vision · Hackathon',
    description:
      'A hackathon project exploring Indian Sign Language recognition and the use of machine learning and computer vision to support accessible communication.',
    tags: ['Python', 'Computer vision', 'Machine learning', 'Accessibility'],
    status: 'Under development',
    caseStudyTodo: true,
  },
  {
    id: 'specsmart',
    title: 'SpecSmart – Line Planner',
    category: 'AI · Smart Planning · Hackathon',
    description: 'A hackathon project based on a build plan for a smart line-planning solution.',
    tags: ['AI', 'Smart planning', 'Hackathon'],
    caseStudyTodo: true,
  },
];

export const experience = {
  title: 'Tata Cybersecurity Analyst Job Simulation',
  org: 'Forage',
  date: 'October 2026',
  type: 'Virtual job simulation, remote',
  description: 'Completed the Tata Cybersecurity Analyst Job Simulation through Forage, gaining practical exposure to key cybersecurity concepts and tasks.',
  activities: [
    'Explored Identity and Access Management (IAM) fundamentals.',
    'Worked on IAM strategy assessment.',
    'Practiced designing custom IAM solutions.',
    'Learned about platform integration in the context of identity and access management.',
  ],
};

export const certifications: string[] = [
  'AI & ChatGPT (PW Earners)',
  'AWS Cloud Practitioner Essentials',
  'Cybersecurity',
  'Certificate in Advanced Excel',
  'Elevate Your Presence: A Workshop on Personal Branding and Grooming',
];

export const contactCopy = {
  headline: "Let's collaborate",
  body: "I'm always interested in learning, collaborating, exploring new ideas, and working on meaningful projects.",
};
