
export interface Instructor {
  _id: string; 
  name: string;
  avatar?: string;
}

// Matches the 'resources' array inside the syllabus
export interface SyllabusResource {
  _id?: string;
  title: string;
  url: string;
  type: "video" | "article" | "exercise";
}

// Matches the 'syllabus' array items from your backend schema
export interface SyllabusWeek {
  _id?: string;
  week: number;
  title: string;
  topics: string[];
  resources: SyllabusResource[];
}

// --- Main Course Interface (Matches API Response) ---
// This should be the single source of truth for what a "Course" object looks like.
export interface Course {
  _id: string;
  title:string;
  category: "programming" | "design" | "business" | "language";
  description: string;
  createdBy: Instructor;
  syllabus: SyllabusWeek[]; // <-- FIX: Matches the backend schema
  coverImage?: string;
  introVideo?: string;
  isApproved: boolean; // <-- FIX: Renamed from 'approved'
  approvedBy?: Instructor;
  level: "beginner" | "intermediate" | "advanced";
  estimatedDuration?: number; // <-- FIX: Renamed and changed type to number
  prerequisites: string[];
  tags: string[];
  isActive: boolean;
  enrollmentCount?: number; // <-- FIX: Renamed from 'learnersEnrolled'
  createdAt: string;
  updatedAt: string;
}

// --- Form-Related Interfaces (Derived from the main Course interface) ---

// Use TypeScript's "Omit" and "Pick" to create the form type from the main Course type.
// This reduces code duplication and ensures consistency.
export type CourseForm = Pick<
  Course,
  | 'title'
  | 'category'
  | 'description'
  | 'tags'
  | 'syllabus'
  | 'prerequisites'
  | 'coverImage'
  | 'introVideo'
  | 'level'
> & {
  // Add fields that are different on the form
  estimatedDuration: number; // Keep as number for validation
};

// Use TypeScript's "Partial" and "Record" for a flexible error type.
// This means you don't have to manually list every possible error field.
export type CourseFormErrors = Partial<Record<keyof CourseForm, string>>;

// --- Other Related Interfaces ---
export interface Enrollment {
  _id: string;
  user: string; // Or a populated User object
  course: string; // Or a populated Course object
  enrolledAt: string;
  progress: number; // 0-100
  completed: boolean;
  certificateIssued?: boolean;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
}
