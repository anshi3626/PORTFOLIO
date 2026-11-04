/*
 * ALL EDITABLE PORTFOLIO CONTENT LIVES HERE.
 * Nothing in this file claims results, certificates or links that were not provided.
 */

export const PLACEHOLDER = 'PLACEHOLDER';

export const personal = {
  name: 'Anshika Yadav',
  shortName: 'Anshika',
  identity: 'BCA Cloud Security Student | Aspiring Tech & AI Professional | Creative Digital Creator',
  location: 'India',
  email: 'yanshika3626@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anshika-yadav-311367315/',
  // PLACEHOLDER: replace with your GitHub profile URL. Shown as a placeholder until then.
  github: PLACEHOLDER as string,
  tagline: 'Technology. AI. Creativity.',
  education: {
    degree: 'Bachelor of Computer Applications (BCA), Cloud and Security',
    school: 'Amity University Online',
    period: 'January 2025 – January 2028',
  },
};

export const heroCopy = {
  intro: "HELLO, I'M",
  headline: 'Building at the Intersection of Technology, AI & Creativity.',
  description:
    'I am a BCA Cloud Security student passionate about exploring technology, developing practical solutions, experimenting with AI, and creating engaging digital experiences.',
};

export const aboutParagraphs = [
  'I am currently pursuing my BCA in Cloud and Security from Amity University Online. My interests lie in understanding how technology works, exploring cybersecurity and cloud computing, working with data, and experimenting with artificial intelligence.',
  'Alongside my technical learning, I enjoy creating digital designs, editing videos, and exploring AI-powered creative workflows.',
  'I believe technology and creativity complement each other, and I aim to combine both to build meaningful digital experiences and practical solutions.',
];

export const skillGroups = [
  {
    id: 'programming',
    title: 'Programming & Data',
    items: ['Python', 'SQL', 'SQLite', 'NumPy', 'Pandas', 'Seaborn', 'Data Analysis', 'Machine Learning'],
  },
  {
    id: 'cloud',
    title: 'Cloud & Cybersecurity',
    items: ['Cloud Computing Fundamentals', 'Cloud Security Fundamentals', 'AWS Fundamentals', 'Identity and Access Management (IAM)'],
  },
  {
    id: 'ai',
    title: 'AI & Prompt Engineering',
    items: ['Prompt Engineering', 'ChatGPT', 'Google Gemini', 'Claude', 'DeepSeek', 'Grok', 'Perplexity', 'Google NotebookLM', 'Google Flow'],
  },
  {
    id: 'creative',
    title: 'Creative Technology',
    items: ['Graphic Design', 'Poster Design', 'Thumbnail Design', 'Advertisement Creatives', 'Video Editing', 'Photo Editing', 'Color Grading', 'AI Video Generation', 'Motion Control'],
  },
];

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  /** Only set when the status is known. Shown in the details view. */
  status?: string;
  objective?: string;
  /** Only set when a real repository URL exists. */
  github?: string;
}

export const projects: Project[] = [
  {
    id: 'retail-demand',
    number: '01',
    title: 'Retail Demand Forecasting & Product Clustering',
    category: 'Machine Learning / Data Analytics',
    description:
      'A machine learning project focused on analyzing online retail transaction data, forecasting product demand, and identifying product groups using clustering techniques.',
    tags: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Clustering', 'Data Analysis'],
    objective: 'Forecast product demand and identify product groups using clustering techniques.',
  },
  {
    id: 'repeat-purchase',
    number: '02',
    title: 'Customer Repeat Purchase Prediction',
    category: 'Machine Learning / Predictive Analytics',
    description:
      'A predictive analytics project focused on analyzing customer purchasing behaviour and identifying the likelihood of repeat purchases using machine learning models.',
    tags: ['Python', 'SQL', 'Machine Learning', 'Predictive Analytics', 'Data Analysis'],
    objective: 'Identify the likelihood of repeat purchases from customer purchasing behaviour.',
    github: 'https://github.com/anshi3626/CHURN--ANALYSIS',
  },
  {
    id: 'isl',
    number: '03',
    title: 'Indian Sign Language Recognition',
    category: 'AI / Computer Vision / Hackathon',
    description:
      'A hackathon project exploring Indian Sign Language recognition and the use of machine learning and computer vision to support accessible communication.',
    tags: ['Python', 'Computer Vision', 'Machine Learning', 'Accessibility'],
    status: 'Under development',
    objective: 'Explore machine learning and computer vision for Indian Sign Language recognition.',
  },
  {
    id: 'specsmart',
    number: '04',
    title: 'SpecSmart – Line Planner',
    category: 'AI / Smart Planning / Hackathon',
    description: 'A hackathon project based on a build plan for a smart line-planning solution.',
    tags: ['AI', 'Smart Planning', 'Hackathon'],
  },
];

export const experience = {
  title: 'Tata Cybersecurity Analyst Job Simulation',
  org: 'Forage',
  date: 'October 2026',
  type: 'Virtual job simulation',
  description: 'Completed the Tata Cybersecurity Analyst Job Simulation through Forage.',
  activities: [
    'Explored Identity and Access Management (IAM) fundamentals.',
    'Worked on IAM strategy assessment.',
    'Practiced designing custom IAM solutions.',
    'Learned about platform integration in the context of identity and access management.',
  ],
};

export interface Certification {
  title: string;
  issuer?: string;
  // Only set when a real certificate file or URL exists. Otherwise no View Certificate button is shown.
  certificateUrl?: string;
}

export const certifications: Certification[] = [
  { title: 'AI & ChatGPT', issuer: 'PW Earners' },
  { title: 'AWS Cloud Practitioner Essentials' },
  { title: 'Cybersecurity' },
  { title: 'Certificate in Advanced Excel' },
  { title: 'Elevate Your Presence: A Workshop on Personal Branding and Grooming' },
];

export interface CreativeItem {
  id: string;
  category: 'Posters & Graphics' | 'YouTube Thumbnails' | 'Advertisement Creatives' | 'AI-generated Visuals' | 'Video Editing' | 'AI Video Experiments';
  title: string;
  image: string; // PLACEHOLDER until real work is added
}

export const creativeCategories = [
  'All',
  'Posters & Graphics',
  'YouTube Thumbnails',
  'Advertisement Creatives',
  'AI-generated Visuals',
  'Video Editing',
  'AI Video Experiments',
] as const;

export const creativeItems: CreativeItem[] = [
  { id: 'c1', category: 'Posters & Graphics', title: 'Poster design (add your work)', image: PLACEHOLDER },
  { id: 'c2', category: 'YouTube Thumbnails', title: 'Thumbnail design (add your work)', image: PLACEHOLDER },
  { id: 'c3', category: 'Advertisement Creatives', title: 'Ad creative (add your work)', image: PLACEHOLDER },
  { id: 'c4', category: 'AI-generated Visuals', title: 'AI visual (add your work)', image: PLACEHOLDER },
  { id: 'c5', category: 'Video Editing', title: 'Video edit (add your work)', image: PLACEHOLDER },
  { id: 'c6', category: 'AI Video Experiments', title: 'AI video experiment (add your work)', image: PLACEHOLDER },
];
