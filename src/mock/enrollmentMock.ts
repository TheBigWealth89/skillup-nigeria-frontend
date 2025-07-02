import { Enrollment } from "@/types/course";

export let enrollments: Enrollment[] = [
  {
    id: "enrollment1",
    userId: "user1",
    courseId: "course2",
    enrolledAt: "2024-02-01T10:00:00Z",
    progress: 65,
    completed: false,
    certificateIssued: false,
  },
  {
    id: "enrollment2",
    userId: "user1",
    courseId: "course3",
    enrolledAt: "2024-01-15T14:30:00Z",
    progress: 100,
    completed: true,
    certificateIssued: true,
  },
];

export const addEnrollment = (enrollment: Omit<Enrollment, "id">) => {
  const newEnrollment: Enrollment = {
    ...enrollment,
    id: `enrollment${enrollments.length + 1}`,
  };
  enrollments.push(newEnrollment);
  return newEnrollment;
};

export const getEnrollmentByUserAndCourse = (
  userId: string,
  courseId: string,
) => {
  return enrollments.find(
    (e) => e.userId === userId && e.courseId === courseId,
  );
};

export const getUserEnrollments = (userId: string) => {
  return enrollments.filter((e) => e.userId === userId);
};

export const updateEnrollmentProgress = (
  enrollmentId: string,
  progress: number,
) => {
  const enrollment = enrollments.find((e) => e.id === enrollmentId);
  if (enrollment) {
    enrollment.progress = progress;
    enrollment.completed = progress >= 100;
    if (enrollment.completed && !enrollment.certificateIssued) {
      enrollment.certificateIssued = true;
    }
  }
  return enrollment;
};
