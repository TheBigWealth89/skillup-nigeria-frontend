
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Flag, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportedContent: React.FC = () => {
  const { toast } = useToast();

  const reportedContent = [
    {
      id: 1,
      type: "course",
      title: "Inappropriate Course Title",
      reporter: "john.doe@email.com",
      reason: "Inappropriate content",
      reportDate: "2024-01-15",
      status: "pending",
      description: "Course contains misleading information and inappropriate language."
    },
    {
      id: 2,
      type: "comment",
      title: "Spam Comment on 'React Basics'",
      reporter: "sarah.wilson@email.com",
      reason: "Spam",
      reportDate: "2024-01-14",
      status: "pending",
      description: "User posting promotional links in course comments repeatedly."
    },
    {
      id: 3,
      type: "user",
      title: "Fake Instructor Profile",
      reporter: "mike.johnson@email.com",
      reason: "Fake credentials",
      reportDate: "2024-01-13",
      status: "resolved",
      description: "User claiming fake certifications and experience."
    },
    {
      id: 4,
      type: "course",
      title: "Copyright Violation",
      reporter: "emily.chen@email.com",
      reason: "Copyright infringement",
      reportDate: "2024-01-12",
      status: "pending",
      description: "Course content appears to be copied from another platform."
    }
  ];

  const handleDismiss = (reportId: number) => {
    toast({
      title: "Report Dismissed",
      description: "The report has been dismissed and marked as resolved.",
    });
  };

  const handleDeleteContent = (reportId: number) => {
    toast({
      title: "Content Deleted",
      description: "The reported content has been removed from the platform.",
      variant: "destructive",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return '📚';
      case 'comment':
        return '💬';
      case 'user':
        return '👤';
      default:
        return '🚨';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'pending' ? 'destructive' : 'secondary';
  };

  const getReasonColor = (reason: string) => {
    switch (reason.toLowerCase()) {
      case 'spam':
        return 'bg-orange-100 text-orange-800';
      case 'inappropriate content':
        return 'bg-red-100 text-red-800';
      case 'copyright infringement':
        return 'bg-purple-100 text-purple-800';
      case 'fake credentials':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Reported Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportedContent.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(report.type)}</span>
                      <div>
                        <h4 className="font-semibold">{report.title}</h4>
                        <p className="text-sm text-gray-600 max-w-md">{report.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReasonColor(report.reason)}`}>
                      {report.reason}
                    </span>
                  </TableCell>
                  <TableCell>{report.reportDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {report.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDismiss(report.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Dismiss
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteContent(report.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    )}
                    {report.status === 'resolved' && (
                      <span className="text-sm text-gray-500">Resolved</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Flag className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-red-600">4</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">📅</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportedContent;
