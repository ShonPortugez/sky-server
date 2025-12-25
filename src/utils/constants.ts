import { CookieOptions } from "express";

const MS_IN_MINUTE = 60 * 1000;
const MS_IN_DAY = MS_IN_MINUTE * 60 * 24;

export const DB_USERS_COLLECTION = 'users';
export const DB_SURVEYS_COLLECTION = 'surveys';
export const DB_DEFAULT_TIMEOUT = 5000;

export const REQUEST_PROPERTY = 'auth'
export const JWT_ALGORITHM = 'HS256'
export const JWT_ACCESS_TOKEN_EXPIRE_DEFAULT = '15m'
export const JWT_REFRESH_TOKEN_EXPIRE_DEFAULT = '15d'
export const PASSWORD_SALT_ROUNDS = 10

export const JWT_ACCESS_TOKEN_EXPIRE_MS = 15 * MS_IN_MINUTE;
export const JWT_REFRESH_TOKEN_EXPIRE_MS = 15 * MS_IN_DAY

export const ACCESS_COOKIE = 'access';
export const REFRESH_COOKIE = 'refresh;'
export const COOKIE_SECURE = false;
export const COOKIE_SAME_SITE: CookieOptions['sameSite'] = 'strict';
export const COOKIE_PATH = '/';
export const COOKIE_HTTP_ONLY = true;

export const QUESTION_DISCRIMINATOR_KEY = 'questionType'
export const QUESTION = 'question';
export const QUESTION_SLIDER = 'slider';
export const QUESTION_RATE = 'slider';
export const QUESTION_TEXT = 'text';
export const QUESTION_MULTIPLE_ANSWER = 'multi';
export const QUESTION_DATE = 'date';
export const QUESTION_CHECKBOX = 'checkbox';

export const VALID_UUID_REGEX = /^[0-9a-fA-F]{24}$/
export const LOG_LEVEL_DEFAULT = 'info'
export const DEFAULT_PORT = 3000;