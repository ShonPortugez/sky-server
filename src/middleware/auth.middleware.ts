import {expressjwt} from "express-jwt";
import {Algorithm} from 'jsonwebtoken'
import * as process from "node:process";
import 'dotenv/config';
import {JWT_ALGORITHM} from "../constants";

const REQUEST_PROPERTY = 'auth'

export const AuthMiddleware = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: [JWT_ALGORITHM as Algorithm],
    requestProperty: REQUEST_PROPERTY,
});