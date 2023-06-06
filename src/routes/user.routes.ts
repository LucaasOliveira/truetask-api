import { Router } from "express";
import { TaskController } from "../controller/task.controller";
import { UserController } from "../controller/user.controller";
import { SignInValidatorMiddleware } from "../middleware/sign_in-validator-middleware";

export const userRoutes = () => {
  const app = Router();

  app.post("/", new UserController().createUser);
  app.get("/", new UserController().list);
  app.get("/:userId", new UserController().getUser);
  app.post(
    "/signIn",
    SignInValidatorMiddleware.signInValidator,
    new UserController().signIn
  );
  app.post("/:userId/tasks", new TaskController().create);
  app.get("/:userId/tasks", new TaskController().list);
  app.delete("/:userId/tasks/:taskId", new TaskController().delete);
  app.put("/:userId/tasks/:taskId", new TaskController().update);

  return app;
};
