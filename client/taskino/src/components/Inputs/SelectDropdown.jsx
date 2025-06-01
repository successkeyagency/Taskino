import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options = [], value, onChange, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300 transition ${
          isOpen ? "border-blue-500" : "border-gray-200"
        }`}
      >
        <span className={`${!value && "text-gray-400"}`}>{selectedLabel}</span>
        <LuChevronDown
          className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-auto animate-fade-in">
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 transition ${
                  option.value === value ? "bg-blue-100 text-blue-700" : "text-gray-700"
                }`}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-400">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
