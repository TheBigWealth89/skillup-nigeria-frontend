import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Star,
  PlayCircle,
  CheckCircle,
  Target,
} from "lucide-react";

const LearnerDashboard: React.FC = () => {
  const stats = [
    {
      title: "Enrolled Courses",
      value: "5",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Completed",
      value: "1",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Certificates",
      value: "0",
      icon: Award,
      color: "text-purple-600",
    },
    {
      title: "Study Hours",
      value: "10",
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  const enrolledCourses = [
    {
      title: "Digital Marketing Mastery",
      instructor: "Mr. Okonkwo",
      progress: 75,
      nextLesson: "Email Marketing Strategies",
      totalLessons: 20,
      completedLessons: 15,
    },
    {
      title: "Web Development Fundamentals",
      instructor: "Ms. Okoro",
      progress: 45,
      nextLesson: "JavaScript Basics",
      totalLessons: 25,
      completedLessons: 11,
    },
    {
      title: "Fashion Design & Tailoring",
      instructor: "Mrs. Adebayo",
      progress: 30,
      nextLesson: "Pattern Making",
      totalLessons: 18,
      completedLessons: 5,
    },
  ];

  const achievements = [
    {
      title: "First Course Completed",
      description: "Completed your first course",
      icon: "🎯",
    },
    {
      title: "Quick Learner",
      description: "Finished 3 lessons in one day",
      icon: "⚡",
    },
    {
      title: "Certificate Earned",
      description: "Earned Digital Marketing certificate",
      icon: "🏆",
    },
    {
      title: "Consistent Student",
      description: "7-day learning streak",
      icon: "🔥",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark:text-white p-6 transition-colors duration-300">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Learning Dashboard
          </h1>
          <p className="text-gray-600 dark:text-white">
            Track your progress and continue your learning journey
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Courses */}
          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-blue-600" />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {enrolledCourses.map((course, index) => (
                    <motion.div
                      key={course.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, ease: "easeOut" }}
                      className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          {course.title}
                        </h4>
                        <span className="text-sm text-gray-600">
                          {course.progress}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        by {course.instructor}
                      </p>

                      <div className="space-y-3">
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>
                            {course.completedLessons}/{course.totalLessons}{" "}
                            lessons
                          </span>
                          <span>Next: {course.nextLesson}</span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button size="sm" className="w-full">
                            Continue Learning
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, ease: "easeOut" }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-2xl"
                      >
                        {achievement.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {achievement.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="mt-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" className="w-full">
                    View All Achievements
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LearnerDashboard;
