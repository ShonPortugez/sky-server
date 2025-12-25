import jwt, {JwtPayload} from 'jsonwebtoken';
import 'dotenv/config';
import {JWT_ALGORITHM, JWT_ACCESS_TOKEN_EXPIRE_DEFAULT, JWT_REFRESH_TOKEN_EXPIRE_DEFAULT} from "../constants";

const JWT_SECRET = process.env.JWT_SECRET;

const generateJwtToken = (userId: string, expireIn: string) : string => {
    //@ts-ignore
    return jwt.sign(
        {},
        JWT_SECRET,
        {
            subject: userId,
            expiresIn: expireIn,
            algorithm: JWT_ALGORITHM,
        }
    );
}

export const generateAccessToken = (userId: string)=> {
    const expireIn = process.env.JWT_EXPIRES ?? JWT_ACCESS_TOKEN_EXPIRE_DEFAULT
    return generateJwtToken(userId, expireIn)
}

export const generateRefreshToken = (userId: string) => {
    return generateJwtToken(userId, JWT_REFRESH_TOKEN_EXPIRE_DEFAULT)
}

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
}
