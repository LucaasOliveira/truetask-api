import { Request, Response } from "express";
import { UserDataBase } from "../../database/user.database";
import { RequestError } from "../../error/request.error";
import { ServerError } from "../../error/server.error";
import { SuccessResponse } from "../../util/success/success.response";
import { User } from "../../models/user.model";

export class CreateUserController {
  public createUser(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const dataBase = new UserDataBase();
      const userList = new UserDataBase().list();

      if (email === "" || password === "" || name === "") {
        return res.status(404).send({
          ok: false,
          message: "Preencha todos os campos!"
        });
      }

      if (password.length < 6) {
        return res.status(404).send({
          ok: false,
          message: "Preencha a senha com pelo menos 5 caractéres."
        });
      }
      // verificar se existe um email já cadastrado
      const userExist = userList.some(user => user.email === email);
      if (userExist) {
        return res.status(404).send({
          ok: false,
          message: "Usuário já cadastrado. Volte e faça o signIn."
        });
      }
      const newUser = new User(name, email, password);

      dataBase.create(newUser);

      return SuccessResponse.created(
        res,
        "O usuário foi criado com sucesso",
        newUser.toJson()
      );
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }
}
