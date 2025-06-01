import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodoList([...todoList, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTodo = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        {todoList.map((task, index) => (
          <div
            key={`${task}-${index}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              <span className="text-sm text-gray-800">{task}</span>
            </div>
            <button
              onClick={() => removeTodo(index)}
              className="text-red-500 hover:text-red-700 transition"
              title="Remove task"
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Type a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={addTodo}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition shadow"
        >
          <HiMiniPlus className="text-base" />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
