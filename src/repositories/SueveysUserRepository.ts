import { EntityRepository, Repository } from "typeorm";
import { SurveyUsers } from "../models/SurveyUsers";

@EntityRepository(SurveyUsers)
class SurveysUserRepository extends Repository<SurveyUsers> {}

export { SurveysUserRepository };
