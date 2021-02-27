import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import SurveysUsersRepository from "../repositories/SurveysUsersRepostory";

class AnswerController {

    // http://localhost:3333/answers/6?u=0dcbbf3b-3528-4c2d-9fac-ea73fbc880d5
    /**
     * Route Params => Parametros que compõe a rota
     *      routes.get("/answer/:values")
     * Query Params => Busca. Paginação, não obrigatórios
     * ?
     * chave=valor
     */
    async execute(request: Request, response: Response) {
        const {value } = request.params;
        const {u} = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser) {
            throw new AppError("Survey User does not exists");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser)

    }
}

export default AnswerController;