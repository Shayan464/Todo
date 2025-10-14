import { createContext, useState } from "react";
import axios from "axios";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/task");
      setTodos(response.data.todos || []); // ensure it's always an array
    } catch (err) {
      console.error("Error fetching todos:", err);
      setTodos([]);
    }
  };

  const AddTodos = async (task) => {
    try {
      if (!task || task.trim() === "") return;
      await axios.post("http://localhost:4000/api/task", { task });
      getTodos(); // refresh the list after adding
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const DeleteTodos = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/task/${id}`);
      getTodos(); // refresh after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TodoContext.Provider value={{ getTodos, todos, AddTodos, DeleteTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
