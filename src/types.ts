export type SectionType = 'tesori' | 'ministero' | 'vita' | 'torre';

export interface MeetingPart {
  id: string;
  section: SectionType;
  title: string;
  duration: number; // in minutes
  assignedScriptures: string[];
  themeScripture?: string;
  sourceText: string;
  wolUrl: string;
  type: 'talk' | 'gems' | 'reading' | 'conversation' | 'demonstration' | 'congregation_study' | 'watchtower' | 'custom';
  questions?: { question: string; paragraphNum?: number; sourceSnippet?: string }[];
  paragraphs?: { num?: number; text: string; question?: string }[];
}

export interface WatchtowerStudy {
  title: string;
  themeScripture: string;
  song: { number: number; title: string };
  concludingSong: { number: number; title: string };
  summary: string;
  wolUrl: string;
  paragraphs: { num: number; text: string; question: string }[];
}

export interface MeetingWeek {
  id: string;
  weekLabel: string;
  dateRange: string;
  bibleReading: string;
  openingSong: { number: number; title: string };
  middleSong: { number: number; title: string };
  concludingSong: { number: number; title: string };
  mwbWolUrl: string;
  watchtowerWolUrl: string;
  parts: MeetingPart[];
  watchtowerStudy?: WatchtowerStudy;
  isCurrent?: boolean;
}

export interface DialogueLine {
  speakerRole: "proclaimer" | "householder";
  speakerName: string;
  dialogueText: string;
  stageDirection?: string;
}

export interface DialogueDemonstration {
  setting: string;
  householderProfile: string;
  initialQuestion: string;
  scriptureToRead: string;
  pendingQuestion: string;
  dialogueLines: DialogueLine[];
  studentTips: string[];
}

export interface TalkOutlineSection {
  timeAllocated: string;
  pointTitle: string;
  explanation: string;
  scriptureReference: string;
  scriptureApplication: string;
  illustration?: string;
  speakerNotes: string;
}

export interface TalkOutline {
  isDialogue?: boolean;
  dialogue?: DialogueDemonstration;
  title: string;
  themeScripture: string;
  totalMinutes: number;
  timingMilestones: {
    introTime: string;
    bodyTime: string;
    conclusionTime: string;
  };
  introduction: {
    timeAllocated: string;
    hookQuestionOrIllustration: string;
    purposeStatement: string;
    speakerTip: string;
  };
  sections: TalkOutlineSection[];
  conclusion: {
    timeAllocated: string;
    summary: string;
    motivationalCallToAction: string;
    finalThoughtOrScripture?: string;
  };
  wolSources: {
    title: string;
    publication: string;
    citation: string;
    wolUrl?: string;
  }[];
}

export interface CommentAnswerItem {
  id?: string;
  questionOrParagraph: string;
  paragraphNumber?: number;
  directAnswer: string;
  expandedComment: string;
  practicalApplication: string;
  linkedScripture?: {
    reference: string;
    explanation: string;
  };
  keyWordsToHighlight?: string[];
  wolSourceCitation?: string;
  userNote?: string;
}

export interface GeneratedCommentsData {
  partTitle: string;
  summaryAdvice?: string;
  items: CommentAnswerItem[];
}

export interface OriginalLanguageNuance {
  term: string;
  language: string;
  literalMeaning: string;
  theologicalSignificance: string;
}

export interface ScripturalCrossReference {
  scripture: string;
  connectionExplanation: string;
}

export interface WolArticleCitation {
  title: string;
  publication: string;
  relevance: string;
  wolUrl?: string;
}

export interface DeepResearchData {
  topic: string;
  executiveSummary: string;
  historicalAndCulturalBackground: string;
  originalLanguageNuances: OriginalLanguageNuance[];
  keyScripturalCrossReferences: ScripturalCrossReference[];
  spiritualLessonsAndApplications: string[];
  wolArticlesCited: WolArticleCitation[];
}

export interface SavedPreparation {
  id: string;
  partId: string;
  weekId: string;
  partTitle: string;
  weekLabel: string;
  type: 'talk' | 'comments' | 'research';
  createdAt: string;
  talkOutline?: TalkOutline;
  commentsData?: GeneratedCommentsData;
  researchData?: DeepResearchData;
  userNotes?: string;
}
