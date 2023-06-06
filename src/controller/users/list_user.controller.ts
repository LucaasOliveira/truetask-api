import { Request, Response } from "express";
import { UserDataBase } from "../../database/user.database";
import { RequestError } from "../../error/request.error";
import { ServerError } from "../../error/server.error";
import { SuccessResponse } from "../../util/success.response";
import { User } from "../../models/user.model";

export class ListUserController {
  public listUser(req: Request, res: Response) {
    try {
      const userList = new UserDataBase().list();

      return SuccessResponse.ok(res, "Usuário listado com sucesso.", userList);
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }
}
