import {UserAuthRequest, UserAuthResponse} from "../types/user";
import {inject, injectable} from "tsyringe";
import {UserService} from "./user.service";
import {BadRequestError} from "routing-controllers";
import {JwtService} from "./jwt.service";
import bcrypt from "bcrypt";

@injectable()
export class AuthService {
    constructor(@inject(UserService) private userService: UserService, @inject(JwtService) private jwtService: JwtService) {}

    public async login(credentials: UserAuthRequest): Promise<UserAuthResponse> {
        const user = await this.userService.getUserByEmail(credentials.email);
        const passwordCompare= await bcrypt.compare(user.password, credentials.password);
        if (!user || !passwordCompare)
            throw new BadRequestError(`Invalid user credentials`);

        const userId = String(user.id);
        const accessToken = this.jwtService.generateAccessToken(userId);
        const refreshToken = this.jwtService.generateRefreshToken(userId);

        return {
            id: userId,
            email: user.email,
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    public async renewToken(refreshToken: string) {
        const payloadFromRefresh = this.jwtService.verifyRefreshToken(refreshToken);
        return this.jwtService.generateAccessToken(payloadFromRefresh.sub);
    }
}