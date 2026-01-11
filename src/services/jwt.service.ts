import {injectable} from "tsyringe";
import 'dotenv/config';
import jwt, {Algorithm, JwtPayload} from "jsonwebtoken";
import * as process from "node:process";
import { StringValue } from 'ms';

@injectable()
export class JwtService {

    private JWT_SECRET = process.env.JWT_SECRET;
    private JWT_ACCESS_TOKEN_EXPIRE_MINUTES_DEFAULT= '15m'
    private JWT_REFRESH_TOKEN_EXPIRE_DAYS_DEFAULT= '15d'
    private JWT_ALGORITHM = 'HS256' as Algorithm

    private generateJwtToken(userId: string, expireIn: StringValue) {
        return jwt.sign(
            {},
            this.JWT_SECRET,
            {
                subject: userId,
                expiresIn: expireIn,
                algorithm: this.JWT_ALGORITHM,
            },
        );
    }

    public generateAccessToken(userId: string) {
        const expireIn = process.env.JWT_EXPIRES as StringValue ?? this.JWT_ACCESS_TOKEN_EXPIRE_MINUTES_DEFAULT as StringValue;
        return this.generateJwtToken(userId, expireIn)
    }

    public generateRefreshToken(userId: string) {
        return this.generateJwtToken(userId, this.JWT_REFRESH_TOKEN_EXPIRE_DAYS_DEFAULT  as StringValue);
    }

    public verifyRefreshToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    }
}