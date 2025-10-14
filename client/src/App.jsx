import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "./Context/todoContext";
import "./app.css";
import { toast } from "react-toastify";

const App = () => {
  const { todos, getTodos, AddTodos, DeleteTodos } = useContext(TodoContext);
  const [task, setTask] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      toast.error("Please fill in the task");
      return; // stop submission
    }
    AddTodos(task);
    toast.success("Task Added");
    setTask("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-blue-400 to-red-400 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Todo App
        </h1>

        <form onSubmit={handleSubmit} className="flex mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your todo"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>

        <ol className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="px-4 py-3 text-gray-700 flex items-center"
            >
              <span>{todo.task}</span>
              <button
                className="ml-auto text-red-500 hover:text-red-700"
                onClick={() => DeleteTodos(todo._id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
