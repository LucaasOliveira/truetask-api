import { Router } from "express";
import { CreateTaskController } from "../controller/tasks/create_task.controller";
import { ListTasksController } from "../controller/tasks/list_tasks.controller";
import { DeleteTaskController } from "../controller/tasks/delete_tasks.controller";
import { UpdateTaskController } from "../controller/tasks/update_task.controller";

export const taskRoutes = () => {
  const api = Router({ mergeParams: true });

  api.post("/", new CreateTaskController().createTask);
  api.get("/", new ListTasksController().listTasks);
  api.delete("/:taskId", new DeleteTaskController().deleteTask);
  api.put("/:taskId", new UpdateTaskController().updateTask);

  return api;
};
