import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateTaskData = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const fetchTaskDetails = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));

      if (data) {
        setCurrentTask(data);
        setTaskData({
          title: data.title,
          description: data.description,
          priority: data.priority,
          dueDate: data.dueDate ? moment(data.dueDate).format("YYYY-MM-DD") : "",
          assignedTo: data.assignedTo?.map((u) => u._id) || [],
          todoChecklist: data.todoChecklist?.map((t) => t.text) || [],
          attachments: data.attachments || [],
        });
      }
    } catch (err) {
      console.error("⚠️ Failed to fetch task details:", err);
      toast.error("Failed to load task details.");
    }
  };

  const createTask = async () => {
    setLoading(true);
    try {
     
      const todoListWithStatus = taskData.todoChecklist.map((text) => ({
        text,
        completed: false,
      }));

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoListWithStatus,
      });

      toast.success("🎉 Task created successfully!");
      resetForm();
    } catch (err) {
      console.error("❌ Error creating task:", err);
      toast.error("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      const todoListWithStatus = taskData.todoChecklist.map((text) => {
        const prevItem = currentTask?.todoChecklist?.find((t) => t.text === text);
        return {
          text,
          completed: prevItem ? prevItem.completed : false,
        };
      });

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoListWithStatus,
      });

      toast.success("✅ Task updated successfully!");
    } catch (err) {
      console.error("❌ Error updating task:", err);
      toast.error("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setError("");

    if (!taskData.title.trim()) return setError("⚠️ Title is required!");
    if (!taskData.description.trim()) return setError("⚠️ Description is required!");
    if (!taskData.dueDate) return setError("⚠️ Due date is required!");
    if (taskData.assignedTo.length === 0) return setError("⚠️ Please assign the task to at least one member!");
    if (taskData.todoChecklist.length === 0) return setError("⚠️ Add at least one todo item!");

    taskId ? updateTask() : createTask();
  };

  const handleDelete = async () => {
  try {
    await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
    toast.success("🗑️ Task deleted successfully!");
    setShowDeleteModal(false);
    navigate("/admin/tasks");
  } catch (err) {
    console.error("❌ Error deleting task:", err);
    toast.error("Failed to delete task.");
  }
};


  useEffect(() => {
    if (taskId) fetchTaskDetails();
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task"><button
  onClick={() => navigate(-1)}
  className="inline-flex items-center gap-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-100 hover:text-blue-700 px-3 py-1.5 rounded-md transition-colors shadow-sm"
>
  ← Back
</button>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mt-6 max-w-4xl mx-auto p-6 bg-orange-50 rounded-lg shadow-md border border-orange-200"
      >
        
        <motion.header
          variants={fadeIn}
          className="flex justify-between items-center mb-6"
        >
          
          <h1 className="text-2xl font-bold text-orange-700">
            {taskId ? "✏️ Update Task" : "🆕 Create Task"}
          </h1>

          {taskId && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 border border-orange-400 text-orange-600 rounded hover:bg-orange-100 transition"
            >
              <LuTrash2 size={18} />
              Delete
            </motion.button>
          )}
        </motion.header>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-5"
          variants={fadeIn}
        >
          {[
            { label: "📌 Task Title", id: "title", type: "text", value: taskData.title, onChange: (e) => updateTaskData("title", e.target.value) },
            { label: "📝 Description", id: "description", textarea: true, value: taskData.description, onChange: (e) => updateTaskData("description", e.target.value) },
          ].map((field, index) => (
            <motion.div key={field.id} custom={index} variants={fadeIn}>
              <label className="block mb-1 font-semibold text-orange-700" htmlFor={field.id}>
                {field.label}
              </label>
              {field.textarea ? (
                <textarea
                  id={field.id}
                  rows={4}
                  className="w-full bg-white border border-orange-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={field.value}
                  onChange={field.onChange}
                />
              ) : (
                <input
                  id={field.id}
                  type={field.type}
                  className="w-full bg-white border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            </motion.div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeIn}>
              <label className="block mb-1 font-semibold text-orange-700">🎯 Priority</label>
              <SelectDropdown
                options={PRIORITY_DATA}
                value={taskData.priority}
                onChange={(val) => updateTaskData("priority", val)}
                placeholder="Select Priority"
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <label className="block mb-1 font-semibold text-orange-700" htmlFor="dueDate">
                ⏳ Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                className="w-full bg-white border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={taskData.dueDate}
                onChange={(e) => updateTaskData("dueDate", e.target.value)}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <label className="block mb-1 font-semibold text-orange-700">👥 Assign To</label>
              <SelectUsers
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(val) => updateTaskData("assignedTo", val)}
              />
            </motion.div>
          </div>

          <motion.div variants={fadeIn}>
            <label className="block mb-1 font-semibold text-orange-700">✅ TODO Checklist</label>
            <TodoListInput
              todoList={taskData.todoChecklist}
              setTodoList={(val) => updateTaskData("todoChecklist", val)}
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <label className="block mb-1 font-semibold text-orange-700">📎 Add Attachments</label>
            <AddAttachmentsInput
              attachments={taskData.attachments}
              setAttachments={(val) => updateTaskData("attachments", val)}
            />
          </motion.div>

          {error && (
            <motion.p variants={fadeIn} className="text-sm text-red-600 font-semibold mt-2">
              {error}
            </motion.p>
          )}

          <motion.div className="flex justify-end" variants={fadeIn}>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-2 px-6 rounded shadow transition"
            >
              {loading ? (taskId ? "Updating..." : "Creating...") : taskId ? "Update Task ✍️" : "Create Task 🚀"}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.section>

      {showDeleteModal && (
        <DeleteAlert
          title="Are you sure?"
          description="This will permanently delete the task."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </DashboardLayout>
  );
};

export default CreateTask;
