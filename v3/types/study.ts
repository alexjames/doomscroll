export interface StudyPage {
  id: string;
  title: string;
  content: string;
}

export interface SubTopic {
  id: string;
  title: string;
  pages: StudyPage[];
}

export interface Topic {
  id: string;
  title: string;
  subtopics: SubTopic[];
}

export interface StudyProgress {
  [subtopicId: string]: number; // page index
}
