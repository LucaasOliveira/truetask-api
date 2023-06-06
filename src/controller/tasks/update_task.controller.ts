import { Request, Response } from "express";
import { Task } from "../../models/task.model";
import { ServerError } from "../../error/server.error";
import { RequestError } from "../../error/request.error";
import { UserDataBase } from "../../database/user.database";
import { SuccessResponse } from "../../util/success.response";

export class UpdateTaskController {
  public updateTask(req: Request, res: Response) {
    try {
      const { userId, taskId } = req.params;
      const { title, description, archived } = req.body;

      const database = new UserDataBase();
      const user = database.getById(userId);

      if (!userId) {
        return RequestError.fieldNotProvided(res, "Id do usuário");
      }

      if (!taskId) {
        return RequestError.fieldNotProvided(res, "Id da Task");
      }

      if (!user) {
        return RequestError.notFound(res, "Usuário");
      }

      const listaDeTasks = user.tasks;
      let task = listaDeTasks.find(task => task.id === taskId);

      if (!task) {
        return RequestError.notFound(res, "Task");
      }

      if (title) {
        task.title = title;
      }

      if (description) {
        task.description = description;
      }

      if (archived) {
        task.archived = archived;
      }

      return SuccessResponse.created(res, "Task editada com sucesso!", task);
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }
}
