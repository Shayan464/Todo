import { Todo } from "../models/todo.model.js";

const createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    if (!task || task.trim() === "") {
      return res.status(400).json({ message: "Task cannot be empty" });
    }

    const newTodo = new Todo({ task });
    const savedTodo = await newTodo.save();

    return res.status(200).json({
      message: "Todo created successfully",
      todo: savedTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error while creating the todo" });
  }
};

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error while fetching data" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params; // get id from route
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting todo" });
  }
};

export { createTodo, getTodo, deleteTodo };
