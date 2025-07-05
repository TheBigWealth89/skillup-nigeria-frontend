import React from "react";
import { CourseCard } from "@/components/common/courseCard";
import { courses } from "@/mock/courseMock";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, Award, BookOpen } from "lucide-react";
function Home() {
  const navigate = useNavigate();

  const handleViewDetails = (course) => {
    navigate(`/course/${course.id}`);
  };

  const stats = [
    { icon: BookOpen, label: "Courses", value: "50+" },
    { icon: Users, label: "Students", value: "10,000+" },
    { icon: GraduationCap, label: "Instructors", value: "25+" },
    { icon: Award, label: "Certificates", value: "5,000+" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Learn In-Demand Skills
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners advancing their careers with our
            comprehensive courses taught by industry experts.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 mb-16">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
