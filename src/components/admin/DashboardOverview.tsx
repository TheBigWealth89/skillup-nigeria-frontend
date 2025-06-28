
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Flag, Activity, TrendingUp, AlertTriangle } from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate: (tab: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,547',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '+5',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Reported Content',
      value: '8',
      change: '-2',
      icon: Flag,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Active Courses',
      value: '127',
      change: '+8%',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  const quickActions = [
    {
      title: 'Approve Courses',
      description: 'Review pending course submissions',
      action: () => onNavigate('courses'),
      icon: BookOpen,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      action: () => onNavigate('users'),
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'View Reports',
      description: 'Handle reported content and issues',
      action: () => onNavigate('reports'),
      icon: Flag,
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  const recentActivity = [
    { action: 'Course "Web Development Basics" approved', time: '2 hours ago', type: 'approval' },
    { action: 'User john.doe@email.com suspended', time: '4 hours ago', type: 'user' },
    { action: 'Content reported: "Spam in comments"', time: '6 hours ago', type: 'report' },
    { action: 'New instructor verification: Sarah Wilson', time: '1 day ago', type: 'verification' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={action.action}
                  className={`w-full h-auto p-6 ${action.color} text-white`}
                  variant="default"
                >
                  <div className="flex flex-col items-center text-center">
                    <action.icon className="h-8 w-8 mb-3" />
                    <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'approval' ? 'bg-green-500' :
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'report' ? 'bg-red-500' :
                    'bg-orange-500'
                  }`} />
                  <span className="text-gray-900">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
