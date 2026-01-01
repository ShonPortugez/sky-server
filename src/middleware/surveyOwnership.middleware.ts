import {ExpressMiddlewareInterface, ForbiddenError} from "routing-controllers";
import {NextFunction, Request, Response} from "express";
import {Survey, User} from "../models";

export class SurveyOwnershipMiddleware implements ExpressMiddlewareInterface {
    async use(request: Request, response: Response, next: NextFunction) {
        const user: User = response.locals.user;
        const survey: Survey = response.locals.survey;
        if(String(survey.userId) != String(user.id))
            throw new ForbiddenError();

        next();
    }
}