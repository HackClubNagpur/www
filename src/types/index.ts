export type PageId = 'home' | 'events' | 'projects' | 'ysws' | 'manifesto' | 'activities' | 'join' | 'team' | 'slides';

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
