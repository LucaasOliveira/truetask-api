import { Request, Response } from "express";
import { UserDataBase } from "../../database/user.database";
import { RequestError } from "../../error/request.error";
import { ServerError } from "../../error/server.error";
import { SuccessResponse } from "../../util/success.response";
import { User } from "../.././models/user.model";

export class SignInUserController {
  public signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const database = new UserDataBase();
      const user = database.signIn(String(email), String(password));

      if (!user) {
        return res.status(401).send({
          ok: false,
          message: "Usuário não autorizado."
        });
      }

      return SuccessResponse.ok(
        res,
        "Usuário logado com sucesso.",
        user.toJson()
      );
    } catch (error) {
      return ServerError.genericError(res, "Usuário não encontrado!");
    }
  }
}
