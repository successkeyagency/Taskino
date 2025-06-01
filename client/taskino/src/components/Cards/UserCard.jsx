import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 px-4 py-5 text-center">
      <div className="flex flex-col items-center">
        <img
          src={userInfo?.profileImageUrl}
          alt="User Avatar"
          className="w-16 h-16 rounded-full border-2 border-orange-400 mb-2 object-cover"
        />
        <h3 className="text-sm font-semibold text-gray-800">
          {userInfo?.name}
        </h3>
        <p className="text-xs text-gray-500">{userInfo?.email}</p>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <StatBadge
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          color="bg-orange-100 text-orange-600"
        />
        <StatBadge
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          color="bg-yellow-100 text-yellow-600"
        />
        <StatBadge
          label="Completed"
          count={userInfo?.completedTasks || 0}
          color="bg-green-100 text-green-600"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatBadge = ({ label, count, color }) => {
  return (
    <div
      className={`rounded-full px-3 py-1 text-[11px] font-medium ${color} min-w-[70px]`}
    >
      <span className="font-bold text-sm">{count}</span> {label}
    </div>
  );
};
