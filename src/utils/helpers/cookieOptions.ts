import {
    ACCESS_COOKIE,
    COOKIE_HTTP_ONLY,
    COOKIE_PATH,
    COOKIE_SAME_SITE,
    COOKIE_SECURE,
    JWT_ACCESS_TOKEN_EXPIRE_MS,
    JWT_REFRESH_TOKEN_EXPIRE_MS, REFRESH_COOKIE
} from "../constants";
import type { Response } from 'express';

const defaultCookieOptions = {
    access: {
        httpOnly: COOKIE_HTTP_ONLY,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAME_SITE,
        path: COOKIE_PATH,
        maxAge: JWT_ACCESS_TOKEN_EXPIRE_MS,
    },
    refresh: {
        httpOnly: COOKIE_HTTP_ONLY,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAME_SITE,
        path: COOKIE_PATH,
        maxAge: JWT_REFRESH_TOKEN_EXPIRE_MS,
    },
};

export const setJwtCookies = (res: Response, accessToken: string, refreshToken: string) => {
    return res
        .cookie(ACCESS_COOKIE, accessToken, defaultCookieOptions.access)
        .cookie(REFRESH_COOKIE, refreshToken, defaultCookieOptions.refresh);
}