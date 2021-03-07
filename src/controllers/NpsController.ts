import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUserRepository } from "../repositories/SueveysUserRepository";
import { Request, Response } from "express";

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    const surveyUserRepository = getCustomRepository(SurveysUserRepository);

    const surveyUsers = await surveyUserRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const destractor = surveyUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveyUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passivos = surveyUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnser = surveyUsers.length;

    const calculate = Number(
      (((promoters - destractor) / totalAnser) * 100).toFixed(2)
    );

    return response.json({
      destractor,
      promoters,
      passivos,
      totalAnser,
      nps: calculate,
    });
  }
}

export { NpsController };
