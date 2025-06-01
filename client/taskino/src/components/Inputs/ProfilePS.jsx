import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const triggerFileInput = () => inputRef.current?.click();

  return (
    <div className="flex justify-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 shadow-md">
        {!image ? (
          <div
            onClick={triggerFileInput}
            className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 cursor-pointer hover:bg-gray-200 transition"
          >
            <LuUser className="text-4xl" />
          </div>
        ) : (
          <>
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
              aria-label="Remove photo"
            >
              <LuTrash size={16} />
            </button>
          </>
        )}

        {!image && (
          <button
            onClick={triggerFileInput}
            className="absolute bottom-1 right-1 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition"
            aria-label="Upload photo"
          >
            <LuUpload size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
