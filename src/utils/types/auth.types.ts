import {User} from "../../models";

export interface TokenPayload {
    id: string;
    email: string;
}

export interface AuthRequest extends Request {
    auth: TokenPayload;
    user: User
}