import { Request, Response } from "express";
import { UserDataBase } from "../database/repositories/user.database";
import { RequestError } from "../util/error/request.error";
import { ServerError } from "../util/error/server.error";
import { SuccessResponse } from "../util/success/success.response";
import { User } from "../models/user.model";

export class UserController {
  public async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const database = new UserDataBase();

      if (!email) {
        return RequestError.notFound(res, "E-mail");
      }

      if (!password) {
        return RequestError.notFound(res, "Senha");
      }

      const user = {
        email,
        password
      };

      const result = await database.signIn(user);

      const userId = {
        id: result.id
      };

      if (!userId) {
        return res.status(401).send({
          ok: false,
          message: "Usuário não autorizado."
        });
      }

      return SuccessResponse.ok(res, "Usuário encontrado com sucesso.", userId);
    } catch (error) {
      return ServerError.genericError(res, "Usuário não encontrado!");
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = new User(email, password);

      if (email === "" || password === "") {
        return RequestError.fieldNotProvided(res, "Campos");
      }

      if (password.length < 6) {
        return RequestError.fieldNotProvided(res, "Senha");
      }

      const dataBase = new UserDataBase();
      const result = await dataBase.create(user);

      return SuccessResponse.created(
        res,
        "O usuário foi criado com sucesso",
        result.toJson()
      );
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const database = new UserDataBase();
      const userList = await database.list();

      const list = userList.map(user => user.toJson());

      return SuccessResponse.ok(res, "Usuário listado com sucesso.", list);
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }

  public async getUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const database = new UserDataBase();
      const user = await database.get(userId);

      if (!user) {
        return RequestError.notFound(res, "Usuário");
      }

      return SuccessResponse.ok(
        res,
        "Usuário listado com sucesso.",
        user.toJson()
      );
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }
}
