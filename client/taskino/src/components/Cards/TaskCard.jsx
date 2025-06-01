import React from "react";
import Progress from "../Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getBadge = (label, color) => (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${color}`}>
      {label}
    </span>
  );

  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col justify-between rounded-xl bg-white shadow-md hover:shadow-xl border border-gray-200 p-5 transition-all duration-200 w-full"
    >
      <div className="mb-4">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words">
            {title}
          </h3>
          <div className="flex gap-2 shrink-0">
            {getBadge(
              status,
              {
                "In Progress": "bg-cyan-100 text-cyan-700",
                Completed: "bg-green-100 text-green-700",
                Pending: "bg-yellow-100 text-yellow-700",
              }[status] || "bg-violet-100 text-violet-700"
            )}
            {getBadge(
              `${priority}`,
              {
                High: "bg-red-100 text-red-700",
                Medium: "bg-amber-100 text-amber-700",
                Low: "bg-emerald-100 text-emerald-700",
              }[priority] || "bg-slate-100 text-slate-700"
            )}
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-800 font-medium mb-1">
          {completedTodoCount} of {todoChecklist?.length || 0} tasks done
        </p>
        <Progress progress={progress} status={status} />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-t border-gray-100 mt-5 pt-4">
        <div className="flex flex-col text-xs text-gray-600">
          <div>
            <span className="text-gray-400">Start:</span>{" "}
            {moment(createdAt).format("Do MMM")}
          </div>
          <div>
            <span className="text-gray-400">Due:</span>{" "}
            {moment(dueDate).format("Do MMM")}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:ml-auto">
          {attachmentCount > 0 && (
            <div className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              <LuPaperclip className="text-base" />
              <span>{attachmentCount}</span>
            </div>
          )}

          <AvatarGroup avatars={assignedTo || []} />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
