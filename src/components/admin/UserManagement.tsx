import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Mail, UserX, Download, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import adminService from "@/services/adminService";

const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminService.getAllUsers();
        console.log(response);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          throw new Error("Invalid data format received from server");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSendWarning = (userId: number) => {
    toast({
      title: "Warning Sent",
      description: "A warning email has been sent to the user.",
    });
  };

  const handleSuspendUser = async (targetedUserId: string) => {
    try {
      const response = await adminService.suspendUser(targetedUserId);

      // Update local state
      setUsers(
        users.map((user) =>
          user.id === targetedUserId
            ? {
                ...user,
                status: response.newStatus,
                isActive: response.newStatus === "active",
              }
            : user
        )
      );

      toast({
        title: response.message,
        description: `User has been ${response.newStatus}`,
        variant: response.newStatus === "active" ? "default" : "destructive",
      });
    } catch (err) {
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const handleActivateUser = async (targetedUserId: string) => {
    try {
      const response = await adminService.activateUser(targetedUserId);
      setUsers(
        users.map((user) =>
          user.id === targetedUserId
            ? {
                ...user,
                status: response.newStatus,
                isActive: response.newStatus === "active",
              }
            : user
        )
      );
      toast({
        title: response.message || "User Activated",
        description: `User has been ${response.newStatus}`,
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to activate user",
        variant: "destructive",
      });
    }
  };

  const handleExportUsers = () => {
    toast({
      title: "Export Started",
      description: "User data is being exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="learner">Learners</SelectItem>
                <SelectItem value="instructor">Instructors</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleExportUsers} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-gray-500">
                          Last active: {user.lastActive}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "instructor" ? "default" : "secondary"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {user.name}
                                </h3>
                                <p className="text-gray-600">{user.email}</p>
                                <Badge>{user.role}</Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Join Date</p>
                                <p className="text-gray-600">{user.joinDate}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Status</p>
                                <Badge
                                  variant={
                                    user.status === "active"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </div>
                              {user.role === "learner" && (
                                <div>
                                  <p className="text-sm font-medium">
                                    Courses Enrolled
                                  </p>
                                  <p className="text-gray-600">
                                    {user.coursesEnrolled}
                                  </p>
                                </div>
                              )}
                              {user.role === "instructor" && (
                                <div>
                                  <p className="text-sm font-medium">
                                    Courses Created
                                  </p>
                                  <p className="text-gray-600">
                                    {user.coursesCreated}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendWarning(user.id)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>

                      {user.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspendUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
                      {user.status === "suspended" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActivateUser(user.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          Activate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
