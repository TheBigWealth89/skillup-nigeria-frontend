
export interface CourseForm {
  title: string;
  category: string;
  description: string;
  tags: string[];
  syllabus: SyllabusWeek[];
  prerequisites: string[];
  coverImage: string;
  introVideo: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number;
}

export interface CourseFormErrors {
  title?: string;
  category?: string;
  description?: string;
  tags?: string;
  coverImage?: string;
  introVideo?: string;
  duration?: string;
  prerequisites?: string;
}

export interface SyllabusWeek {
  id: string;
  title: string;
  topics: string[];
  resources: ResourceItem[];
}

export interface ResourceItem {
  id: string;
  type: "Video" | "Article" | "Exercise";
  title: string;
  url: string;
}
