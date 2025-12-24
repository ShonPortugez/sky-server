import {expressjwt} from "express-jwt";
import {Algorithm} from 'jsonwebtoken'
import {DEFAULT_JWT_ALGORITHM, REQUEST_PROPERTY} from "../utils/constants";
import * as process from "node:process";
import 'dotenv/config';

const jwtAlgorithm = process.env.JWT_ALGORITHM? process.env.JWT_ALGORITHM : DEFAULT_JWT_ALGORITHM;

export const AuthMiddleware = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: [jwtAlgorithm as Algorithm],
    requestProperty: REQUEST_PROPERTY,
});