import {User} from "../models";
import {UserAuthRequest, UserAuthResponse} from "../utils/types/user";
import {inject, injectable} from "tsyringe";
import {UserService} from "./userService";
import {BadRequestError} from "routing-controllers";
import {compareHashedPasswords} from "../utils/helpers/passwordHash";
import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/helpers/jwtGenerator";

@injectable()
export class AuthService {
    constructor(@inject(UserService) private userService: UserService) {}

    public async login(credentials: UserAuthRequest): Promise<UserAuthResponse> {
        const user = await this.userService.getUserByEmail(credentials.email);

        if (!user || !await compareHashedPasswords(user.password, credentials.password))
            throw new BadRequestError(`Invalid user credentials`);

        const userId = String(user.id);
        const accessToken = generateAccessToken(userId);
        // todo: save to db/cache?
        const refreshToken = generateRefreshToken(userId);

        return {
            id: userId,
            email: user.email,
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    public async logout(user: User) {
        // todo: invalidate refresh token
    }

    public async renewToken(refreshToken: string) {
        const payloadFromRefresh = verifyRefreshToken(refreshToken);
        return generateAccessToken(payloadFromRefresh.sub);
    }
}