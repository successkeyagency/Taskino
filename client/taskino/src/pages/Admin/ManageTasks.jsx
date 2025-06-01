import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TaskStatusTabs from "../../components/TaskST";
import TaskCard from "../../components/Cards/TaskCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import { toast } from "react-toastify";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: { status: filterStatus === "All" ? "" : filterStatus },
      });

      setTasks(data?.tasks || []);

      const summary = data?.statusSummary || {};
      setTabs([
        { label: "All", count: summary.all || 0 },
        { label: "Pending", count: summary.pendingTasks || 0 },
        { label: "In Progress", count: summary.inProgressTasks || 0 },
        { label: "Completed", count: summary.completedTasks || 0 },
      ]);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to load tasks, please try again.");
    }
  };

  const downloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Report download failed:", error);
      toast.error("Failed to download report. Please try again.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filterStatus]);

  const onTaskClick = (task) => {
    navigate(`/admin/create-task`, { state: { taskId: task._id } });
  };

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-6">
        <header className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-900">All Tasks</h2>

            <button
              onClick={downloadReport}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <LuFileSpreadsheet size={18} />
              <span>Download Report</span>
            </button>
          </div>

          {tabs?.[0]?.count > 0 && (
            <div className="w-full sm:w-auto overflow-x-auto -mx-4 px-4">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />

              <button
                onClick={downloadReport}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-orange-300 text-white rounded-md hover:bg-amber-500 transition"
              >
                <LuFileSpreadsheet size={20} />
                <span>Download Report</span>
              </button>
            </div>
          )}
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                progress={task.progress}
                createdAt={task.createdAt}
                dueDate={task.dueDate}
                assignedTo={task.assignedTo?.map((u) => u.profileImageUrl)}
                attachmentCount={task.attachments?.length || 0}
                completedTodoCount={task.completedTodoCount || 0}
                todoChecklist={task.todoChecklist || []}
                onClick={() => onTaskClick(task)}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No tasks found.</p>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
