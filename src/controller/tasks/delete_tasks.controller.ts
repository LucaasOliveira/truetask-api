import { Request, Response } from "express";
import { Task } from "../../models/task.model";
import { ServerError } from "../../error/server.error";
import { RequestError } from "../../error/request.error";
import { UserDataBase } from "../../database/user.database";
import { SuccessResponse } from "../../util/success.response";

export class DeleteTaskController {
  public deleteTask(req: Request, res: Response) {
    try {
      const { userId, taskId } = req.params;

      const database = new UserDataBase();
      const user = database.getById(userId);

      if (!userId) {
        return RequestError.fieldNotProvided(res, "Usuário");
      }

      if (!taskId) {
        return RequestError.fieldNotProvided(res, "Task");
      }

      if (!user) {
        return RequestError.notFound(res, "Usuário");
      }

      const listaDeTasks = user.tasks;

      const taskIndex = listaDeTasks.findIndex(task => task.id === taskId);

      if (taskIndex < 0) {
        return RequestError.notFound(res, "task");
      }
      const taskDeleted = listaDeTasks.splice(taskIndex, 1);

      return SuccessResponse.created(
        res,
        "Task deletada com sucesso!",
        taskDeleted
      );
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }
}
