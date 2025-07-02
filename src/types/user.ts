export interface User {
  email: string;
  username: string;
  name: {
    firstName: string;
    lastName: string;
  };
  role: "learner" | "instructor" | "admin";
  avatar?: string;
}