import { Course } from "@/types/course";
import { instructors } from "./userMock";

export const courses: Course[] = [
  {
    id: "course1",
    title: "Complete Web Development Bootcamp",
    description:
      "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and launch your developer career.",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    duration: "12 weeks",
    level: "beginner",
    category: "Web Development",
    price: 149.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 2847,
    learnersEnrolled: 15432,
    approved: true,
    createdBy: instructors[0],
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
    objectives: [
      "Build responsive websites with HTML, CSS, and JavaScript",
      "Create dynamic web applications with React",
      "Develop backend APIs with Node.js and Express",
      "Work with databases using MongoDB",
      "Deploy applications to production",
    ],
    prerequisites: ["Basic computer skills", "Interest in programming"],
    syllabus: [
      {
        module: "HTML & CSS Fundamentals",
        lessons: [
          "HTML Structure",
          "CSS Styling",
          "Responsive Design",
          "Flexbox & Grid",
        ],
      },
      {
        module: "JavaScript Essentials",
        lessons: [
          "Variables & Functions",
          "DOM Manipulation",
          "Async Programming",
          "ES6+ Features",
        ],
      },
      {
        module: "React Development",
        lessons: ["Components & JSX", "State & Props", "Hooks", "Context API"],
      },
      {
        module: "Backend Development",
        lessons: [
          "Node.js Basics",
          "Express Server",
          "Database Integration",
          "Authentication",
        ],
      },
    ],
  },
  {
    id: "course2",
    title: "UI/UX Design Mastery",
    description:
      "Learn user-centered design principles, create stunning interfaces, and build a professional design portfolio.",
    coverImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    duration: "8 weeks",
    level: "intermediate",
    category: "Design",
    price: 129.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewCount: 1523,
    learnersEnrolled: 8934,
    approved: true,
    createdBy: instructors[1],
    createdAt: "2024-02-01",
    updatedAt: "2024-02-15",
    objectives: [
      "Master design principles and color theory",
      "Create wireframes and prototypes",
      "Design mobile-first interfaces",
      "Conduct user research and testing",
      "Build a professional design portfolio",
    ],
    prerequisites: ["Basic computer skills", "Creative mindset"],
    syllabus: [
      {
        module: "Design Fundamentals",
        lessons: [
          "Color Theory",
          "Typography",
          "Layout Principles",
          "Visual Hierarchy",
        ],
      },
      {
        module: "User Research",
        lessons: [
          "User Personas",
          "Journey Mapping",
          "Usability Testing",
          "Analytics",
        ],
      },
      {
        module: "Design Tools",
        lessons: [
          "Figma Mastery",
          "Prototyping",
          "Design Systems",
          "Collaboration",
        ],
      },
    ],
  },
  {
    id: "course3",
    title: "Digital Marketing Fundamentals",
    description:
      "Master social media marketing, SEO, content creation, and paid advertising to grow your business online.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    duration: "6 weeks",
    level: "beginner",
    category: "Marketing",
    price: 99.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 3421,
    learnersEnrolled: 12567,
    approved: true,
    createdBy: instructors[2],
    createdAt: "2024-01-20",
    updatedAt: "2024-02-10",
    objectives: [
      "Develop effective social media strategies",
      "Optimize websites for search engines",
      "Create engaging content that converts",
      "Run successful paid advertising campaigns",
      "Analyze and improve marketing performance",
    ],
    prerequisites: ["Basic internet knowledge"],
    syllabus: [
      {
        module: "Social Media Marketing",
        lessons: [
          "Platform Strategy",
          "Content Creation",
          "Community Management",
          "Analytics",
        ],
      },
      {
        module: "Search Engine Optimization",
        lessons: [
          "Keyword Research",
          "On-Page SEO",
          "Link Building",
          "Technical SEO",
        ],
      },
      {
        module: "Paid Advertising",
        lessons: [
          "Google Ads",
          "Facebook Ads",
          "Campaign Optimization",
          "ROI Analysis",
        ],
      },
    ],
  },
  {
    id: "course4",
    title: "Data Science with Python",
    description:
      "Learn data analysis, machine learning, and AI with Python. Work with real datasets and build predictive models.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    duration: "16 weeks",
    level: "advanced",
    category: "Data Science",
    price: 199.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviewCount: 1876,
    learnersEnrolled: 5432,
    approved: true,
    createdBy: instructors[3],
    createdAt: "2024-01-10",
    updatedAt: "2024-02-25",
    objectives: [
      "Master Python for data analysis",
      "Build machine learning models",
      "Work with big data and databases",
      "Create data visualizations",
      "Deploy AI solutions to production",
    ],
    prerequisites: ["Basic programming knowledge", "Mathematics fundamentals"],
    syllabus: [
      {
        module: "Python Fundamentals",
        lessons: [
          "Python Syntax",
          "Data Structures",
          "Libraries",
          "File Handling",
        ],
      },
      {
        module: "Data Analysis",
        lessons: ["Pandas", "NumPy", "Data Cleaning", "Statistical Analysis"],
      },
      {
        module: "Machine Learning",
        lessons: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Deep Learning",
          "Model Evaluation",
        ],
      },
      {
        module: "Data Visualization",
        lessons: ["Matplotlib", "Seaborn", "Plotly", "Dashboard Creation"],
      },
    ],
  },
  {
    id: "course5",
    title: "Entrepreneurship & Business Growth",
    description:
      "Learn how to start, fund, and scale a successful business. From idea validation to exit strategies.",
    coverImage:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    duration: "10 weeks",
    level: "intermediate",
    category: "Business",
    price: 179.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 2134,
    learnersEnrolled: 7856,
    approved: true,
    createdBy: instructors[4],
    createdAt: "2024-02-05",
    updatedAt: "2024-02-18",
    objectives: [
      "Validate business ideas effectively",
      "Create comprehensive business plans",
      "Secure funding and investment",
      "Build and manage high-performing teams",
      "Scale operations for sustainable growth",
    ],
    prerequisites: ["Business interest", "Basic financial literacy"],
    syllabus: [
      {
        module: "Business Fundamentals",
        lessons: [
          "Idea Validation",
          "Market Research",
          "Business Models",
          "Competitive Analysis",
        ],
      },
      {
        module: "Funding & Finance",
        lessons: [
          "Bootstrapping",
          "Angel Investors",
          "Venture Capital",
          "Financial Planning",
        ],
      },
      {
        module: "Operations & Growth",
        lessons: [
          "Team Building",
          "Operations Management",
          "Marketing Strategy",
          "Exit Planning",
        ],
      },
    ],
  },
  {
    id: "course6",
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile applications for iOS and Android using React Native and JavaScript.",
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    duration: "14 weeks",
    level: "intermediate",
    category: "Mobile Development",
    price: 169.99,
    originalPrice: 329.99,
    rating: 4.7,
    reviewCount: 1654,
    learnersEnrolled: 6789,
    approved: true,
    createdBy: instructors[0],
    createdAt: "2024-01-25",
    updatedAt: "2024-02-12",
    objectives: [
      "Master React Native framework",
      "Build native mobile features",
      "Integrate with APIs and databases",
      "Publish apps to app stores",
      "Optimize performance and UX",
    ],
    prerequisites: ["JavaScript knowledge", "React experience preferred"],
    syllabus: [
      {
        module: "React Native Basics",
        lessons: [
          "Setup & Configuration",
          "Components",
          "Navigation",
          "Styling",
        ],
      },
      {
        module: "Native Features",
        lessons: [
          "Camera & Photos",
          "Location Services",
          "Push Notifications",
          "Device APIs",
        ],
      },
      {
        module: "Backend Integration",
        lessons: ["REST APIs", "GraphQL", "Authentication", "Data Storage"],
      },
      {
        module: "Publishing & Optimization",
        lessons: [
          "App Store Guidelines",
          "Performance Optimization",
          "Testing",
          "Analytics",
        ],
      },
    ],
  },
];

export const categories = [
  "All Categories",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
];

export const levels = ["All Levels", "beginner", "intermediate", "advanced"];
