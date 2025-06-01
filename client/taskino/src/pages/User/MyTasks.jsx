import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskStatusTabs from "../../components/TaskST";
import TaskCard from "../../components/Cards/TaskCard";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [statusTabs, setStatusTabs] = useState([]);
  const [activeStatus, setActiveStatus] = useState("All");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: activeStatus === "All" ? "" : activeStatus,
        },
      });

      const fetchedTasks = data?.tasks || [];
      setTasks(fetchedTasks);

      const summary = data?.statusSummary || {};
      setStatusTabs([
        { label: "All", count: summary.all || 0 },
        { label: "Pending", count: summary.pendingTasks || 0 },
        { label: "In Progress", count: summary.inProgressTasks || 0 },
        { label: "Completed", count: summary.completedTasks || 0 },
      ]);
    } catch (err) {
      console.error("Failed to retrieve tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [activeStatus]);

  const handleCardClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  return (
    <DashboardLayout activeMenu="My Tasks">
      <section className="flex flex-col items-center justify-center my-6 w-full px-1 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full">
          <header className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 w-full lg:w-auto">
              Tasks Overview
            </h1>

            {statusTabs?.[0]?.count > 0 && (
              <div className="w-full sm:w-auto overflow-x-auto">
                <TaskStatusTabs
                  tabs={statusTabs}
                  activeTab={activeStatus}
                  setActiveTab={setActiveStatus}
                  className="whitespace-nowrap"
                />
              </div>
            )}
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {tasks.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 mt-10">
                No tasks found for status "{activeStatus}".
              </p>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className="w-full flex justify-center">
                  <TaskCard
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    status={task.status}
                    progress={task.progress}
                    createdAt={task.createdAt}
                    dueDate={task.dueDate}
                    assignedTo={task.assignedTo?.map(
                      (member) => member.profileImageUrl
                    )}
                    attachmentCount={task.attachments?.length || 0}
                    completedTodoCount={task.completedTodoCount || 0}
                    todoChecklist={task.todoChecklist || []}
                    onClick={() => handleCardClick(task._id)}
                  />
                </div>
              ))
            )}
          </main>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default MyTasks;
