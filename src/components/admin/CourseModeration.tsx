
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, X, Edit, Eye, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CourseModeration: React.FC = () => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const pendingCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "John Smith",
      verified: true,
      submissionDate: "2024-01-15",
      thumbnail: "/placeholder.svg",
      description: "Learn advanced React patterns including hooks, context, and performance optimization.",
      category: "Web Development"
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Sarah Johnson",
      verified: false,
      submissionDate: "2024-01-14",
      thumbnail: "/placeholder.svg",
      description: "Complete guide to user interface and user experience design principles.",
      category: "Design"
    },
    {
      id: 3,
      title: "Python Data Science",
      instructor: "Mike Chen",
      verified: true,
      submissionDate: "2024-01-13",
      thumbnail: "/placeholder.svg",
      description: "Master data science with Python, pandas, and machine learning.",
      category: "Data Science"
    }
  ];

  const approvedCourses = [
    {
      id: 4,
      title: "JavaScript Fundamentals",
      instructor: "Emily Davis",
      approvalDate: "2024-01-10",
      students: 234,
      rating: 4.8,
      status: "active"
    },
    {
      id: 5,
      title: "Graphic Design Basics",
      instructor: "Alex Wilson",
      approvalDate: "2024-01-08",
      students: 156,
      rating: 4.6,
      status: "featured"
    }
  ];

  const handleApprove = (courseId: number) => {
    toast({
      title: "Course Approved",
      description: "The course has been approved and is now live.",
    });
  };

  const handleReject = (courseId: number) => {
    toast({
      title: "Course Rejected",
      description: "The course has been rejected and instructor has been notified.",
      variant: "destructive",
    });
  };

  const handleRequestChanges = (courseId: number) => {
    toast({
      title: "Changes Requested",
      description: "Feedback has been sent to the instructor.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Approved Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Courses Awaiting Review</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div>
                            <h4 className="font-semibold">{course.title}</h4>
                            <p className="text-sm text-gray-600">{course.category}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{course.instructor}</span>
                          {course.verified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {course.submissionDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedCourse(course)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{course.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="w-full h-48 rounded-md object-cover"
                                />
                                <p>{course.description}</p>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>{course.instructor}</span>
                                  </div>
                                  <Badge>{course.category}</Badge>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(course.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRequestChanges(course.id)}
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(course.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <h4 className="font-semibold">{course.title}</h4>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>⭐ {course.rating}</TableCell>
                      <TableCell>
                        <Badge variant={course.status === 'featured' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            {course.status === 'featured' ? 'Unfeature' : 'Feature'}
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            Unlist
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseModeration;