import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Course } from "@/types/course";

import {
  enrollInCourse,
  isUserEnrolled,
  getUserEnrollmentProgress,
} from "@/utils/enrollmentUtils";
import { useToast } from "@/hooks/use-toast";
import { courses } from "@/mock/courseMock";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  Play,
  Award,
  Target,
  User,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function CourseDetailPage() {
  const { toast } = useToast();
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (courseId) {
      const foundCourse = courses.find((c) => c._id === courseId);
      setCourse(foundCourse || null);
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Course Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const isEnrolled = isUserEnrolled(course.id);
  const progress = getUserEnrollmentProgress(course.id);

  const handleEnroll = async () => {
    setIsEnrolling(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = enrollInCourse(course);

    if (result.success) {
      toast({
        title: "Enrollment Successful! 🎉",
        description: result.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Already Enrolled",
        description: result.message,
        variant: "destructive",
      });
    }

    setIsEnrolling(false);
  };

  const levelColors = {
    beginner:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Courses</span>
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  SkillUp Nigeria
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {course.title}
          </h1>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="relative">
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 space-x-2">
              <Badge className={levelColors[course.level]} variant="secondary">
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </Badge>
              <Badge variant="secondary">{course.category}</Badge>
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-muted-foreground">
                ({course.reviewCount})
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{course.learnersEnrolled.toLocaleString()} students</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{course.syllabus.length} modules</span>
            </div>
          </div>

          {/* Progress for enrolled users */}
          {isEnrolled && (
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Your Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              {progress === 100 && (
                <div className="flex items-center space-x-2 mt-2 text-green-600">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Course Completed! Certificate Available
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Enroll Button */}
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  Ready to start learning?
                </h3>
                <p className="text-muted-foreground">
                  Join thousands of students already enrolled in this course
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleEnroll}
                disabled={isEnrolling || isEnrolled}
                className="min-w-[160px]"
              >
                {isEnrolling ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Enrolling...</span>
                  </div>
                ) : isEnrolled ? (
                  <div
                    className="flex items-center space-x-2"
                    onClick={() => navigate(`/course/${courseId}/learn`)}
                  >
                    <Play className="h-4 w-4" />
                    <span>Continue Learning</span>
                  </div>
                ) : (
                  "Enroll for Free"
                )}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About This Course</h3>
            <p className="text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Learning Objectives */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>What You'll Learn</span>
            </h3>
            <div className="space-y-2">
              {course.objectives.map((objective, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{objective}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
              <div className="space-y-2">
                {course.prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {prerequisite}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Syllabus */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Course Syllabus</h3>
            <div className="space-y-3">
              {course.syllabus.map((module, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">
                    Module {index + 1}: {module.module}
                  </h4>
                  <div className="space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                      >
                        <Play className="h-3 w-3" />
                        <span>{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Instructor */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>About the Instructor</span>
            </h3>
            <div className="flex items-start space-x-4">
              <img
                src={course.createdBy.avatar}
                alt={course.createdBy.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-lg">{course.createdBy.name}</h4>
                {course.createdBy.title && (
                  <p className="text-sm text-primary mb-2">
                    {course.createdBy.title}
                  </p>
                )}
                {course.createdBy.bio && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {course.createdBy.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
