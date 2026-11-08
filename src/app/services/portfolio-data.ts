import { Injectable } from '@angular/core';

export interface SocialLink {
  readonly label: string;
  readonly url: string;
  /** Inline SVG path data, sized for a 24x24 viewBox. */
  readonly icon: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
  /** Optional one-line note under the title. */
  readonly note?: string;
  /** `'ai'` renders the group as the full-width, aurora-styled AI pane. */
  readonly variant?: 'ai';
}

export interface Project {
  readonly name: string;
  readonly blurb: string;
  readonly stack: readonly string[];
  readonly repo?: string;
  readonly demo?: string;
  readonly featured: boolean;
  /** Set `true` for AI-powered projects — renders with the teal/violet AI frame and an "AI" badge. */
  readonly ai?: boolean;
}

export interface Role {
  readonly company: string;
  readonly title: string;
  readonly period: string;
  readonly highlights: readonly string[];
}

export interface Profile {
  readonly name: string;
  readonly role: string;
  /** Second role line in the hero, rendered in the AI gradient. */
  readonly aiRole?: string;
  readonly tagline: string;
  readonly location: string;
  readonly email: string;
  readonly available: boolean;
}

/** The floating "AI prompt" card that overlaps the hero photo. */
export interface HeroAiCard {
  readonly label: string;
  readonly prompt: string;
  readonly tools: readonly string[];
}

export interface HeroImage {
  readonly url: string;
  /** Real alt text — these carry content, so they are not decorative. */
  readonly alt: string;
}

/**
 * All site content lives here so the components stay presentational.
 *
 * Everything below is PLACEHOLDER copy — replace it with real details.
 * The shapes above are what the templates depend on; keep those stable.
 */
@Injectable({
  providedIn: 'root',
})
export class PortfolioData {
  readonly profile: Profile = {
    name: 'Joy Sarkar',
    role: 'Full-Stack Developer',
    aiRole: 'AI Developer',
    tagline:
      'I build fast, accessible web applications — and care about the details most people scroll past.',
    location: 'India',
    email: 'joyprof730@gmail.com',
    available: true,
  };

  /**
   * The single framed photo in the hero.
   *
   * Remote placeholder from Unsplash's CDN, requested at 800x933 (2x the
   * ~400px display size) with `auto=format` so it serves WebP/AVIF where
   * supported. Keep the 6:7 ratio — `photo-stack.css` sets `aspect-ratio`
   * to match, and a mismatch will letterbox the crop.
   *
   * This is the site's only third-party request. Swapping in a file under
   * `public/` (e.g. `/hero.jpg`) returns it to zero external calls.
   */
  readonly heroAi: HeroAiCard = {
    label: 'AI-powered dev',
    prompt: 'Engineered a Retrieval-Augmented Generation (RAG) agent to extract precise answers and insights directly from user-provided documents.',
    tools: ['Claude', 'Gemini'],
  };

  readonly heroImage: HeroImage = {
    url: './heroImage.jpg',
    alt: 'A laptop on a wooden desk displaying code',
  };

  readonly about: readonly string[] = [
    "I'm a full-stack developer who thrives on building complete systems, focusing on clean architecture and scalable logic across both the client and the server.",
    "Lately, my work heavily features Angular on the frontend paired with robust backend technologies like FastAPI and Express, while deeply integrating generative AI—particularly Claude—into the core of my applications.",
    "My distinct advantage is velocity. By combining solid engineering fundamentals with advanced prompt engineering and AI-assisted workflows, I dramatically accelerate the path from an empty repository to a shipped feature."
  ];

