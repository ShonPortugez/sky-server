import { injectable} from "tsyringe";
import {ExpressMiddlewareInterface} from "routing-controllers";
import {UserService} from "../services/userService";

@injectable()
export class UserMiddleware implements ExpressMiddlewareInterface {
    constructor(private readonly userService: UserService) {}

    async use(request: any, response: any, next: (err?: any) => any) {
        const userId = request.auth?.id;
        const user = await this.userService.getUserById(userId);

        if (!user)
            return response.formatter.notFound({message: `User with id ${userId} not found`});

        request.user = user;
        next();
    }
}