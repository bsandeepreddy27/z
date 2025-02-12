import React, { useState } from 'react';
import { PlusCircle, Filter } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

const Tasks = () => {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Implement user authentication',
      status: 'in-progress',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2024-03-25',
    },
    {
      id: 2,
      title: 'Design dashboard layout',
      status: 'done',
      priority: 'medium',
      assignee: 'Jane Smith',
      dueDate: '2024-03-20',
    },
    {
      id: 3,
      title: 'API integration',
      status: 'todo',
      priority: 'high',
      assignee: 'Mike Johnson',
      dueDate: '2024-03-28',
    },
  ]);

  const getStatusColor = (status: Task['status']) => {
    const colors = {
      todo: 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      review: 'bg-blue-100 text-blue-800',
      done: 'bg-green-100 text-green-800',
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-red-100 text-red-800',
    };
    return colors[priority];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <PlusCircle className="h-5 w-5 mr-2" />
            New Task
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {task.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{task.assignee}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{task.dueDate}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;