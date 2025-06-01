import React from "react";

const Progress = ({ progress = 0, status }) => {
  const getGradient = () => {
    switch (status) {
      case "In Progress":
        return "bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500";
      case "Completed":
        return "bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700";
      default:
        return "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500";
    }
  };

  return (
    <div className="relative w-full h-4 rounded-xl bg-gray-300 dark:bg-gray-700 overflow-hidden shadow-inner">
      <div
        className={`${getGradient()} h-full rounded-xl transition-all duration-700 ease-out`}
        style={{ width: `${progress}%` }}
      />
      <span
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-900 dark:text-gray-100 select-none"
        aria-live="polite"
      >
        {progress}% {status}
      </span>
    </div>
  );
};

export default Progress;
