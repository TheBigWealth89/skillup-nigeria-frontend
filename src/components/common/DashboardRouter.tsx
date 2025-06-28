
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import AdminDashboard from '@/pages/AdminDashboard';
import InstructorDashboard from '@/pages/InstructorDashboard';
import LearnerDashboard from '@/pages/LearnerDashboard';

const DashboardRouter: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'instructor':
      return <InstructorDashboard />;
    case 'learner':
      return <LearnerDashboard />;
    default:
      return <LearnerDashboard />;
  }
};

export default DashboardRouter;
