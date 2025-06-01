import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [link, setLink] = useState("");

  const handleAdd = () => {
    if (link.trim()) {
      setAttachments(prev => [...prev, link.trim()]);
      setLink("");
    }
  };

  const handleRemove = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {attachments.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm text-gray-800 overflow-x-auto">
              <LuPaperclip className="text-gray-400 flex-shrink-0" />
              <span className="truncate max-w-xs">{item}</span>
            </div>
            <button
              onClick={() => handleRemove(idx)}
              className="text-red-500 hover:text-red-700 transition"
              aria-label="Remove Attachment"
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder="Paste attachment link here"
            className="w-full text-sm bg-transparent outline-none px-2 placeholder-gray-400"
          />
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          <HiMiniPlus className="text-base" />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
