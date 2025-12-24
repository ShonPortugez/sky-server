import {User} from "../models";
import {UserAuthRequestDto, UserAuthResponseDto} from "../dto/user";
import {injectable} from "tsyringe";

@injectable()
export class AuthService {

    public async login(credentials: UserAuthRequestDto): Promise<UserAuthResponseDto> {
        throw new Error("Method not implemented.");
    }

    public async logout(user: User) {
        throw new Error("Method not implemented.");
    }

    public async renewToken(user: User, token: string) {
        throw new Error("Method not implemented.");
    }
}