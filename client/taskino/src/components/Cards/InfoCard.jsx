import React from "react";

const InfoCard = ({ icon: Icon, label, value, color = "bg-blue-500" }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
      <div className={`w-4 h-4 rounded-full ${color}`} />

      <div className="flex flex-col text-center sm:text-left">
        <span className="text-base font-semibold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500">{label}</span>
      </div>

      {Icon && (
        <div className="mt-2 sm:mt-0 sm:ml-auto text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default InfoCard;