  readonly skills: readonly SkillGroup[] = [
    {
      title: 'Frontend',
      items: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'HTML5', 'CSS3', 'Bootstrap', 'TailwindCSS'],
    },
    {
      title: 'Backend',
      items: ['Node.js', 'Express', 'REST APIs', 'Java', 'Spring Boot', 'Python', 'FastAPI'],
    },
    {
      title: 'Data',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL'],
    },
    {
      title: 'Tooling',
      items: ['Git', 'Docker', 'CI/CD', 'Vitest'],
    },
    {
      title: 'AI Development',
      note: 'Part of my everyday workflow — from prototyping, agent development, and code review.',
      items: ['LangChain', 'LangGraph', 'Prompt Engineering', 'MCP', 'Claude', 'Claude Code', 'Gemini', 'ChatGPT'],
      variant: 'ai',
    },
  ];

  readonly projects: readonly Project[] = [
    {
      name: 'Document RAG Explorer',
      blurb:
        'A Retrieval-Augmented Generation (RAG) platform that transforms static PDFs and text files into interactive knowledge bases. Ingests documents and delivers precise, context-aware answers to user queries using generative AI.',
      stack: ['Angular', 'FastAPI', 'Gemini AI'],
      repo: 'https://github.com/JoySarkar07/basicRAGApp',
      featured: true,
      ai: true
    },
    {
      name: 'Quizmania (the quiz app)',
      blurb:
        'Implemented role-based access with Teachers managing quizzes (create, update, delete) and sharing unique quiz links with students. Enabled students to take quizzes via shared links, view live leaderboards, and practice previous or mock tests.',
      stack: ['HTML', 'CSS', 'Javascript', 'Node.js', 'Express.js', 'MySQL', 'MongoDB'],
      repo: 'https://github.com/JoySarkar07/collegeQuizApp',
      demo: 'https://quizmania-kappa.vercel.app/',
      featured: true,
    },
    {
      name: 'FixMate',
      blurb:
        'Developed a full-stack role-based maintenance management platform for managing and tracking residential maintenance complaints and repair workflows.',
      stack: ['Java', 'Spring Boot', 'Spring Security', 'React.js', 'MySQL', 'TailwindCSS'],
      repo: 'https://github.com/JoySarkar07/FixMate',
      featured: false,
    },
    {
      name: 'Retail Shop Billing System',
      blurb:
        'It is for managing product sales, customer orders, billing workflows, and secure online payments with real-time sales analytics.',
      stack: ['Java', 'Spring Boot', 'Spring Security', 'React.js', 'MySQL', 'TailwindCSS'],
      repo: 'https://github.com/JoySarkar07/BillingWebsite',
      featured: false,
    }
  ];

  readonly experience: readonly Role[] = [
    {
      company: 'Cognizant',
      title: 'Programmer Analyst Trainee',
      period: '5 Feb, 2026 — Present',
      highlights: [
        'Completed intensive technical training focused on building responsive, scalable full-stack applications using Angular and Express.js.',
        'Engineered high-performance backends using FastAPI and implemented Retrieval-Augmented Generation (RAG) pipelines for AI-driven data retrieval.',
        'Integrated Claude and advanced AI toolchains into the development workflow, dramatically accelerating the prototyping and delivery of full-stack applications.',
      ],
    },
    {
      company: 'TechMonastic Solutions',
      title: 'Junior Software Developer Intern',
      period: '3 Feb, 2025 — 24 May, 2025',
      highlights: [
        'Developed a reusable UI component library using React and TypeScript for a WordPress plugin, significantly enhancing maintainability and scalability.',
        'Refactored and optimized React component logic, reducing code complexity by 20% and improving overall application rendering performance.',
      ],
    },
  ];

  readonly socials: readonly SocialLink[] = [
    {
      label: 'GitHub',
      url: 'https://github.com/JoySarkar07',
      icon: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7 0-.7 0-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.4 3.3 1.2a12.3 12.3 0 0 1 6 0C17.1 5 18.1 5.4 18.1 5.4c.6 1.5.2 2.7.1 3a4.5 4.5 0 0 1 1.2 3.1c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dev-joysarkar',
      icon: 'M20.4 20.5h-3.6v-5.6c0-1.3-.5-2.2-1.7-2.2-.9 0-1.4.6-1.7 1.2-.1.2-.1.5-.1.8v5.8H9.7s.1-9.5 0-10.5h3.6v1.5c.5-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8v6ZM5.9 8.6h-.1C4.6 8.6 3.8 7.8 3.8 6.8c0-1 .8-1.8 2-1.8s2 .8 2 1.8c0 1-.8 1.8-2 1.8Zm-1.8 12h3.7V10H4.1v10.5Z',
    },
    {
      label: 'Email',
      url: 'mailto:joyprof730@gmail.com',
      icon: 'M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2.2 7.8 6 7.8-6H4.2Zm15.6 2.1-7.3 5.6a1 1 0 0 1-1.2 0L4 7.8v10.7h15.8V7.8Z',
    },
  ];
}
