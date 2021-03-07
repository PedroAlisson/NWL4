import { Request, Response } from "express";
import { getCustomRepository, Repository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUserRepository } from "../repositories/SueveysUserRepository";

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    const surveyUser = await surveysUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey User does not Exist");
    }

    surveyUser.value = Number(value);

    await surveysUserRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };
