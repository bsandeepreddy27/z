import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ClipboardList, Users, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Tasks', value: '12', icon: ClipboardList },
    { label: 'Team Members', value: '5', icon: Users },
    { label: 'Due This Week', value: '4', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Guest'}!
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <Icon className="h-12 w-12 text-blue-500 opacity-75" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Website Redesign</p>
              <p className="text-sm text-gray-500">Updated 2 hours ago</p>
            </div>
            <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
              In Progress
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">API Integration</p>
              <p className="text-sm text-gray-500">Updated 5 hours ago</p>
            </div>
            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
              Completed
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Mobile App Testing</p>
              <p className="text-sm text-gray-500">Updated 1 day ago</p>
            </div>
            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
              Review
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;