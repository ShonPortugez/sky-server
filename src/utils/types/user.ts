import {User} from "../../models";

export interface UserData {
    email: string;
    username: string;
    password: string;
}

export interface UserResponse {
    id: string;
    email: string;
    username: string;
}

export const toUserResponse = (user: User): UserResponse  => {
    return {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
    };
}

export interface UserAuthRequest {
    email: string;
    password: string;
}

export class UserAuthResponse {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}