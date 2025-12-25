import { inject, injectable } from "tsyringe";
import { BadRequestError, ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { UserService } from "../services/userService";
import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../utils/helpers/passwordHash";

@injectable()
export class RegistrationMiddleware implements ExpressMiddlewareInterface {
    constructor(@inject(UserService) private userService: UserService) { }

    async use(request: Request, response: Response, next: NextFunction) {
        const email = request.body.email;
        if (email) {
            const existingUser = await this.userService.getUserByEmail(email);
            if (existingUser)
                throw new BadRequestError(`User with mail ${email} already in use`);
        }

        request.body.password = await hashPassword(request.body.password);
        next();
    }
}