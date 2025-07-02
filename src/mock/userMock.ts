import { User } from "@/types/course";

export const instructors: User[] = [
  {
    id: "instructor1",
    name: "Dr. Sarah Chen",
    email: "sarah.chen@skillupnigeria.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
    bio: "Senior Software Engineer at Google with 10+ years of experience in web development. Passionate about teaching modern JavaScript frameworks and helping developers level up their skills.",
    title: "Senior Software Engineer at Google",
  },
  {
    id: "instructor2",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@skillupnigeria.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "UX Design Lead with expertise in user-centered design and product strategy. Former designer at Airbnb and Spotify.",
    title: "UX Design Lead",
  },
  {
    id: "instructor3",
    name: "Amina Hassan",
    email: "amina.hassan@skillupnigeria.com",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    bio: "Digital Marketing Expert with 8+ years helping businesses grow their online presence. Certified Google Ads and Facebook Marketing specialist.",
    title: "Digital Marketing Consultant",
  },
  {
    id: "instructor4",
    name: "David Okafor",
    email: "david.okafor@skillupnigeria.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Data Science Lead at Microsoft with extensive experience in machine learning and AI. PhD in Computer Science from Stanford University.",
    title: "Data Science Lead at Microsoft",
  },
  {
    id: "instructor5",
    name: "Grace Adebayo",
    email: "grace.adebayo@skillupnigeria.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Business Development Expert specializing in entrepreneurship and startup growth. Founded 3 successful tech companies in Nigeria.",
    title: "Serial Entrepreneur & Business Consultant",
  },
];

export const currentUser: User = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
};
