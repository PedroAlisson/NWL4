import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import * as yup from "yup";
import { AppError } from "../errors/AppError";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatorio"),
      email: yup
        .string()
        .email("Digite um e-mail valido")
        .required("E-mail é obrigatorio"),
    });

    //   if (!(await schema.isValid(request.body))) {
    //   return response.status(400).json({
    //     error: "validate failed",
    //     });
    //   }

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const usersRepository = getCustomRepository(UserRepository);

    const userAlreadyExist = await usersRepository.findOne({
      where: { email },
    });

    if (userAlreadyExist) {
      throw new AppError("Email exist");
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);
    return response.status(201).json(user);
  }
}

export { UserController };
