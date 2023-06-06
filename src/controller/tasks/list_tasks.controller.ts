import { Request, Response } from "express";
import { Task } from "../../models/task.model";
import { ServerError } from "../../error/server.error";
import { RequestError } from "../../error/request.error";
import { UserDataBase } from "../../database/user.database";
import { SuccessResponse } from "../../util/success.response";

export class ListTasksController {
  public listTasks(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, archived } = req.query;

      const database = new UserDataBase();
      const user = database.getById(userId);
      
      let allTasks = user?.tasks;
    
       if (title) {
        allTasks = allTasks?.filter(
          (note) =>
            note.title
              .toString()
              .toLowerCase() ===
            title?.toString().toLowerCase()
        );
      }

      if (archived !== undefined && archived !== "") {
        const isArchived =
          archived?.toString().toLowerCase() ===
          "true";
        allTasks = allTasks?.filter(
          (note) => note.archived === isArchived
        );
      }

      if (!userId) {
        return RequestError.fieldNotProvided(res, "Id do usuário");
      }

      if (!user) {
        return RequestError.notFound(res, "Usuário");
      }

      // if (archived !== undefined) {
      //   allTasks = allTasks.filter(task => task.archived === true);
      // } else {
      //   allTasks = allTasks.filter(task => task.archived === false);
      // }
      
      return SuccessResponse.ok(res, "Lista de tasks.", allTasks);
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }
}
