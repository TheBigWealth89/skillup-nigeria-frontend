import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Course } from "@/types/course";
import { courses } from "@/mock/courseMock";
import { currentUser } from "@/mock/userMock";
import { markLessonComplete, isLessonCompleted } from "@/utils/enrollmentUtils";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Maximize,
  CheckCircle,
  Lock,
  BookOpen,
  Clock,
  Award,
  Download,
  MessageSquare,
  ThumbsUp,
  Share,
  Settings,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface LessonContent {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  resources: { name: string; url: string; type: string }[];
  notes?: string;
}

interface ModuleWithLessons {
  module: string;
  lessons: LessonContent[];
}

export function CourseLearningPage() {
  const { toast } = useToast();
  const { courseId, moduleIndex, lessonIndex } = useParams<{
    courseId: string;
    moduleIndex: string;
    lessonIndex: string;
  }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [course, setCourse] = useState<Course | null>(null);
  const [courseModules, setCourseModules] = useState<ModuleWithLessons[]>([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if (courseId) {
      const foundCourse = courses.find((c) => c.id === courseId);
      setCourse(foundCourse || null);

      if (foundCourse) {
        // Generate detailed lesson content from course syllabus
        const detailedModules: ModuleWithLessons[] = foundCourse.syllabus.map(
          (module, moduleIdx) => ({
            module: module.module,
            lessons: module.lessons.map((lesson, lessonIdx) => ({
              id: `${courseId}-${moduleIdx}-${lessonIdx}`,
              title: lesson,
              duration: `${Math.floor(Math.random() * 20) + 5} min`,
              videoUrl: `https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4`, // Placeholder
              description: `Learn about ${lesson.toLowerCase()} in this comprehensive lesson. We'll cover practical examples and real-world applications.`,
              resources: [
                { name: "Lesson Notes", url: "#", type: "PDF" },
                { name: "Code Examples", url: "#", type: "ZIP" },
                { name: "Additional Reading", url: "#", type: "Link" },
              ],
              notes: `Notes for ${lesson}:\n\n• Key concepts covered\n• Important takeaways\n• Practice exercises\n• Additional resources`,
            })),
          })
        );
        setCourseModules(detailedModules);

        // Set current lesson from URL params
        const modIdx = moduleIndex ? parseInt(moduleIndex) : 0;
        const lessIdx = lessonIndex ? parseInt(lessonIndex) : 0;
        setCurrentModuleIndex(modIdx);
        setCurrentLessonIndex(lessIdx);
      }
    }
  }, [courseId, moduleIndex, lessonIndex]);

  const currentLesson =
    courseModules[currentModuleIndex]?.lessons[currentLessonIndex];
  const totalLessons = courseModules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );
  const completedLessons = courseModules.reduce(
    (total, module) =>
      total +
      module.lessons.filter((lesson) =>
        isLessonCompleted(currentUser.id, lesson.id)
      ).length,
    0
  );
  const overallProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);

      // Auto-mark lesson as complete when 90% watched
      if (
        videoRef.current.currentTime / videoRef.current.duration > 0.9 &&
        !isLessonCompleted(currentUser.id, currentLesson?.id || "")
      ) {
        markLessonComplete(currentUser.id, currentLesson?.id || "");
        toast({
          title: "Lesson Completed! 🎉",
          description: "Great job! Ready for the next lesson?",
        });
      }
    }
  };

  const handleLessonComplete = () => {
    if (currentLesson) {
      markLessonComplete(currentUser.id, currentLesson.id);
      toast({
        title: "Lesson Marked Complete! ✅",
        description: "Moving to next lesson...",
      });
      setTimeout(() => navigateToNextLesson(), 1000);
    }
  };

  const navigateToLesson = (moduleIdx: number, lessonIdx: number) => {
    navigate(`/course/${courseId}/learn/${moduleIdx}/${lessonIdx}`);
  };

  const navigateToNextLesson = () => {
    const nextLessonIndex = currentLessonIndex + 1;
    if (nextLessonIndex < courseModules[currentModuleIndex].lessons.length) {
      navigateToLesson(currentModuleIndex, nextLessonIndex);
    } else {
      const nextModuleIndex = currentModuleIndex + 1;
      if (nextModuleIndex < courseModules.length) {
        navigateToLesson(nextModuleIndex, 0);
      } else {
        toast({
          title: "Course Completed! 🎊",
          description: "Congratulations! You've finished the entire course.",
        });
      }
    }
  };

  const navigateToPreviousLesson = () => {
    const prevLessonIndex = currentLessonIndex - 1;
    if (prevLessonIndex >= 0) {
      navigateToLesson(currentModuleIndex, prevLessonIndex);
    } else {
      const prevModuleIndex = currentModuleIndex - 1;
      if (prevModuleIndex >= 0) {
        const prevModuleLessons = courseModules[prevModuleIndex].lessons.length;
        navigateToLesson(prevModuleIndex, prevModuleLessons - 1);
      }
    }
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Loading Course...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/course/${courseId}`)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Course Overview</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="font-medium text-sm">{course.title}</h1>
                <p className="text-xs text-muted-foreground">
                  {currentLesson.title}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-xs text-muted-foreground">
                {completedLessons} / {totalLessons} lessons
              </div>
              <Progress value={overallProgress} className="w-20 h-2" />
              <Badge variant="secondary">{overallProgress}%</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Course Content */}
        <div className="w-80 border-r bg-card/30 h-[calc(100vh-73px)] sticky top-[73px]">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Course Content</h3>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {courseModules.map((module, moduleIdx) => (
                  <div key={moduleIdx}>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-sm">{module.module}</h4>
                      <Badge variant="outline" className="text-xs">
                        {
                          module.lessons.filter((lesson) =>
                            isLessonCompleted(currentUser.id, lesson.id)
                          ).length
                        }{" "}
                        / {module.lessons.length}
                      </Badge>
                    </div>

                    <div className="mt-2 space-y-1">
                      {module.lessons.map((lesson, lessonIdx) => {
                        const isCompleted = isLessonCompleted(
                          currentUser.id,
                          lesson.id
                        );
                        const isCurrent =
                          moduleIdx === currentModuleIndex &&
                          lessonIdx === currentLessonIndex;
                        const isAccessible =
                          moduleIdx === 0 ||
                          moduleIdx <= currentModuleIndex ||
                          isCompleted;

                        return (
                          <button
                            key={lessonIdx}
                            onClick={() =>
                              isAccessible
                                ? navigateToLesson(moduleIdx, lessonIdx)
                                : null
                            }
                            disabled={!isAccessible}
                            className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                              isCurrent
                                ? "bg-primary text-primary-foreground"
                                : isAccessible
                                ? "hover:bg-muted/80"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : isAccessible ? (
                                <Play className="h-4 w-4" />
                              ) : (
                                <Lock className="h-4 w-4" />
                              )}
                              <div className="flex-1">
                                <div className="font-medium">
                                  {lesson.title}
                                </div>
                                <div className="flex items-center space-x-2 text-xs opacity-70">
                                  <Clock className="h-3 w-3" />
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="p-6">
            {/* Video Player */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full aspect-video"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() =>
                      setDuration(videoRef.current?.duration || 0)
                    }
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={currentLesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>

                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max={duration}
                          value={currentTime}
                          onChange={(e) => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = Number(
                                e.target.value
                              );
                            }
                          }}
                          className="w-full"
                        />
                      </div>

                      <div className="text-white text-sm">
                        {Math.floor(currentTime / 60)}:
                        {Math.floor(currentTime % 60)
                          .toString()
                          .padStart(2, "0")}{" "}
                        / {Math.floor(duration / 60)}:
                        {Math.floor(duration % 60)
                          .toString()
                          .padStart(2, "0")}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Info and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    {currentLesson.title}
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    {currentLesson.description}
                  </p>

                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={handleLessonComplete}
                      disabled={isLessonCompleted(
                        currentUser.id,
                        currentLesson.id
                      )}
                    >
                      {isLessonCompleted(currentUser.id, currentLesson.id) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        "Mark Complete"
                      )}
                    </Button>
                    <Button variant="outline">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Discuss
                    </Button>
                  </div>
                </div>

                {/* Lesson Resources */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Resources
                    </h3>
                    <div className="space-y-2">
                      {currentLesson.resources.map((resource, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg border"
                        >
                          <div className="flex items-center space-x-3">
                            <Badge variant="secondary">{resource.type}</Badge>
                            <span className="text-sm">{resource.name}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notes Section */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Notes</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowNotes(!showNotes)}
                      >
                        {showNotes ? "Hide" : "Show"}
                      </Button>
                    </div>
                    {showNotes && (
                      <div className="text-sm text-muted-foreground whitespace-pre-line">
                        {currentLesson.notes}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Navigation Panel */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Navigation</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={navigateToPreviousLesson}
                        disabled={
                          currentModuleIndex === 0 && currentLessonIndex === 0
                        }
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous Lesson
                      </Button>
                      <Button
                        className="w-full justify-start"
                        onClick={navigateToNextLesson}
                      >
                        Next Lesson
                        <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Progress</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Progress</span>
                          <span>{overallProgress}%</span>
                        </div>
                        <Progress value={overallProgress} className="h-2" />
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Completed Lessons</span>
                          <span>
                            {completedLessons} / {totalLessons}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Time Invested</span>
                          <span>{Math.floor(completedLessons * 8)} min</span>
                        </div>
                      </div>

                      {overallProgress === 100 && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                          <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
                          <div className="text-sm font-medium text-green-800 dark:text-green-200">
                            Course Complete!
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-300">
                            Certificate Available
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
