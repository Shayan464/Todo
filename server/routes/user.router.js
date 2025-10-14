import express, { Router } from "express";
import {
  getTodo,
  createTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.route("/task").post(createTodo).get(getTodo);
router.delete("/task/:id", deleteTodo);

export default router;
