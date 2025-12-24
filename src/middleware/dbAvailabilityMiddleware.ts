import {MongoConnection} from "../database/mongoConnection";
import {injectable} from "tsyringe";
import {ExpressMiddlewareInterface, InternalServerError, Middleware} from "routing-controllers";
import {NextFunction, Request, Response} from "express";

@injectable()
@Middleware({type: 'before'})
export class DbAvailabilityMiddleware implements ExpressMiddlewareInterface {

    async use(request: Request, response: Response, next: NextFunction) {
        const db = MongoConnection.getInstance();
        if (!db.isConnected()) {
            throw new InternalServerError('Could not reach some server services')
        }

        next();
    }
}
