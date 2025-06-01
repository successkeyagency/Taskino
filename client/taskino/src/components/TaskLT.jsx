import React from 'react';
import moment from 'moment';

const TaskLT = ({ tableData }) => {
  const getBadgeClasses = (type, value) => {
    const styles = {
      status: {
        Completed: 'bg-green-50 text-green-600 border-green-200',
        Pending: 'bg-violet-50 text-violet-600 border-violet-200',
        'In Progress': 'bg-blue-50 text-blue-600 border-blue-200',
      },
      priority: {
        High: 'bg-red-50 text-red-600 border-red-200',
        Medium: 'bg-yellow-50 text-yellow-600 border-yellow-200',
        Low: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      },
    };

    return (
      'px-2 py-1 text-xs font-medium rounded border ' +
      (styles[type][value] || 'bg-gray-50 text-gray-500 border-gray-200')
    );
  };

  return (
    <div className="mt-6 space-y-4">
      {/* Desktop View */}
      <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-700 text-left">
              <th className="px-5 py-3 font-semibold">Task</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Priority</th>
              <th className="px-5 py-3 font-semibold">Created</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            ) : (
              tableData.map((task) => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-50 transition-all border-b last:border-none"
                >
                  <td className="px-5 py-4 text-gray-800 font-medium truncate max-w-[250px]">
                    {task.title}
                  </td>
                  <td className="px-5 py-4">
                    <span className={getBadgeClasses('status', task.status)}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={getBadgeClasses('priority', task.priority)}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {task.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-3">
        {tableData.length === 0 ? (
          <div className="text-center text-gray-500 py-6 bg-white rounded-lg shadow-sm">
            No tasks found.
          </div>
        ) : (
          tableData.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            >
              <div className="text-sm font-semibold text-gray-800 mb-1 truncate">
                {task.title}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span className={getBadgeClasses('status', task.status)}>
                  {task.status}
                </span>
                <span className={getBadgeClasses('priority', task.priority)}>
                  {task.priority}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {task.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskLT;
