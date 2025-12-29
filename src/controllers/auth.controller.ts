import {inject, injectable} from "tsyringe";
import {BadRequestError, Body, CookieParam, Get, JsonController, Patch, Req, Res, UnauthorizedError,} from "routing-controllers";
import {Response} from 'express';
import {UserAuthRequest} from "../types/user.types";
import {AuthService} from "../services/auth.service";
import {ACCESS_COOKIE, REFRESH_COOKIE} from "../constants";
import {cookieConfig} from "../config";

@injectable()
@JsonController('/auth')
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    @Get('/login')
    async login(@Body() credentials: UserAuthRequest, @Res() res: Response) {
        const {accessToken, refreshToken} = await this.authService.login(credentials);
        if(!accessToken || !refreshToken)
            throw new UnauthorizedError(`Incorrect login credentials provided.`);

        return res
            .cookie(ACCESS_COOKIE, accessToken, cookieConfig.access)
            .cookie(REFRESH_COOKIE, refreshToken, cookieConfig.refresh)
            .status(200);
    }

    @Patch('/refresh')
    async refresh(@Res() res: Response, @CookieParam('refresh') refreshToken: string) {
        if(!refreshToken)
            throw new BadRequestError('Failed to locate refresh cookie');

        const newAccessToken= await this.authService.renewToken(refreshToken);
        return res
            .cookie(ACCESS_COOKIE, newAccessToken, cookieConfig.access)
            .cookie(REFRESH_COOKIE, refreshToken, cookieConfig.refresh)
            .status(200);
    }
}
