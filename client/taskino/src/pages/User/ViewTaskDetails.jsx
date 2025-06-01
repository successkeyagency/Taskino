import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AvatarGroup from "../../components/AvatarGroup";
import moment from "moment";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);

  const fetchTaskById = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      setTaskData(data);
    } catch (err) {
      console.error("Failed to fetch task:", err);
    }
  };

  const toggleChecklist = async (i) => {
    if (!taskData?.todoChecklist) return;

    const updatedChecklist = [...taskData.todoChecklist];
    updatedChecklist[i].completed = !updatedChecklist[i].completed;

    try {
      const res = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        { todoChecklist: updatedChecklist }
      );

      if (res?.status === 200 && res.data?.task) {
        setTaskData(res.data.task);
      }
    } catch (err) {
      console.error("Checklist update failed:", err);
    }
  };

  const openExternalLink = (url) => {
    const formatted = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    window.open(formatted, "_blank");
  };

  const tagStyle = (status) => {
    const base = "rounded px-3 py-1 text-xs font-semibold border";
    if (status === "Completed") return `${base} text-green-600 bg-green-50 border-green-200`;
    if (status === "In Progress") return `${base} text-blue-500 bg-blue-50 border-blue-200`;
    return `${base} text-purple-600 bg-purple-50 border-purple-200`;
  };

  useEffect(() => {
    if (id) fetchTaskById();
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <section className="mt-15 px-2 md:px-4">
        {taskData && (
          <div className="bg-white shadow-sm rounded-lg p-5 space-y-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                
                <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                  {taskData.title}
                </h1>
              </div>
              <span className={tagStyle(taskData.status)}>{taskData.status}</span>
            </div>

            <div>
              <Detail label="Description" content={taskData.description} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Detail label="Priority" content={taskData.priority} />
              <Detail
                label="Due Date"
                content={
                  taskData.dueDate
                    ? moment(taskData.dueDate).format("MMM Do, YYYY")
                    : "No due date"
                }
              />
              <div>
                <Label text="Assigned To" />
                <AvatarGroup
                  avatars={taskData?.assignedTo?.map((user) => user?.profileImageUrl)}
                  maxVisible={4}
                />
              </div>
            </div>

            <div>
              <Label text="Checklist" />
              <div className="space-y-2">
                {taskData?.todoChecklist?.map((todo, idx) => (
                  <ChecklistItem
                    key={idx}
                    text={todo.text}
                    checked={todo.completed}
                    onToggle={() => toggleChecklist(idx)}
                  />
                ))}
              </div>
            </div><button
  onClick={() => navigate(-1)}
  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 px-3 py-1.5 rounded-md transition-colors shadow-sm"
>
  ← Back
</button>


            {taskData?.attachments?.length > 0 && (
              <div>
                <Label text="Attachments" />
                <div className="space-y-2">
                  {taskData.attachments.map((file, i) => (
                    <AttachmentCard
                      key={i}
                      index={i}
                      link={file}
                      onClick={() => openExternalLink(file)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const Detail = ({ label, content }) => (
  <div>
    <Label text={label} />
    <p className="text-sm text-gray-700">{content}</p>
  </div>
);

const Label = ({ text }) => (
  <label className="block text-xs font-medium text-gray-500 mb-1">
    {text}
  </label>
);

const ChecklistItem = ({ text, checked, onToggle }) => (
  <div className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={checked}
      onChange={onToggle}
      className="accent-blue-600 w-4 h-4"
    />
    <span className={`text-sm ${checked ? "line-through text-gray-400" : "text-gray-800"}`}>
      {text}
    </span>
  </div>
);

const AttachmentCard = ({ link, index, onClick }) => (
  <div
    className="flex justify-between items-center bg-gray-50 border border-gray-200 p-2 rounded cursor-pointer hover:bg-gray-100 transition"
    onClick={onClick}
  >
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-gray-400">
        {index + 1 < 10 ? `0${index + 1}` : index + 1}.
      </span>
      <p className="text-sm text-blue-600 truncate max-w-xs">{link}</p>
    </div>
    <LuSquareArrowOutUpRight className="text-gray-500" size={16} />
  </div>
);
