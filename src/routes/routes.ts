import { Router, Response, Request } from "express";
import { UserController } from "../controllers/UserController";
import { SurveyController } from "../controllers/SurveyController";
import { SendMailController } from "../controllers/SendMailController";
import { AnswerController } from "../controllers/AnswerController";
import { NpsController } from "../controllers/NpsController";

const userController = new UserController();
const surveysController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

const routes = Router();

routes.get("/users", (request: Request, response: Response) => {
  return response.json({ message: "Users Get" });
});

routes.post("/users", userController.create);

routes.post("/surveys", surveysController.create);
routes.get("/surveys", surveysController.show);

routes.post("/sendMail", sendMailController.execute);
routes.get("/answers/:value", answerController.execute);
routes.get("/nps/:survey_id", npsController.execute);

export default routes;
