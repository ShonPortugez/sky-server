import { injectable} from "tsyringe";
import {ExpressMiddlewareInterface, NotFoundError} from "routing-controllers";
import {UserService} from "../services/user.service";
import {NextFunction, Response} from "express";
import {AuthRequest} from "../types/auth.types";

@injectable()
export class UserMiddleware implements ExpressMiddlewareInterface {
    constructor(private readonly userService: UserService) {}

    async use(request: AuthRequest, response: Response, next: NextFunction) {
        const userId = request.auth?.id;
        const user = await this.userService.getUserById(userId);

        if (!user)
            throw new NotFoundError(`User with id ${userId} not found`);

        request.user = user;
        next();
    }
}