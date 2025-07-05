export interface Instructor {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}
// src/types/course.types.ts (Example file path)

// --- Base Interfaces that match the new backend sub-documents ---

export interface Resource {
  id?: string;
  title: string;
  url: string;
  resourceType: "video" | "article" | "exercise";
  duration: number; // in minutes
}

export interface Lesson {
  id?: string;
  title: string;
  description?: string;
  resources: Resource[];
  isFreePreview: boolean;
}

export interface Module {
  id?: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

// --- Main Course Interface (Matches the API response) ---
export interface Course {
  learnersEnrolled: number;
  status: string;
  id: string;
  title: string;
  category: "programming" | "design" | "business" | "language";
  description: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
    title?: string;
    bio?: string;
  };
  modules: Module[];
  coverImage?: string;
  introVideo?: string;
  isApproved: boolean;
  level: "beginner" | "intermediate" | "advanced";
  estimatedDuration?: number;
  prerequisites: string[];
  tags: string[];
  totalLessons: number;
  enrollmentCount?: number;
  createdAt: string;
  updatedAt: string;
  // Add fields for UI mock data compatibility
  rating?: number;
  reviewCount?: number;
  duration?: string | number;
  syllabus?: Array<{
    module: string;
    lessons: string[];
  }>;
  objectives?: string[];
}

// --- Form Data Interface ---
// This represents the data needed to CREATE a course.
// We build it from the main Course interface for consistency.
export type CourseFormData = Pick<
  Course,
  | "title"
  | "category"
  | "description"
  | "level"
  | "prerequisites"
  | "tags"
  | "coverImage"
  | "introVideo"
> & {
  // The syllabus on the form will be represented by the modules array
  modules: Module[];
  estimatedDuration: number; // Make it non-optional on the form
};

// A flexible error type for your form validation
export type CourseFormErrors = Partial<
  Record<keyof CourseFormData | "syllabus", string>
>;

// --- Other Related Interfaces ---
export interface Enrollment {
  id: string;
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
