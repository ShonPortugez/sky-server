import { injectable} from "tsyringe";
import {ExpressMiddlewareInterface, NotFoundError} from "routing-controllers";
import {UserService} from "../services/user/user.service";
import {NextFunction, Response} from "express";
import {User} from "../models";

type AuthRequest = Request & { user: User, email: string };

@injectable()
export class UserMiddleware implements ExpressMiddlewareInterface {
    constructor(private readonly userService: UserService) {}

    async use(request: AuthRequest, response: Response, next: NextFunction) {
        const user = await this.userService.getUserByEmail(request.email);
        if (!user)
            throw new NotFoundError(`User with id ${request.email} not found`);

        request.user = user;
        next();
    }
}