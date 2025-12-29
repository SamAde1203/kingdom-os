export interface AssessmentScore {
  [key: string]: 'yes' | 'no' | null;
}

export interface ContentIdea {
  id: number;
  title: string;
  souls: boolean;
  sanctification: boolean;
  service: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  role: 'Seer' | 'Sharer' | 'Shepherd' | 'Sender';
  prayerPartner: string;
  status: 'active' | 'rest';
}

export interface Metrics {
  tier1: {
    soulsSaved: number;
    livesRestored: number;
    familiesHealed: number;
    addictionsBroken: number;
  };
  tier2: {
    prayerRequests: number;
    groupAttendance: number;
    volunteers: number;
    outreach: number;
  };
  tier3: {
    likes: number;
    views: number;
    followers: number;
    traffic: number;
  };
}

export interface PrayerRequest {
  id: number;
  request: string;
  category: 'personal' | 'team' | 'ministry' | 'protection' | 'provision';
  urgent: boolean;
  date: string;
  answered: boolean;
  praying: string[];
}

export interface Testimony {
  id: number;
  title: string;
  person: string;
  story: string;
  category: 'salvation' | 'healing' | 'deliverance' | 'provision' | 'restoration' | 'calling';
  permission: boolean;
  followUpDate: string;
  dateRecorded: string;
  lifecycle: 'raw' | 'reflected' | 'replicated' | 'legacy';
  followedUp: boolean;
}

export interface SabbathWeek {
  id: number;
  weekNumber: number;
  contentPosts: number;
  sabbathDay: boolean;
  prayerTime: number;
  endDate: string;
}

export interface CrisisEvent {
  id: number;
  date: string;
  level: 'ignore' | 'private' | 'public';
  status: 'active' | 'resolved';
  prayedOver: boolean;
  response: string;
}

export interface Partnership {
  id: number;
  name: string;
  platform: string;
  gospel: 'yes' | 'unsure' | 'no' | null;
  authority: 'yes' | 'unsure' | 'no' | null;
  deity: 'yes' | 'unsure' | 'no' | null;
  integrity: 'yes' | 'unsure' | 'no' | null;
  fruit: 'yes' | 'unsure' | 'no' | null;
  notes: string;
  date: string;
  score: number;
  recommendation: 'GREEN LIGHT' | 'YELLOW LIGHT' | 'RED LIGHT';
}

export interface ContentCorrection {
  id: number;
  contentTitle: string;
  issue: string;
  severity: 'minor' | 'moderate' | 'major';
  correctionAction: string;
  publicResponse: boolean;
  reviewedBy: string;
  date: string;
  status: 'corrected';
}

export interface ChurchMember {
  name: string;
  date: string;
  source: 'service' | 'social' | 'friend' | 'event' | 'outreach' | 'online';
  notes: string;
  location: 'ghana' | 'uk';
}

export interface ChurchGrowth {
  ghana: {
    current: number;
    goal: number;
    newMembers: ChurchMember[];
    recentGrowth: any[];
  };
  uk: {
    current: number;
    goal: number;
    newMembers: ChurchMember[];
    recentGrowth: any[];
  };
}

export interface Service {
  id: number;
  date: string;
  ghanaTheme: string;
  ukTheme: string;
  sharedScripture: string;
  preacher: string;
  specialNotes: string;
  streamLink: string;
}

export interface SharedTestimony {
  id: number;
  fromLocation: 'ghana' | 'uk';
  person: string;
  category: string;
  story: string;
  date: string;
  sharedWith: boolean;
  impact: string;
}
