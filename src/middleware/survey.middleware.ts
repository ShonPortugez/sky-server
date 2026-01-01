import {BadRequestError, ExpressMiddlewareInterface, ForbiddenError} from "routing-controllers";
import {NextFunction, Response, Request} from "express";
import {User} from "../models";
import {inject} from "tsyringe";
import {SurveyService} from "../services/survey/survey.service";
import {isValidMongoUuid} from "../utils/helpers/validDbEntityId";

export class SurveyMiddleware implements ExpressMiddlewareInterface {
    constructor(@inject(SurveyService) private surveyService: SurveyService) {}

    async use(request: Request, response: Response, next: NextFunction) {
        if(!isValidMongoUuid(request.params.id))
            throw new BadRequestError()

        const user: User = response.locals.user;
        const survey = await this.surveyService.getSurveyById(request.params.id, true);

        if(String(survey.userId) != String(user.id))
            throw new ForbiddenError();

        response.locals.survey = survey;
        next();
    }
}