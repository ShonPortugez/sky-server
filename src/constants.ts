import { CookieOptions } from "express";

export const MS_IN_MINUTE = 60 * 1000;
export const MS_IN_DAY = MS_IN_MINUTE * 60 * 24;

export const PASSWORD_SALT_ROUNDS = 10

export const ACCESS_COOKIE = 'access';
export const REFRESH_COOKIE = 'refresh;'
export const COOKIE_SAME_SITE: CookieOptions['sameSite'] = 'strict';

export const QUESTION_DISCRIMINATOR_KEY = 'questionType'

export const VALID_UUID_REGEX = /^[0-9a-fA-F]{24}$/
export const DEFAULT_PORT = 3000;