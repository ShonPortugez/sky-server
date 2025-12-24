import {inject, injectable} from "tsyringe";
import {Body, Get, JsonController, NotFoundError, Patch, UseBefore} from "routing-controllers";
import {AuthMiddleware} from "../middleware/auth.middleware";
import {CurrentUser} from "../decorators/currentUser";
import {User} from "../models";
import {UserAuthRequest} from "../utils/types/user";
import {AuthService} from "../services/authService";

@injectable()
@JsonController('/auth')
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    @Get('/login')
    async login(@Body() credentials: UserAuthRequest) {
        const userTokens = await this.authService.login(credentials);
        if(!userTokens)
            throw new NotFoundError(`Could not authenticate user with mail: ${credentials.email}`);

        return userTokens;
    }

    @UseBefore(AuthMiddleware)
    @Get('/logout')
    async logout(@CurrentUser() user: User) {
        await this.authService.logout(user)
    }

    @Patch('/refresh')
    @UseBefore(AuthMiddleware)
    async refresh(
        @CurrentUser() user: User,
    ) {
        return await this.authService.renewToken(user);
    }
}