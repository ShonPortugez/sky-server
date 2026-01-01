import 'dotenv/config';
import {expressjwt} from "express-jwt";
import process from "node:process";
import {JWT_ALGORITHM} from "../constants";
import {Algorithm} from "jsonwebtoken";

export const JwtMiddleware = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: [JWT_ALGORITHM as Algorithm],
    getToken: (req) => req.cookies?.access
}).unless({ path: ['/auth/login']});