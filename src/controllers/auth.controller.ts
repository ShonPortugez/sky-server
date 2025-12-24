import {inject, injectable} from "tsyringe";
import {Body, BodyParam, HttpCode, JsonController, NotFoundError, Post, UseBefore} from "routing-controllers";
import {AuthMiddleware} from "../middleware/auth.middleware";
import {CurrentUser} from "../decorators/currentUser";
import {User} from "../models";
import {UserAuthRequestDto} from "../dto/user";
import {AuthService} from "../services/authService";
import {DbAvailabilityMiddleware} from "../middleware/dbAvailabilityMiddleware";

@injectable()
@JsonController('/auth')
@UseBefore(DbAvailabilityMiddleware)
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    @HttpCode(201)
    @Post('/login')
    async login(@Body() credentials: UserAuthRequestDto) {
        const result = await this.authService.login(credentials);
        if(!result)
            throw new NotFoundError(`Could not authenticate user with mail: ${credentials.email}`);

        return result;
    }

    @HttpCode(200)
    @UseBefore(AuthMiddleware)
    @Post('/logout')
    async logout(@CurrentUser() user: User) {
        await this.authService.logout(user)
    }

    @HttpCode(201)
    @Post('/refresh')
    @UseBefore(AuthMiddleware)
    async refresh(
        @CurrentUser() user: User,
        @BodyParam('refresh') refreshToken: string
    ) {
        return await this.authService.renewToken(user, refreshToken);
    }
}