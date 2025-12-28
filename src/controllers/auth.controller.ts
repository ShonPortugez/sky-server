import {inject, injectable} from "tsyringe";
import {BadRequestError, Body, CookieParam, Get, HttpCode, JsonController, NotFoundError, Patch, Req, Res, UseBefore} from "routing-controllers";
import type { Response } from 'express';
import {UserAuthRequest} from "../utils/types/user";
import {AuthService} from "../services/auth.service";
import {setJwtCookies} from "../utils/helpers/cookieOptions";

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

    @Patch('/refresh')
    async refresh(@Req() req: Request, @Res() res: Response, @CookieParam('refresh') refreshToken: string) {
        if(!refreshToken)
            throw new BadRequestError('Failed to locate refresh cookie');

        const newAccessToken= await this.authService.renewToken(refreshToken);
        setJwtCookies(res, newAccessToken, refreshToken);
        return res.status(200);
    }
}
