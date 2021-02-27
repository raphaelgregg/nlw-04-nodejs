import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveysRepository from "../repositories/SurveysRepository";

class SurveyController {
    async create(request: Request, response: Response) {
        // buscar dados da requisição no body
        const {title, description} = request.body;
        // buscar meu repositorio
        const surveyRepository = getCustomRepository(SurveysRepository);
        // criar um objeto survey  a partir do repo
        const survey = surveyRepository.create(
            {title, description}
        );
        // salvar obejto survey no repo
        surveyRepository.save(survey);
        // console.log(survey);
        // retornar pesquisa criada
        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response) {
        const surveyRepository = getCustomRepository(SurveysRepository);

        const all = await surveyRepository.find();

        return response.json(all);

    }
}

export default SurveyController;