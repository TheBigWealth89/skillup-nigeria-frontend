
export const USER_ROLES = {
  LEARNER: 'learner',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin'
} as const;

export const COURSE_CATEGORIES = [
  'Technology',
  'Business',
  'Agriculture',
  'Fashion & Design',
  'Automotive',
  'Construction',
  'Hospitality',
  'Healthcare',
  'Creative Arts',
  'Food & Catering'
];

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  COURSES: '/api/courses',
  USERS: '/api/users',
  ENROLLMENTS: '/api/enrollments'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  INSTRUCTOR_DASHBOARD: '/instructor/dashboard',
  LEARNER_DASHBOARD: '/learner/dashboard',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  PROFILE: '/profile'
};
