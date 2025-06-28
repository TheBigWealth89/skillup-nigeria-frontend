import React from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Users,
  BookOpen,
  Flag,
  Settings,
  BarChart3,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import DashboardOverview from "@/components/admin/DashboardOverview";
import CourseModeration from "@/components/admin/CourseModeration";
import UserManagement from "@/components/admin/UserManagement";
import ReportedContent from "@/components/admin/ReportedContent";
import SystemSettings from "@/components/admin/SystemSettings";

const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = React.useState("overview");

  const sidebarItems = [
    { id: "overview", title: "Dashboard Overview", icon: BarChart3 },
    { id: "courses", title: "Course Moderation", icon: BookOpen },
    { id: "users", title: "User Management", icon: Users },
    { id: "reports", title: "Reported Content", icon: Flag },
    { id: "settings", title: "System Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview onNavigate={setActiveTab} />;
      case "courses":
        return <CourseModeration />;
      case "users":
        return <UserManagement />;
      case "reports":
        return <ReportedContent />;
      case "settings":
        return <SystemSettings />;
      default:
        return <DashboardOverview onNavigate={setActiveTab} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground dark:text-white transition-colors duration-300">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-4 py-3">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-600 dark:text-white">
                  Welcome, {user?.name}
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <div className="flex h-16 items-center gap-2 border-b bg-white px-6">
            <SidebarTrigger />
            <h2 className="text-xl font-semibold">
              {sidebarItems.find((item) => item.id === activeTab)?.title}
            </h2>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 p-6"
          >
            {renderContent()}
          </motion.div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
