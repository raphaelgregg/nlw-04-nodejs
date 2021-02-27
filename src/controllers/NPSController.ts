import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import SurveysUsersRepository from "../repositories/SurveysUsersRepostory";

class NPSController {
    /**
     * NPS ou Net Promoter Score - é uma métrica desenvolvida para medir os níveis de lealdade do cliente
     * Obs.: Notas passivas são ignoradas para o calculo NPS
     * 1 2 3 4 5 6 7 8 9 10
     * Classiicações:
     * Detratores => 0 - 6
     * Passivos => 7 - 8 
     * Promotores => 9 - 10
     * 
     * Formula:
     *  (Número de promotores - número de detratores) / (numero de respondentes) X 100
     */

     async execute(request: Request, response: Response) {
         const {survey_id} = request.params;

         const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

         const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
         });

         const detractor = surveysUsers.filter(
             survey => survey.value >= 0 && survey.value <= 6
         ).length;

         const promoters = surveysUsers.filter(
            survey => survey.value >= 9 && survey.value <= 10
         ).length;

         const passive = surveysUsers.filter(
            survey => survey.value >= 7 && survey.value <= 8
         ).length;

         const totalAnswers = surveysUsers.length;

         const calculate = Number(((( promoters - detractor) / (totalAnswers - passive)) * 100).toFixed(2));

         return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
         });
     }

}

export default NPSController;