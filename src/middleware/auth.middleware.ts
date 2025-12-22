import {expressjwt} from "express-jwt";
import {REQUEST_PROPERTY} from "../utils/constants";
import * as process from "node:process";
import 'dotenv/config';

export const authMiddleware = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: REQUEST_PROPERTY,
});