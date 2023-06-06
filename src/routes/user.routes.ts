import { Router } from "express";
import { SignInUserController } from "../controller/users/sign_in_user.controller";
import { CreateUserController } from "../controller/users/create_user.controller";
import { ListUserController } from "../controller/users/list_user.controller";
import { SignInValidatorMiddleware } from "../middleware/sign_in-validator-middleware";
import { taskRoutes } from "./task.routes";

export const userRoutes = () => {
  const api = Router();
  api.post("/", new CreateUserController().createUser);
  api.get("/:userId", new ListUserController().listUser);
  api.post(
    "/signIn",
    SignInValidatorMiddleware.signInValidator,
    new SignInUserController().signIn
  );

  api.use("/:userId/tasks", taskRoutes());

  return api;
};
