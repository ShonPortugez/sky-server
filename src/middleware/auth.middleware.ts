import {expressjwt} from "express-jwt";
import {Algorithm} from 'jsonwebtoken'
import {JWT_ALGORITHM, REQUEST_PROPERTY} from "../utils/constants";
import * as process from "node:process";
import 'dotenv/config';


export const AuthMiddleware = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: [JWT_ALGORITHM as Algorithm],
    requestProperty: REQUEST_PROPERTY,
});