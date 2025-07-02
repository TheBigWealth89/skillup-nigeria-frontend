import {
  addEnrollment,
  getEnrollmentByUserAndCourse,
  updateEnrollmentProgress,
} from "@/mock/enrollmentMock";

import { currentUser } from "@/mock/userMock";
import { Course } from "@/types/course";

// Lesson progress tracking
let lessonProgress: {
  userId: string;
  lessonId: string;
  completed: boolean;
  watchTime: number;
}[] = [
  // Sample progress for course1 to demonstrate functionality
  { userId: "user1", lessonId: "course1-0-0", completed: true, watchTime: 100 },
  { userId: "user1", lessonId: "course1-0-1", completed: true, watchTime: 100 },
  { userId: "user1", lessonId: "course1-0-2", completed: false, watchTime: 45 },
];

export const markLessonComplete = (userId: string, lessonId: string) => {
  const existingProgressIndex = lessonProgress.findIndex(
    (p) => p.userId === userId && p.lessonId === lessonId,
  );

  if (existingProgressIndex !== -1) {
    lessonProgress[existingProgressIndex].completed = true;
  } else {
    lessonProgress.push({
      userId,
      lessonId,
      completed: true,
      watchTime: 100,
    });
  }

  // Update overall course progress
  updateCourseProgressFromLessons(userId, lessonId);
};

export const isLessonCompleted = (
  userId: string,
  lessonId: string,
): boolean => {
  const progress = lessonProgress.find(
    (p) => p.userId === userId && p.lessonId === lessonId,
  );
  return progress?.completed || false;
};

export const updateLessonProgress = (
  userId: string,
  lessonId: string,
  watchTime: number,
) => {
  const existingProgressIndex = lessonProgress.findIndex(
    (p) => p.userId === userId && p.lessonId === lessonId,
  );

  if (existingProgressIndex !== -1) {
    lessonProgress[existingProgressIndex].watchTime = Math.max(
      lessonProgress[existingProgressIndex].watchTime,
      watchTime,
    );
  } else {
    lessonProgress.push({
      userId,
      lessonId,
      completed: watchTime >= 90,
      watchTime,
    });
  }
};

export const getLessonProgress = (userId: string, lessonId: string) => {
  const progress = lessonProgress.find(
    (p) => p.userId === userId && p.lessonId === lessonId,
  );
  return progress?.watchTime || 0;
};

const updateCourseProgressFromLessons = (userId: string, lessonId: string) => {
  // Extract course ID from lesson ID (format: courseId-moduleIdx-lessonIdx)
  const courseId = lessonId.split("-")[0];
  const enrollment = getEnrollmentByUserAndCourse(userId, courseId);

  if (enrollment) {
    // For course1, we know it has 4 modules with 4 lessons each = 16 total lessons
    // This is a simplified calculation for the demo
    const totalLessons = 16;
    const completedLessons = lessonProgress.filter(
      (p) =>
        p.userId === userId && p.lessonId.startsWith(courseId) && p.completed,
    ).length;

    const newProgress = Math.min(
      Math.round((completedLessons / totalLessons) * 100),
      100,
    );
    updateEnrollmentProgress(enrollment.id, newProgress);
  }
};

export const enrollInCourse = (course: Course) => {
  const existingEnrollment = getEnrollmentByUserAndCourse(
    currentUser.id,
    course.id,
  );

  if (existingEnrollment) {
    return {
      success: false,
      message: "You're already enrolled in this course",
      enrollment: existingEnrollment,
    };
  }

  const newEnrollment = addEnrollment({
    userId: currentUser.id,
    courseId: course.id,
    enrolledAt: new Date().toISOString(),
    progress: 0,
    completed: false,
    certificateIssued: false,
  });

  return {
    success: true,
    message: "Successfully enrolled in the course!",
    enrollment: newEnrollment,
  };
};

export const isUserEnrolled = (courseId: string): boolean => {
  const enrollment = getEnrollmentByUserAndCourse(currentUser.id, courseId);
  return !!enrollment;
};

export const getUserEnrollmentProgress = (courseId: string): number => {
  const enrollment = getEnrollmentByUserAndCourse(currentUser.id, courseId);
  return enrollment?.progress || 0;
};

export const filterCourses = (
  courses: Course[],
  filters: {
    category?: string;
    level?: string;
    search?: string;
  },
) => {
  return courses.filter((course) => {
    // Category filter
    if (
      filters.category &&
      filters.category !== "All Categories" &&
      course.category !== filters.category
    ) {
      return false;
    }

    // Level filter
    if (
      filters.level &&
      filters.level !== "All Levels" &&
      course.level !== filters.level
    ) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesTitle = course.title.toLowerCase().includes(searchTerm);
      const matchesDescription = course.description
        .toLowerCase()
        .includes(searchTerm);
      const matchesInstructor = course.createdBy.name
        .toLowerCase()
        .includes(searchTerm);
      const matchesCategory = course.category
        .toLowerCase()
        .includes(searchTerm);

      if (
        !matchesTitle &&
        !matchesDescription &&
        !matchesInstructor &&
        !matchesCategory
      ) {
        return false;
      }
    }

    return true;
  });
};
