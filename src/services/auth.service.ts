import {UserAuthRequest, UserAuthResponse} from "../types/user.types";
import {inject, injectable} from "tsyringe";
import {UserService} from "./user.service";
import {BadRequestError} from "routing-controllers";
import {JwtService} from "./jwt.service";
import bcrypt from "bcrypt";

@injectable()
export class AuthService {
    constructor(@inject(UserService) private userService: UserService, @inject(JwtService) private jwtService: JwtService) {}

    public async login(email: string, password: string): Promise<UserAuthResponse> {
        const fetchedUser = await this.userService.getUserByEmail(email);
        const passwordCompare= await bcrypt.compare(password, fetchedUser.password);
        if (!fetchedUser || !passwordCompare)
            throw new BadRequestError(`Invalid user credentials`);

        const userId = String(fetchedUser.id);
        const accessToken = this.jwtService.generateAccessToken(userId);
        const refreshToken = this.jwtService.generateRefreshToken(userId);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    public async renewToken(refreshToken: string) {
        const payloadFromRefresh = this.jwtService.verifyRefreshToken(refreshToken);
        return this.jwtService.generateAccessToken(payloadFromRefresh.sub);
    }
}