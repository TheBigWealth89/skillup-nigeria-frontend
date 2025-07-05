import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Course } from "@/types/course";
import {
  enrollInCourse,
  isUserEnrolled,
  getUserEnrollmentProgress,
} from "@/utils/enrollmentUtils";
import { useToast } from "@/hooks/use-toast";
import { Clock, Users, Star, BookOpen, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: Course;
  onViewDetails: (course: Course) => void;
}

export function CourseCard({ course, onViewDetails }: CourseCardProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const isEnrolled = isUserEnrolled(course.id);
  const progress = getUserEnrollmentProgress(course.id);

  const handleEnroll = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleCardClick = () => {
    onViewDetails(course);
  };

  const levelColors = {
    beginner:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <Card className="group cursor-pointer overflow-hidden border border-border/50 bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden" onClick={handleCardClick}>
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge className={levelColors[course.level]} variant="secondary">
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {course.category}
          </Badge>
        </div>
        {isEnrolled && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-black/70 rounded-lg p-2">
              <div className="flex items-center justify-between text-white text-xs mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1" />
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4" onClick={handleCardClick}>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({course.reviewCount.toLocaleString()})
            </span>
          </div>

          <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{course.estimatedDuration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{course.learnersEnrolled.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>{course.syllabus.length} modules</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <img
              src={course.createdBy.avatar}
              alt={course.createdBy.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-muted-foreground">
              {course.createdBy.name}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-x-2">
        <Button variant="outline" className="flex-1" onClick={handleCardClick}>
          More Info
        </Button>
        <Button
          className="flex-1"
          onClick={
            isEnrolled ? () => navigate("/course/course2/learn") : handleEnroll
          }
          disabled={isEnrolling || (isEnrolled && false)}
        >
          {isEnrolling ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Enrolling...</span>
            </div>
          ) : isEnrolled ? (
            <div className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Continue</span>
            </div>
          ) : (
            "Enroll Now"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
