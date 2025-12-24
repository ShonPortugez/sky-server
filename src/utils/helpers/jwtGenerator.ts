import jwt, {JwtPayload} from 'jsonwebtoken';
import {JWT_ALGORITHM, JWT_DEFAULT_EXPIRE_IN, REFRESH_TOKEN_EXPIRE_IN} from "../constants";

const generateJwtToken = (userId: string, expireIn: string) : string => {
    //@ts-ignore
    return jwt.sign(
        process.env.JWT_SECRET,
        {
            subject: userId,
            expiresIn: expireIn,
            algorithm: JWT_ALGORITHM,
        }
    );
}

export const generateAccessToken = (userId: string)=> {
    const expireIn = process.env.JWT_EXPIRES ?? JWT_DEFAULT_EXPIRE_IN
    return generateJwtToken(userId, expireIn)
}

export const generateRefreshToken = (userId: string) => {
    return generateJwtToken(userId, REFRESH_TOKEN_EXPIRE_IN)
}

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
}
