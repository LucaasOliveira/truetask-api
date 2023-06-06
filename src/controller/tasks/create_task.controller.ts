import { Request, Response } from "express";
import { Task } from "../../models/task.model";
import { ServerError } from "../../error/server.error";
import { RequestError } from "../../error/request.error";
import { UserDataBase } from "../../database/user.database";
import { SuccessResponse } from "../../util/success.response";

export class CreateTaskController {
  public createTask(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description } = req.body;

      const database = new UserDataBase();
      const user = database.getById(userId);

      if (!userId) {
        return RequestError.fieldNotProvided(res, "Id do usuário");
      }

      if (!user) {
        return RequestError.notFound(res, "Usuário");
      }

      if (title === "" || description === "") {
        return RequestError.fieldNotProvided(res, "Campo");
      }

      const newTask = new Task(title, description);
      user.addTask(newTask);

      return SuccessResponse.created(res, "Task criada com sucesso!", newTask);
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }
}
