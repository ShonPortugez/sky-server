import {COOKIE_SAME_SITE, MS_IN_DAY, MS_IN_MINUTE} from "./constants";

export const cookieConfig = {
    access: {
        httpOnly: true,
        secure: false,
        sameSite: COOKIE_SAME_SITE,
        path: '/',
        maxAge: 15 * MS_IN_MINUTE,
    },
    refresh: {
        httpOnly: true,
        secure: false,
        sameSite: COOKIE_SAME_SITE,
        path: '/',
        maxAge: 15 * MS_IN_DAY,
    },
};