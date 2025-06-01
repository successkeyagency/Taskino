import React from "react";

const AvatarGroup = ({ avatars, maxVisible = 4 }) => {
  const extraCount = avatars.length - maxVisible;

  return (
    <div className="flex items-center space-x-[-12px]">
      {avatars.slice(0, maxVisible).map((avatar, idx) => (
        <div
          key={idx}
          className="relative w-10 h-10 rounded-full border-4 border-gray-100 shadow-md overflow-hidden hover:z-20 transition-transform hover:scale-110 cursor-pointer"
          style={{ zIndex: maxVisible - idx }}
          title={`User ${idx + 1}`}
        >
          <img
            src={avatar}
            alt={`Avatar ${idx + 1}`}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
        </div>
      ))}

      {extraCount > 0 && (
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white font-semibold text-sm border-4 border-gray-100 shadow-md cursor-default select-none"
          title={`${extraCount} more users`}
          style={{ zIndex: 0 }}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
