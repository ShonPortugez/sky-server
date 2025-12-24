import {User} from "../models";
import {UserAuthRequest, UserAuthResponse} from "../utils/types/user";
import {injectable} from "tsyringe";

@injectable()
export class AuthService {

    public async login(credentials: UserAuthRequest): Promise<UserAuthResponse> {
        throw new Error("Method not implemented.");
    }

    public async logout(user: User) {
        throw new Error("Method not implemented.");
    }

    public async renewToken(user: User) {
        throw new Error("Method not implemented.");
    }
}