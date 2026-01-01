import {BadRequestError, ExpressMiddlewareInterface, ForbiddenError} from "routing-controllers";
import {NextFunction, Response, Request} from "express";
import {Survey, User} from "../models";
import {inject, injectable} from "tsyringe";
import {SurveyService} from "../services/survey/survey.service";
import {isValidMongoUuid} from "../utils/helpers/validDbEntityId";

type SurveyRequest = Request & { survey: Survey };

@injectable()
export class SurveyMiddleware implements ExpressMiddlewareInterface {
    constructor(@inject(SurveyService) private surveyService: SurveyService) {}

    async use(request: SurveyRequest, response: Response, next: NextFunction) {
        const id = request.params.id
        if(!isValidMongoUuid(id))
            throw new BadRequestError()
        request.survey = await this.surveyService.getSurveyById(id, true);

        next();
    }
}