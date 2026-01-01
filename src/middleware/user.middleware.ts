import {inject, injectable} from "tsyringe";
import {ExpressMiddlewareInterface, NotFoundError} from "routing-controllers";
import {UserService} from "../services/user/user.service";
import {NextFunction, Request, Response} from "express";
import {User} from "../models";

type JwtRequest = Request & { auth: { sub: string ,iat: number, exp: number }, user: User };

@injectable()
export class UserMiddleware implements ExpressMiddlewareInterface {
    constructor(@inject(UserService) private userService: UserService) {}

    async use(request: JwtRequest, response: Response, next: NextFunction) {
        const userId = request.auth.sub;
        const user = await this.userService.getUserById(userId);
        if (!user)
            throw new NotFoundError(`User with id ${userId} not found`);

        request.user = user;
        next();
    }
}