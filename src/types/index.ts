export type PageId = 'home' | 'events' | 'projects' | 'ysws' | 'manifesto' | 'activities' | 'join' | 'team' | 'slides';

export interface Project {
  id: string;
  title: string;
  creator: string;
  creatorAge: number;
  school: string;
  category: 'hardware' | 'web' | 'games' | 'nagpur-utility';
  status?: 'coming_soon' | 'active';
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  partsUsed?: string[];
  linesOfCode?: number;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  landmark: string;
  status: 'upcoming' | 'completed' | 'coming_soon';
  description: string;
  agenda: string[];
  capacity: number;
  spotsLeft?: number;
  rsvpOpen: boolean;
  snack: string;
  link?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'getting-started' | 'parents' | 'logistics';
}

export interface YswsProgram {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  reward: string;
  status: 'coming_soon' | 'active';
  image?: string;
  glyph: any;
  accentColor: string;
}
