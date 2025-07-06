import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Mail, Shield, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import adminService from "@/services/adminService";

const SystemSettings: React.FC = () => {
  const { toast } = useToast();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowInstructorSignup, setAllowInstructorSignup] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] =
    useState(true);
  const [autoApproveInstructors, setAutoApproveInstructors] = useState(false);

  // Add user state for stats
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminService.getAllUsers();
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          throw new Error("Invalid data format received from server");
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Maintenance Mode</Label>
              <p className="text-sm text-gray-600">
                Enable maintenance mode to prevent user access during updates
              </p>
            </div>
            <Switch
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Allow Instructor Signup</Label>
              <p className="text-sm text-gray-600">
                Allow new users to register as instructors
              </p>
            </div>
            <Switch
              checked={allowInstructorSignup}
              onCheckedChange={setAllowInstructorSignup}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Require Email Verification</Label>
              <p className="text-sm text-gray-600">
                Users must verify their email before accessing the platform
              </p>
            </div>
            <Switch
              checked={requireEmailVerification}
              onCheckedChange={setRequireEmailVerification}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Auto-approve Instructors</Label>
              <p className="text-sm text-gray-600">
                Automatically approve instructor applications without manual
                review
              </p>
            </div>
            <Switch
              checked={autoApproveInstructors}
              onCheckedChange={setAutoApproveInstructors}
            />
          </div>

          <Button onClick={handleSaveSettings} className="w-full">
            Save System Settings
          </Button>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Template Type</Label>
            <Select defaultValue="course-approval">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course-approval">Course Approval</SelectItem>
                <SelectItem value="course-rejection">
                  Course Rejection
                </SelectItem>
                <SelectItem value="user-warning">User Warning</SelectItem>
                <SelectItem value="welcome">Welcome Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Subject Line</Label>
            <Input
              placeholder="Enter email subject..."
              defaultValue="Your course has been approved!"
            />
          </div>

          <div className="space-y-2">
            <Label>Email Content</Label>
            <Textarea
              placeholder="Enter email template content..."
              rows={8}
              defaultValue="Dear {instructor_name},

Congratulations! Your course '{course_title}' has been approved and is now live on our platform.

You can view your course at: {course_url}

Best regards,
The SkillUp Team"
            />
          </div>

          <Button>Save Template</Button>
        </CardContent>
      </Card>

      {/* User Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            User Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Learner Permissions</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Can comment on courses</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can rate courses</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can message instructors</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Instructor Permissions</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Can create courses</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can edit published courses</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can respond to comments</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>

          <Button>Update Permissions</Button>
        </CardContent>
      </Card>

      {/* Platform Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Platform Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {loading ? "..." : error ? "-" : users.length}
              </p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {loading
                  ? "..."
                  : error
                  ? "-"
                  : users.filter((u) => u.status === "active").length}
              </p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">4</p>
              <p className="text-sm text-gray-600">Instructors</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">₦1K</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
